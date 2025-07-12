import classNames from 'classnames'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { AccountIcon, LogoIcon } from '~/shared/ui/icon'

import { Menu } from '~/shared/ui/menu'

import { ERoutes, ROUTES } from '~/lib/constants/routes'
import { BalanceIcon } from '~/shared/ui/icon/ui/balance-icon'
import { LeadsIcon } from '~/shared/ui/icon/ui/leads-icon'
import { OffersIcon } from '~/shared/ui/icon/ui/offers-icon'
import { PostbacksIcon } from '~/shared/ui/icon/ui/postbacks-icon'
import { StatisticsIcon } from '~/shared/ui/icon/ui/statistics-icon'
import cls from './sidebar.module.scss'
import { ItemsIcon } from '~/shared/ui/icon/ui/items-icon'

interface ISidebarProps {
  className?: string
  collapsed: boolean
}

export const Sidebar: FC<ISidebarProps> = ({ className, collapsed }) => {
  const { t } = useTranslation()

  const menuItemsTop = [
    {
      label: t('SIDEBAR.LEADS'),
      key: ROUTES[ERoutes.COURSES].route,
      icon: <LeadsIcon style={{ fontSize: 28 }} />,
    },
    {
      label: t('SIDEBAR.STATISTICS'),
      key: ROUTES[ERoutes.RECIPES].route,
      icon: <StatisticsIcon style={{ fontSize: 28 }} />,
    },
    {
      label: t('SIDEBAR.OFFERS'),
      key: ROUTES[ERoutes.NOTIFICATIONS].route,
      icon: <OffersIcon style={{ fontSize: 28 }} />,
    },
    {
      label: t('SIDEBAR.BALANCE'),
      key: ROUTES[ERoutes.NOTIFICATIONS].route,
      icon: <BalanceIcon style={{ fontSize: 28 }} />,
    },
    {
      label: t('SIDEBAR.POSTBACKS'),
      key: ROUTES[ERoutes.NOTIFICATIONS].route,
      icon: <PostbacksIcon style={{ fontSize: 28 }} />,
    },
  ]

  const menuItemsBottom = [
    {
      label: '',
      key: ROUTES[ERoutes.ACCOUNT].route,
      icon: (
        <Link to={ROUTES[ERoutes.ACCOUNT].getPath()}>
          <ItemsIcon style={{ fontSize: 28 }} />
        </Link>
      ),
    },
    {
      label: t('SIDEBAR.ACCOUNT'),
      key: ROUTES[ERoutes.ACCOUNT].route,
      icon: (
        <Link to={ROUTES[ERoutes.ACCOUNT].getPath()}>
          <AccountIcon style={{ fontSize: 28 }} />
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
        {/* {menuItemsTop.map((item) => (
          <Flex vertical justify='center' align='center' key={item.key}>
            {item.icon}
            <span>{item.label}</span>
          </Flex>
        ))} */}
        <Menu
          className={cls.menu}
          items={menuItemsTop}
          defaultOpenKeys={
            location.pathname.indexOf(ROUTES[ERoutes.ROOT].route) !== -1
              ? [ROUTES[ERoutes.ROOT].route]
              : []
          }
        />
        <div>
          <Menu className={cls.menu} items={menuItemsBottom} />
          <div style={{ fontSize: '12px' }}>
            <b>08:10</b> UTC
          </div>
        </div>
      </div>
    </div>
  )
}
