import { FC } from 'react'
import Icon from '@ant-design/icons'
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'

const ArrowUpRightSvg = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='1em'
      height='1em'
      viewBox='0 0 16 16'
      fill='none'
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M8 3.25C5.10051 3.25 2.75 5.60051 2.75 8.5C2.75 11.3995 5.10051 13.75 8 13.75C10.8995 13.75 13.25 11.3995 13.25 8.5C13.25 5.60051 10.8995 3.25 8 3.25ZM1.25 8.5C1.25 4.77208 4.27208 1.75 8 1.75C11.7279 1.75 14.75 4.77208 14.75 8.5C14.75 12.2279 11.7279 15.25 8 15.25C4.27208 15.25 1.25 12.2279 1.25 8.5ZM6 7.25C5.58579 7.25 5.25 6.91421 5.25 6.5C5.25 6.08579 5.58579 5.75 6 5.75H10C10.4142 5.75 10.75 6.08579 10.75 6.5V10.5C10.75 10.9142 10.4142 11.25 10 11.25C9.58579 11.25 9.25 10.9142 9.25 10.5V8.31066L6.53033 11.0303C6.23744 11.3232 5.76256 11.3232 5.46967 11.0303C5.17678 10.7374 5.17678 10.2626 5.46967 9.96967L8.18934 7.25H6Z'
        fill='currentColor'
      />
    </svg>
  )
}

export const ArrowUpRightIcon: FC<Partial<CustomIconComponentProps>> = (props) => {
  return <Icon component={ArrowUpRightSvg} {...props} />
}
