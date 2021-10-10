const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const { validateParams, validateQuery } = require("./reservations.middleware");

async function list(req, res, next) {
    const { date=null } = req.query;
    const data = await service.list({reservation_date: date});

    res.json({data})
}

async function create(req, res, next){
  const { data } = req.body;
  const newReservation = await service.create(data);

  res.status(201).json({
    data: newReservation
  })
}

module.exports = {
  list: [validateQuery, asyncErrorBoundary(list)],
  create: [validateParams, asyncErrorBoundary(create)]
};
