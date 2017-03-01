import React from 'react';
import { Route, IndexRoute } from 'react-router';

import Dashboard from './containers/DashboardPage/DashboardPage'
import Timesheet from './containers/TimesheetPage/TimesheetPage'

import { ViewerQueries, NodeQueries } from './queries';

export default (
  <Route path="/">
    <IndexRoute queries={ViewerQueries} component={Dashboard} />
    <Route path="timesheet/:id" queries={NodeQueries} component={Timesheet} />
  </Route>
)