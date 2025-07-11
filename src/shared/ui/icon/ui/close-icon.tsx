import { FC } from 'react'
import Icon from '@ant-design/icons'
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'

const CloseSvg = () => {
  return (
    <svg
      width='1em'
      height='1em'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M5 4.99997L19 19' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' />
      <path d='M19 5L5 19' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' />
    </svg>
  )
}

export const CloseIcon: FC<Partial<CustomIconComponentProps>> = (props) => {
  return <Icon component={CloseSvg} {...props} />
}
