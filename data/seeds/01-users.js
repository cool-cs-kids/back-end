
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {username: 'John Doe', password: '1234hired'},
        {username: 'JSON Derulo', password: 'mmmWatchasay123'},
        {username: 'Joe Smith', password: '007'}
      ]);
    });
};
