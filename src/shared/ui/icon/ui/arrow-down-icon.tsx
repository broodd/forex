import { FC } from 'react'
import Icon from '@ant-design/icons'
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'

const ArrowDownSvg = () => {
  return (
    <svg
      width='1em'
      height='1em'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M6 9L12 15L18 9'
        stroke='currentcolor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}

export const ArrowDownIcon: FC<Partial<CustomIconComponentProps>> = (props) => {
  return <Icon component={ArrowDownSvg} {...props} />
}
