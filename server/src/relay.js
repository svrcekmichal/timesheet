import {fromGlobalId, nodeDefinitions} from "graphql-relay";

import {UserType} from "./types/UserType";

import {
  getPartsOfGlobalId as getPartsOfMonthlyTimesheetGlobalId,
  MonthlyTimesheetType
} from "./types/MonthlyTimesheetType";

import {
  getPartsOfGlobalId as getPartsOfWeeklyTimesheetGlobalId,
  WeeklyTimesheetType
} from "./types/WeeklyTimesheetType";

import {getMonthlyTimesheet, getWeeklyTimesheet} from "./models/timesheetModel";

import {getUser} from "./models/userModel";

export const TYPES = {
  USER: 'User',
  MONTHLY_TIMESHEET: 'MonthlyTimesheet',
  WEEKLY_TIMESHEET: 'WeeklyTimesheet',
  DAILY_TIMESHEET: 'DailyTimesheet',
};

export const {
  nodeInterface,
  nodeField
} = nodeDefinitions(
  (globalId) => {
    const {type, id} = fromGlobalId(globalId);
    switch (type) {
      case TYPES.USER:
        return getUser(parseInt(id, 10));
      case TYPES.MONTHLY_TIMESHEET: {
        const {userId, year, month} = getPartsOfMonthlyTimesheetGlobalId(id);
        return getMonthlyTimesheet(userId, year, month);
      }
      case TYPES.WEEKLY_TIMESHEET: {
        const {userId, weekId} = getPartsOfWeeklyTimesheetGlobalId(id);
        return getWeeklyTimesheet(userId, weekId);
      }
    }
  },
  (obj) => {
    if (obj.__type) {
      switch (obj.__type) {
        case TYPES.USER:
          return UserType;
        case TYPES.MONTHLY_TIMESHEET:
          return MonthlyTimesheetType;
        case TYPES.WEEKLY_TIMESHEET:
          return WeeklyTimesheetType;
      }
    }
    throw new Error('Object type not resolved');
  }
);