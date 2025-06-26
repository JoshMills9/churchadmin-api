const express = require('express')

const membersController = require('../controllers/members-controller')

const router = express.Router();

router.get('/:mid',  membersController.members);

router.post('/:mid', membersController.createMember);

router.patch('/:mid', membersController.updateMember);

router.delete('/:mid', membersController.removeMember)


module.exports = router;