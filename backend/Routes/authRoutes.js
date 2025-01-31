const express = require('express');
const { register, login } = require('../Controllers/authControllers');
const router = express.Router();

// User registration route
router.post('/register', register);

// User login route
router.post('/login', login);

module.exports = router;
