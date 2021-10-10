import React from "react";

import { Redirect, Route, Switch } from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";
import NotFound from "./NotFound";
import { today } from "../utils/date-time";
import Reservations from "../reservations/Reservations";
import useQuery from "../utils/useQuery";

function Routes() {
  const query = useQuery();
  const date = query.get("date");

  return (
    <Switch>
      <Route exact={true} path="/reservations/new">
        <Reservations />
      </Route>
      <Route exact={true} path="/reservations">
          {/* <!-- stuff --> */}
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
