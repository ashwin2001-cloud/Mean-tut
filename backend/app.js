const express= require('express');

const app= express();

app.use(express.json());

app.use((req, res, next)=>{
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  next();
})

app.post('/api/posts', (req, res)=>{
  const posts= req.body;
  console.log(posts);
  return res.status(200).json({
    message: "Post added successfully"
  })
})

app.get('/api/posts', (req, res)=>{
  const posts= [
    {
      id: 'yjfykgu',
      title: 'Title1',
      desc: 'Desc1'
    },
    {
      id: 'jgfdwh2e',
      title: 'Title2',
      desc: 'Desc2'
    }
  ]

  return res.status(200).json({
    message: "Posts fetched successfully!",
    posts: posts
  })
});

module.exports= app;
