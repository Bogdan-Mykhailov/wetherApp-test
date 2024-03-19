import { FC, useEffect } from 'react'
import { useAppSelector } from './services'
import { useNavigate } from 'react-router'
import { MainRoutes } from './routes'

export const App: FC = () => {
  const isAuthenticated = useAppSelector( ( state ) => state.auth.isAuthenticated )
  const navigate = useNavigate()

  useEffect( () => {
    if ( isAuthenticated ) {
      navigate( '/home' )
    } else {
      navigate( '/login' )
    }
  }, [isAuthenticated] )

  return (
    <>
      <MainRoutes />
    </>
  )
}
