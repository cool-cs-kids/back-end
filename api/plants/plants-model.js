const db = require('../../data/db-config.js');

module.exports = {
    find, findById, add, update, remove
}

function find() {
    return db('plants')
}

function findById(id) {
    return db('plants').where('plant_id', id).first();
}

async function add(plant) {
    const [id] = await db('plants').insert(plant, 'id')
    return findById(id)
}

function update(id, changes) {
    return db('plants')
        .where('plant_id', id)
        .update(changes);
}

function remove(id) {
    return db('plants')
    .where('plant_id', id)
    .del()
}

