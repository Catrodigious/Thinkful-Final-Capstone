const knex = require("../db/connection");
const tableName = "reservations";

function create(params){
    return knex(tableName)
    .insert(params)
    .returning('*')
    .then((savedData)=>{
        console.log('savedData: ', savedData);
        return savedData[0];
    });
}

function list(query){
    console.log("query from list: ", query);
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
