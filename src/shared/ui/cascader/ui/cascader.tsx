import { FC } from 'react'
import classNames from 'classnames'
import { Cascader as AntdCascader, CascaderProps } from 'antd'
import cls from './cascader.module.scss'
import { ArrowDownIcon, CloseIcon } from '../../icon'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ICascaderProps = CascaderProps<any> & {
  className?: string
}

export const Cascader: FC<ICascaderProps> = ({ className, ...props }) => {
  return (
    <AntdCascader
      className={classNames(cls.wrapper, [className])}
      {...props}
      allowClear={{ clearIcon: <CloseIcon style={{ fontSize: 20 }} /> }}
      suffixIcon={<ArrowDownIcon style={{ fontSize: 20, pointerEvents: 'none' }} />}
    />
  )
}
