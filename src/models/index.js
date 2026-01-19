const sequelize = require('../config/db');

const Role = require('./role.model');
const User = require('./user.model');
const TicketStatus = require('./ticket_status.model');
const TicketPriority = require('./ticket_priority.model');
const TicketCategory = require('./ticket_category.model');
const Ticket = require('./ticket.model');
const TicketInternalNote = require('./ticket_internal_note.model');
const TicketAssignment = require('./ticket_assignment.model');
const TicketStatusHistory = require('./ticket_status_history.model');

module.exports = {
    sequelize,
    Role,
    User,
    TicketStatus,
    TicketPriority,
    TicketCategory,
    Ticket,
    TicketInternalNote,
    TicketAssignment,
    TicketStatusHistory
};
