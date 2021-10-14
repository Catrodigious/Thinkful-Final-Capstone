import React, { useState } from "react";


export default function TablesList({tables}){

    function getListItem(table, index){
        return (
            <li class="list-group-item d-flex justify-content-between align-items-start" key={index}>
                    <div class="ms-2 me-auto">
                    <div class="fw-bold">{table.table_name}</div>
                        Can hold {table.capacity} people
                    </div>
                    {table.availability === "free" ?
                        <span className="badge bg-primary rounded-pill" data-table-id-status={`${table.table_id}`}>{table.availability}</span>
                        :
                        <span className="badge bg-danger rounded-pill" data-table-id-status={`${table.table_id}`}>{table.availability}</span>
                    }
            </li>
        )
    }

    return (
        <div>
            <h4>Tables List</h4>
            <ul class="list-group list-group-numbered">
                {tables.map((table, index) => getListItem(table, index))}
            </ul>
        </div>    
    )
}