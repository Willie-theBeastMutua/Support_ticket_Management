const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Ticket = require('./ticket.model');
const User = require('./user.model');

const TicketAssignment = sequelize.define('TicketAssignment', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    ticketId: { type: DataTypes.INTEGER, allowNull: false, field: 'ticket_id' },
    adminId: { type: DataTypes.INTEGER, allowNull: false, field: 'admin_id' },
    assignedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW, field: 'assigned_at' },
}, {
    tableName: 'ticket_assignments',
    timestamps: true,
    updatedAt: 'updated_at',
    createdAt: false,
});

// Associations
TicketAssignment.belongsTo(Ticket, { foreignKey: 'ticketId' });
TicketAssignment.belongsTo(User, { foreignKey: 'adminId' });

module.exports = TicketAssignment;
