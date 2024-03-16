import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ErrorType } from '../../../types/Types.ts'

interface AppSlice {
  isError: ErrorType
  isLoading: boolean
}

const initialState: AppSlice = {
  'isError': ErrorType.NONE,
  'isLoading': false,
}

const app = createSlice( {
  'name': 'app',
  initialState,
  'reducers': {
    'setError': ( state, action: PayloadAction<ErrorType> ) => {
      state.isError = action.payload
    },
    'setLoading': ( state, action: PayloadAction<boolean> ) => {
      state.isLoading = action.payload
    },
  },
} )

export const {
  setError,
  setLoading,
} = app.actions
export const appSlice = app.reducer
