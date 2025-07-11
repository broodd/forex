import { FC } from 'react'
import { Modal as AntdModal, ModalProps } from 'antd'
import classNames from 'classnames'
import cls from './modal.module.scss'

interface IModalProps extends ModalProps {
  className?: string
}

export const Modal: FC<IModalProps> = ({ className, ...props }) => {
  return (
    <AntdModal
      className={classNames(cls.modal, [className])}
      {...props}
      centered
      cancelButtonProps={{ size: 'large', block: true }}
      okButtonProps={{ size: 'large', block: true }}
    ></AntdModal>
  )
}
