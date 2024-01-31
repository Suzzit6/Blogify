const { Schema, model } = require("mongoose")
const {createHmac, randomBytes} = require("crypto")
const bcrypt = require('bcryptjs');
const argon2 = require('argon2');
const { createToken } = require("../services/auth");

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

Userschema.pre('save', async function(next){
    const user = this
    if(!user.isModified('password')) return
    const salt = (await bcrypt.genSalt(10)).toString()
    
    const hashedPassword = createHmac("sha256" , salt)
                            .update(user.password)
                            .digest('hex')

    this.salt = salt
    this.password = hashedPassword
    next()
})

Userschema.static("MatchPasswordandCreateToken", async function (email,password){
    const user = await this.findOne({email})
    if(!user)  throw new Error('User is not Registered') 

    const salt = user.salt
    const hashedPassword = user.password
    
    const userPassword = createHmac("sha256" , salt)
    .update(password)
    .digest('hex')
              
  if(hashedPassword !== userPassword) throw new Error('Wrong Password')
  
  const token = createToken(user)
  return token  
})    
 
const User = model('user', Userschema)
module.exports = User  


