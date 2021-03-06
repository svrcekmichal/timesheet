// @flow

import {GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLObjectType} from "graphql";
import {connectionDefinitions, globalIdField, toGlobalId} from "graphql-relay";
import {nodeInterface} from "./../relay";
import {WeeklyTimesheetType} from "./WeeklyTimesheetType";

import type {MonthlyTimesheet} from "./../globalFlowTypes";

export const createGlobalId = (timesheet: MonthlyTimesheet) => toGlobalId(`${timesheet.owner_id}_${timesheet.year}_${timesheet.month}`);

export const getPartsOfGlobalId = (timesheetGlobalId: string) => {
  const [userId, year, month] = timesheetGlobalId.split('_');
  return {
    userId: parseInt(userId, 10),
    year: parseInt(year, 10),
    month: parseInt(month, 10),
  };
}

export const MonthlyTimesheetType = new GraphQLObjectType({
  name: 'MonthlyTimesheet',
  fields: () => ({
    id: globalIdField(null, createGlobalId),
    weeks: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(WeeklyTimesheetType))),
      resolve: (timesheet: MonthlyTimesheet) => timesheet.weeks
    },
    totalHours: {
      type: new GraphQLNonNull(GraphQLInt),
      resolve: (timesheet: MonthlyTimesheet) => timesheet.totalHours
    },
    totalMinutes: {
      type: new GraphQLNonNull(GraphQLInt),
      resolve: (timesheet: MonthlyTimesheet) => timesheet.totalMinutes
    }
  }),
  interfaces: () => [
    nodeInterface
  ]
})

export const {
  connectionType: MonthlyTimesheetConnection
} = connectionDefinitions({nodeType: MonthlyTimesheetType});