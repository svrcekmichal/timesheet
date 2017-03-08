import React from "react";
import Relay from "react-relay";
import {Button, Col, FormControl, Grid, ListGroup, ListGroupItem, Panel, Row} from "react-bootstrap";
import styled from "styled-components";
import ChangeWeeklyTimesheetStatus from "./../../mutations/ChangeWeeklyTimesheetStatus";
import WeeklyTimesheetNotes from './../WeeklyTimesheetNotes/WeeklyTimesheetNotes';

type Props = {
  timesheet: WeeklyTimesheet
}

const StyledText = styled.p`
  margin-right: 2em;
  font-size: ${props => props.fontSize || 1};
  vertical-align: middle;
  display: inline-block;
`

const StyledPullRight = styled(StyledText)`
  float: right;
  display: inline-block;
`

export const TimesheetWeekView = ({
                                    relay,
                                    timesheet
                                  }: Props) => {
  const {expanded} = relay.variables;

  const headerPart = (
    <div>
      <StyledText fontSize={1.2}>Week <strong>{timesheet.weekNumber}</strong></StyledText>
      <StyledText>
        (Total logged time: {timesheet.totalHours}h {timesheet.totalMinutes}m)
      </StyledText>
      <StyledPullRight>
        <Button bsSize="small"
                onClick={() => relay.setVariables({expanded: !expanded})}>{expanded ? 'Hide' : 'Expand'}</Button>
      </StyledPullRight>
    </div>

  );

  let bsStyle;
  switch (timesheet.status) {
    case 'APPROVED':
      bsStyle = 'success';
      break;
    case 'REJECTED':
      bsStyle = 'danger';
      break;
    case 'WAITING':
      bsStyle = 'info';
      break;
    default: {
      bsStyle = undefined;
    }
  }

  return (
    <Panel bsStyle={bsStyle} header={headerPart}>
      {expanded && (
        <Grid>
          <Row>
            <Col xs={6}>
              <ListGroup>
                {timesheet.days.map(day => (
                  <ListGroupItem key={day.id}>
                    <StyledText>Day <strong>{day.dayNum}</strong></StyledText>
                    <StyledText>Logged time: <strong>{day.hours}h {day.minutes}m</strong></StyledText>
                  </ListGroupItem>
                ))}
              </ListGroup>
            </Col>
            <Col xs={4}>
              {timesheet.approvedByUser && (
                <h5>
                  <p>Timesheet status changed</p>
                  <p>by <strong>{timesheet.approvedByUser.username}({timesheet.approvedByUser.email})</strong></p>
                  <p>at {timesheet.approvedAtTime}</p>
                </h5>
              )}
              {timesheet.canApprove ? (
                <div>
                  <FormControl
                    componentClass="select"
                    name="month"
                    value={timesheet.status || ""}
                    onChange={e => relay.commitUpdate(new ChangeWeeklyTimesheetStatus({
                      timesheet,
                      status: e.target.value
                    }))}
                  >
                    <option value="" disabled>Select new status</option>
                    <option value="APPROVED">approved</option>
                    <option value="REJECTED">rejected</option>
                    <option value="WAITING">waiting</option>
                  </FormControl>
                  <WeeklyTimesheetNotes timesheet={timesheet} />
                </div>
              ) : (
                <div>
                  <ul className="list-unstyled">
                    You can't change timesheet status. Contact one of following users:
                    {timesheet.approvableByUsers.map((user, i) => (
                      <li key={i}>{user.username}({user.email})</li>
                    ))}
                  </ul>
                  <WeeklyTimesheetNotes timesheet={timesheet} />
                </div>

              )}
            </Col>
          </Row>
        </Grid>
      )}
    </Panel>
  );
}

export default Relay.createContainer(TimesheetWeekView, {
  initialVariables: {
    expanded: false
  },
  fragments: {

    timesheet: () => Relay.QL`
      fragment on WeeklyTimesheet {
        ${ChangeWeeklyTimesheetStatus.getFragment('timesheet')}
        ${WeeklyTimesheetNotes.getFragment('timesheet')}
        id
        status
        weekNumber
        totalHours
        totalMinutes
        canApprove
        approvedAtTime
        approvedByUser {
          username
          email
        }
        approvableByUsers {
          username
          email
        }
        days @include(if: $expanded) {
          id
          dayNum
          hours
          minutes
        }
      }
    `
  }
})