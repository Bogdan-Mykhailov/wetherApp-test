import { Navigate, Route, RouteProps, Routes } from 'react-router-dom'
import { FC } from 'react'

import { RoutePath } from './RoutesPath'
import { DetailedWeatherInfo, Home, NotFound } from '../pages'
import { PATH } from './types'

export const routeConfig: Record<PATH, RouteProps> = {
  [PATH.Main]: {
    'path': RoutePath.main,
    'element': <Home />,
  },

  [PATH.Home]: {
    'path': RoutePath.home,
    'element': <Navigate to={PATH.Home} replace />,
  },

  [PATH.Info]: {
    'path': RoutePath.info,
    'element': <DetailedWeatherInfo />,
  },

  [PATH.Error]: {
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
    } ) => <Route
      path={path}
      key={path}
      element={element}
    /> )}
</Routes>
