import { ReactNode } from 'react'
import { message } from './antd-static-functions'
// import { ErrorIcon } from '../ui/icon'

export const showInfoMessage = (icon: ReactNode, text: string) => {
  message.open({
    type: 'info',
    content: text,
    icon: icon,
  })
}

export const showErrorMessage = (text: string) => {
  message.open({
    type: 'error',
    content: text,
    // icon: <ErrorIcon style={{ fontSize: 20 }} />,
  })
}
