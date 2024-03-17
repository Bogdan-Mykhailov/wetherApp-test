import { FC } from 'react'
import { ForecastModel } from '../../api/geo/model.ts'
import { capitalizeFirstLetter, forecastDays } from '../../utils/helpers.ts'
import { Collapse } from 'antd'
import { useParams } from 'react-router'
import './Forecast.css'

interface Props {
  forecasts: ForecastModel[]
}

export const Forecast: FC<Props> = ( { forecasts } ) => {
  const { id } = useParams()
  const cardId = id && Number( id )
  const currentForecast = forecasts
    .find( ( forecast ) => forecast.city.id === cardId )
  const { list } = currentForecast!

  const items = list.slice( 0, 7 ).map( ( day, idx ) => ( {
    'key': `${idx}`,
    'showArrow': false,
    'label':
      <div className='forecastLabel'>
        <div className='forecastWrapper'>
          <img
            className='forecastIcon'
            src={`icons/${day.weather[0].icon}.png`}
            alt="weatherIcon"
          />
          <label>{forecastDays[idx]}</label>
        </div>
        <div className='forecastWrapper'>
          <label>{capitalizeFirstLetter( day.weather[0].description )}</label>
          <label>
            {`${Math.round( day.main.temp_min )}
            / ${Math.round( day.main.temp_max )}°C`}
          </label>
        </div>
      </div>,
    'children':
      <div className='forecastDetails'>
        <ul className='forecastList'>
          <li className='forecastListItem'>
            <label className='forecastDetailsLabel'>Feels like:</label>
            <label>{Math.round( day.main.feels_like )}°C</label>
          </li>
          <li className='forecastListItem'>
            <label className='forecastDetailsLabel'>Pressure:</label>
            <label>{day.main.pressure} hPa</label>
          </li>
          <li className='forecastListItem'>
            <label className='forecastDetailsLabel'>Humidity:</label>
            <label>{day.main.humidity}%</label>
          </li>
        </ul>
        <ul className='forecastList'>
          <li className='forecastListItem'>
            <label className='forecastDetailsLabel'>Clouds:</label>
            <label>{day.clouds.all}%</label>
          </li>
          <li className='forecastListItem'>
            <label className='forecastDetailsLabel'>Wind speed:</label>
            <label>{day.wind.speed} m/s</label>
          </li>
          <li className='forecastListItem'>
            <label className='forecastDetailsLabel'>Sea level:</label>
            <label>{day.main.sea_level} m</label>
          </li>
        </ul>
      </div>,
  } ) )
  return (
    <Collapse
      accordion
      className='forecastCollapse'
      size="small"
      items={items}
    />
  )
}
