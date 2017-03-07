// @flow

import React, {Component} from "react";
import Relay from "react-relay";
import styled from "styled-components";
import {Button, Col, ControlLabel, Form, FormControl, FormGroup, Grid, PanelGroup, Row} from "react-bootstrap";
import {getMonthName, getMonths} from "../../utils/dateUtils";
import UserNotFound from "../../components/UserNotFound";
import TimesheetWeekView from "./../TimesheetWeekView/TimesheetWeekView";
import TimesheetNotFound from "../../components/TimesheetNotFound";

const today = new Date();

const StyledControlLabel = styled(ControlLabel)`
  margin-right: 1em;
`

const StyledFormGroup = styled(FormGroup)`
  margin-right: 1em;
`

const formatMonthName = (name: string) => name[0] + name.slice(1).toLowerCase();

type Props = {
  relay: Relay,
  node: ?User
}

export class TimesheetPage extends Component {

  props: Props;

  state: {
    year: number,
    month: string
  }

  constructor(props) {
    super(props);
    (this: any).state = {
      year: this.props.relay.variables.year,
      month: this.props.relay.variables.month,
    };
    (this: any).setValueFromForm = this.setValueFromForm.bind(this);
    (this: any).renderYearSelect = this.renderYearSelect.bind(this);
    (this: any).renderMonthSelect = this.renderMonthSelect.bind(this);
    (this: any).onFormSubmit = this.onFormSubmit.bind(this);
  }

  setValueFromForm(e: SyntheticEvent) {
    const {name, value} = e.target;
    this.setState({[name]: value});
  }

  renderYearSelect() {
    const endYear = today.getFullYear();
    const options = [];
    for (let year = endYear; year >= endYear - 10; year--) {
      options.push(<option key={year} value={year}>{year}</option>)
    }
    return (
      <FormControl componentClass="select" name="year" value={this.state.year} onChange={this.setValueFromForm}>
        {options}
      </FormControl>
    )
  }

  renderMonthSelect() {
    return (
      <FormControl componentClass="select" name="month" value={this.state.month} onChange={this.setValueFromForm}>
        {getMonths().map((month: string) => (
          <option key={month} value={month.toUpperCase()}>{month}</option>
        ))}
      </FormControl>
    )
  }

  onFormSubmit(e) {
    e.preventDefault();
    this.props.relay.setVariables({
      year: parseInt(this.state.year, 10),
      month: this.state.month,
      skip: false
    });
  }

  render() {
    const {node: user, relay} = this.props;
    return (
      <Grid>
        <Row>
          {user ? (
            <Col xs={12}>
              <h3>{user.username}'s timesheets</h3>
              <Form inline onSubmit={this.onFormSubmit}>
                <StyledFormGroup>
                  <StyledControlLabel>Year</StyledControlLabel>
                  {this.renderYearSelect()}
                </StyledFormGroup>
                <StyledFormGroup>
                  <StyledControlLabel>Month</StyledControlLabel>
                  {this.renderMonthSelect()}
                </StyledFormGroup>
                <StyledFormGroup>
                  <Button type="submit" bsStyle="primary">Show</Button>
                </StyledFormGroup>
              </Form>
              {!relay.variables.skip && (
                !!user.timesheet ? (
                  <div>
                    <h4>Showing timesheet for {formatMonthName(relay.variables.month)} {relay.variables.year}</h4>
                    <PanelGroup>
                      {user.timesheet.weeks.map(week => (
                        <TimesheetWeekView key={week.id} timesheet={week}/>
                      ))}
                    </PanelGroup>
                  </div>
                ) : (
                  <TimesheetNotFound />
                )
              )}
            </Col>
          ) : (
            <Col xs={12}>
              <UserNotFound />
            </Col>
          )}
        </Row>
      </Grid>
    )
  }
}

export default Relay.createContainer(TimesheetPage, {
  initialVariables: {
    skip: true, //skip initial load
    year: today.getFullYear(),
    month: getMonthName(today.getMonth()).toUpperCase()
  },
  fragments: { //TODO change weekTimeSheet to timeSheetWeek (not consistent), check timeSheet VS timesheet
    node: () => Relay.QL`
      fragment on User {
        id
        username,
        email
        timesheet(year: $year, month: $month) @skip(if: $skip) {
          id
          totalHours
          totalMinutes
          weeks {
            id
            ${TimesheetWeekView.getFragment('timesheet')}
          }
        }
      } 
    `
  }
})