import { FC } from 'react'
import Icon from '@ant-design/icons'
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'

const RecipesSvg = () => {
  return (
    <svg
      width='1em'
      height='1em'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <rect
        x='5.75'
        y='4.875'
        width='13.5'
        height='15.375'
        rx='1.5'
        stroke='currentColor'
        strokeWidth='1.5'
      />
      <path d='M10 10H15' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' />
      <path d='M10 13H15' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' />
      <path d='M10 16H15' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' />
      <rect
        x='8.75'
        y='3.75'
        width='7.5'
        height='2.5'
        rx='1.25'
        fill='#FBFBFB'
        stroke='currentColor'
        strokeWidth='1.5'
      />
    </svg>
  )
}

export const RecipesIcon: FC<Partial<CustomIconComponentProps>> = (props) => {
  return <Icon component={RecipesSvg} {...props} />
}
