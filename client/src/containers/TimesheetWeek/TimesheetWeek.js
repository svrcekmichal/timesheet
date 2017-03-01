// @flow

import React from 'react';
import Relay from 'react-relay';
import Block from './../../components/Block';
import Text from './../../components/Text';
import { getMonthName } from './../../utils/dateUtils';

type Props = {
  timeSheetWeek: TimeSheetWeek
}

export const TimesheetWeek = ({
  timeSheetWeek
}: Props) => (
  <Block>
    <Block inline marginRight={2}>
      <Block marginBottom={1}>
        <Text fontSize={1.5}>Days:</Text>
      </Block>
      <Block>
        {timeSheetWeek.days.map((day: TimeSheetDay, i:number) => (
          <Block key={i} marginBottom={1}>
            <Text fontSize={0.9}>{day.dayNum}.{getMonthName(day.monthNum)} {day.yearNum}</Text>
            <Text fontSize={1.4} lineHeight={1.25}>{day.hours}h {day.minutes}m</Text>
          </Block>
        ))}
      </Block>
    </Block>
    <Block inline>
      <Block marginBottom={1}>
        <Text fontSize={1.5}>Approved by:</Text>
      </Block>
      {timeSheetWeek.approvedBy.map((user: User, i: number) => (
        <Block key={i} marginBottom={0.5}>
          <Text>{user.name}</Text>
          <Text fontSize={0.8}>{user.email}</Text>
        </Block>
      ))}
      <Block marginBottom={1} marginTop={1}>
        <Text fontSize={1.5}>Notes:</Text>
      </Block>
      {timeSheetWeek.notes.map((note: TimeSheetNote, i: number) => (
        <Block key={i} marginBottom={0.5}>
          <Text fontSize={0.9}>{note.text}</Text>
          <Text fontSize={0.8}>{note.author.name}</Text>
        </Block>
      ))}
    </Block>
  </Block>
);

export default Relay.createContainer(TimesheetWeek, {
  fragments: {
    timeSheetWeek: () => Relay.QL`
      fragment on TimeSheetWeek {
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
    `
  }
})