const express= require('express');
const router= express.Router();

const usersController= require('../controllers/user');

router.post('/login', usersController.createToken);
router.post('/signup', usersController.createUser);

module.exports= router;
