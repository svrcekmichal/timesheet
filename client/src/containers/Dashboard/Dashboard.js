import React from 'react';
import Relay from 'react-relay';
import { Link } from './../../components/Link';
import Text from './../../components/Text';
import Box from './../../components/Box';

const INIT_FETCH = 5;
const FETCH_MORE_COUNT = 5;

export const Dashboard = ({
  viewer,
  relay
}) => {
  return (
    <Box padding={'1em'}>
      <Text fontSize={2}>Users</Text>
      <Box marginTop={2}>
        {viewer.users.edges.map(edge => {
          const { id, name, email } = edge.node;
          return (
            <Box key={id} marginBottom={1}>
              <Link to={`/timesheet/${id}`} display="block" >
                <Text fontSize={1.2} lineHeight={1.5}>{name}</Text>
                <Text fontSize={0.8}>({email})</Text>
              </Link>
            </Box>
          )
        })}
      </Box>
      {viewer.users.pageInfo.hasNextPage && (
        <button onClick={() => relay.setVariables({count: relay.variables.count + FETCH_MORE_COUNT})}>Load more</button>
      )}
    </Box>
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
              name
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