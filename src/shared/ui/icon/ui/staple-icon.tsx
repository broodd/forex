import { FC } from 'react'
import Icon from '@ant-design/icons'
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'

const StapleSvg = () => {
  return (
    <svg
      width='1em'
      height='1em'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M15.0002 7.00045L8.50019 13.5005C7.67176 14.3289 7.67176 15.672 8.50019 16.5005C9.32862 17.3289 10.6718 17.3289 11.5002 16.5005L18.0002 10.0005C19.657 8.3436 19.657 5.65731 18.0002 4.00045C16.3433 2.3436 13.657 2.3436 12.0002 4.00045L5.50019 10.5005C3.01491 12.9857 3.01491 17.0152 5.50019 19.5005C7.98547 21.9857 12.0149 21.9857 14.5002 19.5005L21.0002 13.0005'
        stroke='currentColor'
        strokeWidth='1.7'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}

export const StapleIcon: FC<Partial<CustomIconComponentProps>> = (props) => {
  return <Icon component={StapleSvg} {...props} />
}
