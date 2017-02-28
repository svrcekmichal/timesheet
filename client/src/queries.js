import Relay from 'react-relay';

export const ViewerQueries = {
  viewer: () => Relay.QL`query { viewer }`
};

export const NodeQueries = {
  node: () => Relay.QL`query { node(id: $id) }`
}