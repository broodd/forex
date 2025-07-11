import classNames from 'classnames'
import { FC } from 'react'
import { deleteNotificationConfirmModal } from '~/lib/components/confirm-modals'
import { Button } from '~/shared/ui/button'
import { DeleteIcon } from '~/shared/ui/icon'
import cls from './actions.module.scss'

interface IActionsProps {
  className?: string
  onDelete: () => void
}

export const Actions: FC<IActionsProps> = ({ onDelete, className }) => {
  return (
    <div className={classNames(cls.wrapper, [className])}>
      <Button
        type='link'
        icon={<DeleteIcon style={{ fontSize: 32 }} />}
        danger
        onClick={() => deleteNotificationConfirmModal(onDelete)}
      />
    </div>
  )
}
