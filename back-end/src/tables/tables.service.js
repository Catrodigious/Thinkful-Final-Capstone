const knex = require("../db/connection");
const tableName = "tables";

function create(params){
    return knex(tableName)
        .insert(params)
        .returning("*")
        .then((result)=>result[0]);
}

function list(query={}){
    if (Object.entries(query).length > 0){
        return knex(tableName)
            .select("*")
            .where(query)
    }else{ 
        return knex(tableName)
            .select("*")
    }
}

function getById(table_id){
    return knex(tableName)
        .where({table_id})
        .first()
}

function update(reservation_id, table_id, availability){
    return knex(tableName)
        .where({table_id})
        .update({reservation_id, availability})
        .returning("*")
        .then((result) => result[0]);
}

module.exports = {
    create,
    list,
    getById,
    update
}