import {
  MainCard,
  Notification,
  Search,
  Video,
} from '../../components'
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
import { MAIN_PAGE_VIDEO_PATH } from '../../utils/constants.ts'
import './Home.css'

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
      dispatch( setError( ErrorType.FETCHING_DATA ) )
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
      dispatch( setError( ErrorType.NONE ) )
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

  const updateWeather = ( {
    lat,
    lon,
    id,
    city,
  }: {
    lat: number
    lon: number
    id: number
    city: string
  } ) => {
    try {
      dispatch( setLoading( true ) )
      dispatch( updateCard( {
        lat,
        lon,
        id,
        city,
      } ) )
    } catch {
      dispatch( setError( ErrorType.REMOVE_CARD ) )
    } finally {
      dispatch( setLoading( false ) )
      dispatch( setError( ErrorType.NONE ) )
    }
  }

  return (
    <Video path={MAIN_PAGE_VIDEO_PATH}>
      <div className='homeContainer'>

        <div className='searchWrapper'>
          <Search
            search={search}
            setSearch={setSearch}
            onSearchChange={handleOnSearchChange}
          />
        </div>

        <div className='scrolledContainerWrapper'>
          <div className='cardsWrapper'>
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
    </Video>
  )
}
