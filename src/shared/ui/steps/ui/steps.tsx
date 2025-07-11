import { FC } from 'react'
import classNames from 'classnames'
import { Steps as AntdSteps, StepsProps } from 'antd'

import cls from './steps.module.scss'

interface IStepsProps extends StepsProps {
  className?: string
}

export const Steps: FC<IStepsProps> = ({ className, ...props }) => {
  return <AntdSteps className={classNames(cls.steps, [className])} {...props} />
}
