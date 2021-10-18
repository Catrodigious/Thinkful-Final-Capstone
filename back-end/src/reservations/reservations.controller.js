const service = require("./reservations.service");
const tableService = require("../tables/tables.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const { validateParams, validateQuery, validateId, validateStatus } = require("./reservations.middleware");

async function list(req, res) {
  const { date=null, mobile_number=null } = req.query;

  if (date){
    const allReservations = await service.list({reservation_date: date});
    const data = allReservations.filter((reservation) => reservation.status !== "finished" && reservation.status !== "cancelled");

    res.json({ data });
  }else if (mobile_number){
    const data = await service.search(mobile_number);

    res.json({ data });
  }
}

async function create(req, res){
  const { data } = req.body;
  const newReservation = await service.create(data);

  res.status(201).json({
    data: newReservation
  })
}

function getById(req, res) {
  const { reservation } = res.locals;

  res.json({ data: reservation });
}

async function updateStatus(req, res){
  const { reservation_id } = res.locals.reservation;
  const { status } = res.locals;
  let data;

  if (status === "cancelled" && res.locals.reservation.status === "seated"){
    const tableData = await tableService.getByReservationId(reservation_id);
    const { table_id } = tableData;

    data = tableService.updateFinishedTable(reservation_id, table_id, "free", status);
    
  }else{
    data = await service.updateStatus(reservation_id, status);
  }

  res.json({ data });
}

async function editReservation(req, res){
  const params = req.body.data;
  const { reservation_id } = params;
  const toModify = {};

  for (const property in params){
    if (property !== "created_at" && property !== "updated_at" && property !== "status" && property !== "reservation_id"){
      toModify[property] = params[property];
    }
  }


  const data = await service.editReservation(reservation_id, toModify);

  res.json({data});
}

module.exports = {
  list: [validateQuery, asyncErrorBoundary(list)],
  create: [validateParams, asyncErrorBoundary(create)],
  getById: [asyncErrorBoundary(validateId), getById],
  updateStatus: [asyncErrorBoundary(validateId), validateStatus, asyncErrorBoundary(updateStatus)],
  editReservation: [validateParams, asyncErrorBoundary(validateId), asyncErrorBoundary(editReservation)]
};
