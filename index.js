const express = require('express')
const app = express()
const port = 7500
const path = require('path')
require('dotenv').config();

const cookieParser = require('cookie-parser')


const {Authorization} = require('./middlewares/auth')

const Blog = require('./model/blog')

const UserRoute = require('./routes/user')
const BlogRoute = require('./routes/blog')

const { ConnectMongo } = require('./connection')
ConnectMongo(process.env.Mongo_uri)

app.set('view engine' , 'ejs' )
app.set('views' , path.resolve('./view'))

app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use(cookieParser()) 

app.use(express.static(path.join(__dirname, 'public')));

app.use(Authorization('token'))


app.get('/' , async (req, res)=>{
   const blogs = await Blog.find({}).populate("CreatedBy")
   
   const user_blogs = req.user ? await Blog.find({CreatedBy: req.user.id}).populate("CreatedBy"):[];
   
   return res.render('home',{ 
      user:req.user,
      blogs,
      user_blogs
   })
}) 


app.use('/',UserRoute)
app.use("/blog", BlogRoute)



app.listen(port , ()=> console.log(`Server Started at port ${port}`)) 