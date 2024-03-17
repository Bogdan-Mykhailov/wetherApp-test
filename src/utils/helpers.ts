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

export const capitalizeFirstLetter = ( title: string ) => {
  if ( title.length === 0 ) {
    return title
  }

  return title.charAt( 0 ).toUpperCase() + title.slice( 1 )
}
