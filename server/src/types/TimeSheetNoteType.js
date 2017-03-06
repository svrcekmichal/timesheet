// @flow

import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString
} from 'graphql';

import {
  globalIdField,
  connectionDefinitions
} from 'graphql-relay';

import {
  UserType
} from './UserType'

import { getUser } from './../models/userModel';

import type { Note } from './../globalFlowTypes';

export const TimesheetNoteType = new GraphQLObjectType({
  name: 'TimeSheetNote',
  fields: () => ({
    id: globalIdField(),
    author: {
      type: new GraphQLNonNull(UserType),
      resolve: (note: Note) => getUser(note.userId)
    },
    text: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (note: Note) => note.message
    }
  })
});

export const {
  connectionType: TimesheetNoteConnection,
  edgeType: TimesheetNoteEdgeType
} = connectionDefinitions({nodeType: TimesheetNoteType});