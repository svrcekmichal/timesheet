import {GraphQLID, GraphQLList, GraphQLNonNull} from "graphql";
import {fromGlobalId, mutationWithClientMutationId} from "graphql-relay";
import {WeeklyTimesheetStatusEnum} from "./../types/WeeklyTimesheetStatusEnum";
import {getPartsOfGlobalId, WeeklyTimesheetType} from "./../types/WeeklyTimesheetType";
import {GLOBAL_KEY, UserFriendlyMutationErrorType} from "./../types/UserFriendlyMutationErrorType";
import {changeWeeklyTimesheetStatus, getWeeklyTimesheet} from "./../models/timesheetModel";
import {TYPES} from "./../relay";

const createError = (key, value) => ({key, value});

export const ChangeWeeklyTimesheetStatus = mutationWithClientMutationId({

  name: 'ChangeWeeklyTimesheetStatus',

  inputFields: {
    weekId: {
      description: 'Global id of WeeklyTimesheet',
      type: new GraphQLNonNull(GraphQLID),
    },
    status: {
      description: 'Note message',
      type: new GraphQLNonNull(WeeklyTimesheetStatusEnum),
    }
  },

  outputFields: {
    weeklyTimesheet: {
      type: WeeklyTimesheetType,
      resolve: ({week}) => week
    },
    errors: {
      type: new GraphQLList(UserFriendlyMutationErrorType)
    }
  },

  mutateAndGetPayload: ({weekId: globalWeekId, status}, {loggedUser}) => {
    const result = {
      week: null,
      errors: []
    };
    const {type, id: weekIdPart} = fromGlobalId(globalWeekId);
    const {userId: weekOwnerId, weekId} = getPartsOfGlobalId(weekIdPart);
    if (!loggedUser) {
      result.errors.push(createError(GLOBAL_KEY, 'You must be logged in to be able to change weekly timesheet status'));
    }
    if (type !== TYPES.WEEKLY_TIMESHEET || !weekOwnerId || !weekId) {
      result.errors.push(createError(GLOBAL_KEY, 'Invalid weekly timesheet id'));
    }
    if (result.errors.length > 0) {
      return result;
    }
    return getWeeklyTimesheet(weekOwnerId, weekId).then(week => {
      if (!week) {
        throw new Error('Weekly timesheet not found');
      } else if (week.approvers.indexOf(loggedUser) === -1) {
        throw new Error('You are not allowed to change weekly timesheet status');
      } else {
        return changeWeeklyTimesheetStatus(weekId, loggedUser, status)
      }
    }).then(week => {
      result.week = week;
      return result;
    }, err => {
      result.errors.push(createError(GLOBAL_KEY, err.message));
      return result;
    })
  }
})