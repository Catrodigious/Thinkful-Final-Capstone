import React from "react";

export default function ReservationsTable({reservations}){
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

    return (
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
    )
}