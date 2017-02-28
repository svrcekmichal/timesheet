import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString
} from 'graphql';

import {
  globalIdField
} from 'graphql-relay';

import {
  UserType
} from './UserType'

export const TimeSheetNoteType = new GraphQLObjectType({
  name: 'TimeSheetNote',
  fields: () => ({
    id: globalIdField(),
    author: {
      type: new GraphQLNonNull(UserType)
    },
    text: {
      type: new GraphQLNonNull(GraphQLString)
    }
  })
});