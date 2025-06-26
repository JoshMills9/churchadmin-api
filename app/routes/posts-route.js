const express = require('express')

const postsController = require('../controllers/posts-controller')

const router = express.Router();

router.get('/:mid',  postsController.posts);

router.post('/:mid', postsController.createPost);

router.patch('/:mid', postsController.updateMember);

router.delete('/:mid', postsController.removeMember)


module.exports = router;