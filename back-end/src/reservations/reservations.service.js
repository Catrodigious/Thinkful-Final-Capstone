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

function getAll(){
    return knex(tableName)
}

module.exports = {
    create,
    list,
    getAll
}
