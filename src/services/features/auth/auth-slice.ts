import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AuthState {
  isAuthenticated: boolean
  userId: string | null
}

const storedUser = localStorage.getItem( 'user' )
let initialUser: AuthState = {
  'isAuthenticated': false,
  'userId': null,
}

if ( storedUser ) {
  const parsedUser = JSON.parse( storedUser )
  if ( parsedUser && parsedUser.isAuthenticated ) {
    initialUser = parsedUser
  }
}

const initialState: AuthState = initialUser

const auth = createSlice( {
  'name': 'auth',
  initialState,
  'reducers': {
    setLogin( state, action: PayloadAction<string> ) {
      state.isAuthenticated = true
      state.userId = action.payload
      localStorage.setItem( 'user', JSON.stringify( state ) )
    },
    setLogout( state ) {
      state.isAuthenticated = false
      state.userId = null
      localStorage.setItem( 'user', JSON.stringify( state ) )
    },
  },
} )

export const {
  setLogin,
  setLogout,
} = auth.actions
export const authSlice = auth.reducer
