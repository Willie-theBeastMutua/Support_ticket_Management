exports.up = async function (knex) {
    await knex('ticket_statuses').insert([
        { name: 'OPEN' },
        { name: 'IN_PROGRESS' },
        { name: 'RESOLVED' },
        { name: 'CLOSED' }
    ])
        .onConflict('name')
        .ignore();


    await knex('ticket_priorities').insert([
        { name: 'LOW' },
        { name: 'MEDIUM' },
        { name: 'HIGH' },
        { name: 'URGENT' }
    ])
        .onConflict('name')
        .ignore();

    await knex('ticket_categories').insert([
        { name: 'ACCOUNT_ACCESS' },
        { name: 'BILLING' },
        { name: 'TECHNICAL' },
        { name: 'FEATURE_REQUEST' },
        { name: 'OTHER' }
    ])
        .onConflict('name')
        .ignore();
};

exports.down = async function (knex) {
    // Remove the seeded data
    await knex('ticket_statuses').del();
    await knex('ticket_priorities').del();
    await knex('ticket_categories').del();
};
