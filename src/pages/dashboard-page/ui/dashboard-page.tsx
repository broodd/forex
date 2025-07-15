/* eslint-disable @typescript-eslint/no-explicit-any */
import { useTranslation } from 'react-i18next'

import { Col, Row, Typography } from 'antd'
import { PageLayout } from '~/layouts'
import { EditTableModal, MetricBox, MetricCard } from '~/modules/dashboard/components/metric-card'
import StatisticsChart from '~/modules/dashboard/components/statistics-chart/statistics-card'
import CustomTable from '~/modules/dashboard/components/table/table'
import TrafficMap from '~/modules/dashboard/components/traffic-map/traffic-map'
// import { Menu } from '~/shared/ui/menu'
import cls from './dashboard-page.module.scss'
import { FilterIcon } from '~/shared/ui/icon'
import { RefreshIcon } from '~/shared/ui/icon/ui/refresh-icon'
import { SetStateAction, SetStateAction, SetStateAction, useState } from 'react'
import { EditMetricModal } from '~/modules/dashboard/components/metric-card/edit-metric-modal'

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

  // Define the metrics state here
  const [metricsData, setMetricsData] = useState({
    traffic: {
      impressions: {
        value: '131',
        percentage: '-90',
        today: '11',
        yesterday: '19',
        trendLine: true,
      },
      clicks: {
        value: '94',
        percentage: '100',
        today: '10',
        yesterday: '13',
        trendLine: true,
      },
      ctl: {
        value: '100%', // CTL is a percentage itself
        percentage: '100',
        today: '100%',
        yesterday: '100%',
        trendLine: true,
      },
    },
    conversion: {
      leads: {
        value: '2',
        percentage: '90',
        today: '1',
        yesterday: '19',
        trendLine: true,
      },
      ftds: {
        value: '0',
        percentage: '0',
        today: '10',
        yesterday: '90',
        trendLine: true, // No trend line shown in the image for FTDs
      },
      cr: {
        value: '0%',
        percentage: '0',
        today: '0%',
        yesterday: '4%',
        trendLine: true, // No trend line shown in the image for CR
      },
    },
    finance: {
      payout: {
        value: '131',
        percentage: '100',
        today: '11',
        yesterday: '19',
        trendLine: true,
      },
    },
    balance: {
      payout: {
        value: '131',
        percentage: '100',
        today: '11',
        yesterday: '19',
        trendLine: true,
      },
    },
  })

  // State for modal visibility and data being edited
  const [isEditModalVisible, setIsEditModalVisible] = useState(false)
  const [currentEditingMetricType, setCurrentEditingMetricType] = useState(null) // e.g., 'traffic' or 'conversion'
  const [currentEditingMetricName, setCurrentEditingMetricName] = useState(null) // e.g., 'impressions', 'clicks'
  const [initialFormValues, setInitialFormValues] = useState({}) // Data to pre-fill the form

  const handleMetricCardTitleClick = (metricType: any, metricName: any) => {
    const metricData = (metricsData as any)[metricType][metricName]
    setCurrentEditingMetricType(metricType)
    setCurrentEditingMetricName(metricName)
    // Prepare initial values for the form, including a display title for the modal
    setInitialFormValues({
      // Capitalize first letter for display in modal title
      title: metricName.charAt(0).toUpperCase() + metricName.slice(1),
      ...metricData,
    })
    setIsEditModalVisible(true)
  }

  const handleModalSave = (newValues: any) => {
    setMetricsData((prevData) => ({
      ...prevData,
      [currentEditingMetricType as any]: {
        ...(prevData as any)[currentEditingMetricType as any],
        [currentEditingMetricName as any]: {
          ...(prevData as any)[currentEditingMetricType as any][currentEditingMetricName as any],
          // Update only the editable fields, merge with existing data
          value: newValues.value,
          percentage: newValues.percentage,
          today: newValues.today,
          yesterday: newValues.yesterday,
          // Important: preserve trendLine and other non-editable properties
          // If trendLine should be dynamic based on percentage, update logic here
        },
      } as any,
    }))
    setIsEditModalVisible(false)
    setCurrentEditingMetricType(null)
    setCurrentEditingMetricName(null)
  }

  // Function to handle cancelling the modal
  const handleModalCancel = () => {
    setIsEditModalVisible(false)
    setCurrentEditingMetricType(null)
    setCurrentEditingMetricName(null)
  }

  const [isAffiliateModalVisible, setIsAffiliateModalVisible] = useState(false)
  const [editingAffiliateRow, setEditingAffiliateRow] = useState(null)

  const [isInsightsModalVisible, setIsInsightsModalVisible] = useState(false)
  const [editingInsightsRow, setEditingInsightsRow] = useState(null)

  // --- DUMMY DATA FOR TABLES (Replace with your actual data) ---
  const [affiliateData, setAffiliateData] = useState([
    {
      key: '1',
      name: '2958032',
      impressions: 18,
      leads: 0,
      ftds: 0,
      conversionRate: '0%',
      clicks: 0,
    },
    {
      key: '2',
      name: '2958154',
      impressions: 97,
      leads: 81,
      ftds: 0,
      conversionRate: '0%',
      clicks: 81,
    },
  ])

  const [insightsData, setInsightsData] = useState([
    { key: '1', day: 'Monday', value: 18, percentage: '0%' },
    { key: '2', day: 'Wednesday', value: 12, percentage: '0%' },
  ])

  // --- AFFILIATES TABLE COLUMNS ---
  const affiliateColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a: { name: string }, b: { name: any }) => a.name.localeCompare(b.name),
    },
    {
      title: 'Impressions',
      dataIndex: 'impressions',
      key: 'impressions',
      sorter: (a: { impressions: number }, b: { impressions: number }) =>
        a.impressions - b.impressions,
    },
    {
      title: 'Leads',
      dataIndex: 'leads',
      key: 'leads',
      sorter: (a: { leads: number }, b: { leads: number }) => a.leads - b.leads,
    },
    {
      title: 'FTDs',
      dataIndex: 'ftds',
      key: 'ftds',
      sorter: (a: { ftds: number }, b: { ftds: number }) => a.ftds - b.ftds,
    },
    {
      title: 'Conversion Rate',
      dataIndex: 'conversionRate',
      key: 'conversionRate',
      sorter: (a: { conversionRate: string }, b: { conversionRate: string }) =>
        parseFloat(a.conversionRate) - parseFloat(b.conversionRate),
    },
    {
      title: 'Clicks',
      dataIndex: 'clicks',
      key: 'clicks',
      sorter: (a: { clicks: number }, b: { clicks: number }) => a.clicks - b.clicks,
    },
  ]

  // --- INSIGHTS TABLE COLUMNS ---
  const insightsColumns = [
    {
      title: 'Day',
      dataIndex: 'day',
      key: 'day',
      sorter: (a: { day: string }, b: { day: any }) => a.day.localeCompare(b.day),
    },
    {
      title: 'Value',
      dataIndex: 'value',
      key: 'value',
      sorter: (a: { value: number }, b: { value: number }) => a.value - b.value,
    },
    {
      title: 'Percentage',
      dataIndex: 'percentage',
      key: 'percentage',
      sorter: (a: { percentage: string }, b: { percentage: string }) =>
        parseFloat(a.percentage) - parseFloat(b.percentage),
    },
  ]

  // --- NEW HANDLERS FOR AFFILIATE TABLE MODAL ---
  const handleAffiliateRowClick = (record: SetStateAction<null>) => {
    setEditingAffiliateRow(record)
    setIsAffiliateModalVisible(true)
  }

  const handleAffiliateModalSave = (newValues: { key: string }) => {
    setAffiliateData((prevData) =>
      prevData.map((row) => (row.key === newValues.key ? { ...row, ...newValues } : row)),
    )
    setIsAffiliateModalVisible(false)
    setEditingAffiliateRow(null)
  }

  const handleAffiliateModalCancel = () => {
    setIsAffiliateModalVisible(false)
    setEditingAffiliateRow(null)
  }

  // --- NEW HANDLERS FOR INSIGHTS TABLE MODAL ---
  const handleInsightsRowClick = (record: SetStateAction<null>) => {
    setEditingInsightsRow(record)
    setIsInsightsModalVisible(true)
  }

  const handleInsightsModalSave = (newValues: { key: string }) => {
    setInsightsData((prevData) =>
      prevData.map((row) => (row.key === newValues.key ? { ...row, ...newValues } : row)),
    )
    setIsInsightsModalVisible(false)
    setEditingInsightsRow(null)
  }

  const handleInsightsModalCancel = () => {
    setIsInsightsModalVisible(false)
    setEditingInsightsRow(null)
  }

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
                value={metricsData.traffic.impressions.value}
                today={metricsData.traffic.impressions.today}
                yesterday={metricsData.traffic.impressions.yesterday}
                percentage={metricsData.traffic.impressions.percentage}
                trendLine={metricsData.traffic.impressions.trendLine}
                onTitleClick={() => handleMetricCardTitleClick('traffic', 'impressions')}
              />

              {/* Clicks Card */}
              <MetricCard
                title='Clicks'
                value={metricsData.traffic.clicks.value}
                today={metricsData.traffic.clicks.today}
                yesterday={metricsData.traffic.clicks.yesterday}
                percentage={metricsData.traffic.clicks.percentage}
                trendLine={metricsData.traffic.clicks.trendLine}
                onTitleClick={() => handleMetricCardTitleClick('traffic', 'clicks')} // Pass callback
              />

              {/* CTL Card */}
              <MetricCard
                title='CTL'
                value={metricsData.traffic.ctl.value}
                today={metricsData.traffic.ctl.today}
                yesterday={metricsData.traffic.ctl.yesterday}
                percentage={metricsData.traffic.ctl.percentage}
                trendLine={metricsData.traffic.ctl.trendLine}
                onTitleClick={() => handleMetricCardTitleClick('traffic', 'ctl')}
              />
            </MetricBox>

            <MetricBox title='Conversion'>
              <MetricCard
                title='Leads'
                value={metricsData.conversion.leads.value}
                today={metricsData.conversion.leads.today}
                yesterday={metricsData.conversion.leads.yesterday}
                percentage={metricsData.conversion.leads.percentage}
                trendLine={metricsData.conversion.leads.trendLine}
                onTitleClick={() => handleMetricCardTitleClick('conversion', 'leads')}
              />

              <MetricCard
                title='FTDs'
                value={metricsData.conversion.ftds.value}
                today={metricsData.conversion.ftds.today}
                yesterday={metricsData.conversion.ftds.yesterday}
                percentage={metricsData.conversion.ftds.percentage}
                trendLine={metricsData.conversion.ftds.trendLine}
                onTitleClick={() => handleMetricCardTitleClick('conversion', 'ftds')}
              />

              <MetricCard
                title='CR'
                value={metricsData.conversion.cr.value}
                today={metricsData.conversion.cr.today}
                yesterday={metricsData.conversion.cr.yesterday}
                percentage={metricsData.conversion.cr.percentage}
                trendLine={metricsData.conversion.cr.trendLine}
                onTitleClick={() => handleMetricCardTitleClick('conversion', 'cr')}
              />
            </MetricBox>

            <MetricBox
              title='Top 10 Affiliates'
              className={cls.flexContentStart}
              dropDownTitle='Affiliate'
            >
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
                    value={metricsData.finance.payout.value}
                    today={metricsData.finance.payout.today}
                    yesterday={metricsData.finance.payout.yesterday}
                    percentage={metricsData.finance.payout.percentage}
                    trendLine={metricsData.finance.payout.trendLine}
                    onTitleClick={() => handleMetricCardTitleClick('finance', 'payout')}
                  />
                </MetricBox>
              </Col>
              <Col span={12}>
                <MetricBox title='Balance'>
                  <MetricCard
                    span={24}
                    title='Total Balance'
                    value={metricsData.balance.payout.value}
                    today={metricsData.balance.payout.today}
                    yesterday={metricsData.balance.payout.yesterday}
                    percentage={metricsData.balance.payout.percentage}
                    trendLine={metricsData.balance.payout.trendLine}
                    onTitleClick={() => handleMetricCardTitleClick('balance', 'payout')}
                  />
                </MetricBox>
              </Col>
            </Row>

            <MetricBox title='Statistics'>
              <StatisticsChart />
            </MetricBox>

            <Row>
              <Col span={12}>
                <MetricBox title='Traffic Map' dropDownTitle='Impressions'>
                  <TrafficMap />
                </MetricBox>
              </Col>

              <Col span={12} className={cls.dFlex}>
                <MetricBox
                  title='Insights'
                  className={cls.flexContentStart}
                  dropDownTitle='Impressions'
                >
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
      <EditMetricModal
        visible={isEditModalVisible}
        onCancel={handleModalCancel}
        onSave={handleModalSave}
        initialValues={initialFormValues}
      />

      <EditTableModal
        visible={isAffiliateModalVisible}
        onCancel={handleAffiliateModalCancel}
        onSave={handleAffiliateModalSave}
        initialValues={editingAffiliateRow}
        modalTitle='Edit Affiliate'
      />

      <EditTableModal
        visible={isInsightsModalVisible}
        onCancel={handleInsightsModalCancel}
        onSave={handleInsightsModalSave}
        initialValues={editingInsightsRow}
        modalTitle='Edit Insight'
      />
    </PageLayout>
  )
}

export default DashboardPage
