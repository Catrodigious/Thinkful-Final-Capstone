const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./tables.service");


async function create(req, res){
    return res.json({data: "Post request to /tables"});
}

module.exports = {
    create: [asyncErrorBoundary(create)]
}