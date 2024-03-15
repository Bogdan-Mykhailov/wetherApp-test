import { Search } from '../../components'
import {
  setForecastData,
  setWeatherData,
  useAppDispatch,
  useAppSelector,
} from '../../services'
import { API_KEY, WEATHER_API_URL } from '../../api/geo/geo'
import { CardWrapper } from '../../components/CardWrapper'
import { FC } from 'react'

export const Home: FC = () => {
  const dispatch = useAppDispatch()
  const weather = useAppSelector( ( state ) => state.weather )

  const handleOnSearchChange = ( searchData: any ): void => {
    const [lat, lon] = searchData.value.split( ' ' )
    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${
        lon}&appid=${API_KEY}&units=metric`,
    )
    const forecastFetch = fetch(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${
        lon}&appid=${API_KEY}&units=metric`,
    )

    Promise.all( [currentWeatherFetch, forecastFetch] )
      .then( async ( res ) => {
        const weatherResponse = await res[0].json()
        const forecastResponse = await res[1].json()

        dispatch(
          setWeatherData( {
            'city': searchData.label,
            ...weatherResponse,
          } ),
        )
        dispatch(
          setForecastData( {
            'city': searchData.label,
            ...forecastResponse,
          } ),
        )
      } )
      .catch( ( error ) => {
        throw new Error( error.message )
      } )
  }

  return (
    <div>
      <Search onSearchChange={handleOnSearchChange} />

      {weather && <CardWrapper weatherData={weather}/>}

    </div>
  )
}
