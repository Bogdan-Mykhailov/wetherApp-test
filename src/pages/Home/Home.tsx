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
  setLoading, setLogout,
  setWeatherData,
  updateCard,
  useAppDispatch,
  useAppSelector,
} from '../../services'
import { API_KEY, WEATHER_API_URL } from '../../api/geo/geo'
import { FC, useEffect, useState } from 'react'
import { ResponseDataModel } from '../../api/geo/model.ts'
import { ErrorType } from '../../types/Types.ts'
import { MAIN_PAGE_VIDEO_PATH } from '../../utils/constants.ts'
import './Home.css'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { Button } from 'antd'

export const Home: FC = () => {
  const dispatch = useAppDispatch()
  const { isError } = useAppSelector( ( state ) => state.app )
  const cards = useAppSelector( ( state ) => state.weather.cards )
  const [search, setSearch] = useState<ResponseDataModel | null>( null )
  const [userName, setUserName] = useState<string | null>( null )
  const [email, setEmail] = useState<string | null>( null )

  useEffect( () => {
    const auth = getAuth()
    const unsubscribe = onAuthStateChanged( auth, ( user ) => {
      if ( user ) {
        const { displayName, email } = user
        setUserName( displayName )
        setEmail( email )
      } else {
        setUserName( null )
        setEmail( null )
      }
    } )

    return () => unsubscribe()
  }, [] )

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

  const handleLogoutClick = () => {
    dispatch( setLogout() )
  }

  return (
    <Video path={MAIN_PAGE_VIDEO_PATH}>
      <Button
        type="default"
        size='small'
        className='logoutButton'
        onClick={handleLogoutClick}
      >
        Logout
      </Button>
      <div className='welcomeBlock'>
        <span className='welcomeTitle'>Welcome, <span className='welcomeTitleName'>
          {userName}
        </span>
        </span>
        <p className='welcomeSubtitle'>{email}</p>
      </div>

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
