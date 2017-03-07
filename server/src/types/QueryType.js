// @flow

import {GraphQLNonNull, GraphQLObjectType} from "graphql";
import {connectionArgs, connectionFromPromisedArray} from "graphql-relay";
import {nodeField} from "./../relay";
import {UserConnection, UserType} from "./UserType";
import {getUser, getUsers} from "./../models/userModel";

export const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    node: nodeField,
    me: {
      type: UserType,
      resolve: (root, args, {loggedUser}) => loggedUser && getUser(loggedUser)
    },
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