import { FC } from 'react'
import Icon from '@ant-design/icons'
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'

const UnblockSvg = () => {
  return (
    <svg
      width='1em'
      height='1em'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M13.8 13.7998L18 17.9998'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
      />
      <path d='M6 6L10.2 10.2' stroke='currentColor' strokeWidth='2' strokeLinecap='round' />
    </svg>
  )
}

export const UnblockIcon: FC<Partial<CustomIconComponentProps>> = (props) => {
  return <Icon component={UnblockSvg} {...props} />
}
