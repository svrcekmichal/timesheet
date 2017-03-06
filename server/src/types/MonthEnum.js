import {
  GraphQLEnumType
} from 'graphql'

export const MonthEnum = new GraphQLEnumType({
  name: 'Month',
  values: {
    JANUARY:    { value: 0 },
    FEBRUARY:   { value: 1 },
    MARCH:      { value: 2 },
    APRIL:      { value: 3 },
    MAY:        { value: 4 },
    JUNE:       { value: 5 },
    JULY:       { value: 6 },
    AUGUST:     { value: 7 },
    SEPTEMBER:  { value: 8 },
    OCTOBER:    { value: 9 },
    NOVEMBER:   { value: 10 },
    DECEMBER:   { value: 11 }
  }
})













