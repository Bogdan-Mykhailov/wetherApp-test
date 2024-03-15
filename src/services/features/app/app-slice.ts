import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AppSlice {
  isError: boolean
}

const initialState: AppSlice = {
  'isError': false,
}

const app = createSlice( {
  'name': 'app',
  initialState,
  'reducers': {
    'setError': ( state, action: PayloadAction<boolean> ) => {
      return {
        ...state,
        'isError': action.payload,
      }
    },
  },
} )

export const { setError } = app.actions
export const appSlice = app.reducer
