import React from "react";
import {IndexRoute, Route} from "react-router";

import App from "./containers/App/App";
import DashboardPage from "./containers/DashboardPage/DashboardPage";
import TimesheetPage from "./containers/TimesheetPage/TimesheetPage";

import queries from "./queries";

const ViewerQuery = {
  viewer: queries.viewer
}

const MeQuery = {
  me: queries.me
}

const NodeQuery = {
  node: queries.node
}

export default (
  <Route queries={MeQuery} component={App} path="/">
    <IndexRoute queries={ViewerQuery} component={DashboardPage}/>
    <Route path="timesheet/:id" queries={NodeQuery} component={TimesheetPage}/>
  </Route>
)