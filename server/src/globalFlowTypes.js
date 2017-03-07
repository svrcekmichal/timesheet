// @flow

export type TrackedTime = {
  hours: number,
  minutes: number
};


export type DailyTimesheet = {
  owner_id: number,
  id: number,
  day_number: number,
  minutes: number,
  hours: number,
}

export type WeeklyTimesheet = {
  owner_id: number,
  week_number: number,
  week_id: number,
  status: null,
  days_in_week: Array<DailyTimesheet>,
  approvers: Array<number>,
  approved_by_id: ?number,
  approved_by_date: ?string,
  totalHours: number,
  totalMinutes: number
};

export type MonthlyTimesheet = {
  year: number,
  weeks: Array<WeeklyTimesheet>,
  owner_id: number,
  month: number,
  totalHours: number,
  totalMinutes: number
};

export type QueryResponse<T> = {
  data: T
}

export type User = {
  id: number,
  username: string,
  email: string
}

export type ExecutionContext = {
  loggedUser: ?number
}

export type Note = {
  id: number,
  userId: number,
  weekId: number,
  message: string,
}