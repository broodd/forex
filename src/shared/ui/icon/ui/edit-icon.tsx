import { FC } from 'react'
import Icon from '@ant-design/icons'
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'

const EditSvg = () => {
  return (
    <svg
      width='1em'
      height='1em'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M12 4.47754H6C4.89543 4.47754 4 5.37297 4 6.47754V18.4775C4 19.5821 4.89543 20.4775 6 20.4775H18C19.1046 20.4775 20 19.5821 20 18.4775V12.4775'
        stroke='currentColor'
        strokeWidth='1.5'
        strokeLinecap='round'
      />
      <path
        d='M18.0315 4.28332C18.7067 3.60813 19.8014 3.60814 20.4766 4.28334C21.1547 4.96142 21.1514 6.06182 20.4692 6.73581L14.5109 12.6229C13.4371 13.6839 11.9927 14.2784 10.4903 14.2857C10.5065 12.7074 11.139 11.1756 12.2543 10.0603L18.0315 4.28332Z'
        stroke='currentColor'
        strokeWidth='1.5'
      />
    </svg>
  )
}

export const EditIcon: FC<Partial<CustomIconComponentProps>> = (props) => {
  return <Icon component={EditSvg} {...props} />
}
