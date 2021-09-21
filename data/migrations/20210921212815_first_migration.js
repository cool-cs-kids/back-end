
exports.up = function(knex) {
  return knex.schema
  .createTable('users', tbl => {
      tbl.increments('users_id');
      tbl.string('username', 12).notNullable().unique(); //Max 12 characters
      tbl.string('password', 12).notNullable(); //Max 12 characters
      tbl.string('phone_number', 12).notNullable();
  })
};

exports.down = function(knex) {
    knex.schema
    .dropTableIfExists('plants')
    .dropTableIfExists('users')
};
