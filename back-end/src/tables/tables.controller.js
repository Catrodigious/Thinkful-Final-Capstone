const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const tableService = require("./tables.service");
const { validateInputs, validateReservation, validateTableId, validateCapacityAndAvailability, checkAvailabilityStatus } = require("./tables.middleware");

async function create(req, res){
    const { params=null } = res.locals;
    const data = await tableService.create(params);

    return res.status(201).json({data});
}

async function list(req, res){
    const { query } = req;
    let data;
    if (Object.entries(query).length > 0){
        data = await tableService.list(query);
    }else{
        data = await tableService.list();
    }
    return res.json({ data });
}

async function read(req, res){
    return res.json({data: "Get request as read to /tables"});
}

async function update(req, res){
    const { reservation_id } = res.locals.reservation;
    const { table_id } = req.params;
    const availability = "occupied";
    const data = await tableService.update(reservation_id, table_id, availability);

    return res.json({data});
}

async function updateFinishedTable(req, res){
    const { reservation_id } = res.locals.table;
    const { table_id } = req.params;
    
    const data = await tableService.updateFinishedTable(reservation_id, table_id, "free", "finished");

    return res.json({data});
}

module.exports = {
    create: [validateInputs, asyncErrorBoundary(create)],
    list: [asyncErrorBoundary(list)],
    read: [asyncErrorBoundary(validateTableId), asyncErrorBoundary(read)],
    update: [asyncErrorBoundary(validateTableId), validateReservation, validateCapacityAndAvailability, asyncErrorBoundary(update)],
    updateFinishedTable: [asyncErrorBoundary(validateTableId), checkAvailabilityStatus, asyncErrorBoundary(updateFinishedTable)]
}