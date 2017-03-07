import React from 'react';
import Relay from 'react-relay';
import { Panel, Grid, Row, Col, Button, ListGroup, ListGroupItem } from 'react-bootstrap'
import styled from 'styled-components';

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
  const { expanded } = relay.variables;

  const headerPart = (
    <div>
      <StyledText fontSize={1.2}>Week <strong>{timesheet.weekNumber}</strong></StyledText>
      <StyledText>
        (Total logged time: {timesheet.totalHours}h {timesheet.totalMinutes}m)
      </StyledText>
      <StyledPullRight>
        <Button bsSize="small" onClick={() => relay.setVariables({expanded: !expanded})}>{expanded ? 'Hide' : 'Expand'}</Button>
      </StyledPullRight>
    </div>

  );

  return expanded ? (
    <Panel>
      {headerPart}
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
          </Row>
        </Grid>
      )}
    </Panel>
  ) : (
    <Panel>
      {headerPart}
    </Panel>
  );
}

export default Relay.createContainer(TimesheetWeekView,{
  initialVariables: {
    expanded: false
  },
  fragments: {
    timesheet: () => Relay.QL`
      fragment on WeeklyTimesheet {
        id
        weekNumber
        totalHours
        totalMinutes
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