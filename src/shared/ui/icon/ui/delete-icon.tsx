import { FC } from 'react'
import Icon from '@ant-design/icons'
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'

const DeleteSvg = () => {
  return (
    <svg
      width='1em'
      height='1em'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M15.9596 8.8335V8.2085H15.3346H8.66797H8.04297V8.8335V17.1668C8.04297 18.4325 9.06898 19.4585 10.3346 19.4585H13.668C14.9336 19.4585 15.9596 18.4325 15.9596 17.1668V8.8335Z'
        stroke='currentColor'
        strokeWidth='1.25'
      />
      <path
        d='M7 8H9.91667V7.58333C9.91667 6.43274 10.8494 5.5 12 5.5V5.5C13.1506 5.5 14.0833 6.43274 14.0833 7.58333V8H17'
        stroke='currentColor'
        strokeWidth='1.25'
        strokeLinecap='round'
      />
    </svg>
  )
}

export const DeleteIcon: FC<Partial<CustomIconComponentProps>> = (props) => {
  return <Icon component={DeleteSvg} {...props} />
}
