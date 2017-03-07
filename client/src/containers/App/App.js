import React from 'react';
import Relay from 'react-relay';
import { Link } from 'react-router';
import { Navbar, Nav, NavDropdown, NavItem, MenuItem } from 'react-bootstrap';

const style = {
  marginTop: 50
}

export function App({
  me,
  children
}) {
  return (
    <div>
      <Navbar fixedTop>
        <Navbar.Brand >
          <Navbar.Header>
            <Link to="/">Timesheet APP</Link>
          </Navbar.Header>
        </Navbar.Brand>
        <Nav pullRight>
          {me ? (
            <NavDropdown title={`Logged in as ${me.username}(${me.email})`} id="nav-dropdown">
              <MenuItem>My Timesheet</MenuItem>
            </NavDropdown>
          ) : (
            <NavItem>
              You're not logged in
            </NavItem>
          )}
        </Nav>
      </Navbar>
      <div style={style}>
        {children}
      </div>
    </div>
  )
}

export default Relay.createContainer(App,{
  fragments: {
    me: () => Relay.QL`
      fragment on User {
        username
        email
      }
    `
  }
})