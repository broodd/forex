import { FC, MouseEventHandler } from 'react'
import Icon from '@ant-design/icons'
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'

interface IRefreshIconProps extends Partial<CustomIconComponentProps> {
  onClick?: MouseEventHandler<HTMLSpanElement>
}

const RefreshSvg = () => {
  return (
    <svg width='1em' height='1em' viewBox='0 0 24 24'>
      <path
        fill='none'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'
        d='M20 11A8.1 8.1 0 0 0 4.5 9M4 5v4h4m-4 4a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4'
      ></path>
    </svg>
  )
}

export const RefreshIcon: FC<IRefreshIconProps> = (props) => {
  return <Icon component={RefreshSvg} onClick={props.onClick} {...props} />
}
