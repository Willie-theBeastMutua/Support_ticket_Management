/**
 * Full migration for Support Ticket Management System
 */

exports.up = async function (knex) {
    // Roles
    await knex.schema.createTable('roles', (table) => {
        table.increments('id').primary();
        table.enu('name', ['ADMIN', 'USER']).notNullable().unique();
    });

    // Users
    await knex.schema.createTable('users', (table) => {
        table.increments('id').primary();
        table.integer('role_id').unsigned().notNullable().references('id').inTable('roles');
        table.string('email', 255).notNullable().unique();
        table.string('password_hash', 255).notNullable();
        table.string('first_name', 100).notNullable();
        table.string('last_name', 100).notNullable();
        table.boolean('is_active').defaultTo(true);
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    });

    // Ticket Statuses
    await knex.schema.createTable('ticket_statuses', (table) => {
        table.increments('id').primary();
        table.string('name', 30).notNullable().unique();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    });

    // Ticket Priorities
    await knex.schema.createTable('ticket_priorities', (table) => {
        table.increments('id').primary();
        table.string('name', 30).notNullable().unique();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    });

    // Ticket Categories
    await knex.schema.createTable('ticket_categories', (table) => {
        table.increments('id').primary();
        table.string('name', 50).notNullable().unique();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    });

    // Tickets
    await knex.schema.createTable('tickets', (table) => {
        table.increments('id').primary();
        table.string('ticket_number', 20).notNullable().unique();
        table.integer('user_id').unsigned().notNullable().references('id').inTable('users');
        table.string('title', 255).notNullable();
        table.text('description').notNullable();
        table.integer('status_id').unsigned().notNullable().references('id').inTable('ticket_statuses');
        table.integer('priority_id').unsigned().notNullable().references('id').inTable('ticket_priorities');
        table.integer('category_id').unsigned().notNullable().references('id').inTable('ticket_categories');
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    });

    // Ticket Assignments
    await knex.schema.createTable('ticket_assignments', (table) => {
        table.increments('id').primary();
        table.integer('ticket_id').unsigned().notNullable().references('id').inTable('tickets');
        table.integer('admin_id').unsigned().notNullable().references('id').inTable('users');
        table.timestamp('assigned_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    });

    // Ticket Internal Notes
    await knex.schema.createTable('ticket_internal_notes', (table) => {
        table.increments('id').primary();
        table.integer('ticket_id').unsigned().notNullable().references('id').inTable('tickets');
        table.integer('admin_id').unsigned().notNullable().references('id').inTable('users');
        table.text('note').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    });

    // Ticket Status History
    await knex.schema.createTable('ticket_status_history', (table) => {
        table.increments('id').primary();
        table.integer('ticket_id').unsigned().notNullable().references('id').inTable('tickets');
        table.integer('old_status_id').unsigned().nullable().references('id').inTable('ticket_statuses');
        table.integer('new_status_id').unsigned().notNullable().references('id').inTable('ticket_statuses');
        table.integer('changed_by').unsigned().notNullable().references('id').inTable('users');
        table.timestamp('changed_at').defaultTo(knex.fn.now());
    });

    // Ticket Comments
    await knex.schema.createTable('ticket_comments', table => {
        table.increments('id').primary();
        table.integer('ticket_id').unsigned().notNullable();
        table.integer('user_id').unsigned().notNullable();
        table.text('content').notNullable();
        table.boolean('is_internal').defaultTo(false);
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());

        table.foreign('ticket_id').references('id').inTable('tickets').onDelete('CASCADE');
        table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE');
    });
};

exports.down = async function (knex) {
    await knex.schema.dropTableIfExists('ticket_comments');
};


// Seed default data for roles, priorities, statuses, categories
await knex('roles').insert([{ name: 'ADMIN' }, { name: 'USER' }]);
await knex('ticket_statuses').insert([
    { name: 'OPEN' },
    { name: 'IN_PROGRESS' },
    { name: 'RESOLVED' },
    { name: 'CLOSED' }
]);
await knex('ticket_priorities').insert([
    { name: 'LOW' },
    { name: 'MEDIUM' },
    { name: 'HIGH' },
    { name: 'URGENT' }
]);
await knex('ticket_categories').insert([
    { name: 'ACCOUNT_ACCESS' },
    { name: 'BILLING' },
    { name: 'TECHNICAL' },
    { name: 'FEATURE_REQUEST' },
    { name: 'OTHER' }
]);
};

exports.down = async function (knex) {
    await knex.schema.dropTableIfExists('ticket_status_history');
    await knex.schema.dropTableIfExists('ticket_internal_notes');
    await knex.schema.dropTableIfExists('ticket_assignments');
    await knex.schema.dropTableIfExists('tickets');
    await knex.schema.dropTableIfExists('ticket_categories');
    await knex.schema.dropTableIfExists('ticket_priorities');
    await knex.schema.dropTableIfExists('ticket_statuses');
    await knex.schema.dropTableIfExists('users');
    await knex.schema.dropTableIfExists('roles');
};
