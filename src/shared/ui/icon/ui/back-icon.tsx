import { FC } from 'react'
import Icon from '@ant-design/icons'
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'

const BackSvg = () => {
  return (
    <svg
      width='1em'
      height='1em'
      viewBox='0 0 18 18'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M10.3308 14.0302L6.36105 10.0605C6.07985 9.77918 5.92188 9.39772 5.92188 8.99997C5.92188 8.60223 6.07985 8.22077 6.36105 7.93948L10.3308 3.96973L11.3913 5.03023L7.42455 8.99997L11.3943 12.9697L10.3308 14.0302Z'
        fill='currentColor'
      />
    </svg>
  )
}

export const BackIcon: FC<Partial<CustomIconComponentProps>> = (props) => {
  return <Icon component={BackSvg} {...props} />
}
