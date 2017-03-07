import Relay from 'react-relay';

export default {
  viewer: () => Relay.QL`query { viewer }`,
  me: () => Relay.QL`query { me }`,
  node: () => Relay.QL`query { node(id: $id) }`
}
