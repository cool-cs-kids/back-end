
exports.up = function (knex) {
    return knex.schema.createTable("plants", plants => {
      plants.increments("plant_id");
  
      plants
        .string("nickname", 128)
        .notNullable()
        .unique();
  
      plants.string("species", 128).notNullable();
      plants.string('h2oFrequency', 128)
      plants.string('image', 128)
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTableIfExists("plants");
  };
  