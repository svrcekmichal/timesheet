import {
  nodeDefinitions,
  fromGlobalId
} from 'graphql-relay';

import {
  TYPES,
  getUserById,
} from './mockData'

import { UserType } from './types/UserType'

export const {
  nodeInterface,
  nodeField
} = nodeDefinitions(
  (globalId) => {
    const {type, id} = fromGlobalId(globalId);
    switch(type) {
      case TYPES.USER: return getUserById(parseInt(id, 10));
    }
  },
  (obj) => {
    if(obj.__type) {
      switch(obj.__type) {
        case TYPES.USER: return UserType;
      }
    }
    throw new Error('Object type not resolved');
  }
);