const {  Router } = require('express')
const router = Router()
const path = require("path")
const Blog = require('../model/blog')
const Comments = require('../model/comment')


const multer = require('multer')

const storage = multer.diskStorage({
   
    destination:function(req,file,cb){
      console.log(path.resolve("./public/uploads/"))
        cb(null , path.resolve("./public/uploads/"))
    },
    filename: function(req,file,cb){
        const filename = `${Date.now()}`
        cb(null ,filename)
    }
    
}) 
  const upload = multer({storage })

router.get('/new', (req,res)=>{
   
   return res.render('blog',{
    user:req.user
   })
})

router.get("/:id", async(req,res)=>{
  const blog = await Blog.findById(req.params.id).populate('CreatedBy')
  const comments = await Comments.find({BlogId:req.params.id}).populate('CreatedBy')
  console.log(blog)
   return res.render("user-blog",{
    user:req.user,
     blog,
     comments
   })
})

router.post("/comments/:BlogId", async (req,res)=>{
  await Comments.create({
    content:req.body.content,
    BlogId: req.params.BlogId,
    CreatedBy:req.user.id
  })
  return res.redirect(`/blog/${req.params.BlogId}`)
})


router.post("/" ,upload.single('coverImage'), async (req,res)=>{
   console.log(req.body)
    const {title , body } =  req.body
    console.log("file:", req.file)
    
    const blog = await Blog.create({
       title,
       body,
       coverImage: `/uploads/${req.file.filename}`,
       CreatedBy: req.user.id
    })
    return res.redirect(`/blog/${blog._id}`)
}) 

module.exports = router 