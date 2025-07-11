import { FC } from 'react'
import Icon from '@ant-design/icons'
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'

const LogoutSvg = () => {
  return (
    <svg
      width='1em'
      height='1em'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M14.5 8.5V6.5C14.5 5.39543 13.6046 4.5 12.5 4.5H5.5C4.39543 4.5 3.5 5.39543 3.5 6.5V18.5C3.5 19.6046 4.39543 20.5 5.5 20.5H12.5C13.6046 20.5 14.5 19.6046 14.5 18.5V16.5'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M7.5 11.5C6.94772 11.5 6.5 11.9477 6.5 12.5C6.5 13.0523 6.94772 13.5 7.5 13.5V11.5ZM21.5 12.5V13.5C21.9045 13.5 22.2691 13.2564 22.4239 12.8827C22.5787 12.509 22.4931 12.0789 22.2071 11.7929L21.5 12.5ZM19.2071 8.79289C18.8166 8.40237 18.1834 8.40237 17.7929 8.79289C17.4024 9.18342 17.4024 9.81658 17.7929 10.2071L19.2071 8.79289ZM17.7929 14.7929C17.4024 15.1834 17.4024 15.8166 17.7929 16.2071C18.1834 16.5976 18.8166 16.5976 19.2071 16.2071L17.7929 14.7929ZM22.2071 13.2071C22.5976 12.8166 22.5976 12.1834 22.2071 11.7929C21.8166 11.4024 21.1834 11.4024 20.7929 11.7929L22.2071 13.2071ZM7.5 13.5H21.5V11.5H7.5V13.5ZM22.2071 11.7929L19.2071 8.79289L17.7929 10.2071L20.7929 13.2071L22.2071 11.7929ZM19.2071 16.2071L22.2071 13.2071L20.7929 11.7929L17.7929 14.7929L19.2071 16.2071Z'
        fill='currentColor'
      />
    </svg>
  )
}

export const LogoutIcon: FC<Partial<CustomIconComponentProps>> = (props) => {
  return <Icon component={LogoutSvg} {...props} />
}
