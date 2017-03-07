// @flow

import {GraphQLSchema} from "graphql";

import {QueryType} from "./types/QueryType";
import {MutationType} from "./types/MutationType";

export default new GraphQLSchema({
  query: QueryType,
  mutation: MutationType
})
