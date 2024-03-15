import { FC } from 'react'
import { Avatar, Card } from 'antd'
import Meta from 'antd/es/card/Meta'
import { DeleteOutlined, SyncOutlined } from '@ant-design/icons'
import { WeatherModel } from '../../api/geo/model'

interface Props {
  weatherData: WeatherModel
}

export const MainCard: FC<Props> = ( { weatherData } ) => {
  const { city, weather } = weatherData

  window.console.log( weather )

  return (
    <Card
      style={{ 'width': 300 }}
      actions={[
        <DeleteOutlined key="delete"/>,
        <SyncOutlined/>,
      ]}
    >
      <Meta
        avatar={
          <Avatar src={`icons/${weather[0].icon}.png`} alt="Weather icon"/>
        }
        title={city}
        description={weather[0].description}
      />
    </Card>

  )
}
