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
    const { email , password } = req.body 
    try {
        const token = await User.MatchPasswordandCreateToken(email,password)
        return res.cookie('token',token).redirect('/')

    } catch (error) {
        return res.render('signin', {
            error:"Incorrect Email or Password"
        })
        }
}) 

router.get('/logout' , async(req,res)=>{
    return res.clearCookie("token").redirect('/')
})

module.exports = router