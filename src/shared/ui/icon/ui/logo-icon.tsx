import { FC, MouseEventHandler } from 'react'
import Icon from '@ant-design/icons'
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'

interface IFilterIconProps extends Partial<CustomIconComponentProps> {
  onClick?: MouseEventHandler<HTMLSpanElement>
}

const LogoSvg = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      id='Layer_2'
      data-name='Layer 2'
      viewBox='0 0 50.6 57.2'
      width='1em'
      height='1em'
      fill='none'
    >
      <defs>
        <filter id='drop-shadow-1' filterUnits='userSpaceOnUse'>
          <feOffset dx='0' dy='0' />
          <feGaussianBlur result='blur' stdDeviation='1.54' />
          <feFlood floodColor='#000' floodOpacity='.2' />
          <feComposite in2='blur' operator='in' />
          <feComposite in='SourceGraphic' />
        </filter>
      </defs>
      <g id='Layer_1-2' data-name='Layer 1' fill='currentColor'>
        <g>
          <path d='m27.62,9.29v10.51c0,.49.24.73.73.98,5.62.98,10.02,6.11,10.02,11.98s-4.4,11-10.02,11.98c-.49,0-.73.49-.73.98v10.51c0,.49.49.98.98.98,12.47-1.22,22-11.73,22-24.44s-9.53-23.22-22-24.44c-.49,0-.98.49-.98.98Z' />
          <path d='m23.22,45.71c0-.49-.24-.73-.73-.98-5.62-.98-10.02-6.11-10.02-11.98v-11.24c0-.49.49-.98.98-.98h8.8c.49,0,.98-.49.98-.98v-10.27c0-.49-.49-.98-.98-.98h-9.78c-.49,0-.73-.24-.98-.49C9.78,3.42,5.87.49.98,0c-.49,0-.98.49-.98.98v31.78c0,12.71,9.53,23.22,22,24.44.49,0,.98-.49.98-.98v-10.51h.24Z' />
        </g>
      </g>
    </svg>
  )
}

export const LogoIcon: FC<IFilterIconProps> = (props) => {
  return <Icon component={LogoSvg} onClick={props.onClick} {...props} />
}
