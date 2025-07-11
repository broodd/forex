import { FC } from 'react'
import Icon from '@ant-design/icons'
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'

const MenuFoldArrowSvg = () => {
  return (
    <svg width='1em' height='1em' viewBox='0 0 40 40' fill='none'>
      <g filter='url(#filter0_d_2219_20990)'>
        <circle cx='20' cy='20' r='10' fill='white' />
        <path
          d='M20.9995 17L18.1409 19.8586C18.0628 19.9367 18.0628 20.0633 18.1409 20.1414L20.9995 23'
          stroke='currentColor'
          strokeWidth='1.7'
          strokeLinecap='round'
        />
      </g>
      <defs>
        <filter
          id='filter0_d_2219_20990'
          x='-2'
          y='-2'
          width='44'
          height='44'
          filterUnits='userSpaceOnUse'
          colorInterpolationFilters='sRGB'
        >
          <feFlood floodOpacity='0' result='BackgroundImageFix' />
          <feColorMatrix
            in='SourceAlpha'
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
            result='hardAlpha'
          />
          <feOffset />
          <feGaussianBlur stdDeviation='5' />
          <feComposite in2='hardAlpha' operator='out' />
          <feColorMatrix type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0' />
          <feBlend mode='normal' in2='BackgroundImageFix' result='effect1_dropShadow_2219_20990' />
          <feBlend
            mode='normal'
            in='SourceGraphic'
            in2='effect1_dropShadow_2219_20990'
            result='shape'
          />
        </filter>
      </defs>
    </svg>
  )
}

export const MenuFoldArrowIcon: FC<Partial<CustomIconComponentProps>> = (props) => {
  return <Icon component={MenuFoldArrowSvg} {...props} />
}
