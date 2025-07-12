import { Card, Col, Row, Typography } from 'antd'
import { FC } from 'react'
import cls from './metric-card.module.scss'

const { Text } = Typography

interface IMetricCardProps {
  className?: string
  title: string
  value: string
  today: string
  yesterday: string
  percentage: string
  trendLine: boolean
}

// Component for a single metric card
const MetricCard: FC<IMetricCardProps> = ({
  title,
  value,
  today,
  yesterday,
  percentage,
  trendLine,
}) => {
  return (
    <Col span={8}>
      <Card className={cls.metricCard} bordered={false}>
        <div>
          {/* Metric Title (e.g., Impressions, Clicks, CTL) */}
          <div className={cls.title}>{title}</div>

          {/* Value, Trendline, and Percentage */}
          <div className={cls.trend}>
            <div className={cls.name}>{value}</div>
            <div className={cls.trendLine}>
              {trendLine && <div className={cls.line}></div>}
              <span className={cls.trendLineText}>{percentage}</span>
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

export const TrafficMetrics = () => {
  return (
    <Row className={cls.wrapper}>
      {/* Traffic Section Title (Styled in Ant Design yellow/orange) */}
      <Col span={24}>
        <Text className={cls.metricTitle}>Traffic</Text>
      </Col>

      {/* Impressions Card */}
      <MetricCard
        title='Impressions'
        value='131'
        today='11'
        yesterday='19'
        percentage='100%'
        trendLine={true}
      />

      {/* Clicks Card */}
      <MetricCard
        title='Clicks'
        value='94'
        today='10'
        yesterday='13'
        percentage='100%'
        trendLine={true}
      />

      {/* CTL Card */}
      <MetricCard
        title='CTL'
        value='100%'
        today='100%'
        yesterday='100%'
        percentage='100%'
        trendLine={true}
      />
    </Row>
  )
}

export const ConversionMetrics = () => {
  return (
    <Row className={cls.wrapper}>
      {/* Traffic Section Title (Styled in Ant Design yellow/orange) */}
      <Col span={24}>
        <Text className={cls.metricTitle}>Conversion</Text>
      </Col>

      {/* Impressions Card */}
      <MetricCard
        title='Leads'
        value='2'
        today='1'
        yesterday='19'
        percentage='90%'
        trendLine={true}
      />

      {/* Clicks Card */}
      <MetricCard
        title='FTDs'
        value='0'
        today='10'
        yesterday='90'
        percentage='0%'
        trendLine={false}
      />

      {/* CTL Card */}
      <MetricCard
        title='CR'
        value='0%'
        today='0%'
        yesterday='4%'
        percentage='0%'
        trendLine={false}
      />
    </Row>
  )
}
