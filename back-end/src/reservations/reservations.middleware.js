function validateParams(req, res, next){
    const { data = null } = req.body;

    if (!data) next({status: 400, message: "Missing all parameters"});
    
    const requiredParams = [
        "first_name",
        "last_name",
        "reservation_date",
        "reservation_time",
        "mobile_number"
    ]

    const givenParams = Object.keys(data);
    // iterate through required params and cross-check against givenParams
    // if givenParams is missing any of the requiredParams, return 400
    for (let n=0; n < requiredParams.length; n++){
        const param = requiredParams[n];

        if (!givenParams.includes(param) || !data[param]){
            return next({
                status: 400,
                message: `Request is missing ${requiredParams[n]}`
            })
        }
    }

    if (typeof data.people != "number" ||
        isNaN(data.people) || 
        !data.people ||
        data.people === 0){
        return next({
            status: 400,
            message: "The quantity of people must comprise of at least 1 person"
        })
    }

    const dateTest = new Date(data.reservation_date) || null;

    if (!dateTest || dateTest == "Invalid Date") return next({
        status: 400,
        message: "Please return a valid reservation_date"
    })

    const reservationsStart = new Date(data.reservation_date + " " + "10:30");
    const reservationsEnd = new Date(data.reservation_date + " " + "21:30");
    const dateTimeStr = data.reservation_date + " " + data.reservation_time;
    const prospectiveDate = new Date(data.reservation_date);

    const today = new Date();
    const dateTimeObj = new Date(dateTimeStr);

    if (!dateTimeObj || dateTimeObj == "Invalid Date"){
        return next({
            status: 400,
            message: "the date or time you chose was invalid; please enter a valid reservation_time and reservation_date"
        })
    }
    if (prospectiveDate.getDay() === 1){
        return next({
            status: 400,
            message: "The restaurant is closed on Tuesdays; please choose a different date"
        })
    }
    if (dateTimeObj < reservationsStart || dateTimeObj > reservationsEnd){
        return next({
            status:400,
            message: "The restaurant opens at 10:30am and closes at 10:30pm. Please select a time between 10:30am and 9:30pm"
        })
    }

    if (prospectiveDate.getUTCDay() < today.getUTCDay() && prospectiveDate.getUTCFullYear() <= today.getUTCFullYear()){
        return next({
            status: 400,
            message: "Please schedule your reservation for a date/time in the future"
        })
    }

    next();
}

function validateQuery(req, res, next){
    const { date=null } = req.query;

    if (!date) return next({
        status: 400,
        message: "Please provide a date query"
    })

    next();
}

module.exports = {
    validateParams,
    validateQuery
}