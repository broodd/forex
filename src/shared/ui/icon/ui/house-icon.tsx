import { FC } from 'react'
import Icon from '@ant-design/icons'
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'

const HouseSvg = () => {
  return (
    <svg
      data-v-ee66334f=''
      xmlns='http://www.w3.org/2000/svg'
      aria-hidden='true'
      role='img'
      width='1em'
      height='1em'
      viewBox='0 0 24 24'
    >
      <g
        fill='none'
        stroke='currentColor'
        stroke-linecap='round'
        stroke-linejoin='round'
        stroke-width='2'
      >
        <path stroke-dasharray='16' stroke-dashoffset='16' d='M5 21h14'>
          <animate
            fill='freeze'
            attributeName='stroke-dashoffset'
            dur='0.2s'
            values='16;0'
          ></animate>
        </path>
        <path stroke-dasharray='14' stroke-dashoffset='14' d='M5 21v-13M19 21v-13'>
          <animate
            fill='freeze'
            attributeName='stroke-dashoffset'
            begin='0.2s'
            dur='0.2s'
            values='14;0'
          ></animate>
        </path>
        <path stroke-dasharray='28' stroke-dashoffset='28' d='M2 10l10 -8l10 8'>
          <animate
            fill='freeze'
            attributeName='stroke-dashoffset'
            begin='0.4s'
            dur='0.6s'
            values='28;0'
          ></animate>
        </path>
      </g>
    </svg>
  )
}

export const HouseIcon: FC<Partial<CustomIconComponentProps>> = (props) => {
  return <Icon component={HouseSvg} {...props} />
}
