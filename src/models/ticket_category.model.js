const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const TicketCategory = sequelize.define('TicketCategory', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING(50), unique: true, allowNull: false },
}, {
    tableName: 'ticket_categories',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

module.exports = TicketCategory;
