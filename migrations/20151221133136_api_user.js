exports.up = function(knex, Promise) {
  return knex.schema.createTable('api_user', function(table) {
    table.increments()
    table.varchar('email')
    table.varchar('password_hash')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('api_user')
};
