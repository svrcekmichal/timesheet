import React from 'react';
import Relay from 'react-relay';

export const Timesheet = (props) => {
  console.log(props);
  return (
    <h1>Timesheet</h1>
  )
};

export default Relay.createContainer(Timesheet, {
  fragments: {
    node: () => Relay.QL`
      fragment on User {
        id
        name,
        email
        weekTimeSheet(year: 2016, week: 52) {
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