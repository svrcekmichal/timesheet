import React from "react";
import ReactDOM from "react-dom";
import {applyRouterMiddleware, browserHistory, Router} from "react-router";
import Relay from "react-relay";
import {RelayNetworkLayer, urlMiddleware} from "react-relay-network-layer";
import useRelay from "react-router-relay";
import routes from "./routes";

//QUICK LOGIN HACK
const {query: queryParams} = browserHistory.getCurrentLocation();
const userId = !!queryParams.userId ? `?userId=${queryParams.userId}` : "";

Relay.injectNetworkLayer(new RelayNetworkLayer([
  urlMiddleware({
    url: process.env.REACT_APP_GRAPHQL_ENDPOINT + userId
  })
], {disableBatchQuery: true}));

ReactDOM.render(
  <Router
    history={browserHistory}
    render={applyRouterMiddleware(useRelay)}
    environment={Relay.Store}
    routes={routes}
  />
  , document.getElementById('root')
);