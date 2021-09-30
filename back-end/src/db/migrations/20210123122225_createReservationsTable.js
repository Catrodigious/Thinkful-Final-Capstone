exports.up = function (knex) {
  return knex.schema.createTable("reservations", (table) => {
    let params = ["firstName", "lastName", "reservationDate", "reservationTime", "phoneNumber"];
    table.increments("reservation_id").primary();
    table.integer("guestQty").notNullable();
    params.map((param)=>table.string(param).notNullable());
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("reservations");
};
