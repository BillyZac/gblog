
exports.up = function(knex, Promise) {
  return knex.schema.createTable('comment', function(table) {
    table.increments()
    table.integer('post_id').references('id').inTable('post')
    table.text('body')
    table.varchar('author')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('comment')
};
