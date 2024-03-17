import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ForecastModel } from '../../../api/geo/model'

interface ForecastState {
  forecasts: ForecastModel[]
}

const initialState: ForecastState = {
  'forecasts': JSON.parse( localStorage.getItem( 'forecasts' ) || '[]' ),
}

const forecast = createSlice( {
  'name': 'forecast',
  initialState,
  'reducers': {
    'setForecastData': ( state, action: PayloadAction<ForecastModel> ) => {
      const newForecast = action.payload
      const isDuplicate = state.forecasts
        .some( ( forecast ) => forecast.city === newForecast.city )
      if ( !isDuplicate ) {
        state.forecasts.push( newForecast )
        localStorage.setItem( 'forecasts', JSON.stringify( state.forecasts ) )
      }
    },
    'removeForecastById': ( state, action: PayloadAction<number> ) => {
      const id = action.payload
      state.forecasts = state.forecasts
        .filter( ( forecast ) => forecast.city.id !== id )
      localStorage.setItem( 'forecasts', JSON.stringify( state.forecasts ) )
    },
  },
} )

export const { setForecastData, removeForecastById } = forecast.actions
export const forecastSlice = forecast.reducer

//
// import { FC } from 'react'
// import { useParams } from 'react-router'
// import { useAppSelector } from '../../services'
// import { Collapse, Divider } from 'antd'
// import { forecastDays } from '../../utils/helpers.ts'
// import { LeftSquareOutlined } from '@ant-design/icons'
//
// export const DetailedWeatherInfo: FC = () => {
//   const { id } = useParams()
//   const cards = useAppSelector( ( state ) => state.weather.cards )
//   const forecasts = useAppSelector( ( state ) => state.forecast.forecasts )
//
//   const cardId = id && Number( id )
//
//   const currentCard = cards.find( ( card ) => card.id === cardId )
//   const currentForecast = forecasts
//     .find( ( forecast ) => forecast.city.id === cardId )
//
//   const { city, main, wind, weather } = currentCard!
//   const { list } = currentForecast!
//
//   const handleClick = () => {
//     window.history.back()
//   }
//
//   return (
//     <>
//       <LeftSquareOutlined onClick={handleClick}/>
//
//   <div>
//   <Divider orientation="left">{city}</Divider>
//     <img
//   src={`icons/${weather[0].icon}.png`}
//   alt="Weather icon"
//     />
//     <p>{weather[0].description}</p>
//     </div>
//     <p>{Math.round( main.temp )}°C</p>
//
//   <div>
//   <div>
//     <span>Details</span>
//   </div>
//   <div>
//   <span>Feels like</span>
//   <span>{Math.round( main.feels_like )}°C</span>
//   </div>
//   <div>
//   <span>Wind</span>
//   <span>{wind.speed} m/s</span>
//   </div>
//   <div>
//   <span>Humidity</span>
//   <span>{main.humidity}%</span>
//   </div>
//   <div>
//   <span>Pressure</span>
//   <span>{main.pressure} hPa</span>
//   </div>
//   </div>
//
//   <Divider orientation="center">Weekly Forecast</Divider>
//   <Collapse
//   accordion
//   style={{
//     'width': '70%',
//       'margin': '0 auto',
//       'marginBottom': '10px',
//   }}
//   size="small"
//     >
//     {list.slice( 0, 7 ).map( ( day, idx ) => <Collapse.Panel
//         showArrow={false}
//       key={idx}
//       header={
//       <div
//       style={{
//     'display': 'flex',
//       'alignItems': 'center',
//       'justifyContent': 'space-between',
//       'padding': '0 20px',
//   }}
// >
//   <div
//     style={{
//     'display': 'flex',
//       'alignItems': 'center',
//       'gap': 20,
//   }}
// >
//   <img
//     style={{ 'width': '34px' }}
//   src={`icons/${day.weather[0].icon}.png`}
//   alt="weatherIcon"
//     />
//     <label>{forecastDays[idx]}</label>
//     </div>
//     <div style={{
//     'display': 'flex',
//       'alignItems': 'center',
//       'gap': 20,
//   }}>
//   <label>{day.weather[0].description}</label>
//   <label>{`${Math.round( day.main.temp_min )}
//                 / ${Math.round( day.main.temp_max )}°C`}</label>
//   </div>
//   </div>
// }
// >
//   <div
//     style={{
//     'display': 'flex',
//       'alignItems': 'center',
//       'justifyContent': 'space-between',
//   }}
// >
//   <div style={{
//     'width': '50%',
//   }}>
//   <div style={{
//     'display': 'flex',
//       'justifyContent': 'space-between',
//       'padding': '0 10px',
//   }}>
//   <label
//     style={{ 'color': '#757575' }}
// >
//   Feels like:
//     </label>
//     <label>{Math.round( day.main.feels_like )}°C</label>
//   </div>
//   <div style={{
//     'display': 'flex',
//       'justifyContent': 'space-between',
//       'padding': '0 10px',
//   }}>
//   <label style={{ 'color': '#757575' }}>Pressure:</label>
//   <label>{day.main.pressure} hPa</label>
//   </div>
//   <div style={{
//     'display': 'flex',
//       'justifyContent': 'space-between',
//       'padding': '0 10px',
//   }}>
//   <label style={{ 'color': '#757575' }}>Humidity:</label>
//   <label>{day.main.humidity}%</label>
//   </div>
//   </div>
//   <div style={{
//     'width': '50%',
//   }}>
//   <div style={{
//     'display': 'flex',
//       'justifyContent': 'space-between',
//       'padding': '0 10px',
//   }}>
//   <label style={{ 'color': '#757575' }}>Clouds:</label>
//   <label>{day.clouds.all}%</label>
//   </div>
//   <div style={{
//     'display': 'flex',
//       'justifyContent': 'space-between',
//       'padding': '0 10px',
//   }}>
//   <label style={{ 'color': '#757575' }}>Wind speed:</label>
//   <label>{day.wind.speed} m/s</label>
//   </div>
//   <div style={{
//     'display': 'flex',
//       'justifyContent': 'space-between',
//       'padding': '0 10px',
//   }}>
//   <label style={{ 'color': '#757575' }}>Sea level:</label>
//   <label>{day.main.sea_level} m</label>
//   </div>
//   </div>
//   </div>
//   </Collapse.Panel> )}
//   </Collapse>
//
//   </>
// )
// }
