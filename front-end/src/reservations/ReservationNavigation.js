import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getFormalDate } from "../utils/readable-date-time";

export default function ReservationNavigation({date}){
    useEffect(getPreviousAndNextDates, [date]);

    const [previousDate, setPreviousDate] = useState(new Date());
    const [nextDate, setNextDate] = useState(new Date());
    const [todaysDate, setTodaysDate] = useState(new Date());
    const dateLabel = getFormalDate(date);

    function getPreviousAndNextDates(){
        const rootDate = new Date(date);
        const previous = new Date();
        const next = new Date();
    
        previous.setDate(rootDate.getDate())  
        next.setDate(rootDate.getDate() + 2);
        next.toISOString();
    
        setPreviousDate(previous.toISOString().split("T")[0]);
        setNextDate(next.toISOString().split("T")[0]);
        setTodaysDate(new Date().toISOString().split("T")[0]);
    }

    return (

        <div className="d-flex flex-row row">
            <div className="col-8 d-flex justify-content-start">
                <h4>Reservations for {dateLabel}</h4>
            </div>
            <div className="col-4 d-flex align-items-end text-right justify-content-end">
                <div className="float-right">
                <Link to={`/dashboard?date=${previousDate}`}>
                <button type="button" className="btn btn-secondary">
                &lt; previous
                </button>
                </Link>
                <Link to={`/dashboard?date=${todaysDate}`}>
                <button type="button" className="btn btn-primary">today</button>
                </Link>
                <Link to={`/dashboard?date=${nextDate}`}>
                <button type="button" className="btn btn-secondary">next &gt;</button>
                </Link>
                </div>
            </div>
        </div>

    )
}