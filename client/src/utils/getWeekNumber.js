// @flow

export default (date: Date) => {
  const day = new Date(+date);
  day.setHours(0,0,0);
  day.setDate(day.getDate() + 4 -(day.getDay() || 7));
  return Math.ceil((((day - new Date(day.getFullYear(),0,1))/8.64e7)+1)/7);
};