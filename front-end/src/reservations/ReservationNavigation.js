import React, { useState } from "react";
import { Link } from "react-router-dom";
import { previous, next, today, formatAsDate } from "../utils/date-time";


export default function ReservationNavigation({date}){
    const dateLabel = formatAsDate(date);

    return (
        <div className="d-flex flex-row row">
            <div className="col-8 d-flex justify-content-start">
                <h4>Reservations for {dateLabel}</h4>
            </div>
            <div className="col-4 d-flex align-items-end text-right justify-content-end">
                <div className="float-right">
                <Link to={`/dashboard?date=${previous(date)}`}>
                <button type="button" className="btn btn-secondary">
                &lt; previous
                </button>
                </Link>
                <Link to={`/dashboard?date=${today()}`}>
                <button type="button" className="btn btn-primary">today</button>
                </Link>
                <Link to={`/dashboard?date=${next(date)}`}>
                <button type="button" className="btn btn-secondary">next &gt;</button>
                </Link>
                </div>
            </div>
        </div>

    )
}