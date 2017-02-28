import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLList,
} from 'graphql';

import {
  
} from 'graphql-relay';

import {
  TimeSheetDayType
} from './TimeSheetDayType'

import {
  TimeSheetNoteType
} from './TimeSheetNoteType'

import {
  UserType
} from './UserType'

import {
  getUserById
} from './../mockData'

export const TimeSheetWeekType = new GraphQLObjectType({
  name: 'TimeSheetWeek',
  fields: () => ({
    year: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    weekNumber: {
      type: new GraphQLNonNull(GraphQLInt),
      resolve: (week: UserTimeSheetWeekResponse) => week.week_number
    },
    days: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(TimeSheetDayType))),
      resolve: (week: UserTimeSheetWeekResponse) => week.days_in_week
    },
    approvedBy: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(UserType))),
      resolve: (week: UserTimeSheetWeekResponse) => {
        return Promise.all(week.approvers.map(id => getUserById(id)));
      }
    },
    notes: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(TimeSheetNoteType))),
      resolve: () => []
    }
  })
})