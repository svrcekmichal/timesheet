import {
  GraphQLObjectType,
} from 'graphql';

import {
  connectionArgs,
  connectionFromPromisedArray,
} from 'graphql-relay';

import {
  nodeField
} from './../relay';

import {
  UserConnection
} from './UserType';

import {
  getUsers
} from './../mockData';

export const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    viewer: {
      type: new GraphQLObjectType({
        name: 'Viewer',
        fields: () => ({
          users: {
            type: UserConnection,
            args: connectionArgs,
            resolve: (root, args) => {
              return connectionFromPromisedArray(
                getUsers(),
                args
              );
            }
          }
        })
      }),
      resolve: () => 1
    },
    node: nodeField
  })
});