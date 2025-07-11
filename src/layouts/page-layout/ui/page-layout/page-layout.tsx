import classNames from 'classnames'
import { FC, ReactNode } from 'react'

import { Footer, IFooterProps } from '../footer/footer'
import { Header, IHeaderProps } from '../header/header'

import cls from './page-layout.module.scss'

interface IPageLayoutProps {
  className?: string
  header?: IHeaderProps
  footer?: IFooterProps
  fullWidth?: boolean
  fullWidthHeader?: boolean
  children: ReactNode
  aside?: ReactNode
  filters?: ReactNode
  spinning?: boolean
}

export const PageLayout: FC<IPageLayoutProps> = ({
  className,
  children,
  header,
  footer,
  fullWidth = true,
  fullWidthHeader = true,
  aside,
  filters,
}) => {
  return (
    <div
      className={classNames(
        cls.wrapper,
        { [cls.fullWidthHeader]: fullWidthHeader, [cls.withAside]: Boolean(aside) },
        [className],
      )}
    >
      <Header className={cls.header} {...header} />
      {filters && <div className={cls.filters}>{filters}</div>}
      <main className={classNames(cls.content, { [cls.fullWidth]: fullWidth })}>{children}</main>
      {aside && <aside className={cls.aside}>{aside}</aside>}
      {footer && <Footer className={cls.footer} {...footer} />}
    </div>
  )
}
