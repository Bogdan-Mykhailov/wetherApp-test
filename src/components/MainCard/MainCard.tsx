import { FC } from 'react'
import { Avatar, Card } from 'antd'
import Meta from 'antd/es/card/Meta'
import { DeleteOutlined, SyncOutlined } from '@ant-design/icons'
import { WeatherModel } from '../../api/geo/model'

type CardType = {
  id: number
  lat: number
  lon: number
}

interface Props {
  weatherData: WeatherModel
  removeCard: ( id: number ) => void
  updateCard: ( card: CardType ) => void
}

export const MainCard: FC<Props> = ( {
  weatherData,
  removeCard,
  updateCard,
} ) => {
  const { city, id, weather, coord } = weatherData
  const { lat, lon } = coord

  const updateData = () => {
    updateCard( { id, lat, lon } )
  }

  return (
    <Card
      style={{ 'width': 300 }}
      actions={[
        <DeleteOutlined key="delete" onClick={() => removeCard( id )}/>,
        <SyncOutlined onClick={updateData}/>,
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
