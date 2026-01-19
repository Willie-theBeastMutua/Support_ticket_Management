const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./user.model');
const TicketStatus = require('./ticket_status.model');
const TicketPriority = require('./ticket_priority.model');
const TicketCategory = require('./ticket_category.model');

const Ticket = sequelize.define('Ticket', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    ticketNumber: { type: DataTypes.STRING(20), unique: true, allowNull: false, field: 'ticket_number' },
    userId: { type: DataTypes.INTEGER, allowNull: false, field: 'user_id' },
    title: { type: DataTypes.STRING(255), allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
    statusId: { type: DataTypes.INTEGER, allowNull: false, field: 'status_id' },
    priorityId: { type: DataTypes.INTEGER, allowNull: false, field: 'priority_id' },
    categoryId: { type: DataTypes.INTEGER, allowNull: false, field: 'category_id' },
}, {
    tableName: 'tickets',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

// Associations
Ticket.belongsTo(User, { foreignKey: 'userId' });
Ticket.belongsTo(TicketStatus, { foreignKey: 'statusId' });
Ticket.belongsTo(TicketPriority, { foreignKey: 'priorityId' });
Ticket.belongsTo(TicketCategory, { foreignKey: 'categoryId' });

module.exports = Ticket;
