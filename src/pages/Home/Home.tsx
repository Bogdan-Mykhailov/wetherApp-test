import { MainCard, Notification, Search } from '../../components'
import {
  addCard,
  removeCardById,
  removeForecastById,
  setError,
  setForecastData,
  setLoading,
  setWeatherData,
  updateCard,
  useAppDispatch,
  useAppSelector,
} from '../../services'
import { API_KEY, WEATHER_API_URL } from '../../api/geo/geo'
import { FC, useState } from 'react'
import { ResponseDataModel } from '../../api/geo/model.ts'
import { ErrorType } from '../../types/Types.ts'

export const Home: FC = () => {
  const dispatch = useAppDispatch()
  const { isError } = useAppSelector( ( state ) => state.app )
  const cards = useAppSelector( ( state ) => state.weather.cards )
  const [search, setSearch] = useState<ResponseDataModel | null>( null )

  const fetchWeatherData = async ( lat: string, lon: string ) => {
    const weatherResponse = await fetch( `${WEATHER_API_URL}/weather?lat=${
      lat}&lon=${lon}&appid=${API_KEY}&units=metric` )
    const forecastResponse = await fetch( `${WEATHER_API_URL}/forecast?lat=${
      lat}&lon=${lon}&appid=${API_KEY}&units=metric` )

    if ( !weatherResponse.ok || !forecastResponse.ok ) {
      throw new Error( 'Failed to fetch weather data' )
    }

    const weatherData = await weatherResponse.json()
    const forecastData = await forecastResponse.json()
    return { weatherData, forecastData }
  }

  const handleOnSearchChange = async ( searchData: any ) => {
    try {
      dispatch( setLoading( true ) )
      const [lat, lon] = searchData.value.split( ' ' )
      const { weatherData, forecastData } = await fetchWeatherData( lat, lon )

      dispatch( setForecastData( {
        'city': searchData.label,
        ...forecastData,
      } ) )

      dispatch( setWeatherData( {
        'city': searchData.label,
        ...weatherData,
      } ) )

      dispatch( addCard( {
        'city': searchData.label,
        ...weatherData,
      } ) )

      setSearch( null )
    } catch {
      dispatch( setError( ErrorType.FETCHING_DATA ) )
    } finally {
      dispatch( setLoading( false ) )
    }
  }

  const removeCard = ( id: number ) => {
    try {
      dispatch( setLoading( true ) )
      dispatch( removeCardById( id ) )
      dispatch( removeForecastById( id ) )
    } catch {
      dispatch( setError( ErrorType.REMOVE_CARD ) )
    } finally {
      dispatch( setLoading( false ) )
      dispatch( setError( ErrorType.NONE ) )
    }
  }

  const updateWeather = ( { lat, lon, id, city }: {
    lat: number
    lon: number
    id: number
    city: string
  } ) => {
    dispatch( updateCard( { lat, lon, id, city } ) )
  }

  return (
    <div style={{ 'width': '100%', 'padding': '40px 0' }}>
      <div style={{
        'width': '40%',
        'margin': '0 auto',
        'marginBottom': '30px',
      }}>
        <Search
          search={search}
          setSearch={setSearch}
          onSearchChange={handleOnSearchChange}
        />
      </div>

      <div style={{
        'width': '80%',
        'margin': '0 auto',
        'overflow': 'scroll',
        'maxHeight': '80vh',
      }}>
        <div style={{
          'display': 'flex',
          'flexWrap': 'wrap',
          'justifyContent': 'center',
          'gap': 20,
        }}>
          {cards.map( ( card ) => <MainCard
            key={card.city}
            weatherData={card}
            removeCard={removeCard}
            updateCard={updateWeather}
          /> )}
        </div>
      </div>

      {isError && <Notification title={isError}/>}

    </div>
  )
}
