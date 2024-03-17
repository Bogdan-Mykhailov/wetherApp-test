import { LeftSquareOutlined } from '@ant-design/icons'

export const BackButton = () => {
  const handleClick = () => {
    window.history.back()
  }

  return (
    <LeftSquareOutlined style={{
      'margin': '10px 20px',
      'fontSize': '24px',
      'color': 'white',
    }} onClick={handleClick}/>
  )
}
