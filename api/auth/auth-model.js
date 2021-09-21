const db = require('../../data/db-config');

module.exports = {find, findBy, add, findById, update, remove}

function find(){
    return db('users').select('users_id', 'username', 'password');
}

function findBy(filter) {
    return db('users')
        .where(filter);
}

async function add(users) {
    const [id] = await db('users')
    .insert(users, 'users_id')
    return findById(id)
}

function findById(id) {
    return db('users')
        .where('users_id', id)
        .first();
}

function update(changes, id) {
    return db('users')
        .where({id})
        .update(changes)
        .then(id => {
            return findById(id);
        })
}

function remove(id) {
    return db('users')
        .where('users_id', id)
        .del()
}