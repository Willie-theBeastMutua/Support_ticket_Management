const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Ticket = require('./ticket.model');
const User = require('./user.model');

const TicketInternalNote = sequelize.define('TicketInternalNote', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    ticketId: { type: DataTypes.INTEGER, allowNull: false, field: 'ticket_id' },
    adminId: { type: DataTypes.INTEGER, allowNull: false, field: 'admin_id' },
    note: { type: DataTypes.TEXT, allowNull: false },
}, {
    tableName: 'ticket_internal_notes',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

// Associations
TicketInternalNote.belongsTo(Ticket, { foreignKey: 'ticketId' });
TicketInternalNote.belongsTo(User, { foreignKey: 'adminId' });

module.exports = TicketInternalNote;
