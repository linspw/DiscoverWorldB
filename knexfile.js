// Update with your config settings.

module.exports = {
  client: 'postgresql',
  connection: {
    database: 'db_discoverworld',
    user:     'postgres',
    password: 'discoverworld',
    charset: "utf8"
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations'
  }
};
