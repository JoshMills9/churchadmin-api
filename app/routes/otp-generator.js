const express = require('express')

const otpController = require('../controllers/otp-controller')


const router  = express.Router()

router.post('/', otpController.generateOtp)


module.exports = router;