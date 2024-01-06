const JWT = require('jsonwebtoken')
const secretKey = "Secret key"

function createToken(user){
   const payload = {
    id: user._id,
    Name: user.FullName,
    email:user.email,
    profileimage:user.profileImage,
    role: user.role
   }
   const token = JWT.sign(payload, secretKey)
   return token
}

 function GetUser(token){
    return  JWT.verify(token,secretKey)
}

module.exports = {
    createToken,
    GetUser 
}