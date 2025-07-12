import classNames from 'classnames'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'

import { AccountIcon, LogoIcon } from '~/shared/ui/icon'

import { Menu } from '~/shared/ui/menu'

import { ERoutes, ROUTES } from '~/lib/constants/routes'
import { BalanceIcon } from '~/shared/ui/icon/ui/balance-icon'
import { ItemsIcon } from '~/shared/ui/icon/ui/items-icon'
import { LeadsIcon } from '~/shared/ui/icon/ui/leads-icon'
import { OffersIcon } from '~/shared/ui/icon/ui/offers-icon'
import { PostbacksIcon } from '~/shared/ui/icon/ui/postbacks-icon'
import { StatisticsIcon } from '~/shared/ui/icon/ui/statistics-icon'
import cls from './sidebar.module.scss'

interface ISidebarProps {
  className?: string
  collapsed: boolean
}

export const Sidebar: FC<ISidebarProps> = ({ className, collapsed }) => {
  const { t } = useTranslation()

  const menuItemsTop = [
    {
      label: t('SIDEBAR.LEADS'),
      key: 'leads',
      icon: <LeadsIcon style={{ fontSize: 28 }} />,
    },
    {
      label: t('SIDEBAR.STATISTICS'),
      key: 'statistics',
      icon: <StatisticsIcon style={{ fontSize: 28 }} />,
    },
    {
      label: t('SIDEBAR.OFFERS'),
      key: 'offers',
      icon: <OffersIcon style={{ fontSize: 28 }} />,
    },
    {
      label: t('SIDEBAR.BALANCE'),
      key: 'balance',
      icon: <BalanceIcon style={{ fontSize: 28 }} />,
    },
    {
      label: t('SIDEBAR.POSTBACKS'),
      key: 'postbacks',
      icon: <PostbacksIcon style={{ fontSize: 28 }} />,
    },
  ]

  const menuItemsBottom = [
    {
      label: '',
      key: 'items',
      icon: <ItemsIcon style={{ fontSize: 24 }} />,
    },
    {
      label: '',
      key: 'account',
      icon: <AccountIcon style={{ fontSize: 28 }} />,
    },
  ]

  return (
    <div className={classNames(cls.wrapper, [className])}>
      <div className={cls.logoWrapper}>
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
        <div className={cls.menuBottom}>
          <Menu className={cls.menu} items={menuItemsBottom} />
          <div className={cls.clock}>
            <span className={cls.time}>08:22</span>
            <span className={cls.timezone}>UTC</span>
          </div>
        </div>
      </div>
    </div>
  )
}
