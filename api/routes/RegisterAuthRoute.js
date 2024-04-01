const express = require('express');
const RegisterAuthController = require('../controllers/RegisterAuthController');

const router =  express.Router();

router.post('/register', RegisterAuthController.register);

module.exports = router;