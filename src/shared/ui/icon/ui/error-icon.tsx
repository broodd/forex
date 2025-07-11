import { FC } from 'react'
import Icon from '@ant-design/icons'
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'

const ErrorSvg = () => {
  return (
    <svg
      width='1em'
      height='1em'
      viewBox='0 0 20 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M10 18.5C14.4183 18.5 18 14.9183 18 10.5C18 6.08172 14.4183 2.5 10 2.5C5.58172 2.5 2 6.08172 2 10.5C2 14.9183 5.58172 18.5 10 18.5ZM7.70711 6.79289C7.31658 6.40237 6.68342 6.40237 6.29289 6.79289C5.90237 7.18342 5.90237 7.81658 6.29289 8.20711L8.58579 10.5L6.29289 12.7929C5.90237 13.1834 5.90237 13.8166 6.29289 14.2071C6.68342 14.5976 7.31658 14.5976 7.70711 14.2071L10 11.9142L12.2929 14.2071C12.6834 14.5976 13.3166 14.5976 13.7071 14.2071C14.0976 13.8166 14.0976 13.1834 13.7071 12.7929L11.4142 10.5L13.7071 8.20711C14.0976 7.81658 14.0976 7.18342 13.7071 6.79289C13.3166 6.40237 12.6834 6.40237 12.2929 6.79289L10 9.08579L7.70711 6.79289Z'
        fill='#E95249'
      />
    </svg>
  )
}

export const ErrorIcon: FC<Partial<CustomIconComponentProps>> = (props) => {
  return <Icon component={ErrorSvg} {...props} />
}
