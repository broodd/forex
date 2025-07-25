import classNames from 'classnames'
import { FC } from 'react'
import { Button } from '~/shared/ui/button'
import { MenuFoldArrowIcon, MenuUnfoldArrowIcon } from '~/shared/ui/icon'
import cls from './collapse-btn.module.scss'

interface ICollapseBtnProps {
  className?: string
  collapsed: boolean
  setCollapsed: (value: boolean) => void
}

export const CollapseBtn: FC<ICollapseBtnProps> = ({ className, collapsed, setCollapsed }) => {
  return (
    <div className={classNames(cls.wrapper, [className])}>
      <Button
        type='link'
        onClick={() => setCollapsed(!collapsed)}
        className={classNames(cls.trigger, [collapsed ? '' : 'collapsed'])}
        icon={
          collapsed ? (
            <MenuUnfoldArrowIcon style={{ fontSize: '24px' }} />
          ) : (
            <MenuFoldArrowIcon style={{ fontSize: '24px' }} />
          )
        }
      />
    </div>
  )
}
