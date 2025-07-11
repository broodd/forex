import { FC } from 'react'
import Icon from '@ant-design/icons'
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'

const PlusSvg = () => {
  return (
    <svg
      width='1em'
      height='1em'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M6.99999 12L17.0001 12'
        stroke='currentColor'
        strokeWidth='1.5'
        strokeLinecap='round'
      />
      <path d='M12 7L12 17' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' />
    </svg>
  )
}

export const PlusIcon: FC<Partial<CustomIconComponentProps>> = (props) => {
  return <Icon component={PlusSvg} {...props} />
}
