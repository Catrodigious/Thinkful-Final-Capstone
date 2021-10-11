import React, { useState } from "react";
import ErrorAlert from "../layout/ErrorAlert";
import { useHistory } from "react-router-dom";

export default function Tables(){
    const [reservationsError, setReservationsError] = useState(null);
    const [table_name, set_table_name] = useState("");
    const [capacity, set_capacity] = useState(1);

    const history = useHistory();
    
    const setValues = (evt) => {
        switch(evt.target.id){
            case "table_name":
                set_table_name(evt.target.value);
                break;
            case "capacity":
                set_capacity(evt.target.value);
            default:
                break;
        }
    };

    return (
        <div className="row">
            <div className="card">
                <div className="float-end">
                    <h1>Tables Page!</h1>
                </div>
                <div className="row">
                    <ErrorAlert error={reservationsError} />
                </div>
                <hr className="mb-3 mt-0" />
                <form>
                    <div className="row">
                        <div className="mb-3">
                            <label htmlFor="table_name">Table Name</label>
                            <input name="table_name" id="table_name" placeholder="Table Name" className="form-control" type="text" defaultValue={table_name} required onChange={setValues} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="mb-3">
                            <label htmlFor="capacity">Capacity</label>
                            <input name="capacity" id="capacity" placeholder={capacity} className="form-control" type="number" defaultValue={table_name} required onChange={setValues} />
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