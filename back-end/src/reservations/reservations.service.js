const knex = require("../db/connection");
const tableName = "reservations";

function create(params){
    return knex(tableName)
    .insert(params)
    .returning('*')
    .then((savedData)=>{
        return savedData[0];
    });
}

function list(query){
    return knex(tableName)
    .where(query)
    .select('*')
    .orderBy('reservation_time', 'asc');
}

function getById(reservation_id){
    return knex(tableName)
    .where({reservation_id})
    .then((savedData) => savedData[0])
    .catch(()=>{})
}

module.exports = {
    create,
    list,
    getById
}
