const WEEK_DAYS =
  [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ]

const dayInAWeek = new Date().getDay()
export const forecastDays = [
  ...WEEK_DAYS.slice( dayInAWeek, WEEK_DAYS.length ),
  ...WEEK_DAYS.slice( 0, dayInAWeek ),
]
