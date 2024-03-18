import { FC } from 'react'
import { getAuth, signInWithPopup } from 'firebase/auth'
import { app, provider } from '../../../firebase.ts'
import './Login.css'
import { ErrorType } from '../../types/Types.ts'
import { setError, setLoading, setLogin, useAppDispatch, useAppSelector } from '../../services'
import { Button } from 'antd'

export const Login: FC = () => {
  const auth = getAuth( app )
  const dispatch = useAppDispatch()
  const isLoading = useAppSelector( ( state ) => state.app.isLoading )

  const handleGoogleLogin = async () => {
    dispatch( setLoading( true ) )
    try {
      if ( auth.currentUser === null ) {
        const result = await signInWithPopup( auth, provider )
        if ( result.user !== null ) {
          dispatch( setLogin( result.user.uid ) )
        }
      } else {
        dispatch( setLogin( auth.currentUser.uid ) )
      }
    } catch {
      dispatch( setError( ErrorType.AUTH ) )
    } finally {
      dispatch( setLoading( false ) )
      dispatch( setError( ErrorType.NONE ) )
    }
  }

  return (
    <div className='loginContainer'>
      <Button
        loading={isLoading}
        onClick={handleGoogleLogin}
      >
        Login with Google
      </Button>
    </div>
  )
}
