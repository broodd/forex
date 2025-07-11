import { FC, MouseEventHandler } from 'react'
import Icon from '@ant-design/icons'
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'

interface IFilterIconProps extends Partial<CustomIconComponentProps> {
  onClick?: MouseEventHandler<HTMLSpanElement>
}

const FilterSvg = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='1em'
      height='1em'
      viewBox='0 0 24 24'
      fill='none'
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M15.4165 3.66665H4.60646C4.5432 3.66517 4.47922 3.66972 4.4153 3.68069C4.34763 3.69213 4.28228 3.71036 4.21996 3.73467C3.70037 3.92786 3.29541 4.34621 3.11972 4.87328C2.94042 5.41121 3.02011 6.00184 3.33557 6.47301C3.363 6.51397 3.39342 6.55285 3.42658 6.58933L7.33319 10.8866V13.8333C7.33319 14.1481 7.48138 14.4445 7.73319 14.6333L11.0665 17.1333C11.3695 17.3606 11.775 17.3971 12.1137 17.2277C12.4525 17.0584 12.6665 16.7121 12.6665 16.3333V10.8866L16.5731 6.58933C16.6063 6.55285 16.6367 6.51397 16.6641 6.47301C16.9796 6.00184 17.0593 5.41121 16.88 4.87328C16.7007 4.33535 16.2825 3.91066 15.7475 3.72301C15.6411 3.68571 15.5292 3.66665 15.4165 3.66665ZM9.07313 9.82732L5.29071 5.66665H14.709L10.9266 9.82732C10.7592 10.0114 10.6665 10.2512 10.6665 10.5V14.3333L9.33319 13.3333V10.5C9.33319 10.2512 9.24047 10.0114 9.07313 9.82732Z'
        fill='currentColor'
      />
    </svg>
  )
}

export const FilterIcon: FC<IFilterIconProps> = (props) => {
  return <Icon component={FilterSvg} onClick={props.onClick} {...props} />
}
