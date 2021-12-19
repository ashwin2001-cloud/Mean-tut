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

app.use('/', require('./routes/posts'));

module.exports= app;
