import React, { useState, useEffect } from "react";
import ErrorAlert from "../layout/ErrorAlert";
import { listTables, getReservationById, updateTable } from "../utils/api";
import { useParams, useHistory} from "react-router-dom";


export default function ReservationSeat({date}){
    const [tableAssignmentError, setTableAssignmentError] = useState(null);
    const [selectedTable, setSelectedTable] = useState({});
    const [tables, setTables] = useState([]);
    const { reservation_id } = useParams();
    const [reservationInfo, setReservationInfo] = useState({});
    const history = useHistory();

    function loadReservations() {
        const abortController = new AbortController();
    
        getReservationById(reservation_id, abortController.signal)
        .then(setReservationInfo)
        .catch((err)=>setReservationInfo({message: err}));

        return () => abortController.abort();
    }

    function loadTables() {
        const abortController = new AbortController();
        console.log("reservationInfo: ", reservationInfo);
        if (reservationInfo){
            console.log("reservationInfo: ", reservationInfo.people);
        
            listTables({availability: "free"}, abortController.signal)
            .then((data)=>{
                setTables(data);
                // sets table default
                setSelectedTable(data[0]);
            })
            .catch((err)=>setTableAssignmentError({message: err}));

        }
        return () => abortController.abort();
    }

    useEffect(loadReservations, []);
    useEffect(loadTables, [reservationInfo])


    const handleTableAssignmentSubmit = (evt) => {
        evt.preventDefault();

        if (reservation_id && selectedTable.availability == "free"){
            const requestBody = {table_id: selectedTable.table_id, reservation_id, availability: "occupied"};

            updateTable(requestBody)
                .then((data)=>{
                    console.log("table update successful: ", data);
                    history.push(`/dashboard?date=${reservationInfo.reservation_date}`)
                    
                })
                .catch((error)=>setTableAssignmentError({message: error}))
        }

        if (selectedTable.availability !== "free"){
            console.log(selectedTable);
            setTableAssignmentError({message: "This table is occupied during this time.. please select a different table"})
        }
    }

    const onTableSelect = (evt) => {
        const index = evt.target.value;
        setSelectedTable(tables[index]);
    }

    const tableOptions = () => {
        return tables.map((table, index)=>{
            return (
                <option key={index} value={index} onClick={onTableSelect}>{table.table_name} - {table.capacity}</option>
            )
        })
    }

    return (
        <div className="row">
            <div className="card">
                <div className="float-end">
                    <h1>Assign Table For Reservation {reservation_id} (Party of {reservationInfo.people})</h1>
                </div>
                <div className="row">
                    <ErrorAlert error={tableAssignmentError} />
                </div>
                <hr className="mb-3 mt-0" />
                <form onSubmit={ handleTableAssignmentSubmit }>
                    <div className="row">
                        <div className="col-6">
                            <div className="mb-3">
                                <label htmlFor="table_select">Table Selection</label>
                                <select name="table_id" className="form-select form-select-lg mb-3" aria-label=".form-select-lg table-select" defaultValue={0} onChange={(evt)=>setSelectedTable(evt.target.value)}>
                                    {tableOptions()}
                                </select>
                                <button type="submit" className="btn btn-primary">Submit</button>
                                <button type="button" className="btn btn-secondary" onClick={() => history.goBack()}>Cancel</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}