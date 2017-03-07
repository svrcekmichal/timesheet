// @flow

import React from "react";
import {Button, Jumbotron} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";

export default () => (
  <Jumbotron>
    <h1>User not found</h1>
    <p>User with specified id not found</p>
    <LinkContainer to="/">
      <Button bsStyle="primary">Go to dashboard</Button>
    </LinkContainer>
  </Jumbotron>
)