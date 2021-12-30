const express= require('express');
const multer= require('multer');
const path= require('path');

const router= express.Router();

const Posts= require('../models/post');
const checkAuth= require('../middleware/check-auth');

const MIME_TYPE_MAP= {
  //For mimetype 'image/png', add 'png' extension; and so on
  'image/png': 'png',
  'image/jpeg': 'jpeg',
  'image/jpg': 'jpg'
}

//middleware logic for Multer
const storage= multer.diskStorage({
  destination: (req, file, cb)=>{
    const isValid= MIME_TYPE_MAP[file.mimetype];
    let error= new Error("Invalid Mime Type");
    if(isValid){
      error= null;
    }
    cb(error, "backend/images");
  },
  filename: (req, file, cb)=>{
    //const name does not give file extension, so we use MIME_TYPE_MAP
    const name= file.originalname.toLowerCase().split(' ').join('-');
    const ext= MIME_TYPE_MAP[file.mimetype];
    cb(null, name + '-' + Date.now() + '.' + ext);
  }
})

router.get('/', async (req, res)=>{
  console.log(req.query);
  const pageSize= parseInt(req.query.pageSize);
  const currentPage= parseInt(req.query.page);
  const postQuery= Posts.find({});
  if(pageSize && currentPage){
    postQuery
    .skip(pageSize*(currentPage-1))
    .limit(pageSize);
  }
  let posts= await postQuery;
  return res.status(200).json({
    message: "Posts fetched successfully!",
    posts: posts,
    maxPosts: await Posts.count()
  })
});

router.get('/:postId', async (req, res)=>{
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

router.post('/', checkAuth, multer({storage: storage}).single('image'), (req, res)=>{
  const url= req.protocol + '://' + req.get('host');
  const post= new Posts({
    title: req.body.title,
    desc: req.body.desc,
    imagePath: url + '/images/' + req.file.filename,
    creator: req.userData.userId
  })
  console.log(post);
  post.save();
  return res.status(200).json({
    message: "Post added successfully",
    post: {
      id: post._id,
      title: post.title,
      desc: post.desc,
      imagePath: post.imagePath
    }
  })
})

router.delete('/:id', checkAuth, async (req, res)=>{
  console.log(req.params.id);
  let deletedPost= await Posts.findByIdAndDelete(req.params.id);
  return res.status(200).json({
    message: 'Delete called!'
  })
})

router.patch('/', checkAuth, multer({storage: storage}).single('image'), async (req, res)=>{

  if(req.file){
    const url= req.protocol + '://' + req.get('host');
    let postUpdated= await Posts.findByIdAndUpdate(req.body.id, {
      title: req.body.title,
      desc: req.body.desc,
      imagePath: url + '/images/' + req.file.filename
    })
  } else {
    let postUpdated= await Posts.findByIdAndUpdate(req.body.id, {
      title: req.body.title,
      desc: req.body.desc
    })
  }

  return res.status(200).json({
    message: 'Post updated successfully'
  })
})

module.exports= router;
