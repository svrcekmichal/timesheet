import {GraphQLEnumType} from "graphql";

export const WeeklyTimesheetStatusEnum = new GraphQLEnumType({
  name: 'WeeklyTimesheetStatus',
  values: {
    APPROVED: {value: 'approved'},
    REJECTED: {value: 'rejected'},
    WAITING: {value: 'waiting'},
  }
})













