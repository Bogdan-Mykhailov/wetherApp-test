import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit'
import { WeatherModel } from '../../../api/geo/model'
import { setLoading } from '../app'
import { API_KEY, WEATHER_API_URL } from '../../../api/geo/geo'

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
    'setWeatherData': ( state, action: PayloadAction<{
      id: number
      city: string
      data: WeatherModel
    }> ) => {
      const { id, city, data } = action.payload
      const isDuplicate = state.cards
        .some( ( card ) => card.id === id && card.city === city )
      if ( !isDuplicate ) {
        const index = state.cards
          .findIndex( ( card ) => card.id === id && card.city === city )
        if ( index !== -1 ) {
          state.cards[index] = data
        }
      }
      localStorage.setItem( 'cards', JSON.stringify( state.cards ) )
    },
    'addCard': ( state, action: PayloadAction<WeatherModel> ) => {
      const newCard = action.payload
      const isDuplicate = state.cards
        .some( ( card ) => card.id === newCard.id )
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

export const updateCard = ( { lat, lon, id, city }: {
  lat: number
  lon: number
  id: number
  city: string
} ) => async ( dispatch: Dispatch ) => {
  dispatch( setLoading( true ) )
  try {
    const response = await fetch( `${WEATHER_API_URL}/weather?lat=${
      lat}&lon=${lon}&appid=${API_KEY}&units=metric` )
    const updatedData: WeatherModel = await response.json()
    updatedData.city = city
    dispatch( setWeatherData( { id, city, 'data': updatedData } ) )
    dispatch( setLoading( false ) )
  } catch ( error ) {
    dispatch( setLoading( false ) )
    throw error
  }
}

export const {
  setWeatherData,
  addCard,
  removeCardById,
} = weather.actions
export const weatherSlice = weather.reducer
