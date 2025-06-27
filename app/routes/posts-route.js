const express = require('express')

const postsController = require('../controllers/posts-controller')

const router = express.Router();

router.get('/:pid',  postsController.posts);

router.post('/:pid', postsController.createPost);

router.patch('/:pid', postsController.updatePost);

router.delete('/:pid', postsController.removePost)


module.exports = router;