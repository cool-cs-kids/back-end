
exports.up = function(knex) {
  knex.schema
    .createTable('users'), tbl => {
        tbl.increments();
        tbl.string('username').notNullable().unique();
        tbl.string('password').notNullable();
        tbl.string('phonenumber').notNullable();
    }
};

exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists('users');
};
