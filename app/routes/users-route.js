const express = require('express')

const usersController = require('../controllers/users-controller')


const router  = express.Router()

router.get('/', usersController.getUsers);

router.post('/signup', usersController.createUser);

router.post('/login', usersController.logInUser)

router.delete('/:uid', usersController.removeUser)

module.exports = router;

