const reservationsData = require("../migrations/fixtures/reservations");

exports.seed = function (knex) {
  return knex.raw("TRUNCATE TABLE reservations RESTART IDENTITY CASCADE")
    .then(()=>{
      return knex("reservations").insert(reservationsData);
    })
};
