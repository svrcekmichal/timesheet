# Timesheet API

## How to
```
npm install
npm run start
//open http://localhost:3001/graphql
```

## Warning
For now, API is not documented.

## Example query
```
{
  viewer {
    users(first: 1) {
      edges {
        node {
          id
          username
          email
          timesheet(year: 2017, month: FEBRUARY) {
            id
            totalHours
            totalMinutes
            weeks {
            	id
              weekNumber
              days {
                id
                dayNum
                hours
                minutes
              }
              approvableByUsers {
                id
                username
              }
              canApprove
              approvedAtTime
              approvedByUser {
                id
                username
              }
            }
          }
        }
      }
    }
  }
}
```