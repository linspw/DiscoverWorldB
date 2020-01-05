
exports.up = function(knex, Promise) {
    return knex.schema.createTable('Countries', table => {
        table.increments('id').primary()
        table.string('name').notNull()
        table.string('initials', 3).notNull()
        table.string('slug').notNull()
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('Countries')
};

