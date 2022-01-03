const express= require('express');

const router= express.Router();
const checkAuth= require('../middleware/check-auth');
const extractFile= require('../middleware/multer');

const postsController= require('../controllers/post');

router.get('/', postsController.fetchPosts);
router.get('/:postId', postsController.getPost);
router.post('/', checkAuth, extractFile, postsController.createPost);
router.delete('/:id', checkAuth, postsController.deletePost);
router.patch('/', checkAuth, extractFile, postsController.updatePost);

module.exports= router;
