import { FC } from 'react'
import { Avatar, Card } from 'antd'
import Meta from 'antd/es/card/Meta'
import { DeleteOutlined, SyncOutlined } from '@ant-design/icons'
import { WeatherModel } from '../../api/geo/model'

interface Props {
  weatherData: WeatherModel
  removeCard: ( id: number ) => void
}

export const MainCard: FC<Props> = ( {
  weatherData,
  removeCard,
} ) => {
  const { city, id, weather } = weatherData

  return (
    <Card
      style={{ 'width': 300 }}
      actions={[
        <DeleteOutlined key="delete" onClick={() => removeCard( id )}/>,
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
