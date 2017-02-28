import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory, applyRouterMiddleware } from 'react-router';
import Relay from 'react-relay';
import { RelayNetworkLayer, urlMiddleware } from 'react-relay-network-layer';
import useRelay from 'react-router-relay';
import routes from './routes';
import './index.css';

Relay.injectNetworkLayer(new RelayNetworkLayer([
  urlMiddleware({
    url: process.env.REACT_APP_GRAPHQL_ENDPOINT
  })
], { disableBatchQuery: true }));

ReactDOM.render(
  <Router
    history={browserHistory}
    render={applyRouterMiddleware(useRelay)}
    environment={Relay.Store}
    routes={routes}
  />
  ,document.getElementById('root')
);