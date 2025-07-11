import { FC } from 'react'
import classNames from 'classnames'
import { Link as RouterLink, LinkProps } from 'react-router-dom'

import cls from './link.module.scss'

interface ILinkProps extends LinkProps {
  className?: string
}

export const Link: FC<ILinkProps> = ({ to, className, children, ...props }) => {
  return (
    <RouterLink to={to} className={classNames(cls.link, [className])} {...props}>
      {children}
    </RouterLink>
  )
}
