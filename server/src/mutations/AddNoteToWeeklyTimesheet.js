import {GraphQLID, GraphQLList, GraphQLNonNull, GraphQLString} from "graphql";
import {cursorForObjectInConnection, fromGlobalId, mutationWithClientMutationId} from "graphql-relay";
import {GLOBAL_KEY, UserFriendlyMutationErrorType} from "./../types/UserFriendlyMutationErrorType";
import {getPartsOfGlobalId, WeeklyTimesheetType} from "./../types/WeeklyTimesheetType";
import {TimesheetNoteEdgeType} from "./../types/TimesheetNoteType";
import {addNote, getWeekNotes} from "./../models/notesModel";
import {getWeeklyTimesheet} from "./../models/timesheetModel";
import {TYPES} from "./../relay";

const createError = (key, value) => ({key, value});

export const AddNoteToWeeklyTimesheet = mutationWithClientMutationId({

  name: 'AddNoteToWeeklyTimesheet',

  inputFields: {
    weekId: {
      description: 'Global id of WeeklyTimesheet',
      type: new GraphQLNonNull(GraphQLID),
    },
    message: {
      description: 'Note message',
      type: new GraphQLNonNull(GraphQLString),
    }
  },

  outputFields: {

    weeklyTimesheet: {
      type: WeeklyTimesheetType,
      resolve: ({ownerId, weekId}) => weekId && ownerId && getWeeklyTimesheet(ownerId, weekId)
    },
    newNoteEdge: {
      type: TimesheetNoteEdgeType,
      resolve: ({weekId, note}) => {
        if (!weekId || !note) return null;
        const notes = getWeekNotes(weekId);
        return {
          node: note,
          cursor: cursorForObjectInConnection(notes, note)
        }
      }
    },
    errors: {
      type: new GraphQLList(UserFriendlyMutationErrorType)
    }
  },

  mutateAndGetPayload: ({weekId: globalWeekId, message, clientMutationId}, {loggedUser}) => {
    const result = {
      clientMutationId,
      ownerId: null,
      weekId: null,
      note: null,
      errors: []
    };
    const {type, id: weekIdPart} = fromGlobalId(globalWeekId);
    const {userId: weekOwnerId, weekId} = getPartsOfGlobalId(weekIdPart);
    if (!loggedUser) {
      result.errors.push(createError(GLOBAL_KEY, 'You must be logged in to create notes'));
    }
    if (type !== TYPES.WEEKLY_TIMESHEET || !weekOwnerId || !weekId) {
      result.errors.push(createError(GLOBAL_KEY, 'Invalid weekly timesheet id'));
    }
    if (message.length <= 5) {
      result.errors.push(createError('message', 'Message must be at least 6chars long'));
    }
    if (result.errors.length > 0) {
      return result;
    }
    result.note = addNote(loggedUser, weekId, message);
    result.ownerId = weekOwnerId;
    result.weekId = weekId;
    return result;
  }
})