import {
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt
} from 'graphql';

import {
  globalIdField,
  connectionDefinitions
} from 'graphql-relay';

import {
  TimeSheetWeekType
} from './TimeSheetWeekType';

import {
  getUserTimeSheetWeek
} from './../mockData';

export const UserType = new GraphQLObjectType({
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

export const {
  connectionType: UserConnection,
} = connectionDefinitions({nodeType: UserType});