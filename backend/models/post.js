const mongoose=require('mongoose');
const postSchema=new mongoose.Schema({
    title:{ type:String, required:true },
    desc:{ type:String, required:true },
    imagePath:{ type:String, required:true },
    creator: { type: mongoose.Schema.ObjectId, required: true, ref: 'User' }
});

const Post=mongoose.model('Post', postSchema);
module.exports=Post;
