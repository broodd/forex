import { FC } from 'react'
import Icon from '@ant-design/icons'
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'

const DashboardSvg = () => {
  return (
    <svg
      width='1em'
      height='1em'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M3.75 19V10.4598C3.75 10.0562 3.94489 9.6774 4.27329 9.44275L11.2733 4.44104C11.708 4.13044 12.292 4.13044 12.7267 4.44104L19.7267 9.44275C20.0551 9.6774 20.25 10.0562 20.25 10.4598V19C20.25 19.6904 19.6904 20.25 19 20.25H5C4.30964 20.25 3.75 19.6904 3.75 19Z'
        stroke='currentcolor'
        strokeWidth='1.5'
        strokeLinecap='round'
      />
      <path d='M7 17L17 17' stroke='currentcolor' strokeLinecap='round' />
    </svg>
  )
}

export const DashboardIcon: FC<Partial<CustomIconComponentProps>> = (props) => {
  return <Icon component={DashboardSvg} {...props} />
}
