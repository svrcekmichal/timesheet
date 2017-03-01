// @flow

/**
 * All the mocking stuff, really ugly code :D
 */

import Faker from 'faker';
import moment from 'moment';

moment.updateLocale('en',{ //only working setup
  week : {
    dow : 0, // Sunday is the first day of the week.
    doy : 4  // The week that contains Jan 4th is the first week of the year.
  }
})

export const TYPES = {
  USER: 'User',
  TIME_SHEET_WEEK: 'TimeSheetWeek',
  TIME_SHEET_DAY: 'TimeSheetDay'
};

type User = {
  __type: string,
  id: number,
  name: string,
  email: string
}

let userId = 1;
const users: User[] = [
  {
    __type: TYPES.USER,
    id: userId++,
    name: 'Michal Svrček',
    email: 'svrcekmichal@gmail.com'
  },
  {
    __type: TYPES.USER,
    id: userId++,
    name: 'Peter Kowalczyk',
    email: 'peter@aurity.co'
  },
  {
    __type: TYPES.USER,
    id: userId++,
    name: 'Danuta Kowalczyk',
    email: 'danuta@aurity.co'
  },
  ...(new Array(17).fill().map(() => { //generate some fake data
    const email = Faker.internet.email();
    const name = email.split('@')[0];
    return {
      __type: TYPES.USER,
      id: userId++,
      name,
      email
    }
  }))
];

export const getUserById = (id: number) => new Promise((resolve,reject) => {
  const user = users.find((user) => user.id === id);
  user ? resolve(user) : reject(new Error('User does not exists'));
})

export const getUsers = () => Promise.resolve(users);

export type TimeSheetDayResponse = {
  __type: string,
  id: string,
  year_number: number,
  month_number: number,
  day_number: number,
  minutes: number,
  hours: number,
}

export type UserTimeSheetWeekResponse = {
  __type: string,
  id: string,
  year: number,
  week_number: number,
  status: ?number,
  owner_id: number,
  days_in_week: Array<TimeSheetDayResponse>,
  approvers: Array<number>,
  approved_by_id: ?number,
  approved_by_data: ?number
}


const generateWeekDays = (year, week) => {
  const day = moment().year(year).week(week);
  console.log(day.day())
  const days = [];
  for(let i = 0; i < 7; i++ ) {
    day.add(1, 'd');
    days.push({
      yearNum: day.get('year'),
      monthNum: day.get('month'),
      dayNum: day.get('date')
    })
  }
  return days;
}

const memoizedTimeSheet = Object.create(null);

export const getUserTimeSheetWeek = (userId: number, year: number, weekNumber: number):Promise<UserTimeSheetWeekResponse> => {
  const id = `${userId}_${year}_${weekNumber}`;
  const cache = memoizedTimeSheet[id];
  if(typeof cache !== 'undefined') {
    return cache;
  }
  const result = {
    __type: TYPES.TIME_SHEET_WEEK,
    id,
    year: year,
    week_number: weekNumber,
    status: null,
    owner_id: userId,
    days_in_week: generateWeekDays(year, weekNumber).map((day, i) => ({
      __type: TYPES.TIME_SHEET_DAY,
      id: `${id}===${i}`,
      hours: Math.floor(Math.random() * 8),
      minutes: Math.floor(Math.random() * 60),
      year_number: day.yearNum,
      month_number: day.monthNum,
      day_number: day.dayNum,
    })),
    approvers: [2, 3],
    approved_by_id: null,
    approved_by_data: null,
  };
  memoizedTimeSheet[id] = result;
  return Promise.resolve(result);
}
