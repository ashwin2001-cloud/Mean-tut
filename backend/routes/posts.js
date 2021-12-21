const express= require('express');

const router= express.Router();

const Posts= require('../models/post');

router.get('/api/posts', async (req, res)=>{
  let posts= await Posts.find({});
  return res.status(200).json({
    message: "Posts fetched successfully!",
    posts: posts
  })
});

router.get('/api/posts/:postId', async (req, res)=>{
  let post= await Posts.findById(req.params.postId);
  console.log('***Server: ', post, '***');
  if(post){
    return res.status(200).json(post);
  }else{
    return res.status(404).json({
      message: 'Post not found!'
    })
  }
})

router.post('/api/posts', multer(storage).single('image'), (req, res)=>{
  const post= new Posts({
    title: req.body.title,
    desc: req.body.desc
  })
  console.log(post);
  post.save();
  return res.status(200).json({
    message: "Post added successfully",
    id: post._id
  })
})

router.delete('/api/posts/:id', async (req, res)=>{
  console.log(req.params.id);
  let deletedPost= await Posts.findByIdAndDelete(req.params.id);
  return res.status(200).json({
    message: 'Delete called!'
  })
})

router.patch('/api/posts', async (req, res)=>{
  let postUpdated= await Posts.findByIdAndUpdate(req.body.id, {
    title: req.body.title,
    desc: req.body.desc
  })
  return res.status(200).json({
    message: 'Post updated successfully'
  })
})

module.exports= router;
