import { FC } from 'react'
import Icon from '@ant-design/icons'
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'

const StatisticsSvg = () => {
  return (
    <svg
      width='1em'
      height='1em'
      fill='currentColor'
      version='1.1'
      id='Layer_1'
      x='0px'
      y='0px'
      viewBox='0 0 83.31 104.02'
    >
      <g>
        <path d='M22.19,93.7H2.53C1.13,93.7,0,92.58,0,91.2V27.85c0-1.38,1.13-2.5,2.53-2.5h19.66c1.4,0,2.53,1.12,2.53,2.5   V91.2C24.73,92.58,23.59,93.7,22.19,93.7z M5.07,88.7h14.59V30.35H5.07V88.7z' />
        <path d='M41.45,93.7H22.19c-1.4,0-2.53-1.12-2.53-2.5V64.77c0-1.38,1.13-2.5,2.53-2.5h19.26c1.4,0,2.53,1.12,2.53,2.5   V91.2C43.98,92.58,42.85,93.7,41.45,93.7z M24.73,88.7h14.19V67.27H24.73V88.7z' />
        <path d='M80.77,93.7H61.11c-1.4,0-2.53-1.12-2.53-2.5V19.4c0-1.38,1.13-2.5,2.53-2.5h19.66c1.4,0,2.53,1.12,2.53,2.5   v71.8C83.31,92.58,82.17,93.7,80.77,93.7z M63.64,88.7h14.59V21.9H63.64V88.7z' />
        <path d='M61.11,93.7H41.45c-1.4,0-2.53-1.12-2.53-2.5V2.5c0-1.38,1.13-2.5,2.53-2.5h19.66c1.4,0,2.53,1.12,2.53,2.5   v88.7C63.64,92.58,62.51,93.7,61.11,93.7z M43.98,88.7h14.59V5H43.98V88.7z' />
        <path d='M80.81,104.02H2.5c-1.38,0-2.5-1.12-2.5-2.5s1.12-2.5,2.5-2.5h78.31c1.38,0,2.5,1.12,2.5,2.5   S82.19,104.02,80.81,104.02z' />
      </g>
    </svg>
  )
}

export const StatisticsIcon: FC<Partial<CustomIconComponentProps>> = (props) => {
  return <Icon component={StatisticsSvg} {...props} />
}
