import React from "react";
import Relay from "react-relay";
import {Link} from "react-router";
import {Button, Grid, Row, Table} from "react-bootstrap";

const INIT_FETCH = 5;
const FETCH_MORE_COUNT = 5;

export const Dashboard = ({
                            viewer,
                            relay
                          }) => {
  return (
    <Grid>
      <Row>
        <h3>List of users</h3>
        <Table>
          <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
          </thead>
          <tbody>
          {viewer.users.edges.map(({node: user}) => (
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>
                <Link to={`/timesheet/${user.id}`}>Timesheet</Link>
              </td>
            </tr>
          ))}
          </tbody>
        </Table>
        {viewer.users.pageInfo.hasNextPage && (
          <Button onClick={() => relay.setVariables({count: relay.variables.count + FETCH_MORE_COUNT})}>Load
            more</Button>
        )}
      </Row>
    </Grid>
  )
};

export default Relay.createContainer(Dashboard, {
  initialVariables: {
    count: INIT_FETCH
  },
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        users(first:$count) {
          edges {
            node {
              id
              username
              email
            }
          }
          pageInfo {
            hasNextPage
          }
        }
      }
    `
  }
})