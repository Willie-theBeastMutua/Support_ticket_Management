const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Ticket = require('./ticket.model');
const TicketStatus = require('./ticket_status.model');
const User = require('./user.model');

const TicketStatusHistory = sequelize.define('TicketStatusHistory', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    ticketId: { type: DataTypes.INTEGER, allowNull: false, field: 'ticket_id' },
    oldStatusId: { type: DataTypes.INTEGER, field: 'old_status_id' },
    newStatusId: { type: DataTypes.INTEGER, allowNull: false, field: 'new_status_id' },
    changedBy: { type: DataTypes.INTEGER, allowNull: false, field: 'changed_by' },
    changedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW, field: 'changed_at' },
}, {
    tableName: 'ticket_status_history',
    timestamps: false,
});

// Associations
TicketStatusHistory.belongsTo(Ticket, { foreignKey: 'ticketId' });
TicketStatusHistory.belongsTo(TicketStatus, { foreignKey: 'oldStatusId', as: 'oldStatus' });
TicketStatusHistory.belongsTo(TicketStatus, { foreignKey: 'newStatusId', as: 'newStatus' });
TicketStatusHistory.belongsTo(User, { foreignKey: 'changedBy' });

module.exports = TicketStatusHistory;
