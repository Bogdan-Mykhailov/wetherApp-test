import { FC } from 'react'
import { useParams } from 'react-router'
import { useAppSelector } from '../../services'
import { Collapse, Divider } from 'antd'
import { capitalizeFirstLetter, forecastDays } from '../../utils/helpers.ts'
import { LeftSquareOutlined } from '@ant-design/icons'

export const DetailedWeatherInfo: FC = () => {
  const { id } = useParams()
  const cards = useAppSelector( ( state ) => state.weather.cards )
  const forecasts = useAppSelector( ( state ) => state.forecast.forecasts )

  const cardId = id && Number( id )

  const currentCard = cards.find( ( card ) => card.id === cardId )
  const currentForecast = forecasts
    .find( ( forecast ) => forecast.city.id === cardId )

  const { city, main, wind, weather } = currentCard!
  const { list } = currentForecast!

  const handleClick = () => {
    window.history.back()
  }

  const items = list.slice( 0, 7 ).map( ( day, idx ) => ( {
    'key': `${idx}`,
    'showArrow': false,
    'label':
      <div
        style={{
          'display': 'flex',
          'alignItems': 'center',
          'justifyContent': 'space-between',
          'padding': '0 20px',
        }}
      >
        <div style={{ 'display': 'flex', 'alignItems': 'center', 'gap': 20 }}>
          <img
            style={{ 'width': '34px' }}
            src={`icons/${day.weather[0].icon}.png`}
            alt="weatherIcon"
          />
          <label>{forecastDays[idx]}</label>
        </div>
        <div style={{ 'display': 'flex', 'alignItems': 'center', 'gap': 20 }}>
          <label>{capitalizeFirstLetter( day.weather[0].description )}</label>
          <label>
            {`${Math.round( day.main.temp_min )}
            / ${Math.round( day.main.temp_max )}°C`}
          </label>
        </div>
      </div>,
    'children':
      <div style={{
        'display': 'flex',
        'alignItems': 'center',
        'justifyContent': 'space-between',
      }}>
        <div style={{ 'width': '50%' }}>
          <div style={{
            'display': 'flex',
            'justifyContent': 'space-between',
            'padding': '0 10px',
          }}>
            <label style={{ 'color': '#757575' }}>Feels like:</label>
            <label>{Math.round( day.main.feels_like )}°C</label>
          </div>
          <div style={{
            'display': 'flex',
            'justifyContent': 'space-between',
            'padding': '0 10px',
          }}>
            <label style={{ 'color': '#757575' }}>Pressure:</label>
            <label>{day.main.pressure} hPa</label>
          </div>
          <div style={{
            'display': 'flex',
            'justifyContent': 'space-between',
            'padding': '0 10px',
          }}>
            <label style={{ 'color': '#757575' }}>Humidity:</label>
            <label>{day.main.humidity}%</label>
          </div>
        </div>
        <div style={{ 'width': '50%' }}>
          <div style={{
            'display': 'flex',
            'justifyContent': 'space-between',
            'padding': '0 10px',
          }}>
            <label style={{ 'color': '#757575' }}>Clouds:</label>
            <label>{day.clouds.all}%</label>
          </div>
          <div style={{
            'display': 'flex',
            'justifyContent': 'space-between',
            'padding': '0 10px',
          }}>
            <label style={{ 'color': '#757575' }}>Wind speed:</label>
            <label>{day.wind.speed} m/s</label>
          </div>
          <div style={{
            'display': 'flex',
            'justifyContent': 'space-between',
            'padding': '0 10px',
          }}>
            <label style={{ 'color': '#757575' }}>Sea level:</label>
            <label>{day.main.sea_level} m</label>
          </div>
        </div>
      </div>,
  } ) )

  return (
    <>
      <LeftSquareOutlined style={{
        'margin': '10px 20px',
        'fontSize': '24px',
      }} onClick={handleClick}/>

      <Divider
        orientation="left"
        style={{ 'fontSize': '28px', 'margin': 0 }}
      >
        {city}
      </Divider>
      <div style={{
        'width': '40%',
        'display': 'flex',
        'flexDirection': 'column',
        'alignItems': 'center',
        'justifyContent': 'space-between',
        'border': '1px dashed gray',
        'borderRadius': 8,
        'padding': '0 30px',
        'boxSizing': 'border-box',
        'margin': '0 auto',
      }}>
        <div style={{
          'width': '100%',
          'display': 'flex',
          'alignItems': 'center',
          'justifyContent': 'space-between',
        }}>
          <div style={{ 'display': 'flex', 'flexDirection': 'column' }}>
            <p style={{
              'margin': 0,
              'padding': '10px 0',
              'fontSize': '26px',
            }}
            >
              {capitalizeFirstLetter( weather[0].description )}
            </p>
          </div>
          <div>
            <p style={{
              'fontSize': '30px',
              'margin': 0,
            }}>
              {Math.round( main.temp )}°C
            </p>
          </div>
        </div>

        <div style={{
          'width': '100%',
          'display': 'flex',
          'alignItems': 'center',
          'justifyContent': 'space-between',
        }}>
          <ul style={{
            'width': '100%',
            'listStyle': 'none',
            'padding': 0,
            'margin': 0,
          }}>
            <li style={{
              'marginBottom': '5px',
              'fontSize': '16px',
            }}>{`Feels like: ${Math.round( main.feels_like )}°C`}</li>
            <li style={{
              'marginBottom': '5px',
              'fontSize': '16px',
            }}>{`Wind: ${wind.speed} m/s`}</li>
            <li style={{
              'marginBottom': '5px',
              'fontSize': '16px',
            }}>{`Humidity: ${main.humidity}%`}</li>
            <li style={{
              'marginBottom': '5px',
              'fontSize': '16px',
            }}>{`Pressure: ${main.pressure} hPa`}</li>
          </ul>
          <img
            style={{ 'width': 90 }}
            src={`icons/${weather[0].icon}.png`}
            alt="Weather icon"
          />
        </div>
      </div>

      <Divider orientation="center">Weekly Forecast</Divider>

      <Collapse
        accordion
        style={{
          'width': '70%',
          'margin': '0 auto',
          'marginBottom': '10px',
        }}
        size="small"
        items={items}
      />
    </>
  )
}
