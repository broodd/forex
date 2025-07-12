import { FC } from 'react'
import Icon from '@ant-design/icons'
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'

const ItemsSvg = () => {
  return (
    <svg width='1em' height='1em' fill='currentColor' viewBox='0 0 20 19'>
      <path
        d='M11.8906 14.1177H17.5377'
        stroke='currentColor'
        stroke-width='1.5'
        stroke-miterlimit='10'
        stroke-linecap='round'
      />
      <path
        d='M14.7139 16.941L14.7139 11.2939'
        stroke='currentColor'
        stroke-width='1.5'
        stroke-miterlimit='10'
        stroke-linecap='round'
      />
      <path
        d='M7.14049 1.92678V6.54381H2.52346V1.92678H7.14049ZM8.11351 0H1.55043C1.02298 0 0.59668 0.426299 0.59668 0.953754V7.51683C0.59668 8.04429 1.02298 8.47059 1.55043 8.47059H8.11351C8.64097 8.47059 9.06727 8.04429 9.06727 7.51683V0.953754C9.06727 0.426299 8.64097 0 8.11351 0Z'
        fill='currentColor'
      />
      <path
        d='M7.14049 12.2798V16.8968H2.52346V12.2798H7.14049ZM8.11351 10.353H1.55043C1.02298 10.353 0.59668 10.7793 0.59668 11.3068V17.8699C0.59668 18.3973 1.02298 18.8236 1.55043 18.8236H8.11351C8.64097 18.8236 9.06727 18.3973 9.06727 17.8699V11.3068C9.06727 10.7793 8.64097 10.353 8.11351 10.353Z'
        fill='currentColor'
      />
      <path
        d='M17.493 1.92678V6.54381H12.876V1.92678H17.493ZM18.4661 0H11.903C11.3755 0 10.9492 0.426299 10.9492 0.953754V7.51683C10.9492 8.04429 11.3755 8.47059 11.903 8.47059H18.4661C18.9935 8.47059 19.4198 8.04429 19.4198 7.51683V0.953754C19.4198 0.426299 18.9935 0 18.4661 0Z'
        fill='currentColor'
      />
    </svg>
  )
}

export const ItemsIcon: FC<Partial<CustomIconComponentProps>> = (props) => {
  return <Icon component={ItemsSvg} {...props} />
}
