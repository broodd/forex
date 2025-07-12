import { useTranslation } from 'react-i18next'

import { PageLayout } from '~/layouts'
import cls from './dashboard-page.module.scss'
import { Card, Col, Row } from 'antd'
import { Title } from '~/shared/ui/title'
import { Button } from '~/shared/ui/button'
import { Dropdown } from '~/shared/ui/dropdown'
import { Menu } from '~/shared/ui/menu'
import StatisticsChart from '~/modules/dashboard/components/statistics-chart/statistics-card'
import TrafficMap from '~/modules/dashboard/components/traffic-map/traffic-map'
import { ConversionMetrics, TrafficMetrics } from '~/modules/dashboard/components/metric-card'

const menu = (
  <Menu
    items={[
      {
        key: '1',
        label: (
          <a target='_blank' rel='noopener noreferrer' href='http://www.alipay.com/'>
            Option 1
          </a>
        ),
      },
      {
        key: '2',
        label: (
          <a target='_blank' rel='noopener noreferrer' href='http://www.taobao.com/'>
            Option 2
          </a>
        ),
      },
    ]}
  />
)

const DashboardPage = () => {
  const { t } = useTranslation()

  return (
    <PageLayout
      header={{
        title: t('PAGES.DASHBOARD.TITLE')!,
      }}
    >
      <div className={cls.wrapper}>
        <Row>
          <Col span={11}>
            {/* Metrics Row 1 */}
            <TrafficMetrics />

            <ConversionMetrics />

            {/* Top 10 Affiliates Table */}
            <Row gutter={[16, 16]} style={{ marginBottom: 20 }}>
              <Col span={24}>
                <Card bordered={false} style={{ background: '#2a2a2a', color: 'white' }}>
                  <Title
                    level={5}
                    style={{
                      color: 'white',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    Top 10 Affiliates
                    <Dropdown overlay={menu} trigger={['click']}>
                      <Button type='link' style={{ color: 'white' }}>
                        Affiliate
                        {/* <DownOutlined /> */}
                      </Button>
                    </Dropdown>
                  </Title>
                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', color: 'white' }}>
                      <thead>
                        <tr>
                          <th
                            style={{
                              padding: '8px',
                              borderBottom: '1px solid #4a4a4a',
                              textAlign: 'left',
                            }}
                          >
                            Showing 1 items
                          </th>
                          <th
                            style={{
                              padding: '8px',
                              borderBottom: '1px solid #4a4a4a',
                              textAlign: 'left',
                            }}
                          >
                            Impressions
                          </th>
                          <th
                            style={{
                              padding: '8px',
                              borderBottom: '1px solid #4a4a4a',
                              textAlign: 'left',
                            }}
                          >
                            Leads
                          </th>
                          <th
                            style={{
                              padding: '8px',
                              borderBottom: '1px solid #4a4a4a',
                              textAlign: 'left',
                            }}
                          >
                            FTDs
                          </th>
                          <th
                            style={{
                              padding: '8px',
                              borderBottom: '1px solid #4a4a4a',
                              textAlign: 'left',
                            }}
                          >
                            Conversion rate
                          </th>
                          <th
                            style={{
                              padding: '8px',
                              borderBottom: '1px solid #4a4a4a',
                              textAlign: 'left',
                            }}
                          >
                            Clicks
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td style={{ padding: '8px', borderBottom: '1px solid #4a4a4a' }}>
                            295854
                          </td>
                          <td style={{ padding: '8px', borderBottom: '1px solid #4a4a4a' }}>2</td>
                          <td style={{ padding: '8px', borderBottom: '1px solid #4a4a4a' }}>0</td>
                          <td style={{ padding: '8px', borderBottom: '1px solid #4a4a4a' }}>0</td>
                          <td style={{ padding: '8px', borderBottom: '1px solid #4a4a4a' }}>0%</td>
                          <td style={{ padding: '8px', borderBottom: '1px solid #4a4a4a' }}>2</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </Card>
              </Col>
            </Row>
          </Col>

          {/* Right Section: Finance, Balance, Statistics Chart */}
          <Col span={13}>
            <Row style={{ marginBottom: 20 }}>
              <Col span={24}>
                <StatisticsChart />
              </Col>
            </Row>
          </Col>
        </Row>

        {/* Traffic Map and Insights */}
        <Row gutter={[16, 16]}>
          <Col span={12}>
            {/* Replace the old Card with TrafficMap */}
            <TrafficMap />
          </Col>
          <Col span={12}>
            <Card
              bordered={false}
              style={{ background: '#2a2a2a', color: 'white', height: '100%' }}
            >
              <Title
                level={5}
                style={{
                  color: 'white',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                Insights
                <Dropdown overlay={menu} trigger={['click']}>
                  <Button type='link' style={{ color: 'white' }}>
                    Impressions
                    {/* <DownOutlined /> */}
                  </Button>
                </Dropdown>
              </Title>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', color: 'white' }}>
                  <thead>
                    <tr>
                      <th
                        style={{
                          padding: '8px',
                          borderBottom: '1px solid #4a4a4a',
                          textAlign: 'left',
                        }}
                      >
                        Showing 2 items
                      </th>
                      <th
                        style={{
                          padding: '8px',
                          borderBottom: '1px solid #4a4a4a',
                          textAlign: 'left',
                        }}
                      >
                        Day
                      </th>
                      <th
                        style={{
                          padding: '8px',
                          borderBottom: '1px solid #4a4a4a',
                          textAlign: 'left',
                        }}
                      >
                        Value
                      </th>
                      <th
                        style={{
                          padding: '8px',
                          borderBottom: '1px solid #4a4a4a',
                          textAlign: 'left',
                        }}
                      >
                        Percentage
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{ padding: '8px', borderBottom: '1px solid #4a4a4a' }}></td>
                      <td style={{ padding: '8px', borderBottom: '1px solid #4a4a4a' }}>
                        Wednesday
                      </td>
                      <td style={{ padding: '8px', borderBottom: '1px solid #4a4a4a' }}>1</td>
                      <td style={{ padding: '8px', borderBottom: '1px solid #4a4a4a' }}>50.0%</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '8px', borderBottom: '1px solid #4a4a4a' }}></td>
                      <td style={{ padding: '8px', borderBottom: '1px solid #4a4a4a' }}>Monday</td>
                      <td style={{ padding: '8px', borderBottom: '1px solid #4a4a4a' }}>1</td>
                      <td style={{ padding: '8px', borderBottom: '1px solid #4a4a4a' }}>50.0%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </PageLayout>
  )
}

export default DashboardPage
