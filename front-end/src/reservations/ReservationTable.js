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


    const reservationRows = (reservation) => {
        const { reservation_id = null } = reservation;

        const allRows = criteriaKeys.reduce((rows, key)=>{
            rows.push(<td>{reservation[key]}</td>);
            return rows;
        }, []);

        return (
            <tr>
                {allRows}
                <td>
                    <a to={`/reservations/${reservation_id}/seat`}  href={`/reservations/${reservation_id}/seat`}>
                        <button type="button" className="btn btn-primary">Seat</button>
                    </a>
                </td>
            </tr>
        )
    }

    const noReservations = () => {
        return (
            <h1>No reservations booked for this day...</h1>
        )
    }

    const reservationsTable = () => {
        return (
        <table className="table">
        <thead>
        <tr>
            {criteriaDisplay.map((info)=>{
            return <th scope="col">{info}</th>
            })}
        </tr>
        </thead>
        <tbody>
        {reservations.map((reservation) => {
            return reservationRows(reservation);
        })}
        </tbody>
    </table>
        )
    }

    return (
        <div className="row">
            <div className="col-12">
            <div className="card">
                <div className="card-body">
                    {reservations ? reservationsTable() : noReservations()}
                </div>
            </div>
            </div>
        </div>
    )
}