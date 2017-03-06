// @flow

import {
  GraphQLObjectType,
} from 'graphql';

import { AddNoteToWeeklyTimesheet } from './../mutations/AddNoteToWeeklyTimesheet';

export const MutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    addNoteToWeeklyTimesheet: AddNoteToWeeklyTimesheet
  })
});