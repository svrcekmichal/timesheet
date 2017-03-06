// @flow

import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLNonNull,
  GraphQLList,
  GraphQLBoolean,
} from 'graphql';

import {
  globalIdField
} from 'graphql-relay'

import {
  DailyTimesheetType
} from './DailyTimesheetType';

import {
  UserType
} from './UserType'

import { getUser } from './../models/userModel'

import type { ExecutionContext, WeeklyTimesheet } from './../globalFlowTypes';

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
    weekNumber: {
      type: new GraphQLNonNull(GraphQLInt),
      resolve: (timesheet: WeeklyTimesheet) => timesheet.week_number
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
      resolve: (timesheet: WeeklyTimesheet, args, { loggedUser }: ExecutionContext) => {
        if(!loggedUser) return false;
        return timesheet.approvers.indexOf(loggedUser.id) !== -1;
      }
    },
    approvedAtTime: {
      type: GraphQLString,
      resolve: (timesheet: WeeklyTimesheet) => timesheet.approved_by_date && new Date(Date.parse(timesheet.approved_by_date.replace('-','/','g')))
    },
    approvedByUser: {
      type: UserType,
      resolve: (timesheet: WeeklyTimesheet) => {
        if(!timesheet.approved_by_id) return null;
        return getUser(timesheet.approved_by_id);
      }
    },
    // notes: { //TODO
    //   type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(TimeSheetNoteType))),
    //   resolve: () => []
    // }
  })
})