import React, { useEffect, useState } from "react";
import { listReservations, listTables } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

import ReservationsTable from "../reservations/ReservationTable";
import ReservationsNavigation from "../reservations/ReservationNavigation";

import TablesList from "../tables/TablesList";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const [reservations, setReservations] = useState([]);
  const [tables, setTables] = useState([]);

  const [reservationsError, setReservationsError] = useState(null);
  const [tablesError, setTablesError] = useState(null);
  
  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then((data)=>{
        setReservations(data);
      })
      .catch(setReservationsError);

    listTables({}, abortController.signal)
    .then((data)=>{
      setTables(data);
    })
    .catch(setTablesError);

    return () => abortController.abort();
  }


  return (
    <main>

      {reservationsError && <ErrorAlert error={reservationsError} />}
      {tablesError && <ErrorAlert error={tablesError} />}


      <div className="row">
        <div className="col-12">
          <h1>Dashboard</h1>
        </div>
      <div className="col-8">
          <ReservationsNavigation date={date} />
          <ReservationsTable reservations={reservations} />
        </div>
        <div className="col-4">
          <TablesList tables={tables} />
        </div>
        
      </div>
    </main>
  );
}

export default Dashboard;
