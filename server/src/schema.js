import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
} from 'graphql'

import {
  nodeDefinitions,
  fromGlobalId,
  globalIdField,
} from 'graphql-relay'

const {nodeInterface, nodeField} = nodeDefinitions(
  (globalId) => {
    // var {type, id} = fromGlobalId(globalId);
    // return data[type][id];
  },
  (obj) => {
    // return obj.ships ? factionType : shipType;
  }
);

const TimeSheetNoteType = new GraphQLObjectType({
  name: 'TimeSheetNote',
  fields: () => ({
    id: globalIdField(),
    author: {
      type: new GraphQLNonNull(UserType)
    },
    text: {
      type: new GraphQLNonNull(GraphQLString)
    }
  })
});

const TimeSheetDayType = new GraphQLObjectType({
  name: 'TimeSheetDay',
  fields: () => ({
    id: globalIdField(),
    dayNumber: {
      type: new GraphQLNonNull(GraphQLInt)
    },
    hours: {
      type: new GraphQLNonNull(GraphQLInt)
    },
    minutes: {
      type: new GraphQLNonNull(GraphQLInt)
    },
  })
});

const TimeSheetWeekType = new GraphQLObjectType({
  name: 'TimeSheetWeek',
  fields: () => ({
    id: globalIdField(),
    days: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(TimeSheetDayType))),
    },
    approvedBy: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(UserType)))
    },
    notes: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(TimeSheetNoteType)))
    }
  })
})



const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: globalIdField(),
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    email: {
      type: new GraphQLNonNull(GraphQLString),
    },
    weekTimeSheet: {
      type: new GraphQLNonNull(TimeSheetWeekType),
      args: {
        year: {
          type: new GraphQLNonNull(GraphQLInt)
        },
        week: {
          type: new GraphQLNonNull(GraphQLInt)
        }
      },
    }
  })
});

const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    users: {
      type: UserType,
      args: {

      },
      resolve: (root, args, context, info) => {
        return []
      }
    },
    node: nodeField
  })
});

export default new GraphQLSchema({
  query: queryType
})
