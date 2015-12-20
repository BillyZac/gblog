
exports.up = function(knex, Promise) {
  return knex.schema.table('post', function (table) {
    table.dropColumn('created_at');
    table.dropColumn('updated_at');
    table.string('creation_time');
  })
};

exports.down = function(knex, Promise) {

};
