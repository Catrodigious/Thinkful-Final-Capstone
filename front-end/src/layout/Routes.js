import React from "react";

import { Redirect, Route, Switch } from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";
import NotFound from "./NotFound";
import { today } from "../utils/date-time";
import useQuery from "../utils/useQuery";
import ReservationForm from "../reservations/ReservationForm";
import TablesForm from "../tables/TablesForm";
import ReservationSeat from "../reservations/ReservationSeat";

function Routes() {
  const query = useQuery();
  const date = query.get("date");

  return (
    <Switch>
      <Route path="/tables/new">
        <TablesForm />
      </Route>
      <Route path="/reservations/new">
        <ReservationForm />
      </Route>
      <Route path="/reservations/:reservation_id/seat">
        <ReservationSeat />
      </Route>
      <Route path="/dashboard">
        <Dashboard date={ date ? date : today() } />
      </Route>
      <Route exact={true} path="/">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default Routes;
