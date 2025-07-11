import { FC } from 'react'
import Icon from '@ant-design/icons'
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'

const NotVisibleSvg = () => {
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
      <path
        d='M10.8638 10.669C10.6801 10.8258 10.5308 11.019 10.4254 11.2363C10.32 11.4536 10.2608 11.6904 10.2513 11.9317C10.2419 12.1731 10.2826 12.4138 10.3707 12.6386C10.4588 12.8635 10.5926 13.0677 10.7635 13.2384C10.9344 13.409 11.1388 13.5424 11.3638 13.6303C11.5888 13.7181 11.8295 13.7583 12.0709 13.7486C12.3122 13.7388 12.5489 13.6792 12.766 13.5734C12.9832 13.4677 13.1761 13.3182 13.3327 13.1342'
        stroke='currentColor'
        strokeWidth='1.5'
      />
      <path d='M5.5 4.5L18.5 17.5' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' />
    </svg>
  )
}

export const NotVisibleIcon: FC<Partial<CustomIconComponentProps>> = (props) => {
  return <Icon component={NotVisibleSvg} {...props} />
}
