const { Schema, model } = require("mongoose")

const BlogSchema = new Schema ({
    title:{
        type:String,
        require:true
    },
    body:{
        type:String,
        require:true
    },
    coverImage:{
        type:String
    },
    CreatedBy:{
        type:Schema.Types.ObjectId,
        ref:"user"
    }
},{timestamps : true})

const Blog = model("Blog" ,BlogSchema)
module.exports = Blog