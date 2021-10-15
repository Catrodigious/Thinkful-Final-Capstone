const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const { validateParams, validateQuery, validateId } = require("./reservations.middleware");

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

function getById(req, res) {
  const { data } = res.locals;
  res.json({ data });
}

module.exports = {
  list: [validateQuery, asyncErrorBoundary(list)],
  create: [validateParams, asyncErrorBoundary(create)],
  getById: [asyncErrorBoundary(validateId), getById]
};
