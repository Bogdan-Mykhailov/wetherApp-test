import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { WeatherModel } from '../../../api/geo/model'
import { API_KEY, WEATHER_API_URL } from '../../../api/geo/geo.ts'

interface WeatherState {
  currentWeather: WeatherModel
  cards: WeatherModel[]
  selectedCardId: number | null
}

const initialState: WeatherState = {
  'currentWeather': {} as WeatherModel,
  'cards': JSON.parse( localStorage.getItem( 'cards' ) || '[]' ),
  'selectedCardId': null,
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
    'updateCard': ( state, action: PayloadAction<{
      id: number
      newData: WeatherModel
    }> ) => {
      const { id, newData } = action.payload
      state.cards = state.cards
        .map( ( card ) => card.id === id ? newData : card )
      localStorage.setItem( 'cards', JSON.stringify( state.cards ) )
      state.selectedCardId = id
    },
    'removeCardById': ( state, action: PayloadAction<number> ) => {
      const idToRemove = action.payload
      state.cards = state.cards.filter( ( card ) => card.id !== idToRemove )
      localStorage.setItem( 'cards', JSON.stringify( state.cards ) )
    },
  },
} )

export const updateCardById = createAsyncThunk(
  'weather/updateCard',
  async ( { id, lat, lon }: {
    id: number
    lat: number
    lon: number
  } ) => {
    const response = await fetch( `${WEATHER_API_URL}/weather?lat=${lat}&lon=${
      lon}&appid=${API_KEY}&units=metric` )
    const updatedData = await response.json()
    return { id, updatedData }
  },
)

export const { setWeatherData, addCard, removeCardById } = weather.actions
export const weatherSlice = weather.reducer
