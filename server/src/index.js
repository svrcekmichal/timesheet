// @flow

import express from "express";
import graphqlHTTP from "express-graphql";
import schema from "./schema";
import cors from "cors";

import type {ExecutionContext} from "./globalFlowTypes";

const app = express();
app.use(cors());

const port = process.env.PORT || 3001;

app.use('/graphql', graphqlHTTP(req => ({
  schema,
  graphiql: true,
  context: ({
    loggedUser: req.query.userId ? parseInt(req.query.userId, 10) : null, //TODO add loggedUser to all resolvers
  }: ExecutionContext)
})))

app.listen(port, () => {
  console.log(`Running GraphQL server on port ${port}`)
})