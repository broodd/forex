import { FC } from 'react'
import classNames from 'classnames'
import cls from './success-reset-screen.module.scss'
import { DoneIcon } from '~/shared/ui/icon'
import { ETextSizes, Text } from '~/shared/ui/text'

interface ISuccessResetScreenProps {
  className?: string
}

export const SuccessResetScreen: FC<ISuccessResetScreenProps> = ({ className }) => {
  return (
    <div className={classNames(cls.wrapper, [className])}>
      <Text size={ETextSizes.H7}>Ihr Passwort wurde erfolgreich aktualisiert</Text>
      <DoneIcon style={{ fontSize: 64, marginTop: 24 }} />
    </div>
  )
}
