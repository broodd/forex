import { FC } from 'react'
import Icon from '@ant-design/icons'
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'

const DownloadSvg = () => {
  return (
    <svg
      width='1em'
      height='1em'
      viewBox='0 0 20 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M3.33203 14.1665V15.8332C3.33203 16.2752 3.50763 16.6991 3.82019 17.0117C4.13275 17.3242 4.55667 17.4998 4.9987 17.4998H14.9987C15.4407 17.4998 15.8646 17.3242 16.1772 17.0117C16.4898 16.6991 16.6654 16.2752 16.6654 15.8332V14.1665'
        stroke='currentColor'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M14.168 9.16683L10.0013 13.3335L5.83464 9.16683'
        stroke='currentColor'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M10 13.3335L10 3.3335'
        stroke='currentColor'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}

export const DownloadIcon: FC<Partial<CustomIconComponentProps>> = (props) => {
  return <Icon component={DownloadSvg} {...props} />
}
