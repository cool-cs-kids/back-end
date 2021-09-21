const db = require('../../data/db-config.js');

module.exports = {
    find, findById, insert, update, remove
}

function find() {
    return db('plants')
}

function findById(id) {
    return db('plants').where('plants_id', id).first();
}

function insert(recipe) {
    return db('plants')
        .insert(id) //insert
        .then(ids => {
            return findById(ids[0])
        })
}

function update(id, changes) {
    return db('plants')
        .where('plants_id', id)
        .update(changes);
}

function remove(id) {
    return db('plants')
    .where('plants_id', id)
    .del()
}

