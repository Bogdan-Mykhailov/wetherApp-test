import { Navigate, Route, RouteProps, Routes } from 'react-router-dom'
import { FC } from 'react'

import { RoutePath } from './RoutesPath'
import { DetailedWeatherInfo, Home, NotFound } from '../pages'
import { PATH } from './types'

export const routeConfig: Record<PATH, RouteProps> = {
  [PATH.MAIN]: {
    'path': RoutePath.main,
    'element': <Home />,
  },

  [PATH.DETAILED_WEATHER_INFO]: {
    'path': RoutePath.info,
    'element': <DetailedWeatherInfo />,
  },

  [PATH.HOME]: {
    'path': RoutePath.home,
    'element': <Navigate to={PATH.HOME} replace />,
  },

  [PATH.ERROR]: {
    'path': RoutePath.error,
    'element': <NotFound />,
  },
}

export const MainRoutes: FC = () => <Routes>
  {Object
    .values( routeConfig )
    .map( ( {
      path,
      element,
    } ) => <Route path={path} key={path} element={element} /> )}
</Routes>
