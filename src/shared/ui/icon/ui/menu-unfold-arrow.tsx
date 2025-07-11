import { FC } from 'react'
import Icon from '@ant-design/icons'
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'

const MenuUnfoldArrowSvg = () => {
  return (
    <svg
      width='1em'
      height='1em'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <rect x='0.5' y='0.5' width='23' height='23' rx='3.5' fill='#FBFBFB' />
      <rect x='0.5' y='0.5' width='23' height='23' rx='3.5' stroke='#E5E5E5' />
      <path
        d='M10 16L13.3103 12.5155C13.6911 12.1147 13.6744 11.481 13.273 11.1008L10 8'
        stroke='currentColor'
        strokeWidth='1.5'
        strokeLinecap='round'
      />
    </svg>
  )
}

export const MenuUnfoldArrowIcon: FC<Partial<CustomIconComponentProps>> = (props) => {
  return <Icon component={MenuUnfoldArrowSvg} {...props} />
}
