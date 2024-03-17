import { User, getAuth, signInWithPopup } from 'firebase/auth'
import { app, provider } from '../../../firebase.ts'
import { useEffect, useState } from 'react'
import { ErrorType } from '../../types/Types.ts'
import { MainRoutes } from '../../routes'
import { Spin } from 'antd'
import './Login.css'

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

  return user === null ? <div className='loginContainer'>
    <Spin size='large' tip="Loading...">
      <div className='loadingPlaceholder'/>
    </Spin>
  </div> : <MainRoutes/>
}
