import React, { useEffect, useState } from "react";
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
function Dashboard({ date, reservations, reservationsError, tables, tablesError, loadDashboard }) {

  
  useEffect(loadDashboard, [date]);


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
          <ReservationsTable reservations={reservations} date={date} />
        </div>
        <div className="col-4">
          <TablesList tables={tables} />
        </div>
        
      </div>
    </main>
  );
}

export default Dashboard;
