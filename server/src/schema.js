// @flow

import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
} from 'graphql'

import {
  nodeDefinitions,
  fromGlobalId,
  globalIdField,
} from 'graphql-relay'

import { getUsers, getUserById, getUserTimeSheetWeek } from './mockData'
import type { TimeSheetDayResponse, UserTimeSheetWeekResponse } from './mockData';

const {nodeInterface, nodeField} = nodeDefinitions(
  (globalId) => {
    // var {type, id} = fromGlobalId(globalId);
    // return data[type][id];
  },
  (obj) => {
    // return obj.ships ? factionType : shipType;
  }
);

const TimeSheetNoteType = new GraphQLObjectType({
  name: 'TimeSheetNote',
  fields: () => ({
    id: globalIdField(),
    author: {
      type: new GraphQLNonNull(UserType)
    },
    text: {
      type: new GraphQLNonNull(GraphQLString)
    }
  })
});

const TimeSheetDayType = new GraphQLObjectType({
  name: 'TimeSheetDay',
  fields: () => ({
    id: globalIdField(),
    dayNumber: {
      type: new GraphQLNonNull(GraphQLInt),
      resolve: (day: TimeSheetDayResponse) => day.day_number
    },
    hours: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    minutes: {
      type: new GraphQLNonNull(GraphQLInt),
    },
  })
});

const TimeSheetWeekType = new GraphQLObjectType({
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



const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: globalIdField(),
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    email: {
      type: new GraphQLNonNull(GraphQLString),
    },
    weekTimeSheet: {
      type: TimeSheetWeekType,
      args: {
        year: {
          type: new GraphQLNonNull(GraphQLInt)
        },
        week: {
          type: new GraphQLNonNull(GraphQLInt)
        }
      },
      resolve: ({id}, {year, week}) => getUserTimeSheetWeek(id, year, week)
    }
  })
});

const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    users: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(UserType))),
      resolve: () => getUsers()
    },
    node: nodeField
  })
});

export default new GraphQLSchema({
  query: queryType
})
