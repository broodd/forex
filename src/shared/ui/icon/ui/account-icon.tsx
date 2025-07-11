import { FC } from 'react'
import Icon from '@ant-design/icons'
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'

const AccountSvg = () => {
  return (
    <svg
      width='1em'
      height='1em'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <circle cx='12' cy='12' r='8.25' stroke='currentColor' strokeWidth='1.5' />
      <circle cx='12' cy='9.75' r='2.625' stroke='currentColor' strokeWidth='1.5' />
      <path
        d='M16.5 18.75V18.75C16.5 16.886 14.989 15.375 13.125 15.375H10.875C9.01104 15.375 7.5 16.886 7.5 18.75V18.75'
        stroke='currentColor'
        strokeWidth='1.5'
      />
    </svg>
  )
}

export const AccountIcon: FC<Partial<CustomIconComponentProps>> = (props) => {
  return <Icon component={AccountSvg} {...props} />
}
