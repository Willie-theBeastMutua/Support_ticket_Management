const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Ticket = sequelize.define('Ticket', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    ticketNumber: { type: DataTypes.STRING, unique: true },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
}, { timestamps: true });

module.exports = Ticket;
