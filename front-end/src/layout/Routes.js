import React from "react";

import { Redirect, Route, Switch } from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";
import NotFound from "./NotFound";
import { today } from "../utils/date-time";
import ReservationForm from "../reservations/ReservationForm";
import useQuery from "../utils/useQuery";
import Tables from "../tables/Tables";

function Routes() {
  const query = useQuery();
  const date = query.get("date");

  return (
    <Switch>
      <Route path="/tables/new">
        <Tables />
      </Route>
      <Route exact={true} path="/reservations/new">
        <ReservationForm />
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
