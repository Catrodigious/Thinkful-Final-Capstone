const knex = require("../db/connection");
const tableName = "reservations";

function create(params){
    return knex(tableName)
    .insert(params)
    .returning("*")
    .then((savedData)=>{
        console.log("savedData: ", savedData);
        return savedData[0];
    });
}

function get(query){
    return knex(tableName)
        .where(query)
        .select("*");
}

function list(){
    return knex(tableName)
    .select("*")
}

module.exports = {
    create,
    list,
    get
}
