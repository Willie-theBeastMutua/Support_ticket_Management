const {
    Ticket,
    User,
    TicketStatus,
    TicketPriority,
    TicketCategory,
    TicketStatusHistory,
    TicketAssignment,
    TicketInternalNote,
    TicketComment
} = require('../../models');

const generateTicketNumber = async () => {
    const lastTicket = await Ticket.findOne({ order: [['id', 'DESC']] });
    const nextId = lastTicket ? lastTicket.id + 1 : 1;
    return `TKT-${nextId.toString().padStart(5, '0')}`;
};

const createTicket = async ({ userId, title, description, priorityId, categoryId }) => {
    const ticketNumber = await generateTicketNumber();

    const ticket = await Ticket.create({
        ticketNumber,
        userId,
        title,
        description,
        priorityId,
        categoryId,
        statusId: 1
    });

    const fullTicket = await Ticket.findByPk(ticket.id, {
        include: [
            { model: User, attributes: ['id', 'firstName', 'lastName', 'email'] },
            { model: TicketStatus },
            { model: TicketPriority },
            { model: TicketCategory }
        ]
    });

    return fullTicket;
};


const listTickets = async (user, statusId) => {
    const where = {};
    if (user.Role.name === 'USER') {
        where.userId = user.id;
    }
    if (statusId) where.statusId = statusId;

    return Ticket.findAll({
        where,
        include: [
            { model: User, attributes: ['id', 'firstName', 'lastName', 'email'] },
            { model: TicketStatus },
            { model: TicketPriority },
            { model: TicketCategory }
        ],
        order: [['created_at', 'DESC']]
    });
};

const getTicketById = async (ticketId, user) => {
    const ticket = await Ticket.findByPk(ticketId, {
        include: [
            { model: User, attributes: ['id', 'firstName', 'lastName', 'email'] },
            { model: TicketStatus },
            { model: TicketPriority },
            { model: TicketCategory }
        ]
    });

    if (!ticket) throw new Error('Ticket not found');

    if (user.Role.name === 'USER' && ticket.userId !== user.id) {
        throw new Error('Access denied');
    }

    return ticket;
};
const updateTicket = async ({ ticketId, user, statusId, assignedTo, internalNote }) => {
    const ticket = await Ticket.findByPk(ticketId);
    if (!ticket) throw new Error('Ticket not found');

    const isAdmin = user.Role.name === 'ADMIN';

    if (!isAdmin && (statusId || assignedTo || internalNote)) {
        throw new Error('Access denied: only admins can update status, assign tickets, or add internal notes');
    }

    if (isAdmin) {
        if (statusId && statusId !== ticket.statusId) {
            await TicketStatusHistory.create({
                ticketId: ticket.id,
                oldStatusId: ticket.statusId,
                newStatusId: statusId,
                changedBy: user.id
            });
            ticket.statusId = statusId;
        }

        if (assignedTo) {
            await TicketAssignment.create({
                ticketId: ticket.id,
                adminId: assignedTo
            });
        }

        if (internalNote) {
            await TicketInternalNote.create({
                ticketId: ticket.id,
                adminId: user.id,
                note: internalNote
            });
        }
    }

    await ticket.save();

    return ticket;
};


const addComment = async ({ userId, isAdmin, ticketId, content, isInternal = false }) => {
    const ticket = await Ticket.findByPk(ticketId);
    if (!ticket) throw new Error('Ticket not found');

    if (!isAdmin && ticket.userId !== userId) {
        throw new Error('You cannot comment on this ticket');
    }

    if (!isAdmin && isInternal) {
        throw new Error('Only admins can create internal comments');
    }

    const comment = await TicketComment.create({
        ticketId,
        userId,
        content,
        isInternal
    });

    return comment;
};
module.exports = { createTicket, listTickets, getTicketById, updateTicket, addComment };
