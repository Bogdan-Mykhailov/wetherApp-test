import { capitalizeFirstLetter } from '../../utils/helpers.ts'
import { useParams } from 'react-router'
import { WeatherModel } from '../../api/geo/model.ts'
import { FC } from 'react'
import { Divider } from 'antd'
import './WeatherInfo.css'

interface Props {
  cards: WeatherModel[]
}

export const WeatherInfo: FC<Props> = ( { cards } ) => {
  const { id } = useParams()
  const cardId = id && Number( id )
  const currentCard = cards.find( ( card ) => card.id === cardId )
  const {
    city,
    main,
    wind,
    weather,
  } = currentCard!

  return (
    <>
      <Divider
        orientation="left"
        style={{
          'color': 'white',
          'margin': 0,
          'fontSize': '28px',
        }}
      >
        {city}
      </Divider>

      <div className='weatherInfo'>
        <div className='weatherInfoRow'>
          <div className='weatherDescription'>
            <p className='weatherDescriptionText'>
              {capitalizeFirstLetter( weather[0].description )}
            </p>
          </div>
          <div>
            <p className='temperatureText'>
              {Math.round( main.temp )}°C
            </p>
          </div>
        </div>

        <div className='weatherInfoRow'>
          <ul className='infoList'>
            <li className='infoItem'>
              {`Feels like: ${Math.round( main.feels_like )}°C`}
            </li>
            <li className='infoItem'>
              {`Wind: ${wind.speed} m/s`}
            </li>
            <li className='infoItem'>
              {`Humidity: ${main.humidity}%`}
            </li>
            <li className='infoItem'>
              {`Pressure: ${main.pressure} hPa`}
            </li>
          </ul>
          <img
            className='weatherIcon'
            src={`icons/${weather[0].icon}.svg`}
            alt="Weather icon"
          />
        </div>
      </div>
    </>
  )
}
