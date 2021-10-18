import React from "react";
import { Link, useHistory } from "react-router-dom";
import { updateReservationStatus } from "../utils/api";

export function SeatButton({reservation_id}){
    return (
        <Link to={`/reservations/${reservation_id}/seat`} href={`/reservations/${reservation_id}/seat`}>
        <button type="button" className="btn btn-primary">Seat</button>
    </Link>
    )
}

export function EditButton({reservation_id}){
    return (
        <Link to={`/reservations/${reservation_id}/edit`} href={`/reservations/${reservation_id}/edit`}>
            <button type="button" className="btn btn-success">Edit</button>
        </Link>
    )
}

export function CancelButton({reservation_id, loadDashboard}){
    const history = useHistory();

    const onCancel = (evt) => {
        evt.preventDefault();

        if (window.confirm("Do you want to cancel this reservation? This cannot be undone.")){
            updateReservationStatus({status: "cancelled", reservation_id})
                .then(loadDashboard)
                .catch((err)=>{
                    console.log("error w/cancelling reservation: ", err);
                })
        }
    }

    return (
        <button type="button" className="btn btn-danger" data-reservation-id-cancel={reservation_id} onClick={onCancel}>Cancel</button>
    )
}
