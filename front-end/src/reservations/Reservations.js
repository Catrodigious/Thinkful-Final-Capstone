import React, { useState } from "react";


function initializeGuests(qtyLimit){
    const guests = [];
    for (let n=1; n <= qtyLimit; n++){
        if (n === 1) guests.push(`${n} guest`)
        else guests.push(`${n} guests`)
    }
    return guests;
}

function getTodaysDate(){
    const date = new Date();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();

    const monthStr = month < 10 ? `0${month}` : String(month);
    const dayStr = day < 10 ? `0${day}` : String(day);

    return `${year}-${monthStr}-${dayStr}`;
}

export default function Reservations(){
    const guests = initializeGuests(6);
    const today = getTodaysDate();

    const [firstName, setFirstName] = useState("Cat");
    const [lastName, setLastName] = useState("C");
    const [reservationDate, setReservationDate] = useState(today);
    const [reservationTime, setReservationTime] = useState("17:30");
    const [phoneNumber, setPhoneNumber] = useState("555-555-5555");
    const [guestQty, setGuestQty] = useState(0);


    const handleNewReservationSubmit = (evt) => {
        evt.preventDefault();

        const inputs = {firstName, lastName, reservationDate, reservationTime, phoneNumber, guestQty};
        
        const keys = Object.keys(inputs);

        keys.map((k)=> console.log(`${k}: ${inputs[k]}`));
    }

    const setValues = (evt) => {
        switch(evt.target.id){
            case "firstName":
                setFirstName(evt.target.value);
                break;
            case "lastName":
                setLastName(evt.target.value);
                break;
            case "reservationDate":
                setReservationDate(evt.target.value);
                break;
            case "reservationTime":
                setReservationTime(evt.target.value);
                break;
            case "phoneNumber":
                setPhoneNumber(evt.target.value);
                break;
            case "guestQty":
                setGuestQty(evt.target.value);
                break;
        }
    }

    return (
        <div className="row">
            <div className="card">
                <div className="float-end">
                <h1>New Reservation</h1>
                </div>
                <hr className="mb-3 mt-0" />
                <form onSubmit={ handleNewReservationSubmit }>
                    <div className="row">
                        <div className="col-6">
                            <div className="mb-3">
                                <label htmlFor="firstName">First Name</label>
                                <input id="firstName" placeholder="First Name" className="form-control" type="text" defaultValue={firstName} required onChange={setValues} />
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="mb-3">
                                <label htmlFor="lastName">Last Name</label>
                                <input id="lastName" placeholder="Last Name" className="form-control" type="text" defaultValue={lastName} required onChange={setValues} />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <div className="mb-3">
                                <label htmlFor="reservationDate">Reservation Date</label>
                                <input id="reservationDate" className="form-control" type="date" required placeholder={today} defaultValue={today} onChange={setValues} />
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="mb-3">
                                <label htmlFor="reservationTime">Reservation Time</label>
                                <input id="reservationTime" className="form-control" type="time" required defaultValue={reservationTime} onChange={setValues} />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <div className="row">
                                <label>Guests</label>
                            </div>
                            <div className="row">
                                <div className="btn-group">
                                    <button className="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" id="guestQty" aria-expanded="false" style={{border: "1px solid rgba(0,0,0,0.2)"}}>
                                        1 Guest
                                    </button>
                                    <ul className="dropdown-menu col-11">
                                        {guests.map((guest, index)=><li key={`guest_${index}`} value={index+1}>{guest}</li>)}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="mb-3">
                                <label htmlFor="phone">Phone</label>
                                <input placeholder="555-555-5555" className="form-control" type="tel" defaultValue={phoneNumber} />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="mb-2">
                        <button type="submit" className="btn btn-primary float-end">Submit</button>
                        <button type="button" className="btn btn-secondary float-end">Cancel</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}