const express = require('express');
const LoginAuthController = require('../controllers/LoginAuthController')

const router = express.Router();

router.post('/login', LoginAuthController.login);

module.exports = router;
