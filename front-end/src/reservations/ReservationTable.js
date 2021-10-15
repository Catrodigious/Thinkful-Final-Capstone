import React from "react";
import { Link } from "react-router-dom";

export default function ReservationsTable({reservations}){
    const criteria = {
    first_name: "First Name",
    last_name: "Last Name",
    reservation_time: "Time",
    mobile_number: "Mobile Number",
    created_at: "Created At",
    updated_at: "Updated At"
    }
    let criteriaKeys = Object.keys(criteria);
    let criteriaDisplay = Object.values(criteria);

    criteriaDisplay.push("Table");


    const ReservationRows = ({reservation}) => {
        const allRows = criteriaKeys.map((key, index)=>{
            return (<td key={index}>{reservation[key]}</td>);
        });

        return (
            <tr>
                {allRows}
                <td>
                    <a href={`/reservations/${reservation.reservation_id}/seat`}>
                        <button type="button" className="btn btn-primary" href={`/reservations/${reservation.reservation_id}/seat`}>Seat</button>
                    </a>
                </td>
            </tr>
        )
    }

    const NoReservations = () => {
        return (
            <h1>No reservations booked for this day...</h1>
        )
    }

    const ReservationsTable = () => {
        return (
        <table className="table">
        <thead>
        <tr>
            {criteriaDisplay.map((info, index)=>{
            return <th scope="col" key={index}>{info}</th>
            })}
        </tr>
        </thead>
        <tbody>
        {reservations.map((reservation, key) =>
            <ReservationRows reservation={reservation} key={key}  />
        )}
        </tbody>
    </table>
        )
    }

    return (
        <div className="row">
            <div className="col-12">
            <div className="card">
                <div className="card-body">
                    {reservations ? <ReservationsTable /> : <NoReservations />}
                </div>
            </div>
            </div>
        </div>
    )
}