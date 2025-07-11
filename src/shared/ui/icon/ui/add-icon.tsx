import { FC } from 'react'
import Icon from '@ant-design/icons'
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'

const AddSvg = () => {
  return (
    <svg
      width='1em'
      height='1em'
      viewBox='0 0 20 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M10 3.5L10 17.5' stroke='currentColor' strokeWidth='2' strokeLinecap='round' />
      <path d='M3 10.5L17 10.5' stroke='currentColor' strokeWidth='2' strokeLinecap='round' />
    </svg>
  )
}

export const AddIcon: FC<Partial<CustomIconComponentProps>> = (props) => {
  return <Icon component={AddSvg} {...props} />
}
