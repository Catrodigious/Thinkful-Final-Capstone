import React, { useEffect, useState } from "react";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { Link } from "react-router-dom";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const [reservations, setReservations] = useState([]);
  const [previousDate, setPreviousDate] = useState(new Date());
  const [nextDate, setNextDate] = useState(new Date());
  const [todaysDate, setTodaysDate] = useState(new Date());
  const [reservationsError, setReservationsError] = useState(null);
  
  const criteria = {
    reservation_id: "Id",
    first_name: "First Name",
    last_name: "Last Name",
    reservation_date: "Reservation Date",
    reservation_time: "Reservation Time",
    mobile_number: "Mobile Number",
    created_at: "Created At",
    updated_at: "Updated At"
  }
  let criteriaDisplay = Object.values(criteria);
  let criteriaKeys = Object.keys(criteria);

  useEffect(loadDashboard, [date]);
  useEffect(getPreviousAndNextDates, [date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then((data)=>{
        console.log("data from list reservations: ", data)
        setReservations(data);
      })
      .catch(setReservationsError);

    return () => abortController.abort();
  }

  function reservationRows(reservation){
    
    const allRows = criteriaKeys.reduce((rows, key)=>{
      rows.push(<td>{reservation[key]}</td>);
      return rows;
    }, []);

    return (
      <tr>
          {allRows}
      </tr>
    )
  }

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
    <main>
      <h1>Dashboard</h1>
      <div className="row">
        <ErrorAlert error={reservationsError} />
      </div>
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
      <div className="row">
      <div className="col-12">
        <div className="card">
          <div className="card-body">
            <table className="table">
              <thead>
                <tr>
                  {criteriaDisplay.map((info)=>{
                    return <th scope="col">{info}</th>
                  })}
                </tr>
              </thead>
              <tbody>
                {reservations && reservations.map((reservation)=>{
                  return reservationRows(reservation);
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      </div>
    </main>
  );
  // {reservationsError && <ErrorAlert error={reservationsError} />}
  // {JSON.stringify(reservations)}
}

export default Dashboard;
