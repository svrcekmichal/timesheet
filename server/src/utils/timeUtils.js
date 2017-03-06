// @flow

import type { DailyTimesheet, TrackedTime } from './../globalFlowTypes';

export const getTotalTime = (times: Array<DailyTimesheet|TrackedTime>): TrackedTime =>
  times.reduce((totalTime: TrackedTime, current: TrackedTime) => {
    totalTime.hours += current.hours;
    totalTime.minutes += current.minutes;
    if(totalTime.minutes >= 60) {
      totalTime.hours += parseInt(totalTime.minutes / 60);
      totalTime.minutes %= 60;
    }
    return totalTime;
  }, {
    hours: 0,
    minutes: 0
  })