import React, { useState } from "react";
import { newReservation } from "../utils/api";
import { useHistory } from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";

import "./Reservations.css";

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
    const history = useHistory();

    const [reservationsError, setReservationsError] = useState(null);
    const [first_name, set_first_name] = useState("Cat");
    const [last_name, set_last_name] = useState("C");
    const [reservation_date, set_reservation_date] = useState(today);
    const [reservation_time, set_reservation_time] = useState("17:30");
    const [mobile_number, set_mobile_number] = useState("555-555-5555");
    const [people, set_people] = useState(1);

    const handleNewReservationSubmit = (evt) => {
        evt.preventDefault();

        const inputs = {first_name, last_name, reservation_date, reservation_time, mobile_number, people};
        
        if (!validFormInputs(inputs)) return;

        const keys = Object.keys(inputs);
        keys.map((k)=> console.log(`${k}: ${inputs[k]}`));

        newReservation(inputs)
        .then((feedback)=>{
            console.log("newReservation call called");
            console.log("feedback: ", feedback);

            history.push("/dashboard");
            history.go(0);
        })
        .catch(setReservationsError);
    }

    const setValues = (evt) => {
        switch(evt.target.id){
            case "first_name":
                set_first_name(evt.target.value);
                break;
            case "last_name":
                set_last_name(evt.target.value);
                break;
            case "reservation_date":
                set_reservation_date(evt.target.value);
                break;
            case "reservation_time":
                set_reservation_time(evt.target.value);
                break;
            case "mobile_number":
                set_mobile_number(evt.target.value);
                break;
            default:
                break;
        }
    }

    const validFormInputs = (inputs) => {
        const keys = Object.keys(inputs);
        for (let n=0; n < keys.length; n++){
            const key = keys[n];
            const value = inputs[key];
            switch(key){
                case "first_name":
                    if (!value || value.length < 2 || !isNaN(value)){
                        setReservationsError({message: "Please provide a first name with at least two alphabetical characters"})
                    }
                    break;
                case "last_name":
                    if (!value || value.length < 2 || !isNaN(value)){
                        setReservationsError({message: "Please provide a last name with at least one alphabetical character"})
                    }
                    break;
                case "reservation_date":
                    const dateInQuestion = new Date(Date.parse(value));
                    const dateToday = new Date();

                    console.log("dateInQuestion: ", dateInQuestion);
                    console.log("dateToday: ", dateToday);

                    if (dateInQuestion < dateToday){
                        setReservationsError({message: "Please select a valid date"});
                    }
                    break;
                case "reservation_time":
                    console.log("reservation_time: ", value);
                    break;
                // case "mobile_number":
                //     set_mobile_number(evt.target.value);
                //     break;
                default:
                    break;
            }
        }
    }

    const peopleEvt = (qty) => {
        set_people(qty);
    }

    return (
        <div className="row">
            <div className="card">
                <div className="float-end">
                <h1>New Reservation</h1>
                </div>
                <div className="row">
                    <ErrorAlert error={reservationsError} />
                </div>
                <hr className="mb-3 mt-0" />
                <form onSubmit={ handleNewReservationSubmit }>
                    <div className="row">
                        <div className="col-6">
                            <div className="mb-3">
                                <label htmlFor="first_name">First Name</label>
                                <input id="first_name" placeholder="First Name" className="form-control" type="text" defaultValue={first_name} required onChange={setValues} />
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="mb-3">
                                <label htmlFor="last_name">Last Name</label>
                                <input id="last_name" placeholder="Last Name" className="form-control" type="text" defaultValue={last_name} required onChange={setValues} />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <div className="mb-3">
                                <label htmlFor="reservation_date">Reservation Date</label>
                                <input id="reservation_date" className="form-control" type="date" required placeholder={today} defaultValue={today} onChange={setValues} />
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="mb-3">
                                <label htmlFor="reservation_time">Reservation Time</label>
                                <input id="reservation_time" className="form-control" type="time" required defaultValue={reservation_time} onChange={setValues} />
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
                                    <button className="btn dropdown-toggle dropdown-label" type="button" data-bs-toggle="dropdown" id="people" aria-expanded="false" style={{border: "1px solid rgba(0,0,0,0.2)"}}>
                                        {people} {(people === 1) ? " guest" : " guests"}
                                    </button>
                                    <div className="dropdown-menu col-11">
                                        {guests.map((guest, index)=><a className="dropdown-item" key={`guest_${index}`} value={index+1} href={index+1} onClick={()=>peopleEvt(index+1)}>{guest}</a>)}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="mb-3">
                                <label htmlFor="phone">Phone</label>
                                <input placeholder="555-555-5555" className="form-control" type="tel" defaultValue={mobile_number} />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="mb-2">
                        <button type="submit" className="btn btn-primary float-end">Submit</button>
                        <button type="button" className="btn btn-secondary float-end" onClick={()=>history.goBack()}>Cancel</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}