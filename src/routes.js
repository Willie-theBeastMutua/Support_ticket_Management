// src/routes.js
const router = require('express').Router();

// Use the auth routes module
router.use('/auth', require('./modules/auth/auth.routes'));

// Health check
router.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

module.exports = router;
