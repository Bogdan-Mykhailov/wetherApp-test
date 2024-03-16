import { FC } from 'react'
import { useParams } from 'react-router'
import { useAppSelector } from '../../services'
import { Card, Col, Row } from 'antd'

export const DetailedWeatherInfo: FC = () => {
  const { id } = useParams()
  const cards = useAppSelector( ( state ) => state.weather.cards )

  const cardId = id && Number( id )

  const currentCard = cards.find( ( card ) => card.id === cardId )

  const { city, main, wind } = currentCard!

  return (
    <Row gutter={16}>
      <Col style={{ 'width': '100%' }} span={8}>
        <Card title={city} >
          <p>{wind.speed}</p>
          <p>{main.feels_like}</p>
        </Card>
      </Col>
    </Row>
  )
}
