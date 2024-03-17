import {
  FC,
  useState,
  ReactNode,
  useEffect,
  useRef,
} from 'react'
import './Video.css'
import { AudioMutedOutlined, AudioOutlined } from '@ant-design/icons'

interface Props {
  children: ReactNode
  path: string
}

export const Video: FC<Props> = ( { children, path } ) => {
  const [toggle, setToggle] = useState( false )
  const video = useRef<HTMLVideoElement>()

  useEffect( () => {
    if ( video.current ) {
      video.current.volume = 0.05
    }
  }, [] )

  const handleToggleMute = () => {
    setToggle( ( prevState ) => !prevState )
  }

  return (
    <>
      <div className="wrapper">
        {
          toggle ? <AudioOutlined
            className='icon'
            onClick={handleToggleMute}
          /> : <AudioMutedOutlined
            className='icon'
            onClick={handleToggleMute}
          />
        }

        <div className="children-wrapper">
          {children}
        </div>

        <video
          src={path}
          className="content"
          autoPlay
          muted={!toggle}
          loop
        />
      </div>
    </>
  )
}
