// @flow

import fetch from "node-fetch";
import {API_ENPOINTS} from "./../constants";
import {getTotalTime} from "./../utils/timeUtils";

import type {DailyTimesheet, MonthlyTimesheet, QueryResponse, WeeklyTimesheet} from "./../globalFlowTypes";

import {TYPES} from "./../relay";

const getTotalMonthTime = (timesheet: MonthlyTimesheet) => getTotalTime(timesheet.weeks.map((week: WeeklyTimesheet) => getTotalTime(week.days_in_week)))

const sortWeeks = (a: WeeklyTimesheet, b: WeeklyTimesheet) => a.week_number > b.week_number ? 1 : -1;

export const getMonthlyTimesheet = (userId: number, year: number, month: number): ?MonthlyTimesheet =>
  fetch(API_ENPOINTS.monthlyTimesheet(userId, year, month))
    .then(res => {
      if (res.status !== 200) {
        throw new Error('Error while fetching monthly timesheet');
      }
      return res.json();
    }).then((result: QueryResponse<MonthlyTimesheet>) => {
    const timesheet = result.data;
    //TODO fix on API level, is not valid it returns empty object instead of 404 not found
    if (timesheet.weeks.length === 0) {
      return null;
    }
    const {hours: totalHours, minutes: totalMinutes} = getTotalMonthTime(timesheet);
    return {
      ...timesheet,
      __type: TYPES.MONTHLY_TIMESHEET,
      //owner_id is not present in weeks and days if fetched with monthly query
      weeks: timesheet.weeks
        .sort(sortWeeks) //TODO fix on API level, not sorted weeks returned
        .map(week => {
          const {hours: totalHours, minutes: totalMinutes} = getTotalTime(week.days_in_week);
          return {
            ...week,
            __type: TYPES.WEEKLY_TIMESHEET,
            owner_id: userId,
            days_in_week: week.days_in_week.map((day: DailyTimesheet) => ({
              ...day,
              __type: TYPES.DAILY_TIMESHEET,
              owner_id: userId
            })),
            totalHours,
            totalMinutes
          };
        }),
      //TODO fix on API level, owner_id is expected to be number, not string
      owner_id: parseInt(timesheet.owner_id, 10),
      totalHours,
      totalMinutes
    };
  })

export const getWeeklyTimesheet = (userId: number, weekId: number): ?WeeklyTimesheet =>
  fetch(API_ENPOINTS.weeklyTimesheet(userId, weekId))
    .then(res => {
      if (res.status === 404) {
        return null;
      }
      if (res.status !== 200) {
        throw new Error('Error while fetching weekly timesheet');
      }
      return res.json();
    }).then((weeklyTimesheet: ?WeeklyTimesheet) => {
    if (!weeklyTimesheet) return null;
    const {hours: totalHours, minutes: totalMinutes} = getTotalTime(weeklyTimesheet.days_in_week);
    return {
      ...weeklyTimesheet,
      __type: TYPES.WEEKLY_TIMESHEET,
      //owner_id is not present in days if fetched with weekly query
      days_in_week: weeklyTimesheet.days_in_week.map(day => ({
        ...day,
        __type: TYPES.DAILY_TIMESHEET,
        owner_id: userId
      })),
      totalHours,
      totalMinutes
    }
  });

export const changeWeeklyTimesheetStatus = (weekId: number, loggedUserId: number, status: string) => {
  console.log(status);
  return fetch(API_ENPOINTS.changeWeeklytimesheetStatus(weekId, loggedUserId), {
    method: 'PUT',
    body: `status=${status}`, //just for simplicity
    headers: {
      'Accept': 'application/json, application/xml, text/play, text/html, *.*',
      'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
    },
  }).then(res => {
    if (res.status === 200) {
      return res.json();
    }
    console.log(res);
    throw new Error('Error while changing weekly timesheet status');
  });
}
