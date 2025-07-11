import { FC } from 'react'
import { Form, FormItemProps } from 'antd'
import classNames from 'classnames'

import cls from './form-item.module.scss'

interface IFormItemProps extends FormItemProps {
  className?: string
}

export const FormItem: FC<IFormItemProps> = ({ className, children, ...props }) => {
  return (
    <Form.Item className={classNames(cls.field, [className])} {...props}>
      {children}
    </Form.Item>
  )
}
