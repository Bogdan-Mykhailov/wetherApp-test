import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { WeatherModel } from '../../../api/geo/model'

interface WeatherState {
  currentWeather: WeatherModel
  cards: WeatherModel[]
}

const initialState: WeatherState = {
  'currentWeather': {} as WeatherModel,
  'cards': JSON.parse( localStorage.getItem( 'cards' ) || '[]' ),
}

const weather = createSlice( {
  'name': 'weather',
  initialState,
  'reducers': {
    'setWeatherData': ( state, action: PayloadAction<WeatherModel> ) => {
      state.currentWeather = action.payload
    },
    'addCard': ( state, action: PayloadAction<WeatherModel> ) => {
      const newCard = action.payload
      const isDuplicate = state.cards.some( ( card ) => card.id === newCard.id )
      if ( !isDuplicate ) {
        state.cards.push( newCard )
        localStorage.setItem( 'cards', JSON.stringify( state.cards ) )
      }
    },
    'removeCardById': ( state, action: PayloadAction<number> ) => {
      const idToRemove = action.payload
      state.cards = state.cards.filter( ( card ) => card.id !== idToRemove )
      localStorage.setItem( 'cards', JSON.stringify( state.cards ) )
    },
  },
} )

export const { setWeatherData, addCard, removeCardById } = weather.actions
export const weatherSlice = weather.reducer
