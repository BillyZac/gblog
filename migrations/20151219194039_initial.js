
exports.up = function(knex, Promise) {
  return knex.schema.createTable('post', function(table) {
    table.increments()
    table.string('title')
    table.text('body')
    table.string('author')
    table.timestamps()
  })
}

exports.down = function(knex, Promise) {
  
}
