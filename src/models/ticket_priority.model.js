const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const TicketPriority = sequelize.define('TicketPriority', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING(30), unique: true, allowNull: false },
}, {
    tableName: 'ticket_priorities',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

module.exports = TicketPriority;
