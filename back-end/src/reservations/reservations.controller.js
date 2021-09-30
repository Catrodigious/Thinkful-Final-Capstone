const service = require("./reservations.service");

async function list(req, res) {
  const data = await service.list();
  res.json({
    data: data
  });
}

async function create(req, res){
  const { data } = req.body;
  const newReservation = await service.create(data);
  const reservations = await service.list();
  
  res.json({
    data: newReservation
  })
}

module.exports = {
  list,
  create
};
