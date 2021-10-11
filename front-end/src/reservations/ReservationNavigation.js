import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ReservationNavigation({date}){
    useEffect(getPreviousAndNextDates, [date]);

    const [previousDate, setPreviousDate] = useState(new Date());
    const [nextDate, setNextDate] = useState(new Date());
    const [todaysDate, setTodaysDate] = useState(new Date());

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
        <div classname="row">
            <div className="col-4">
                <h4 >Reservations for {date}</h4>
            </div>
            <div className="col-8">
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
    )
}