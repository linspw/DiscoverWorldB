
exports.up = function(knex, Promise) {
    return knex.schema.createTable('Countries', table => {
        table.increments('id').primary()
        table.string('iso_code3').notNull()
        table.string('iso_initials2', 2).notNull()
        table.string('iso_initials3', 3).notNull()
        table.string('name_pt').notNull()
        table.string('name_en').notNull()
        table.string('capital').notNull()
        table.string('abbreviation').notNull()
        table.string('postal_initial').notNull()
        table.string('region').notNull()
        table.string('sub_region').notNull()
        table.string('slug').notNull().unique()
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('Countries')
};

