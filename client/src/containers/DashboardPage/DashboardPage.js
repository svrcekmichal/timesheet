import React from 'react';
import Relay from 'react-relay';
import { Link } from './../../components/Link';
import Text from './../../components/Text';
import Block from '../../components/Block';

const INIT_FETCH = 5;
const FETCH_MORE_COUNT = 5;

export const Dashboard = ({
  viewer,
  relay
}) => {
  return (
    <Block padding={'1em'}>
      <Text fontSize={2}>Users</Text>
      <Block marginTop={2}>
        {viewer.users.edges.map(edge => {
          const { id, name, email } = edge.node;
          return (
            <Block key={id} marginBottom={1}>
              <Link to={`/timesheet/${id}`} display="block" >
                <Text fontSize={1.2} lineHeight={1.5}>{name}</Text>
                <Text fontSize={0.8}>({email})</Text>
              </Link>
            </Block>
          )
        })}
      </Block>
      {viewer.users.pageInfo.hasNextPage && (
        <button onClick={() => relay.setVariables({count: relay.variables.count + FETCH_MORE_COUNT})}>Load more</button>
      )}
    </Block>
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