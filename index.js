const express = require('express')
const app = express()
const port = 7500
const path = require('path')
const cookieParser = require('cookie-parser')
const {Authorization} = require('./middlewares/auth')


const UserRoute = require('./routes/user')

const { ConnectMongo } = require('./connection')
ConnectMongo('mongodb://localhost:27017')

app.set('view engine' , 'ejs' )
app.set('views' , path.resolve('./view'))

app.use(express.urlencoded({ extended:false }))
app.use(cookieParser()) 
// app.use(Authorization('token'))


app.get('/' , (req, res)=>{
   return res.render('home',{
      user:req.user
   })
}) 
app.use('/',UserRoute) 

app.listen(port , ()=> console.log(`Server Started at port ${port}`))