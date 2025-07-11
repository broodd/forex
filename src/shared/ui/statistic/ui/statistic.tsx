import { FC } from 'react'
import { Statistic as AntdStatistic, StatisticProps } from 'antd'
import classNames from 'classnames'
import cls from './statistic.module.scss'

interface IStatisticProps extends StatisticProps {
  className?: string
}

export const Statistic: FC<IStatisticProps> = ({ className, ...props }) => {
  return <AntdStatistic className={classNames(cls.wrapper, [className])} {...props}></AntdStatistic>
}
