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
    return Relay.Mutation.getFragment.call(MeetingVoteMutation, name);
  }

  getMutation() {
    return Relay.QL`mutation { AddNoteToWeeklyTimesheet }`;
  }

  getVariables() {
    return {
      weekId: this.props.timesheet.id,
      status: this.props.status
    };
  }

  getFatQuery() {
    return Relay.QL`
      fragment on AddNoteToWeeklyTimesheetPayload {
        status
        approvedAtTime
        approvedByUser 
      }
    `;
  }

  getConfigs() {
    const meetingVoteEdgeConfig = this.props.vote ? (
      {
        type: 'RANGE_ADD',
        parentName: 'viewer',
        parentID: this.props.viewer.id,
        connectionName: 'meetingMyVotes',
        edgeName: 'meetingVoteEdge',
        rangeBehaviors: {
          '': 'prepend'
        },
      }
    ) : (
      {
        type: 'RANGE_DELETE',
        parentName: 'viewer',
        parentID: this.props.viewer.id,
        connectionName: 'meetingMyVotes',
        deletedIDFieldName: 'opponentId',
        pathToConnection: ['viewer', 'meetingMyVotes'],
      }
    );

    return [
      meetingVoteEdgeConfig
    ];
  }


}