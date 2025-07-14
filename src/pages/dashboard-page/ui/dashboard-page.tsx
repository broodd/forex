import { useTranslation } from 'react-i18next'

import { Col, Row, Typography } from 'antd'
import { PageLayout } from '~/layouts'
import { MetricBox, MetricCard } from '~/modules/dashboard/components/metric-card'
import StatisticsChart from '~/modules/dashboard/components/statistics-chart/statistics-card'
import CustomTable from '~/modules/dashboard/components/table/table'
import TrafficMap from '~/modules/dashboard/components/traffic-map/traffic-map'
// import { Menu } from '~/shared/ui/menu'
import cls from './dashboard-page.module.scss'
import { FilterIcon } from '~/shared/ui/icon'
import { RefreshIcon } from '~/shared/ui/icon/ui/refresh-icon'

// const menu = (
//   <Menu
//     items={[
//       {
//         key: '1',
//         label: (
//           <a target='_blank' rel='noopener noreferrer' href='http://www.alipay.com/'>
//             Option 1
//           </a>
//         ),
//       },
//       {
//         key: '2',
//         label: (
//           <a target='_blank' rel='noopener noreferrer' href='http://www.taobao.com/'>
//             Option 2
//           </a>
//         ),
//       },
//     ]}
//   />
// )

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Impressions',
    dataIndex: 'impressions',
    key: 'impressions',
  },
  {
    title: 'Leads',
    dataIndex: 'leads',
    key: 'leads',
  },
  {
    title: 'FTDs',
    dataIndex: 'ftds',
    key: 'ftds',
  },
  {
    title: 'Conversion Rate',
    dataIndex: 'conversionRate',
    key: 'conversionRate',
    render: (value: number) => `${value}%`,
  },
  {
    title: 'Clicks',
    dataIndex: 'clicks',
    key: 'clicks',
  },
]

const data = [
  {
    key: '1',
    name: '2958032',
    impressions: 18,
    leads: 0,
    ftds: 0,
    conversionRate: 0,
    clicks: 0,
  },
  {
    key: '2',
    name: '2958154',
    impressions: 97,
    leads: 81,
    ftds: 0,
    conversionRate: 0,
    clicks: 81,
  },
]

const columnsInsights = [
  {
    title: 'Day',
    dataIndex: 'day',
    key: 'day',
  },
  {
    title: 'Value',
    dataIndex: 'value',
    key: 'value',
  },
  {
    title: 'Percentage',
    dataIndex: 'percentage',
    key: 'percentage',
    render: (value: number) => `${value}%`,
  },
]

const dataInsights = [
  {
    key: '1',
    day: 'Monday',
    value: 18,
    percentage: 0,
  },
  {
    key: '2',
    day: 'Wednesday',
    value: 12,
    percentage: 0,
  },
]

const { Text } = Typography

const formatDate = (date: Date): string => {
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0') // Months are 0-indexed
  const year = date.getFullYear()
  return `${day}/${month}/${year}`
}

const today = new Date()
const lastWeek = new Date()
lastWeek.setDate(today.getDate() - 7)

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
          <Col lg={9} className={cls.filters}>
            <FilterIcon className={cls.filterIcon} />
            <Text>Filter</Text>
            <Text className={cls.filtersDate}>
              {formatDate(lastWeek)} - {formatDate(today)}
            </Text>
            <RefreshIcon className={cls.refhreshIcon} />
          </Col>

          <Col className={cls.periodFilter}>
            <Text className={cls.periodItem}>Today</Text>
            <Text className={cls.periodItem}>Yesterday</Text>
            <Text className={cls.periodItem}>Last 7 Days</Text>
            <Text className={cls.periodItem}>This Week</Text>
            <Text className={cls.periodItem}>This Month</Text>
            <Text className={cls.periodItem}>Last Month</Text>
            <Text className={cls.periodItem}>Custom</Text>
          </Col>
        </Row>

        <Row>
          <Col span={11} lg={11} md={11} className={cls.leftSide}>
            <MetricBox title='Traffic'>
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
            </MetricBox>

            <MetricBox title='Conversion'>
              <MetricCard
                title='Leads'
                value='2'
                today='1'
                yesterday='19'
                percentage='90%'
                trendLine={true}
              />

              <MetricCard
                title='FTDs'
                value='0'
                today='10'
                yesterday='90'
                percentage='0%'
                trendLine={false}
              />

              <MetricCard
                title='CR'
                value='0%'
                today='0%'
                yesterday='4%'
                percentage='0%'
                trendLine={false}
              />
            </MetricBox>

            <MetricBox title='Top 10 Affiliates' className={cls.flexContentStart}>
              <CustomTable title={`Showing ${data.length} Items`} columns={columns} data={data} />
            </MetricBox>
          </Col>

          {/* Right Section: Finance, Balance, Statistics Chart */}
          <Col span={13} lg={13} md={13}>
            <Row>
              <Col span={12}>
                <MetricBox title='Finance'>
                  <MetricCard
                    span={24}
                    title='Payout'
                    value='131'
                    today='11'
                    yesterday='19'
                    percentage='100%'
                    trendLine={true}
                  />
                </MetricBox>
              </Col>
              <Col span={12}>
                <MetricBox title='Balance'>
                  <MetricCard
                    span={24}
                    title='Total Balance'
                    value='131'
                    today='11'
                    yesterday='19'
                    percentage='100%'
                    trendLine={true}
                  />
                </MetricBox>
              </Col>
            </Row>

            <MetricBox title='Statistics'>
              <StatisticsChart />
            </MetricBox>

            <Row>
              <Col span={12}>
                <MetricBox title='Traffic Map'>
                  <TrafficMap />
                </MetricBox>
              </Col>

              <Col span={12} className={cls.dFlex}>
                <MetricBox title='Insights' className={cls.flexContentStart}>
                  <CustomTable
                    title={`Showing ${data.length} Items`}
                    columns={columnsInsights}
                    data={dataInsights}
                  />
                </MetricBox>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </PageLayout>
  )
}

export default DashboardPage
