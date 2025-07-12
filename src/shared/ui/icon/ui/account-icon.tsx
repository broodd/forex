import { FC } from 'react'
import Icon from '@ant-design/icons'
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'

const AccountSvg = () => {
  return (
    <svg width='1em' height='1em' viewBox='0 0 24 24'>
      <g
        fill='none'
        stroke='currentColor'
        stroke-dasharray='28'
        stroke-dashoffset='28'
        stroke-linecap='round'
        stroke-linejoin='round'
        stroke-width='2'
      >
        <path d='M4 21v-1c0 -3.31 2.69 -6 6 -6h4c3.31 0 6 2.69 6 6v1'>
          <animate
            fill='freeze'
            attributeName='stroke-dashoffset'
            dur='0.4s'
            values='28;0'
          ></animate>
        </path>
        <path d='M12 11c-2.21 0 -4 -1.79 -4 -4c0 -2.21 1.79 -4 4 -4c2.21 0 4 1.79 4 4c0 2.21 -1.79 4 -4 4Z'>
          <animate
            fill='freeze'
            attributeName='stroke-dashoffset'
            begin='0.4s'
            dur='0.4s'
            values='28;0'
          ></animate>
        </path>
      </g>
    </svg>
  )
}

export const AccountIcon: FC<Partial<CustomIconComponentProps>> = (props) => {
  return <Icon component={AccountSvg} {...props} />
}
