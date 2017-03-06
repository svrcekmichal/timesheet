// @flow

import {
  GraphQLObjectType,
  GraphQLNonNull,
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

import { getUsers } from './../models/userModel';

export const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    node: nodeField,
    viewer: {
      type: new GraphQLObjectType({
        name: 'Viewer',
        fields: () => ({
          users: {
            type: new GraphQLNonNull(UserConnection),
            args: connectionArgs,
            resolve: (root, args) => {
              return connectionFromPromisedArray(
                getUsers(),
                args
              );
            }
          },
        })
      }),
      resolve: () => 1
    }
  })
});