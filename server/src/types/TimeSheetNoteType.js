// @flow

import {GraphQLNonNull, GraphQLObjectType, GraphQLString} from "graphql";
import {connectionDefinitions, globalIdField} from "graphql-relay";
import {UserType} from "./UserType";
import {getUser} from "./../models/userModel";

import type {Note} from "./../globalFlowTypes";

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