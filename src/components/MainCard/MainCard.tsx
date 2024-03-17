import { FC } from 'react'
import { Avatar, Card } from 'antd'
import Meta from 'antd/es/card/Meta'
import { DeleteOutlined, EnterOutlined, SyncOutlined } from '@ant-design/icons'
import { WeatherModel } from '../../api/geo/model'
import { useNavigate } from 'react-router'
import { capitalizeFirstLetter } from '../../utils/helpers.ts'

type CardType = {
  lat: number
  lon: number
  id: number
  city: string
}

interface Props {
  weatherData?: WeatherModel
  removeCard: ( id: number ) => void
  updateCard: ( card: CardType ) => void
}

export const MainCard: FC<Props> = ( {
  weatherData,
  removeCard,
  updateCard,
} ) => {
  const navigate = useNavigate()
  const { city, id, weather, coord, main } = weatherData!
  const { lat, lon } = coord

  const updateData = () => {
    updateCard( { lat, lon, id, city } )
  }

  return (
    <Card
      style={{ 'width': 380 }}
      cover={
        <img
          style={{ 'height': 200 }}
          alt="Card walpaper"
          src={`images/${weather[0].icon}.png`}
        />
      }
      actions={[
        <DeleteOutlined
          key="delete" onClick={() => removeCard( id )}/>,
        <SyncOutlined
          onClick={updateData}
        />,
        <EnterOutlined
          onClick={() => navigate( `/info/${id}` )}
        />,
      ]}
    >
      <div style={{ 'display': 'flex', 'gap': 40 }}>
        <Meta
          style={{ 'width': '65%' }}
          avatar={
            <Avatar src={`icons/${weather[0].icon}.png`} alt="Weather icon"/>
          }
          title={city}
          description={capitalizeFirstLetter( weather[0].description )}
        />
        <Meta
          title={`${Math.round( main.temp )}°C`}
          description={`Feels like: ${Math.round( main.feels_like )}°C`}
        />
      </div>
    </Card>
  )
}
