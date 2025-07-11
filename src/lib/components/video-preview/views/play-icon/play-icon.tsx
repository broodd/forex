import { FC } from 'react'
import classNames from 'classnames'
import cls from './play-icon.module.scss'

interface IPlayIconProps {
  className?: string
  onClick?: () => void
}

export const PlayIcon: FC<IPlayIconProps> = ({ className, onClick }) => {
  return (
    <div className={classNames(cls.wrapper, [className])} onClick={onClick}>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='64'
        height='64'
        viewBox='0 0 64 64'
        fill='none'
      >
        <circle cx='32' cy='32' r='32' fill='#E5E5E5' fillOpacity='0.6' />
        <path
          d='M22.6679 44.8002C23.3011 44.8002 23.8624 44.5857 24.5819 44.1709L41.664 34.3314C42.9448 33.602 43.5205 32.987 43.5205 32.0002C43.5205 31.0277 42.9448 30.4127 41.664 29.669L24.5819 19.8295C23.8624 19.4147 23.3011 19.2002 22.6679 19.2002C21.4159 19.2002 20.4805 20.1584 20.4805 21.6887V42.3117C20.4805 43.8563 21.4159 44.8002 22.6679 44.8002Z'
          fill='white'
        />
      </svg>
    </div>
  )
}
