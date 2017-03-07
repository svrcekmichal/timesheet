// @flow

import {GraphQLInt, GraphQLNonNull, GraphQLObjectType} from "graphql";
import {globalIdField} from "graphql-relay";

import type {DailyTimesheet} from "./../globalFlowTypes";

const createGlobalId = (timesheet: DailyTimesheet) => `${timesheet.owner_id}_${timesheet.id}`;

export const getPartsOfGlobalId = (timesheetGlobalId: string) => {
  const [userId, dayId] = timesheetGlobalId.split('_');
  return {
    userId: parseInt(userId, 10),
    dayId: parseInt(dayId, 10),
  };
}
export const DailyTimesheetType = new GraphQLObjectType({
  name: 'DailyTimesheet',
  fields: () => ({
    id: globalIdField(null, createGlobalId),
    dayNum: {
      type: new GraphQLNonNull(GraphQLInt),
      resolve: (day) => day.day_number
    },
    hours: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    minutes: {
      type: new GraphQLNonNull(GraphQLInt),
    },
  })
});