import { PATH } from './types'

export const RoutePath: Record<PATH, string> = {
  [PATH.MAIN]: '/',
  [PATH.HOME]: '/home',
  [PATH.DETAILED_WEATHER_INFO]: '/info',
  [PATH.ERROR]: '*',
}
