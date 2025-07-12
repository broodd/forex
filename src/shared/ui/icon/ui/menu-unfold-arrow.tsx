import { FC } from 'react'
import Icon from '@ant-design/icons'
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'

const MenuUnfoldArrowSvg = () => {
  return (
    <svg
      data-v-6d385410=''
      aria-hidden='true'
      role='img'
      font-size='1.8rem'
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
        <path d='M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm5-2v16'></path>
        <path d='m14 10l2 2l-2 2'></path>
      </g>
    </svg>
  )
}

export const MenuUnfoldArrowIcon: FC<Partial<CustomIconComponentProps>> = (props) => {
  return <Icon component={MenuUnfoldArrowSvg} {...props} />
}
