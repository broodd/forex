import { FC } from 'react'
import Icon from '@ant-design/icons'
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'

const PostbacksSvg = () => {
  return (
    <svg width='1em' height='1em' fill='currentColor' viewBox='0 0 16.13 16.13'>
      <path d='M13.75,3.16H6.07a.43.43,0,0,0,0,.86h7.68a.82.82,0,0,1,.82.82v7.24a.71.71,0,0,1-.7.7h-11a.67.67,0,0,1-.66-.67V7.38a.44.44,0,0,0-.87,0v4.73a1.54,1.54,0,0,0,1.53,1.53h11a1.56,1.56,0,0,0,1.56-1.56V4.84A1.69,1.69,0,0,0,13.75,3.16Z' />
      <path d='M3.46,6A.91.91,0,0,0,4.37,5V3.4a.91.91,0,0,0-.91-.91H1.61A.91.91,0,0,0,.7,3.4V5A.91.91,0,0,0,1.61,6Zm0-.86H1.61a0,0,0,0,1-.05,0V3.4a0,0,0,0,1,.05,0H3.46a.05.05,0,0,1,0,0V5A.05.05,0,0,1,3.46,5.09Z' />
    </svg>
  )
}

export const PostbacksIcon: FC<Partial<CustomIconComponentProps>> = (props) => {
  return <Icon component={PostbacksSvg} {...props} />
}
