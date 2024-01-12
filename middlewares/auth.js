const { GetUser } = require('../services/auth')

function Authorization(cookie){
    return (req,res,next)=>{
    const token = req.cookies[cookie]
    if(!token)  return next()
       
        try {
            const userinfo =  GetUser(token)
        
        req.user = userinfo
        } catch (error) {}
        
    return next()
}}

module.exports = {Authorization}