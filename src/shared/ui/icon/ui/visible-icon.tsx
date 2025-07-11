import { FC } from 'react'
import Icon from '@ant-design/icons'
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'

const VisibleSvg = () => {
  return (
    <svg
      width='1em'
      height='1em'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M4.01035 11.522C7.1917 18.2824 16.8083 18.2824 19.9897 11.522C19.9961 11.5083 19.995 11.4923 19.9869 11.4795C16.2586 5.65399 7.74144 5.65399 4.01311 11.4795C4.00495 11.4923 4.00391 11.5083 4.01035 11.522Z'
        stroke='currentColor'
        strokeWidth='1.5'
      />
      <circle cx='12' cy='12' r='1.75' stroke='currentColor' strokeWidth='1.5' />
    </svg>
  )
}

export const VisibleIcon: FC<Partial<CustomIconComponentProps>> = (props) => {
  return <Icon component={VisibleSvg} {...props} />
}
