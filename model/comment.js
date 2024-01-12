const { Schema, model } = require("mongoose")

const CommentSchema = new Schema ({
    content:{
      type:String,
      required:true,
    },
    BlogId:{
        type:Schema.Types.ObjectId,
        ref:"Blog"
    },
    CreatedBy:{
        type:Schema.Types.ObjectId,
        ref:"user"
    }

},{timestamps : true})

const Comments = model("comments(NovaBlog)" ,CommentSchema)
module.exports = Comments