import { FC } from 'react'
import { WeatherModel } from '../../api/geo/model'
import { MainCard } from '../MainCard'

interface Props {
  weatherData: WeatherModel
}
export const CardWrapper: FC<Props> = ( { weatherData } ) => {
  return (
    <>
      <MainCard weatherData={weatherData} />
    </>
  )
}
