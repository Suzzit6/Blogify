const { Schema, model } = require("mongoose")
const {createHmac, randomBytes} = require("crypto") 
const { createToken } = require("../services/auth")

const Userschema = new Schema({
  FullName:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true,
    unique:true
  },
  salt:{
    type:String
  },
  password:{
    type:String,
    required:true
  },
  profileImg:{
    type:String,
    default: '/image/profileImage.jpg'
  },
  role:{
    type:String,
    enum: ['USER' , 'ADMIN'],
    default:'USER'
  }

},{timestamps:true})

Userschema.pre('save', function(next){
    const user = this
    if(!user.isModified('password')) return
    const salt = randomBytes(16).toString()
    const hashedPassword = createHmac("sha256" , salt)
                            .update('password')
                            .digest('hex')
    this.salt = salt
    this.password = hashedPassword
    next()
})

Userschema.static("MatchPasswordandCreateToken", async function (email,password){
    const user = await this.findOne({email})
    console.log(user)
    if(!user)  throw new Error('User is not Registered')

    const salt = user.salt
    const hashedPassword = user.password
    console.log(salt)
    console.log(hashedPassword)

    const userPassword = createHmac("sha256" , salt)
    .update(password)
    .digest('hex');

    console.log(userPassword)               
 
  if(hashedPassword !== userPassword) throw new Error('Wrong Password')
  const token = createToken(user)
  console.log("model:" + token)
  return token  
})    
 

const User = model('user', Userschema)  
module.exports = User 