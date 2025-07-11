import { FC } from 'react'
import Icon from '@ant-design/icons'
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'

const SearchSvg = () => {
  return (
    <svg
      width='1em'
      height='1em'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <circle cx='12' cy='12' r='7.25' stroke='currentColor' strokeWidth='1.5' />
      <path
        d='M19.7054 20.5194C20.1027 20.903 20.7358 20.8919 21.1194 20.4946C21.503 20.0973 21.4919 19.4642 21.0946 19.0806L19.7054 20.5194ZM16.8054 17.7194L19.7054 20.5194L21.0946 19.0806L18.1946 16.2806L16.8054 17.7194Z'
        fill='currentColor'
      />
    </svg>
  )
}

export const SearchIcon: FC<Partial<CustomIconComponentProps>> = (props) => {
  return <Icon component={SearchSvg} {...props} />
}
