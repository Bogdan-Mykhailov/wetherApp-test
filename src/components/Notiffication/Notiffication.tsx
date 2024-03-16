import { FC, useEffect } from 'react'
import { notification } from 'antd'
import { ErrorType } from '../../types/Types.ts'

interface NotificationProps {
  title: ErrorType
}

export const Notification: FC<NotificationProps> = ( { title } ) => {
  useEffect( () => {
    if ( title !== ErrorType.NONE ) {
      notification.error( {
        'message': 'Error',
        'description': title,
      } )
    }
  }, [title] )

  return null
}
