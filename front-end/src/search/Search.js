import React, { useState } from "react";
import SearchForm from "./SearchForm";
import ReservationsTable from "../reservations/ReservationTable";

export default function Search(){
    const [ reservations, setReservations ] = useState([]);
    const [ noReservations, setNoReservations ] = useState(null);

    return (
        <div>
            <SearchForm setReservations={setReservations} setNoReservations={setNoReservations} />
            <ReservationsTable reservations={reservations} isSearchTable={true} />
        </div>
    )
}
