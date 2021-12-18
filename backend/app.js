const express= require('express');

const app= express();

const db= require('./config/mongoose');

//models
const Posts= require('./models/post');

app.use(express.json());

app.use((req, res, next)=>{
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT, PATCH, OPTIONS');
  next();
})

app.get('/api/posts', async (req, res)=>{
  let posts= await Posts.find({});
  return res.status(200).json({
    message: "Posts fetched successfully!",
    posts: posts
  })
});

app.get('/api/posts/:postId', async (req, res)=>{
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

app.post('/api/posts', (req, res)=>{
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

app.delete('/api/posts/:id', async (req, res)=>{
  console.log(req.params.id);
  let deletedPost= await Posts.findByIdAndDelete(req.params.id);
  return res.status(200).json({
    message: 'Delete called!'
  })
})

app.patch('/api/posts', async (req, res)=>{
  let postUpdated= await Posts.findByIdAndUpdate(req.body.id, {
    title: req.body.title,
    desc: req.body.desc
  })
  return res.status(200).json({
    message: 'Post updated successfully'
  })
})

module.exports= app;
