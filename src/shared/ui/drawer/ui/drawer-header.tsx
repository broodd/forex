import { FC } from 'react'
import classNames from 'classnames'
import cls from './drawer.module.scss'
import { Title } from '../../title'
import { Button } from '../../button'
import { CloseIcon, DeleteIcon, EditIcon } from '../../icon'
import { useDrawerContext } from '../hooks'
import useFormInstance from 'antd/es/form/hooks/useFormInstance'
import { Space } from 'antd'

interface IDrawerHeaderProps {
  className?: string
  title?: string
  onDelete?: () => void
  onEdit?: () => void
  onClose?: () => void
}

export const DrawerHeader: FC<IDrawerHeaderProps> = ({
  className,
  title,
  onDelete,
  onEdit,
  onClose,
}) => {
  const { closeDrawer } = useDrawerContext()
  const form = useFormInstance()
  return (
    <div className={classNames(cls.drawer_header, [className])}>
      {title && (
        <Title level={2} className={cls.title}>
          {title}
        </Title>
      )}
      <Space size={16}>
        {onDelete && (
          <Button
            type='link'
            danger
            icon={<DeleteIcon style={{ fontSize: 30 }} />}
            onClick={onDelete}
          />
        )}

        {onEdit && (
          <Button type='link' icon={<EditIcon style={{ fontSize: 24 }} />} onClick={onEdit} />
        )}

        <Button
          type='link'
          icon={<CloseIcon />}
          onClick={() => {
            if (onClose) {
              onClose()
              return
            }
            closeDrawer()
            form?.resetFields()
          }}
        />
      </Space>
    </div>
  )
}
