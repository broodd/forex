import { FC } from 'react'
import classNames from 'classnames'
import cls from './settings-btn.module.scss'
import { Button } from '~/shared/ui/button'
import { MoreVerticalIcon } from '~/shared/ui/icon'

interface ISettingsBtnProps {
  className?: string
  onClick: () => void
}

export const SettingsBtn: FC<ISettingsBtnProps> = ({ className, onClick }) => {
  return (
    <div className={cls.wrapper}>
      <Button
        variant='outlined'
        type='primary'
        shape='circle'
        className={classNames(cls.wrapper, [className])}
        icon={<MoreVerticalIcon style={{ fontSize: 24 }} />}
        onClick={(e) => {
          e.stopPropagation()
          onClick()
        }}
      />
    </div>
  )
}
