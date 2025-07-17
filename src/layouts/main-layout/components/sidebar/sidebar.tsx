/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames from 'classnames'
import { FC, useEffect, useState } from 'react'
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
import EditDateRangeModal from '~/modules/dashboard/components/metric-card/edit-text-modal'
import { ColorThemeModal } from '~/modules/dashboard/components/metric-card/color-theme-modal'
import { THEME_PALETTES } from '~/lib/constants/theme-pallets'

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

  const n = new Date()
  const [dateText, setDateText] = useState(
    `${n.getHours().toString().padStart(2, '0')}:${n.getMinutes().toString().padStart(2, '0')}`,
  )
  const [isEditDateModalVisible, setIsEditDateModalVisible] = useState(false)

  const handleDateClick = () => {
    setIsEditDateModalVisible(true)
  }

  const handleDateModalSave = (newText: string) => {
    setDateText(newText)
    setIsEditDateModalVisible(false)
  }

  const handleDateModalCancel = () => {
    setIsEditDateModalVisible(false)
  }

  // NEW: State for Color Theme
  const [isColorThemeModalVisible, setIsColorThemeModalVisible] = useState(false)
  const [currentTheme, setCurrentTheme] = useState(THEME_PALETTES[0]) // Will store the active theme object
  const [currentMenuColor, setCurrentMenuColor] = useState(THEME_PALETTES[0].menu)

  const handleThemeSettingsClick = () => {
    setIsColorThemeModalVisible(true)
  }

  const handleApplyColorTheme = (themeObject: any) => {
    setCurrentTheme(themeObject)
    setCurrentMenuColor(themeObject.menu) // Update currentMenuColor state
    setIsColorThemeModalVisible(false)
  }

  const handleColorThemeModalCancel = () => {
    setIsColorThemeModalVisible(false)
  }

  useEffect(() => {
    if (currentTheme) {
      const root = document.documentElement
      root.style.setProperty('--brand-100', currentTheme.brand)
      root.style.setProperty('--menu-color', currentTheme.menu)
    }
  }, [currentTheme])

  return (
    <div className={classNames(cls.wrapper, [className])}>
      <div className={cls.logoWrapper} onClick={handleThemeSettingsClick}>
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
          <div className={cls.clock} onClick={handleDateClick}>
            <span className={cls.time}>{dateText}</span>
            <span className={cls.timezone}>UTC</span>
          </div>
        </div>
      </div>

      <EditDateRangeModal
        visible={isEditDateModalVisible}
        onCancel={handleDateModalCancel}
        onSave={handleDateModalSave}
        initialText={dateText}
      />

      {/* NEW: Color Theme Modal */}
      <ColorThemeModal
        visible={isColorThemeModalVisible}
        onCancel={handleColorThemeModalCancel}
        onApplyTheme={handleApplyColorTheme}
        currentMenuColor={currentMenuColor}
      />
    </div>
  )
}
