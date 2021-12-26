const express= require('express');
const router= express.Router();

const Users= require('../models/user');

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

module.exports= router;
