const authController = require('../controller/auth')
const express = require('express');
const router = express.Router();

router.post('/signUp', authController.signUp)
.post('/login', authController.login);

exports.router = router;  


