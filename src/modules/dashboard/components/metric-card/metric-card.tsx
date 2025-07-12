import { Card, Col, Row, Typography } from 'antd'
import { FC } from 'react'
import cls from './metric-card.module.scss'

const { Title } = Typography

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
  // Determine the color for the percentage based on the provided prop
  const percentageStyle = {
    color: '#52c41a', // Default to green
    // color: percentageColor || '#52c41a', // Default to green
    fontWeight: 'bold',
    fontSize: '14px',
    display: 'flex',
    alignItems: 'center',
  }

  return (
    <Col span={8}>
      <Card bordered={false} style={{ background: '#2a2a2a', color: 'white', padding: '10px 0' }}>
        <div style={{ padding: '0 20px' }}>
          {/* Metric Title (e.g., Impressions, Clicks, CTL) */}
          <div
            style={{ color: 'white', fontSize: '18px', fontWeight: 'normal', marginBottom: '10px' }}
          >
            {title}
          </div>

          {/* Value, Trendline, and Percentage */}
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            <div
              style={{
                fontSize: '36px',
                fontWeight: 'bold',
                color: '#fff',
                marginRight: '10px',
              }}
            >
              {value}
            </div>
            <div className={cls.trendLine}>
              {trendLine && <div className={cls.line}></div>}
              <span style={percentageStyle}>{percentage}</span>
            </div>
          </div>

          {/* Today and Yesterday data */}
          <div style={{ fontSize: '14px', color: '#aaaaaa' }}>
            <div>Today: {today}</div>
            <div>Yesterday: {yesterday}</div>
          </div>
        </div>
      </Card>
    </Col>
  )
}

// The main Traffic Metrics Row component
const TrafficMetrics = () => {
  return (
    <Row style={{ marginBottom: 20 }}>
      {/* Traffic Section Title (Styled in Ant Design yellow/orange) */}
      <Col span={24}>
        <Title level={4} style={{ color: '#f3c75d', marginBottom: 20 }}>
          Traffic
        </Title>
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

export default TrafficMetrics
