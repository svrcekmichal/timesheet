import {
  nodeDefinitions,
  fromGlobalId
} from 'graphql-relay';

import { UserType } from './types/UserType'

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
    switch(type) {
      case TYPES.USER: return getUserById(parseInt(id, 10));
    }
  },
  (obj) => {
    if(obj.__type) {
      switch(obj.__type) {
        case TYPES.USER: return UserType;
      }
    }
    throw new Error('Object type not resolved');
  }
);