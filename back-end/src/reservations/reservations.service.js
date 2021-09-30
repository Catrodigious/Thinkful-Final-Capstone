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

function list(){
    return knex(tableName)
    .select("*")
}

module.exports = {
    create,
    list
}
