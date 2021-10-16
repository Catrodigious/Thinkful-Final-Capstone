const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const { validateParams, validateQuery, validateId, validateStatus } = require("./reservations.middleware");

async function list(req, res) {
  const { date=null } = req.query;
  const allReservations = await service.list({reservation_date: date});

  const data = allReservations.filter((reservation)=> reservation.status !== "finished" && reservation.status !== "cancelled");

  res.json({data})

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

  const data = await service.updateStatus(reservation_id, status);

  res.json({ data });
}

module.exports = {
  list: [validateQuery, asyncErrorBoundary(list)],
  create: [validateParams, asyncErrorBoundary(create)],
  getById: [asyncErrorBoundary(validateId), getById],
  updateStatus: [asyncErrorBoundary(validateId), validateStatus, asyncErrorBoundary(updateStatus)]
};
