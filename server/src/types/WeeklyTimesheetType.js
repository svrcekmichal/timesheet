// @flow

import {GraphQLBoolean, GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString} from "graphql";
import {connectionArgs, connectionFromArray, globalIdField} from "graphql-relay";
import {nodeInterface} from "./../relay";
import {DailyTimesheetType} from "./DailyTimesheetType";
import {UserType} from "./UserType";
import {TimesheetNoteConnection} from "./TimesheetNoteType";
import {WeeklyTimesheetStatusEnum} from "./WeeklyTimesheetStatusEnum";
import {getUser} from "./../models/userModel";
import {getWeekNotes} from "./../models/notesModel";

import type {ExecutionContext, WeeklyTimesheet} from "./../globalFlowTypes";

const createGlobalId = (timesheet: WeeklyTimesheet) => `${timesheet.owner_id}_${timesheet.week_id}`;

export const getPartsOfGlobalId = (timesheetGlobalId: string) => {
  const [userId, weekId] = timesheetGlobalId.split('_');
  return {
    userId: parseInt(userId, 10),
    weekId: parseInt(weekId, 10),
  };
}

export const WeeklyTimesheetType = new GraphQLObjectType({
  name: 'WeeklyTimesheet',
  fields: () => ({
    id: globalIdField(null, createGlobalId),
    status: {
      type: WeeklyTimesheetStatusEnum,
      resolve: (timesheet: WeeklyTimesheet) => {
        if (timesheet.status === 'reject') return 'rejected'; //TODO not consistent in API level
        return timesheet.status;
      }
    },
    weekNumber: {
      type: new GraphQLNonNull(GraphQLInt),
      resolve: (timesheet: WeeklyTimesheet) => timesheet.week_number
    },
    totalHours: {
      type: new GraphQLNonNull(GraphQLInt),
      resolve: (timesheet: WeeklyTimesheet) => timesheet.totalHours
    },
    totalMinutes: {
      type: new GraphQLNonNull(GraphQLInt),
      resolve: (timesheet: WeeklyTimesheet) => timesheet.totalMinutes
    },
    days: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(DailyTimesheetType))),
      resolve: (timesheet: WeeklyTimesheet) => timesheet.days_in_week
    },
    approvableByUsers: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(UserType))),
      resolve: (timesheet: WeeklyTimesheet) => Promise.all(timesheet.approvers.map(getUser)).then(users => users.filter(user => !!user))
    },
    canApprove: {
      type: new GraphQLNonNull(GraphQLBoolean),
      resolve: (timesheet: WeeklyTimesheet, args, {loggedUser}: ExecutionContext) => {
        if (!loggedUser) return false;
        console.log(timesheet.approvers, loggedUser);
        return timesheet.approvers.indexOf(loggedUser) !== -1;
      }
    },
    approvedAtTime: {
      type: GraphQLString,
      resolve: (timesheet: WeeklyTimesheet) => timesheet.approved_by_date && new Date(Date.parse(timesheet.approved_by_date.replace('-', '/', 'g')))
    },
    approvedByUser: {
      type: UserType,
      resolve: (timesheet: WeeklyTimesheet) => {
        if (!timesheet.approved_by_id) return null;
        return getUser(timesheet.approved_by_id);
      }
    },
    notes: {
      type: new GraphQLNonNull(TimesheetNoteConnection),
      args: connectionArgs,
      resolve: (timesheet: WeeklyTimesheet, args) => {
        return connectionFromArray(
          getWeekNotes(timesheet.week_id),
          args
        )
      }
    }
  }),
  interfaces: () => [
    nodeInterface
  ]
})