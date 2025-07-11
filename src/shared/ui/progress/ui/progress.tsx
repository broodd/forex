import { FC } from 'react'
import classNames from 'classnames'
import cls from './progress.module.scss'
import { Progress as AntdProgress, ProgressProps } from 'antd'

interface IProgressProps extends ProgressProps {
  className?: string
}

export const Progress: FC<IProgressProps> = ({ className, ...props }) => {
  return <AntdProgress className={classNames(cls.wrapper, [className])} {...props} />
}
