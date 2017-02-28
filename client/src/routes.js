import React from 'react';
import { Route, IndexRoute } from 'react-router';

import Dashboard from './containers/Dashboard/Dashboard'
import Timesheet from './containers/Timesheet/Timesheet'

import { ViewerQueries, NodeQueries } from './queries';

export default (
  <Route path="/">
    <IndexRoute queries={ViewerQueries} component={Dashboard} />
    <Route path="timesheet/:id" queries={NodeQueries} component={Timesheet} />
  </Route>
)