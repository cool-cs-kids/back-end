# back-end

  "repository": {
    "type": "git",
    "url": "git+https://github.com/Build-Week-WMP/back-end.git"
  },


  
module.exports = {

  development: {
    client: 'pg',
    connection: {
      filename: './data/database.db3'
    },
    useNullAsDefault: true,
    migrations: {
      directory: './data/migrations',
    },
    seeds: {
      directory: './data/seeds',
    },
    pool: {
      afterCreate: (conn, done) => {
        //runs after a connection is made to the sqlite engine
        conn.run('PRAGMA foreign_keys = ON', done);
      }
    }
  }
};