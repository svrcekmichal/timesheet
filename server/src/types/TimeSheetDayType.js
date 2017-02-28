import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLInt,
} from 'graphql';

import {
  globalIdField
} from 'graphql-relay'

export const TimeSheetDayType = new GraphQLObjectType({
  name: 'TimeSheetDay',
  fields: () => ({
    id: globalIdField(),
    dayNum: {
      type: new GraphQLNonNull(GraphQLInt),
      resolve: (day: TimeSheetDayResponse) => day.day_number
    },
    monthNum: {
      type: new GraphQLNonNull(GraphQLInt),
      resolve: (day: TimeSheetDayResponse) => day.month_number
    },
    yearNum: {
      type: new GraphQLNonNull(GraphQLInt),
      resolve: (day: TimeSheetDayResponse) => day.year_number
    },
    hours: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    minutes: {
      type: new GraphQLNonNull(GraphQLInt),
    },
  })
});