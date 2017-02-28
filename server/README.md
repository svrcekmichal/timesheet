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
      }
    }
  }
}
```