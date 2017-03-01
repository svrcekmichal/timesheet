// @flow

import React from 'react';
import Relay from 'react-relay';
import Block from '../../components/Block'
import Text from './../../components/Text'
import getWeekNumber from './../../utils/getWeekNumber';
import UserNotFound from '../../components/UserNotFound';

const getMaxWeekNumber = (year: number) => getWeekNumber(new Date(year, 11, 31));

const getNewVariables = (year: number, _week: number) => {
  const week = Math.min(_week, getMaxWeekNumber(year));
  return {
    year,
    week
  }
};

const renderYearSelect = (value: number, onChange: (event: SyntheticInputEvent) => void) => {
  const endYear = (new Date).getFullYear();
  const options = [];
  for(let year = endYear; year >= endYear -10; year--) {
    options.push(<option key={year} value={year}>{year}</option>)
  }
  return (
    <select value={value} onChange={onChange}>
      {options}
    </select>
  )
};

const renderWeekSelect = (year: number, value: number, onChange: (event: SyntheticInputEvent) => void) => {
  const options = [];
  for(let week = getMaxWeekNumber(year); week >= 1; week--) {
    options.push(<option key={week} value={week}>{week}</option>)
  }
  return (
    <select value={value} onChange={onChange}>
      {options}
    </select>
  )
};

type Props = {
  relay: Relay,
  node: ?User
}

export const TimesheetPage = ({
  relay: {
    setVariables,
    variables: {
      year,
      week
    }
  },
  node: user
}: Props) => (
  <Block padding={'1em'}>
    {user ? (
      <Block>
        <Block marginBottom={1}>
          <Text fontSize={2}>{user.name}'s timesheet</Text>
          <Text fontSize={1}>{user.email}</Text>
        </Block>
        <Block>
          <Block inline marginRight={1}>
            <label htmlFor="">Year</label>
            {renderYearSelect(year, ({target: {value: newYear}}) => setVariables(getNewVariables(parseInt(newYear,10), week)))}
          </Block>
          <Block inline marginRight={1}>
            <label htmlFor="">Week</label>
            {renderWeekSelect(year, week, ({target: {value: newWeek}}) => setVariables(getNewVariables(year, parseInt(newWeek, 10))))}
          </Block>
        </Block>
      </Block>
    ) : (
      <UserNotFound />
    )}
  </Block>
)

export default Relay.createContainer(TimesheetPage, {
  initialVariables: {
    year: (new Date).getFullYear(),
    week: getWeekNumber(new Date)
  },
  fragments: {
    node: () => Relay.QL`
      fragment on User {
        id
        name,
        email
        weekTimeSheet(year: $year, week: $week) {
          days {
            id
            dayNum 
            monthNum
            yearNum
            hours
            minutes
          }
          approvedBy {
            name
            email
          }
          notes {
            text
            author {
              name
            }
          }
        }
      } 
    `
  }
})