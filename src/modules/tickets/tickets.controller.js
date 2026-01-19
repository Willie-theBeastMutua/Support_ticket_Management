const ticketsService = require('./tickets.service');

const createTicket = async (req, res) => {
    try {
        const { title, description, priorityId, categoryId } = req.body;

        if (!title || !description || !priorityId || !categoryId) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const ticket = await ticketsService.createTicket({
            userId: req.user.id,
            title,
            description,
            priorityId,
            categoryId
        });

        res.status(201).json(ticket);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const listTickets = async (req, res) => {
    try {
        const { statusId } = req.query;
        const tickets = await ticketsService.listTickets(req.user, statusId);
        res.json(tickets);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const getTicketById = async (req, res) => {
    try {
        const ticket = await ticketsService.getTicketById(req.params.id, req.user);
        res.json(ticket);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};
const patchTicket = async (req, res) => {
    try {
        const ticket = await ticketsService.updateTicket({
            ticketId: req.params.id,
            user: req.user,
            statusId: req.body.statusId,
            assignedTo: req.body.assignedTo,
            internalNote: req.body.internalNote
        });
        res.json(ticket);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const postComment = async (req, res) => {
    try {
        const comment = await ticketsService.addComment({
            userId: req.user.id,
            isAdmin: req.user.role === 'ADMIN',
            ticketId: req.params.id,
            content: req.body.content,
            isInternal: req.body.isInternal
        });
        res.json(comment);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

module.exports = { createTicket, listTickets, getTicketById, patchTicket, postComment };
