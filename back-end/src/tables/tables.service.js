const knex = require("../db/connection");
const tableName = "tables";

function create(params){
    return;
}

function list(){
    return knex(tableName)
    .select("*")
}

module.exports = {
    create,
    list
}