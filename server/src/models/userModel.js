import fetch from 'node-fetch';

import { API_ENPOINTS } from './../constants'

import type { User } from './../globalFlowTypes';

export const getUsers = (): Promise<Array<User>> => fetch(API_ENPOINTS.users())
  .then(res => {
    if(res.status !== 200) {
      throw new Error('Error while fetching users');
    }
    return res.json()
  })

export const getUser = (userId: number): Promise<User> => fetch(API_ENPOINTS.user(userId))
  .then(res => {
    if(res.status === 404) {
      return null;
    }
    if(res.status !== 200) {
      throw new Error('Error while fetching users');
    }
    return res.json()
  })