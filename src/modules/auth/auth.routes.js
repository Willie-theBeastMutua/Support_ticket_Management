const router = require('express').Router();
const authController = require('./auth.controller');

/**
 * @route POST /api/auth/register
 * @desc Register a new user
 * @access Public
 */
router.post('/register', authController.register);

/**
 * @route POST /api/auth/login
 * @desc Login a user and return JWT
 * @access Public
 */
router.post('/login', authController.login);

module.exports = router;
