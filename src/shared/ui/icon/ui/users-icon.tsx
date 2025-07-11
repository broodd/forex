import { FC } from 'react'
import Icon from '@ant-design/icons'
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'

const UsersSvg = () => {
  return (
    <svg
      width='1em'
      height='1em'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <ellipse
        cx='9.6'
        cy='7.19961'
        rx='3.6'
        ry='3.6'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M3.60001 20.4004V18.4004C3.60001 16.1913 5.21178 14.4004 7.20001 14.4004H10.8C12.7882 14.4004 14.4 16.1913 14.4 18.4004V20.4004'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M15.6 3.59961C17.0122 4.02062 18 5.50226 18 7.19961C18 8.89696 17.0122 10.3786 15.6 10.7996'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M20.4 20.4004V18.3491C20.3916 16.4871 19.4063 14.8659 18 14.4004'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}

export const UsersIcon: FC<Partial<CustomIconComponentProps>> = (props) => {
  return <Icon component={UsersSvg} {...props} />
}
