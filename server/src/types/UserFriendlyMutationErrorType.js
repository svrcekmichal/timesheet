import {GraphQLNonNull, GraphQLObjectType, GraphQLString} from "graphql";

export const GLOBAL_KEY = 'GLOBAL';

export const UserFriendlyMutationErrorType = new GraphQLObjectType({
  name: 'MutationError',
  fields: () => ({
    key: {
      description: `Key which failed mutation, for example in forms, returns "${GLOBAL_KEY}" if global issue`,
      type: new GraphQLNonNull(GraphQLString)
    },
    value: {
      type: new GraphQLNonNull(GraphQLString)
    }
  })
});