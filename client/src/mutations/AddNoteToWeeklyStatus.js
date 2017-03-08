import Relay from "react-relay";

export default class AddNoteToWeeklyStatus extends Relay.Mutation {

  static fragments = {
    timesheet: () => Relay.QL`
      fragment on WeeklyTimesheet {
        id
      }
    `
  }

  // IE <= 10 workaround URL: https://github.com/facebook/relay/issues/1444
  static getFragment(name) {
    return Relay.Mutation.getFragment.call(AddNoteToWeeklyStatus, name);
  }

  getMutation() {
    return Relay.QL`mutation { addNoteToWeeklyTimesheet }`;
  }

  getVariables() {
    return {
      weekId: this.props.timesheet.id,
      message: this.props.message
    };
  }

  getFatQuery() {
    return Relay.QL`
      fragment on AddNoteToWeeklyTimesheetPayload {
        weeklyTimesheet {
          notes
        }
        newNoteEdge
      }
    `;
  }

  getConfigs() {
    return [{
      type: 'RANGE_ADD',
      parentName: 'weeklyTimesheet',
      parentID: this.props.timesheet.id,
      connectionName: 'notes',
      edgeName: 'newNoteEdge',
      rangeBehaviors: {
        '': 'append'
      },
    }, {
      type: 'REQUIRED_CHILDREN',
      children: [
        Relay.QL`
          fragment on AddNoteToWeeklyTimesheetPayload {
            errors {
              key
              value
            }
          }
        `,
      ]
    }];
  }


}