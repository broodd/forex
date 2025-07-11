import classNames from 'classnames'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useLocation } from 'react-router-dom'

import { AccountIcon, LogoIcon, NotificationIcon } from '~/shared/ui/icon'

import { Menu } from '~/shared/ui/menu'

import { ERoutes, ROUTES } from '~/lib/constants/routes'
import { LeadsIcon } from '~/shared/ui/icon/ui/leads-icon'
import { StatisticsIcon } from '~/shared/ui/icon/ui/statistics-icon'
import cls from './sidebar.module.scss'
import { Image } from '~/shared/ui/image'

interface ISidebarProps {
  className?: string
  collapsed: boolean
}

export const Sidebar: FC<ISidebarProps> = ({ className, collapsed }) => {
  const { t } = useTranslation()
  const location = useLocation()

  const menuItemsTop = [
    {
      label: t('SIDEBAR.LEADS'),
      key: ROUTES[ERoutes.COURSES].route,
      icon: (
        // <Link to={ROUTES[ERoutes.LEADS].getPath()}>
        <LeadsIcon style={{ fontSize: 24 }} />
        // </Link>
      ),
    },
    {
      label: t('SIDEBAR.STATISTICS'),
      key: ROUTES[ERoutes.RECIPES].route,
      icon: <StatisticsIcon style={{ fontSize: 24 }} />,
    },
    {
      label: t('SIDEBAR.OFFERS'),
      key: ROUTES[ERoutes.NOTIFICATIONS].route,
      icon: <Image src='https://aff.siteforex.work/v3/menu/group/marketing.webp' />,
    },
    {
      label: t('SIDEBAR.BALANCE'),
      key: ROUTES[ERoutes.NOTIFICATIONS].route,
      icon: <NotificationIcon style={{ fontSize: 24 }} />,
    },
    {
      label: t('SIDEBAR.POSTBACKS'),
      key: ROUTES[ERoutes.NOTIFICATIONS].route,
      icon: <NotificationIcon style={{ fontSize: 24 }} />,
    },
  ]

  const menuItemsBottom = [
    {
      label: t('SIDEBAR.ACCOUNT'),
      key: ROUTES[ERoutes.ACCOUNT].route,
      icon: (
        <Link to={ROUTES[ERoutes.ACCOUNT].getPath()}>
          <AccountIcon style={{ fontSize: 24 }} />
        </Link>
      ),
    },
  ]

  return (
    <div className={classNames(cls.wrapper, [className])}>
      <div className={cls.logoWrapper}>
        {/* <Logo className={cls.logo} collapsed={collapsed} /> */}
        {collapsed ? (
          <LogoIcon style={{ fontSize: 42 }} className={cls.logo} />
        ) : (
          <LogoIcon style={{ fontSize: 70 }} className={cls.logo} />
        )}
      </div>

      <div className={cls.menuItems}>
        <Menu
          className={cls.menu}
          items={menuItemsTop}
          defaultOpenKeys={
            location.pathname.indexOf(ROUTES[ERoutes.ROOT].route) !== -1
              ? [ROUTES[ERoutes.ROOT].route]
              : []
          }
        />
        <Menu className={cls.menu} items={menuItemsBottom} />
      </div>
    </div>
  )
}
