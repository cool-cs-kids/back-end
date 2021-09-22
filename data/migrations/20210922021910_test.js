
exports.up = function (knex) {
    return knex.schema.createTable("users", users => {
      users.increments("user_id");
  
      users
        .string("username", 128)
        .notNullable()
        .unique();
  
      users.string("password", 128).notNullable();
      users.string('phone_number', 128)
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTableIfExists("users");
  };
  