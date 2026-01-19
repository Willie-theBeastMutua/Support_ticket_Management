// src/config/db.js
const knex = require('knex');
const env = require('./env');

module.exports = knex({
    client: 'mysql2',
    connection: {
        host: env.DB_HOST,
        user: env.DB_USER,
        password: env.DB_PASSWORD,
        database: env.DB_NAME
    }
});
