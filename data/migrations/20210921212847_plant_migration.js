
exports.up = function(knex) {
  knex.schema
  .createTable('plants', tbl => {
      tbl.increments('plants_id');
      tbl.string('nickname').notNullable();
      tbl.string('species').notNullable();
      tbl.string('h2oFrequency').notNullable()
      tbl.string('image')
  })
};

exports.down = function(knex) {
  knex.schema
  .dropTableIfExists('plants')
  .dropTableIfExists('users')
};
