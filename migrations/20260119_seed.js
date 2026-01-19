exports.seed = async function (knex) {
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
