import { configureStore } from '@reduxjs/toolkit'
import {
  appSlice,
  forecastSlice,
  weatherSlice,
} from './features'

export const store = configureStore( {
  'reducer': {
    'app': appSlice,
    'weather': weatherSlice,
    'forecast': forecastSlice,
  },
} )

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
