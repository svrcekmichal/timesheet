// @flow

import {GraphQLObjectType} from "graphql";
import {AddNoteToWeeklyTimesheet} from "./../mutations/AddNoteToWeeklyTimesheet";
import {ChangeWeeklyTimesheetStatus} from "./../mutations/ChangeWeeklyTimesheetStatus";

export const MutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    addNoteToWeeklyTimesheet: AddNoteToWeeklyTimesheet,
    changeWeeklyTimesheetStatus: ChangeWeeklyTimesheetStatus
  })
});