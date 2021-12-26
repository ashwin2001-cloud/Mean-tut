const express= require('express');

const app= express();

const db= require('./config/mongoose');
const path= require('path');

const Posts= require('./models/post');

//parses incoming req (request) as req.body
app.use(express.json());
app.use(express.urlencoded( {extended: false} ));

//IMP: to give permission to use static files in our project
app.use('/images', express.static(path.join('backend/images')));

app.use((req, res, next)=>{
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT, PATCH, OPTIONS');
  next();
})

app.use('/api/posts', require('./routes/posts'));
app.use('/api/users', require('./routes/users'));

module.exports= app;
