const router = require('express').Router();
const ticketsController = require('./tickets.controller');
const { authenticate, authorize } = require('../../middlewares/auth.middleware');

// All ticket routes require authentication
router.use(authenticate);

// Create a ticket (USER + ADMIN)
router.post('/', ticketsController.createTicket);

// List tickets (USER sees own, ADMIN sees all)
router.get('/', ticketsController.listTickets);

// Get single ticket
router.get('/:id', ticketsController.getTicketById);

// update ticket (Admin only)
router.patch('/:id', ticketsController.patchTicket);

// add comment
router.post('/:id/comments', ticketsController.postComment);

module.exports = router;
