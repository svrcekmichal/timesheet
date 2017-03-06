// @flow

import {
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt
} from 'graphql';

import {
  globalIdField,
  connectionArgs,
  connectionDefinitions
} from 'graphql-relay';

import {
  nodeInterface
} from './../relay';

import {
  MonthEnum
} from './MonthEnum';

import {
  MonthlyTimesheetType
} from './MonthlyTimesheetType';

import { getMonthlyTimesheet } from './../models/timesheetModel';

import type { User } from './../globalFlowTypes';

type UserTimesheetArgs = {
  year: number,
  month: number
}

export const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: globalIdField(),
    username: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (user: User) => user.username
    },
    email: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (user: User) => user.email
    },
    timesheet: {
      type: MonthlyTimesheetType,
      args: {
        year: {
          description: 'Year of timesheet',
          type: new GraphQLNonNull(GraphQLInt)
        },
        month: {
          description: 'Month of timesheet',
          type: new GraphQLNonNull(MonthEnum)
        }
      },
      resolve: (user: User, { year, month }: UserTimesheetArgs) => getMonthlyTimesheet(user.id, year, month)
    },
    // timesheets: {
    //   type: new GraphQLNonNull(MonthlyTimesheetConnection),
    //   args: connectionArgs,
    //   resolve: () => {} //TODO
    // }
  }),
  interfaces: () => [
    nodeInterface
  ]
});

export const {
  connectionType: UserConnection,
} = connectionDefinitions({nodeType: UserType});