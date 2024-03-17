import { FC } from 'react'
import notFound from '../../assets/notFound.png'
import './NotFound.css'

export const NotFound: FC = () => {
  return <div className='notFoundWrapper'>
    <h2 className='title'>Ooops, page not found</h2>
    <img
      className='notFoundIcon'
      src={notFound}
      alt="Not found"
    />
  </div>
}
