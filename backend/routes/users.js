const express= require('express');
const router= express.Router();

const Users= require('../models/user');

const jwt= require('jsonwebtoken');
const bcrypt= require('bcrypt');

router.post('/signup', async (req, res)=>{
  try{
    const hash= bcrypt.hashSync(req.body.password, 10);
    const createdUser= await Users.create({
      email: req.body.email,
      password: hash
    })

    return res.status(200).json({
      message: 'User Created!',
      user: createdUser
    })
  }catch(err){
    return res.status(500).json({
      error: err
    })
  }
})

router.post('/login', async (req, res)=>{
  try{
    let user= await Users.findOne({email: req.body.email});
    if(!user){
      return res.status(401).json({
        message: 'Invalid username/password'
      })
    }
    const match = await bcrypt.compare(req.body.password, user.password);
    if(!match){
      return res.status(401).json({
        message: 'Invalid username/password'
      })
    }
    const token= jwt.sign({email: user.email, userId: user._id}, 'secret_key_which_should_be_long', {expiresIn: '1h'})
    return res.status(200).json({
      message: 'Logged in Successfully!',
      token: token,
      userId: user._id,
      expiresIn: 3600
    })

  }catch(err){
    consoe.log(err);
    return res.status(500).json({
      error: err
    })
  }

})

module.exports= router;
