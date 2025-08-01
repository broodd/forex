/* eslint-disable @typescript-eslint/no-explicit-any */
import { DownOutlined } from '@ant-design/icons'
import { Button, Card, Col, Dropdown, Menu, Row, Skeleton, Typography } from 'antd'
import classNames from 'classnames'
import { FC, ReactNode } from 'react'
import cls from './metric-card.module.scss'

const { Text } = Typography

interface IMetricCardProps {
  span?: number
  className?: string
  isLoading?: boolean
  title: string
  value: string | number
  today?: string | number
  yesterday: number | string
  percentage: string
  trendLine: boolean
  showToday: boolean
  onTitleClick?: any
}

// Component for a single metric card
export const MetricCard: FC<IMetricCardProps> = ({
  span = 8,
  title,
  value,
  today,
  isLoading,
  yesterday,
  percentage,
  trendLine,
  showToday,
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

          {isLoading ? (
            <Skeleton active={true} paragraph={{ rows: 2 }} />
          ) : (
            <>
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
                {trendLine && (
                  <div className={cls.trendLine}>
                    <div className={cls.line}></div>
                    <span className={cls.trendLineText}>{percentage}%</span>
                  </div>
                )}
              </div>

              {/* Today and Yesterday data */}
              {showToday && (
                <div className={cls.details}>
                  <div>Today: {today}</div>
                  <div>Yesterday: {parseFloat(yesterday as string).toFixed(0)}</div>
                </div>
              )}
            </>
          )}
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
  isLoading,
  loadingTable,
  children,
  className,
  onTitleClick,
}: {
  title: string
  isLoading?: boolean
  loadingTable?: number
  dropDownTitle?: string
  onTitleClick?: any
  className?: string
  children?: ReactNode
}) => {
  return (
    <Row className={classNames(cls.wrapper, [className])}>
      {isLoading ? (
        loadingTable ? (
          <Col className={cls.skeletonTable}>
            {new Array(loadingTable).fill(1).map((_item, index) => (
              <Skeleton.Button key={index} active={true} block={true} size='large' />
            ))}
          </Col>
        ) : (
          <Col className={cls.skeletonBox}>
            <Skeleton.Button active={true} block={true} size='large' />
          </Col>
        )
      ) : (
        <>
          <Col span={dropDownTitle ? 12 : 24}>
            <Text className={cls.metricTitle} onClick={onTitleClick}>
              {title}
            </Text>
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
                  <Button
                    type='link'
                    style={{ color: 'white', display: 'flex', alignItems: 'center' }}
                  >
                    {dropDownTitle}
                    <DownOutlined style={{ marginLeft: 5 }} />
                  </Button>
                </Dropdown>
              </div>
            </Col>
          )}

          {children}
        </>
      )}
    </Row>
  )
}
