// src/routes.js
const router = require('express').Router();

// Auth routes
router.use('/auth', require('./modules/auth/auth.routes'));

// Ticket routes
router.use('/tickets', require('./modules/tickets/tickets.routes'));


// Health check
router.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

module.exports = router;
