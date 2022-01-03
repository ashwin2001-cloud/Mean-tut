const Posts= require('../models/post');

module.exports.fetchPosts= async (req, res)=>{
  try{
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
  }catch(err){
    return res.status(500).json({
      message: 'Fetching posts failed!'
    })
  }
}

module.exports.getPost= async (req, res)=>{
  try{
    let post= await Posts.findById(req.params.postId);
    console.log('***Server: ', post, '***');
    if(post){
      return res.status(200).json(post);
    }else{
      return res.status(404).json({
        message: 'Post not found!'
      })
    }
  }catch(err){
    return res.status(500).json({
      message: 'Fetching posts failed!'
    })
  }
}

module.exports.createPost= (req, res)=>{
  try{
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
      message: "Post added successfully!",
      post: {
        id: post._id,
        title: post.title,
        desc: post.desc,
        imagePath: post.imagePath
      }
    })
  }catch(err){
    return res.status(500).json({
      message: "Creating a post, failed!"
    })
  }
}

module.exports.deletePost= async (req, res)=>{
  try{
    let postUpdated= await Posts.findOneAndDelete({_id: req.params.id, creator: req.userData.userId });
    if(!postUpdated){
      return res.status(401).json({
        message: 'Unauthorized!'
      })
    }
    res.status(200).json({
      message: 'Delete called!'
    })
  }catch(err){
    return res.status(500).json({
      message: 'Fetching posts failed!'
    })
  }
}

module.exports.updatePost= async (req, res)=>{

  try{

    let postUpdated= await Posts.findOne({_id: req.body.id, creator: req.userData.userId });
    if(!postUpdated){
      return res.status(401).json({
        message: 'Unauthorized!'
      })
    }
    postUpdated.title= req.body.title;
    postUpdated.desc= req.body.desc;
    if(req.file){
      const url= req.protocol + '://' + req.get('host');
      postUpdated.imagePath= url + '/images/' + req.file.filename;

    }
    postUpdated.save();

    return res.status(200).json({
      message: 'Post updated successfully!'
    })
  }catch(err){
    return res.status(500).json({
      message: 'Fetching posts failed!'
    })
  }
}
