import { FC } from 'react'
import { Avatar, Card } from 'antd'
import Meta from 'antd/es/card/Meta'
import { DeleteOutlined, EnterOutlined, SyncOutlined } from '@ant-design/icons'
import { WeatherModel } from '../../api/geo/model'
import { useNavigate } from 'react-router'
import { capitalizeFirstLetter } from '../../utils/helpers.ts'
import './MainCard.css'

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
  const {
    city,
    id,
    weather,
    coord,
    main,
  } = weatherData!
  const { lat, lon } = coord

  const updateData = () => {
    updateCard( {
      lat,
      lon,
      id,
      city,
    } )
  }

  return (
    <Card
      className='card'
      actions={[
        <DeleteOutlined
          key="delete"
          onClick={() => removeCard( id )}
        />,
        <SyncOutlined
          key="sync"
          onClick={updateData}
        />,
        <EnterOutlined
          key="enter"
          onClick={() => navigate( `/info/${id}` )}
        />,
      ]}
    >
      <div className='cardContent'>
        <Meta
          className='cardMeta'
          avatar={
            <Avatar
              src={`icons/${weather[0].icon}.png`}
              alt="Weather icon"
            />
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
