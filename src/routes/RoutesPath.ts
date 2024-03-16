import { PATH } from './types'

export const RoutePath: Record<PATH, string> = {
  [PATH.Main]: '/',
  [PATH.Home]: '/home',
  [PATH.Info]: '/info/:id',
  [PATH.Error]: '*',
}
