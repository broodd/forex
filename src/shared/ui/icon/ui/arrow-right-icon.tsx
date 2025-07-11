import { FC } from 'react'
import Icon from '@ant-design/icons'
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'

const ArrowRightSvg = () => {
  return (
    <svg
      width='1em'
      height='1em'
      viewBox='0 0 20 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M7.5 15L12.5 10L7.5 5'
        stroke='currentColor'
        strokeWidth='1.66667'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}

export const ArrowRightIcon: FC<Partial<CustomIconComponentProps>> = (props) => {
  return <Icon component={ArrowRightSvg} {...props} />
}
