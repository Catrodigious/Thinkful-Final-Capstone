const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const { validateParams, validateQuery } = require("./reservations.middleware");

async function list(req, res) {
  const { date=null } = req.query;
  const data = await service.list({reservation_date: date});

  res.json({data})
}

async function create(req, res){
  const { data } = req.body;
  const newReservation = await service.create(data);

  res.status(201).json({
    data: newReservation
  })
}

async function getById(req, res) {
  const {reservation_id = null} = req.params;

  if (!reservation_id){
    res.status(400).json({message: "Please provide the ID"})
  }

  const data = await service.getById(reservation_id) || {};

  res.json({ data });
}

module.exports = {
  list: [validateQuery, asyncErrorBoundary(list)],
  create: [validateParams, asyncErrorBoundary(create)],
  getById: [asyncErrorBoundary(getById)]
};
