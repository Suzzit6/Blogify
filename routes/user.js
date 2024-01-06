const {  Router } = require('express')
const router = Router()
const User = require('../model/user')

router.get('/signin', (req,res)=>{
    return res.render('signin')
})

router.get('/signup', (req,res)=>{
    return res.render('signup')
})

router.post('/signup', async(req,res)=>{
    const {FullName , email , password} = req.body 
    await User.create({
        FullName,
        email,
        password
    })
    return res.redirect('/signin')
})

router.post('/signin', async(req,res)=>{
    const { email,password } = req.body
       
            const token = await User.MatchPasswordandCreateToken(email,password)
            console.log("route"+token)
        
    return res.cookie('token',token).redirect('/')
})
 


module.exports = router



// try {
    // const token = await User.MatchPasswordandCreateToken(email,password)
    // console.log("route"+token)
// } catch (error) {
//     return res.render('signin', {
//     error:"Incorrect Email or Password"
//  })
// }