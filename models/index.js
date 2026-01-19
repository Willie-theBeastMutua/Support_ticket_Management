const sequelize = require('../config/db');
const User = require('./user.model');
const Ticket = require('./ticket.model');
const Status = require('./status.model');
const Priority = require('./priority.model');
const Category = require('./category.model');
const Note = require('./note.model');
const Assignment = require('./assignment.model');

// Associations

User.hasMany(Ticket, { foreignKey: 'userId' });
Ticket.belongsTo(User, { foreignKey: 'userId' });

Status.hasMany(Ticket, { foreignKey: 'statusId' });
Ticket.belongsTo(Status, { foreignKey: 'statusId' });

Priority.hasMany(Ticket, { foreignKey: 'priorityId' });
Ticket.belongsTo(Priority, { foreignKey: 'priorityId' });

Category.hasMany(Ticket, { foreignKey: 'categoryId' });
Ticket.belongsTo(Category, { foreignKey: 'categoryId' });

Ticket.hasMany(Note, { foreignKey: 'ticketId' });
Note.belongsTo(Ticket, { foreignKey: 'ticketId' });
User.hasMany(Note, { foreignKey: 'adminId' });
Note.belongsTo(User, { foreignKey: 'adminId' });

Ticket.hasMany(Assignment, { foreignKey: 'ticketId' });
Assignment.belongsTo(Ticket, { foreignKey: 'ticketId' });
User.hasMany(Assignment, { foreignKey: 'adminId' });
Assignment.belongsTo(User, { foreignKey: 'adminId' });

module.exports = {
    sequelize,
    User,
    Ticket,
    Status,
    Priority,
    Category,
    Note,
    Assignment
};
