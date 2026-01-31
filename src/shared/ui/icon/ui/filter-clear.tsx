import { FC, MouseEventHandler } from 'react'
import Icon from '@ant-design/icons'
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'

interface IFilterClearIconProps extends Partial<CustomIconComponentProps> {
  onClick?: MouseEventHandler<HTMLSpanElement>
}

const FilterClearSvg = () => {
  return (
    <svg width='1em' height='1em' viewBox='0 0 24 24'>
      <path
        fill='none'
        stroke='currentColor'
        stroke-linecap='round'
        stroke-linejoin='round'
        stroke-width='2'
        d='M8 4h12v2.172a2 2 0 0 1-.586 1.414L15.5 11.5M15 15v4l-6 2v-8.5L4.52 7.572A2 2 0 0 1 4 6.227V4M3 3l18 18'
      ></path>
    </svg>
  )
}

export const FilterClearIcon: FC<IFilterClearIconProps> = (props) => {
  return <Icon component={FilterClearSvg} onClick={props.onClick} {...props} />
}
