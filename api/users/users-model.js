const db = require('../../data/db-config.js');

module.exports = {
    find, findById, add, insertPlant, update, updateUsersPlant, findUsersPlants, remove, removeUserPlant
}

function find() {
    return db('users')
}


function findById(user_id) {
    return db('users as u')
        .where({ user_id })
        .first()
}

async function add(user) {
    const [id] = await db('users').insert(user, 'id').returning('id');
    return findById(id)
}


function insertPlant(plant, user_id) {
    return db('plants').insert({...plant, user_id})
}

function update(id, changes){
    return db('users')
        .where('users_id', id)
        .update(changes);
}

function findUsersPlants(usersId) {
    return db('plants as p')
        .join('users', 'users.plants_id', 'p.users_id')
        .select('p.users_id as users', 'p.id', 'p.nickname', 'p.species', 'p.h2oFrequency', 'p.image')
        .where('p.users_id', usersId)
}

function updateUsersPlant(id, changes) {
    return db('plants')
        .where('plants_id', id)
        .update(changes);
}

function remove(id){
    return db('users')
        .where('users_id', id)
        .del();
}

function removeUserPlant(id) {
    return db('plant')
        .where('plant_id')
        .del();
}