const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./tables.service");

async function create(req, res){
    return res.json({data: "Post request to /tables"});
}

async function list(req, res){
    const data = await service.list();
    return res.json({ data });
}

async function read(req, res){
    return res.json({data: "Get request as read to /tables"});
}

module.exports = {
    create: [asyncErrorBoundary(create)],
    list: [asyncErrorBoundary(list)],
    read: [asyncErrorBoundary(read)]
}