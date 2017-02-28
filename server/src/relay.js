import {
  nodeDefinitions
} from 'graphql-relay';

export const {
  nodeInterface,
  nodeField
} = nodeDefinitions(
  (globalId) => {
    // var {type, id} = fromGlobalId(globalId);
    // return data[type][id];
  },
  (obj) => {
    // return obj.ships ? factionType : shipType;
  }
);