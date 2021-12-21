const express= require('express');

const app= express();

const db= require('./config/mongoose');

const MIME_TYPE_MAP= {
  //For mimetype 'image/png', add 'png' extension; and so on
  'image/png': 'png',
  'image/jpeg': 'jpeg',
  'image/jpg': 'jpg'
}

//models
const Posts= require('./models/post');

//parses incoming req (request) as req.body
app.use(express.json());

app.use((req, res, next)=>{
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT, PATCH, OPTIONS');
  next();
})

app.use('/', require('./routes/posts'));

module.exports= app;
