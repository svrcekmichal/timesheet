// @flow

const ENDPOINT = 'https://timesheet-staging-aurity.herokuapp.com/api';

//because api index months from 1, not 0
const fixMonthNumber = (month: number) => month + 1;

export const API_ENPOINTS = {
  users: () => `${ENDPOINT}/users`,
  user: (userId: number) => `${ENDPOINT}/users/${userId}`,
  monthlyTimesheet: (userId: number, year: number, month: number) => `${ENDPOINT}/training/weeks/${fixMonthNumber(month)}/${year}/${userId}`,
  weeklyTimesheet: (userId: number, weekId: number) => `${ENDPOINT}/training/weeks/${weekId}/users/${userId}`,
  changeWeeklytimesheetStatus: (weekId: number, loggedUserId: number) => `${ENDPOINT}/training/weeks/${weekId}/users/${loggedUserId}`
}