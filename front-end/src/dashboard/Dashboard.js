import React, { useEffect, useState } from "react";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

import ReservationsTable from "../reservations/ReservationTable";
import ReservationsNavigation from "../reservations/ReservationNavigation";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  
  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then((data)=>{
        setReservations(data);
      })
      .catch(setReservationsError);

    return () => abortController.abort();
  }

  return (
    <main>
      <h1>Dashboard</h1>
      {reservationsError && <ErrorAlert error={reservationsError} />}
      <ReservationsNavigation date={date} />
      <ReservationsTable reservations={reservations} />
    </main>
  );
}

export default Dashboard;
