
exports.up = function(knex, Promise) {
  return knex.schema.createTable('user', function(table) {
    table.increments()
    table.varchar('email')
    table.varchar('password_hash')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('user')
};
