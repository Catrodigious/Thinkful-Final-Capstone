import React from "react";
import { Link } from "react-router-dom";

export default function ReservationsTable({reservations}){
    const criteria = {
    first_name: "First Name",
    last_name: "Last Name",
    people: "Guests",
    reservation_time: "Time",
    mobile_number: "Mobile Number",
    created_at: "Created At",
    updated_at: "Updated At",
    status: "Status"
    }
    let criteriaKeys = Object.keys(criteria);
    let criteriaDisplay = Object.values(criteria);

    criteriaDisplay.push("Table Status");

    const onFinishReservation = (evt) => {
        evt.preventDefault();
    }

    const SeatButton = ({reservation_id}) => {
        return (
            <Link to={`/reservations/${reservation_id}/seat`} href={`/reservations/${reservation_id}/seat`}>
            <button type="button" className="btn btn-primary">Seat</button>
        </Link>
        )
    }


    // only displays the seat button if the reservation status is "booked"
    const ReservationRows = ({reservation}) => {
        const allRows = criteriaKeys.map((key, index) => {
            if (key === "status"){
                return (<td key={index} data-reservation-id-status={reservation.reservation_id}>{reservation.status}</td>)
            }
            return (<td key={index}>{reservation[key]}</td>);
        });

        return (
            <tr>
                {allRows}
                {reservation.status === "booked" ?
                <td>
                    <SeatButton reservation_id={reservation.reservation_id} />
                </td> :
                <td>                    
                    Currently dining
                </td>
                }
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
            reservation.status !== "finished" && <ReservationRows reservation={reservation} key={key}  />
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