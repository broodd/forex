import classNames from 'classnames'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useLocation } from 'react-router-dom'

import { AccountIcon, CoursesIcon, NotificationIcon, RecipesIcon } from '~/shared/ui/icon'
import { Logo } from '~/shared/ui/logo'
import { Menu } from '~/shared/ui/menu'

import { ERoutes, ROUTES } from '~/lib/constants/routes'
import cls from './sidebar.module.scss'

interface ISidebarProps {
  className?: string
  collapsed: boolean
}

export const Sidebar: FC<ISidebarProps> = ({ className, collapsed }) => {
  const { t } = useTranslation()
  const location = useLocation()

  const getSelectedKey = () => {
    const routes = [
      ROUTES[ERoutes.COURSES].route,
      ROUTES[ERoutes.RECIPES].route,
      ROUTES[ERoutes.ACCOUNT].route,
      ROUTES[ERoutes.NOTIFICATIONS].route,
    ]

    const matchingRoute = routes.find((route) => location.pathname.includes(route))

    return matchingRoute || ROUTES[ERoutes.COURSES].route
  }

  const selectedKey = getSelectedKey()

  const menuItemsTop = [
    {
      label: t('SIDEBAR.COURSES'),
      key: ROUTES[ERoutes.COURSES].route,
      icon: (
        <Link to={ROUTES[ERoutes.COURSES].getPath()}>
          <CoursesIcon style={{ fontSize: 24 }} />
        </Link>
      ),
    },
    {
      label: t('SIDEBAR.RECIPES'),
      key: ROUTES[ERoutes.RECIPES].route,
      icon: (
        <Link to={ROUTES[ERoutes.RECIPES].getPath()}>
          <RecipesIcon style={{ fontSize: 24 }} />
        </Link>
      ),
    },
    {
      label: t('SIDEBAR.NOTIFICATIONS'),
      key: ROUTES[ERoutes.NOTIFICATIONS].route,
      icon: (
        <Link to={ROUTES[ERoutes.NOTIFICATIONS].getPath()}>
          <NotificationIcon style={{ fontSize: 24 }} />
        </Link>
      ),
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
        <Logo className={cls.logo} collapsed={collapsed} />
      </div>

      <div className={cls.menuItems}>
        <Menu
          className={cls.menu}
          items={menuItemsTop}
          selectedKeys={[selectedKey]}
          defaultOpenKeys={
            location.pathname.indexOf(ROUTES[ERoutes.ROOT].route) !== -1
              ? [ROUTES[ERoutes.ROOT].route]
              : []
          }
        />
        <Menu className={cls.menu} items={menuItemsBottom} selectedKeys={[location.pathname]} />
      </div>
    </div>
  )
}
