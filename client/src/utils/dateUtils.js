// @flow

export const getWeekNumber = (date: Date) => {
  const day = new Date(+date);
  day.setHours(0,0,0);
  day.setDate(day.getDate() + 4 -(day.getDay() || 7));
  return Math.ceil((((day - new Date(day.getFullYear(),0,1))/8.64e7)+1)/7);
};

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export const getMaxWeekNumber = (year: number) => getWeekNumber(new Date(year, 11, 31));

export const getMonthName = (index:number) => monthNames[index];

