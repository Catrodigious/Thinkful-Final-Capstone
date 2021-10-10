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

    if (typeof data.people !== "number" || 
        isNaN(data.people) || 
        !data.people ||
        data.people === 0){
        return next({
            status: 400,
            message: "The quantity of people must comprise of at least 1 person"
        })
    }

    const dateTimeStr = data.reservation_date + " " + data.reservation_time;
    const prospectiveDate = new Date(data.reservation_date);
    const today = new Date();
    const dateObj = Date.parse(new Date(dateTimeStr));

    if (!dateObj){
        return next({
            status: 400,
            message: "the date you chose was invalid; please choose a valid date"
        })
    }
    if (prospectiveDate < today){
        return next({
            status: 400,
            message: "Please schedule your reservation for a date/time in the future"
        })
    }
    if (prospectiveDate.getDay() === 1){
        return next({
            status: 400,
            message: "The restaurant is closed on Tuesdays; please choose a different date"
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