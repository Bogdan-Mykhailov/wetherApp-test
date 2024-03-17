import { User, getAuth, signInWithPopup } from 'firebase/auth'
import { app, provider } from '../../../firebase.ts'
import { useEffect, useState } from 'react'
import { ErrorType } from '../../types/Types.ts'
import { MainRoutes } from '../../routes'
import { Spin } from 'antd'

export const Login = () => {
  const auth = getAuth( app )
  const [user, setUser] = useState<User | null>( auth.currentUser )

  useEffect( () => {
    return auth.onAuthStateChanged( ( maybeUser ) => {
      if ( maybeUser !== null ) {
        return setUser( maybeUser )
      }

      signInWithPopup( auth, provider )
        .then( ( credentials ) => setUser( credentials.user ) )
        .catch( ( ) => ErrorType.AUTH )
    } )
  }, [auth] )

  return user === null ? <div
    style={{
      'width': '100vw',
      'height': '100vh',
      'display': 'flex',
      'alignItems': 'center',
      'justifyContent': 'center',
    }}>
    <Spin size='large' tip="Loading...">
      <div style={{
        'padding': '50px',
      }}/>
    </Spin>
  </div> : <MainRoutes/>
}
