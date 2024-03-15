import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ForecastModel } from '../../../api/geo/model'

const initialState: ForecastModel = {} as ForecastModel

const forecast = createSlice( {
  'name': 'forecast',
  initialState,
  'reducers': {
    'setForecastData': ( _state, action: PayloadAction<ForecastModel> ) => {
      return action.payload
    },
  },
} )

export const { setForecastData } = forecast.actions
export const forecastSlice = forecast.reducer
