const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./user.model');
const Ticket = require('./ticket.model');

const TicketComment = sequelize.define('TicketComment', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    ticketId: { type: DataTypes.INTEGER, allowNull: false, field: 'ticket_id' },
    userId: { type: DataTypes.INTEGER, allowNull: false, field: 'user_id' },
    content: { type: DataTypes.TEXT, allowNull: false },
    isInternal: { type: DataTypes.BOOLEAN, defaultValue: false, field: 'is_internal' }
}, {
    tableName: 'ticket_comments',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

// Associations
TicketComment.belongsTo(User, { foreignKey: 'userId' });
TicketComment.belongsTo(Ticket, { foreignKey: 'ticketId' });

module.exports = TicketComment;
