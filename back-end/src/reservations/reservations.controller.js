const service = require("./reservations.service");

async function list(req, res) {
  const { query=null } = req;
  let data;
  if (!query){
    data = await service.list();

    res.json({
      data: data
    });
  }else{
    let keys = Object.keys(query);
    if (keys.length > 1){
      res.status(501).json({
        data: "Cannot support multiple queries at the moment"
      })
    }

    if (keys[0] == "date"){
      let params = {
        reservationDate: query.date
      }

      const reservationData = await service.get(params);
      res.json({data: reservationData})
    }
  }


}

async function get(req, res){
  const { data } = req.params;
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
