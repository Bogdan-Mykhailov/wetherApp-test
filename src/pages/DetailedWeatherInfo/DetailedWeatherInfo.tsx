import { FC } from 'react'
import { useAppSelector } from '../../services'
import { Divider } from 'antd'
import { INFO_PAGE_VIDEO_PATH } from '../../utils/constants.ts'
import {
  Video,
  Forecast,
  WeatherInfo,
  BackButton,
} from '../../components'
import './DetailedWeatherInfo.css'

export const DetailedWeatherInfo: FC = ( {} ) => {
  const cards = useAppSelector( ( state ) => state.weather.cards )
  const forecasts = useAppSelector( ( state ) => state.forecast.forecasts )

  return (
    <Video path={INFO_PAGE_VIDEO_PATH}>
      <div className='detailedInfo'>
        <BackButton />
        <WeatherInfo cards={cards} />

        <Divider
          orientation="center"
          style={{
            'color': 'white',
            'margin': '8px 0',
            'fontSize': '24px',
          }}
        >
          Weekly Forecast
        </Divider>

        <Forecast forecasts={forecasts}/>
      </div>
    </Video>
  )
}
