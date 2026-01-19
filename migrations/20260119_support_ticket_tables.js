/**
 * @param { import("knex").Knex } knex
 */
exports.up = async function (knex) {

    /* LOOKUP TABLES */

    await knex.schema.createTable('ticket_statuses', (table) => {
        table.increments('id').primary();
        table.string('name', 30).notNullable().unique();
        table.timestamps(true, true);
    });

    await knex.schema.createTable('ticket_priorities', (table) => {
        table.increments('id').primary();
        table.string('name', 30).notNullable().unique();
        table.timestamps(true, true);
    });

    await knex.schema.createTable('ticket_categories', (table) => {
        table.increments('id').primary();
        table.string('name', 50).notNullable().unique();
        table.timestamps(true, true);
    });

    /* TICKETS */

    await knex.schema.createTable('tickets', (table) => {
        table.increments('id').primary();
        table.string('ticket_number', 20).notNullable().unique();

        table.integer('user_id').unsigned().notNullable();
        table.string('title', 255).notNullable();
        table.text('description').notNullable();

        table.integer('status_id').unsigned().notNullable();
        table.integer('priority_id').unsigned().notNullable();
        table.integer('category_id').unsigned().notNullable();

        table.timestamps(true, true);

        table
            .foreign('user_id')
            .references('id')
            .inTable('users')
            .onDelete('CASCADE');

        table
            .foreign('status_id')
            .references('id')
            .inTable('ticket_statuses');

        table
            .foreign('priority_id')
            .references('id')
            .inTable('ticket_priorities');

        table
            .foreign('category_id')
            .references('id')
            .inTable('ticket_categories');

        table.index(['user_id']);
        table.index(['status_id']);
    });

    /* STATUS HISTORY */

    await knex.schema.createTable('ticket_status_history', (table) => {
        table.increments('id').primary();

        table.integer('ticket_id').unsigned().notNullable();
        table.integer('old_status_id').unsigned();
        table.integer('new_status_id').unsigned().notNullable();
        table.integer('changed_by').unsigned().notNullable();

        table.timestamp('changed_at').defaultTo(knex.fn.now());

        table
            .foreign('ticket_id')
            .references('id')
            .inTable('tickets')
            .onDelete('CASCADE');

        table
            .foreign('old_status_id')
            .references('id')
            .inTable('ticket_statuses');

        table
            .foreign('new_status_id')
            .references('id')
            .inTable('ticket_statuses');

        table
            .foreign('changed_by')
            .references('id')
            .inTable('users');
    });

    /* ASSIGNMENTS*/

    await knex.schema.createTable('ticket_assignments', (table) => {
        table.increments('id').primary();

        table.integer('ticket_id').unsigned().notNullable();
        table.integer('admin_id').unsigned().notNullable();

        table.timestamp('assigned_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());

        table
            .foreign('ticket_id')
            .references('id')
            .inTable('tickets')
            .onDelete('CASCADE');

        table
            .foreign('admin_id')
            .references('id')
            .inTable('users');
    });

    /* INTERNAL NOTES*/

    await knex.schema.createTable('ticket_internal_notes', (table) => {
        table.increments('id').primary();

        table.integer('ticket_id').unsigned().notNullable();
        table.integer('admin_id').unsigned().notNullable();
        table.text('note').notNullable();

        table.timestamps(true, true);

        table
            .foreign('ticket_id')
            .references('id')
            .inTable('tickets')
            .onDelete('CASCADE');

        table
            .foreign('admin_id')
            .references('id')
            .inTable('users');
    });
};

/**
 * @param { import("knex").Knex } knex
 */
exports.down = async function (knex) {
    await knex.schema.dropTableIfExists('ticket_internal_notes');
    await knex.schema.dropTableIfExists('ticket_assignments');
    await knex.schema.dropTableIfExists('ticket_status_history');
    await knex.schema.dropTableIfExists('tickets');
    await knex.schema.dropTableIfExists('ticket_categories');
    await knex.schema.dropTableIfExists('ticket_priorities');
    await knex.schema.dropTableIfExists('ticket_statuses');
};
