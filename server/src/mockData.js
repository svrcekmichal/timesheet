// @flow

type User = {
  id: number,
  name: string,
  email: string
}

const users: User[] = [
  {
    id: 1,
    name: 'Michal Svrček',
    email: 'svrcekmichal@gmail.com'
  },
  {
    id: 2,
    name: 'Peter Kowalczyk',
    email: 'peter@aurity.co'
  },
  {
    id: 3,
    name: 'Danuta Kowalczyk',
    email: 'danuta@aurity.co'
  }
];

export const getUserById = (id: number) => new Promise((resolve,reject) => {
  const user = users.find((user) => user.id === id);
  user ? resolve(user) : reject(new Error('User does not exists'));
})

export const getUsers = () => Promise.resolve(users);

export type TimeSheetDayResponse = {
  id: number,
  day_number: number,
  minutes: number,
  hours: number
}

export type UserTimeSheetWeekResponse = {
  year: number,
  week_number: number,
  status: ?number,
  owner_id: number,
  days_in_week: Array<TimeSheetDayResponse>,
  approvers: Array<number>,
  approved_by_id: ?number,
  approved_by_data: ?number
}

export const getUserTimeSheetWeek = (userId: number, year: number, weekNumber: number):Promise<UserTimeSheetWeekResponse> => Promise.resolve({
  year: year,
  week_number: weekNumber,
  status: null,
  owner_id: userId,
  days_in_week: [
    {id: 1, hours: 0, minutes: 0, day_number: 26 },
    {id: 2, hours: 1, minutes: 30, day_number: 27 },
    {id: 3, hours: 0, minutes: 0, day_number: 28 },
    {id: 4, hours: 3, minutes: 30, day_number: 29 },
    {id: 5, hours: 0, minutes: 0, day_number: 30 },
    {id: 6, hours: 4, minutes: 30, day_number: 31 },
    {id: 7, hours: 5, minutes: 0, day_number: 1 },
  ],
  approvers: [2, 3],
  approved_by_id: null,
  approved_by_data: null,


})
