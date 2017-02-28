import express from 'express';
import graphqlHTTP from 'express-graphql';
import schema from './schema'

const app = express();
const port = process.env.PORT || 3001;

app.use('/graphql', graphqlHTTP(req => ({
  schema,
  graphiql: true,
  context: {
    db: null //TODO
  }
})))

app.listen(port, () => {
  console.log(`Running GraphQL server on port ${port}`)
})