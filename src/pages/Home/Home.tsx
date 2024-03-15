import { MainCard, Search } from '../../components'
import {
  addCard, removeCardById,
  setForecastData, setWeatherData,
  useAppDispatch, useAppSelector,
} from '../../services'
import { API_KEY, WEATHER_API_URL } from '../../api/geo/geo'
import { FC, useState } from 'react'
import { ResponseDataModel } from '../../api/geo/model.ts'

export const Home: FC = () => {
  const dispatch = useAppDispatch()
  const cards = useAppSelector( ( state ) => state.weather.cards )
  const [search, setSearch] = useState<ResponseDataModel | null>( null )

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

        dispatch( addCard( {
          'city': searchData.label,
          ...weatherResponse,
        } ) )

        setSearch( null )
      } )
      .catch( ( error ) => {
        throw new Error( error.message )
      } )
  }

  const removeCard = ( id: number ) => {
    dispatch( removeCardById( id ) )
  }

  return (
    <div>
      <Search
        search={search}
        setSearch={setSearch}
        onSearchChange={handleOnSearchChange}
      />

      {cards.map( ( card ) => <MainCard
        key={card.city}
        weatherData={card}
        removeCard={removeCard}
      /> )}

    </div>
  )
}
