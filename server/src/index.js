// @flow

import express from 'express';
import graphqlHTTP from 'express-graphql';
import schema from './schema';
import cors from 'cors';

import type { ExecutionContext } from './globalFlowTypes';

const app = express();
app.use(cors());

const port = process.env.PORT || 3001;

const loggerUser =
  // null;
  {
    id: 2,
    username: "User_2",
    email: "user_2@aurity.co"
  };

app.use('/graphql', graphqlHTTP(req => ({
  schema,
  graphiql: true,
  context: ({
    loggedUser: loggerUser, //TODO add loggedUser to all resolvers
  }: ExecutionContext)
})))

app.listen(port, () => {
  console.log(`Running GraphQL server on port ${port}`)
})