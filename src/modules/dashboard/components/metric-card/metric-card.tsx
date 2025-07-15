import { Card, Col, Row, Typography } from 'antd'
import { FC, ReactNode } from 'react'
import cls from './metric-card.module.scss'
import classNames from 'classnames'

const { Text } = Typography

interface IMetricCardProps {
  span?: number
  className?: string
  title: string
  value: string
  today: string
  yesterday: string
  percentage: string
  trendLine: boolean
}

// Component for a single metric card
export const MetricCard: FC<IMetricCardProps> = ({
  span = 8,
  title,
  value,
  today,
  yesterday,
  percentage,
  trendLine,
}) => {
  return (
    <Col span={span}>
      <Card className={cls.metricCard} bordered={false}>
        <div>
          {/* Metric Title (e.g., Impressions, Clicks, CTL) */}
          <div className={cls.title}>{title}</div>

          {/* Value, Trendline, and Percentage */}
          <div
            className={classNames(cls.trend, [
              parseFloat(percentage) < 0
                ? cls.down
                : parseFloat(percentage) > 0
                  ? cls.up
                  : cls.equal,
            ])}
          >
            <div className={cls.name}>{value}</div>
            <div className={cls.trendLine}>
              {trendLine && <div className={cls.line}></div>}
              <span className={cls.trendLineText}>{percentage}%</span>
            </div>
          </div>

          {/* Today and Yesterday data */}
          <div className={cls.details}>
            <div>Today: {today}</div>
            <div>Yesterday: {yesterday}</div>
          </div>
        </div>
      </Card>
    </Col>
  )
}

export const MetricBox = ({
  title,
  children,
  className,
}: {
  title: string
  className?: string
  children?: ReactNode
}) => {
  return (
    <Row className={classNames(cls.wrapper, [className])}>
      {/* Traffic Section Title (Styled in Ant Design yellow/orange) */}
      <Col span={24}>
        <Text className={cls.metricTitle}>{title}</Text>
      </Col>

      {children}
    </Row>
  )
}
