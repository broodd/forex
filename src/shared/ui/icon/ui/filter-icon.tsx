import { FC, MouseEventHandler } from 'react'
import Icon from '@ant-design/icons'
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'

interface IFilterIconProps extends Partial<CustomIconComponentProps> {
  onClick?: MouseEventHandler<HTMLSpanElement>
}

const FilterSvg = () => {
  return (
    <svg width='1em' height='1em' viewBox='0 0 24 24'>
      <path
        fill='none'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'
        d='M4 4h16v2.172a2 2 0 0 1-.586 1.414L15 12v7l-6 2v-8.5L4.52 7.572A2 2 0 0 1 4 6.227z'
      ></path>
    </svg>
  )
}

export const FilterIcon: FC<IFilterIconProps> = (props) => {
  return <Icon component={FilterSvg} onClick={props.onClick} {...props} />
}
