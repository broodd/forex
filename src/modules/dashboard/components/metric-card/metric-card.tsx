/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Card, Col, Dropdown, Menu, Row, Typography } from 'antd'
import { FC, ReactNode } from 'react'
import cls from './metric-card.module.scss'
import classNames from 'classnames'
import { DownOutlined } from '@ant-design/icons'

const { Text } = Typography

interface IMetricCardProps {
  span?: number
  className?: string
  title: string
  value: string | number
  today: string | number
  yesterday: string | number
  percentage: string
  trendLine: boolean
  onTitleClick?: any
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
  onTitleClick,
}) => {
  return (
    <Col span={span}>
      <Card className={cls.metricCard} bordered={false}>
        <div>
          {/* Metric Title (e.g., Impressions, Clicks, CTL) */}
          <div className={cls.title} onClick={onTitleClick}>
            {title}
          </div>

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

const dropdownMenu = (
  <Menu
    items={[
      { key: '1', label: 'Option 1' },
      { key: '2', label: 'Option 2' },
      { key: '3', label: 'Option 3' },
    ]}
  />
)

export const MetricBox = ({
  title,
  dropDownTitle,
  children,
  className,
}: {
  title: string
  dropDownTitle?: string
  className?: string
  children?: ReactNode
}) => {
  return (
    <Row className={classNames(cls.wrapper, [className])}>
      <Col span={dropDownTitle ? 12 : 24}>
        <Text className={cls.metricTitle}>{title}</Text>
      </Col>

      {dropDownTitle && (
        <Col className={cls.dropdown}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 20,
            }}
          >
            <Dropdown overlay={dropdownMenu} trigger={['click']}>
              <Button type='link' style={{ color: 'white', display: 'flex', alignItems: 'center' }}>
                {dropDownTitle}
                <DownOutlined style={{ marginLeft: 5 }} />
              </Button>
            </Dropdown>
          </div>
        </Col>
      )}

      {children}
    </Row>
  )
}
