const tableService = require("./tables.service");
const reservationService = require("../reservations/reservations.service");

function errorCallback(status, message, next){
    return next({status: status, message: message});
}

function validateInputs(req, res, next){
    const requiredFields = ["table_name", "capacity"];
    const optionalFields = ["availability", "reservation_id"];
    const { data=null } = req.body;
    
    if (!data) return errorCallback(400, "Please provide name, capacity, and availability fields in your request", next);

    const keys = Object.keys(data);
    const params = {};

    // if any of the fields are missing, return an error
    requiredFields.forEach((field)=>{
        if (!keys.includes(field)){
            return errorCallback(400, `Please include the following field: ${field}`, next);
        } else {
            if (field === "table_name"){
                if (data[field].length < 2){
                    return errorCallback(400, "Please provide a name for the table", next);
                }
            }else if (field === "capacity"){
                if (isNaN(data[field]) ||
                 data[field] < 1){
                        return errorCallback(400, "Please provide a capacity of type number with a value greater than 0", next);
                }
            }
            params[field] = data[field];
        }
    });

    if (!keys.includes("availability")){
        params.availability = "free";
    }

    if (!keys.includes("reservation_id")){
        params.reservation_id = null;
    }

    res.locals.params = params;
    
    next();
}

async function validateTableId(req, res, next){
    const { table_id } = req.params;

    if (!table_id || isNaN(table_id)) return errorCallback(400, "Please enter a valid table_id.", next);

    const data = await tableService.getById(table_id);

    if (!data){
        return errorCallback(400, `Table Id ${table_id} is invalid. Please enter a valid table_id.`, next);
    }
    next();
}

async function validateReservationId(req, res, next){
    const { reservation_id } = req.body.data;
    const { table_id } = req.params;

    const reservation = await reservationService.getById(reservation_id);
    const table = await tableService.getById(table_id);

    if (!reservation) return errorCallback(400, "This reservation doesn't exist", next); 
    if (!table) return errorCallback(400, "This table doesn't exist", next);

    res.locals.reservation = reservation;
    res.locals.table = table;
    next();
}

function validateCapacityAndAvailability(req, res, next){
    const reservation = res.locals.reservation;
    const table = res.locals.table;

    if (table.availability != "free"){
        return errorCallback(400, "This table is not available - please choose a different table", next);
    }
    
    if (reservation.people > table.capacity){
        return errorCallback(400, "Quantity of people in reservation is larger than table capacity; please try again", next);
    }
    next();
}




module.exports = {
    validateInputs,
    validateTableId,
    validateReservationId,
    validateCapacityAndAvailability
}