
exports.up = function(knex, Promise) {
    return knex.schema.createTable('Users', table =>{
        table.increments('id').primary()
        table.string('name').notNull()
        table.string('email').notNull().unique()
        table.string('user').notNull()
        table.string('password').notNull()
        table.integer('level').notNull().defaultTo(0)
        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated_at').defaultTo(knex.fn.now())
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('Users')
};
