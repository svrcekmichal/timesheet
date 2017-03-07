import Relay from 'react-relay';

export default class ChangeWeeklyTimesheetStatus extends Relay.Mutation {

  static fragments = {
    timesheet: () => Relay.QL`
      fragment on WeeklyTimesheet {
        id
      }
    `
  }

  // IE <= 10 workaround URL: https://github.com/facebook/relay/issues/1444
  static getFragment(name) {
    return Relay.Mutation.getFragment.call(ChangeWeeklyTimesheetStatus, name);
  }

  getMutation() {
    return Relay.QL`mutation { changeWeeklyTimesheetStatus }`;
  }

  getVariables() {
    return {
      weekId: this.props.timesheet.id,
      status: this.props.status
    };
  }

  getFatQuery() {
    return Relay.QL`
      fragment on ChangeWeeklyTimesheetStatusPayload {
        weeklyTimesheet {
          status
          approvedAtTime
          approvedByUser
        } 
      }
    `;
  }

  getConfigs() {
    return [{
      type: 'FIELDS_CHANGE',
      fieldIDs: {
        weeklyTimesheet: this.props.timesheet.id,
      },
    }, {
      type: 'REQUIRED_CHILDREN',
      children: [
        Relay.QL`
          fragment on ChangeWeeklyTimesheetStatusPayload {
            errors {
              key
              value
            }
          }
        `,
      ]
    }]
  }


}