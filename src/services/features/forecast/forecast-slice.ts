import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ForecastModel } from '../../../api/geo/model'

interface ForecastState {
  forecasts: ForecastModel[]
}

const initialState: ForecastState = {
  'forecasts': JSON.parse( localStorage.getItem( 'forecasts' ) || '[]' ),
}

const forecast = createSlice( {
  'name': 'forecast',
  initialState,
  'reducers': {
    'setForecastData': ( state, action: PayloadAction<ForecastModel> ) => {
      const newForecast = action.payload
      const isDuplicate = state.forecasts
        .some( ( forecast ) => forecast.city === newForecast.city )
      if ( !isDuplicate ) {
        state.forecasts.push( newForecast )
        localStorage.setItem( 'forecasts', JSON.stringify( state.forecasts ) )
      }
    },
    'removeForecastById': ( state, action: PayloadAction<number> ) => {
      const id = action.payload
      state.forecasts = state.forecasts
        .filter( ( forecast ) => forecast.city.id !== id )
      localStorage.setItem( 'forecasts', JSON.stringify( state.forecasts ) )
    },
  },
} )

export const { setForecastData, removeForecastById } = forecast.actions
export const forecastSlice = forecast.reducer
