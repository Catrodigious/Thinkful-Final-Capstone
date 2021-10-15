import React, { useState } from "react";
import { resetTable } from "../utils/api";
import { useHistory } from "react-router-dom";

export default function TablesList({tables, loadDashboard, tablesError}){
    const history = useHistory();

    async function handleFinishTable(evt){
        evt.preventDefault();

        if (window.confirm("Is this table ready to seat new guests? This action cannot be undone.")){
            // reset table logic here
            const table_id =  evt.target.value;
            resetTable({table_id})
            .then(loadDashboard)
            .catch(tablesError)
        }
    }

    function getListItem(table, index){
        return (
            <li className="list-group-item d-flex justify-content-between align-items-start" key={index}>
                    <div className="ms-2 me-auto">
                    <div className="fw-bold">{table.table_name} - {table.capacity}</div>
                        Can hold {table.capacity} people (table id: {table.table_id})
                    </div>
                    {table.availability === "free" ?
                        <h1 data-table-id-status={`${table.table_id}`}>{table.availability}</h1>
                        :
                        <>
                        <button type="button" data-table-id-finish={table.table_id} value={table.table_id} className="btn btn-success" onClick={handleFinishTable}>finish</button>
                        <span className="badge bg-danger rounded-pill">{table.availability}</span>
                        <h1 data-table-id-status={table.table_id}>{table.availability}</h1>
                        </>
                    }
                    
            </li>
        )
    }

    return (
        <div>
            <h4>Tables List</h4>
            <ul className="list-group">
                {tables.map((table, index) => getListItem(table, index))}
            </ul>
        </div>    
    )
}