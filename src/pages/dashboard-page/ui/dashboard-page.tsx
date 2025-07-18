/* eslint-disable @typescript-eslint/no-explicit-any */
import { Col, Row, Spin, Typography } from 'antd'
import { PageLayout } from '~/layouts'
import { EditTableModal, MetricBox, MetricCard } from '~/modules/dashboard/components/metric-card'
import StatisticsChart from '~/modules/dashboard/components/statistics-chart/statistics-card'
import CustomTable from '~/modules/dashboard/components/table/table'
import TrafficMap from '~/modules/dashboard/components/traffic-map/traffic-map'
// import { Menu } from '~/shared/ui/menu'
import { useEffect, useState } from 'react'
import EditChartModal from '~/modules/dashboard/components/metric-card/edit-chart-modal'
import { EditTrafficMapModal } from '~/modules/dashboard/components/metric-card/edit-map-modal'
import { EditMetricModal } from '~/modules/dashboard/components/metric-card/edit-metric-modal'
import EditTextModal from '~/modules/dashboard/components/metric-card/edit-text-modal'
import { FilterIcon } from '~/shared/ui/icon'
import { RefreshIcon } from '~/shared/ui/icon/ui/refresh-icon'
import cls from './dashboard-page.module.scss'
import { THEME_PALETTES } from '~/lib/constants/theme-pallets'
import classNames from 'classnames'
import { Dayjs, dayjs } from '~/shared/providers'

const { Text } = Typography

const formatDate = (date: Dayjs): string => {
  return date.format('DD/MM/YYYY')
}

export function randomFromTo(min: number, max: number) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const today = dayjs()

const periodMenu = [
  {
    title: 'Today',
    date: `${formatDate(today)} - ${formatDate(today)}`,
  },
  {
    title: 'Yesterday',
    date: `${formatDate(today.subtract(1, 'day'))} - ${formatDate(today.subtract(1, 'day'))}`,
  },
  {
    title: 'Last 7 Days',
    date: `${formatDate(today.subtract(6, 'day'))} - ${formatDate(today.endOf('week'))}`,
  },
  {
    title: 'This Week',
    date: `${formatDate(today.startOf('week'))} - ${formatDate(today.endOf('week'))}`,
  },
  {
    title: 'This Month',
    date: `${formatDate(today.startOf('month'))} - ${formatDate(today.endOf('month'))}`,
  },
  {
    title: 'Last Month',
    date: `${formatDate(today.subtract(1, 'month').startOf('month'))} - ${formatDate(today.subtract(1, 'month').endOf('month'))}`,
  },
  {
    title: 'Custom',
    date: `${formatDate(today.subtract(6, 'day'))} - ${formatDate(today.endOf('week'))}`,
  },
]

// Columns for the Affiliates table (for display, not for modal editing)
const affiliatesColumns = [
  { title: 'Name', dataIndex: 'name', key: 'name' },
  { title: 'Impressions', dataIndex: 'impressions', key: 'impressions' },
  { title: 'Leads', dataIndex: 'leads', key: 'leads' },
  { title: 'FTDs', dataIndex: 'ftds', key: 'ftds' },
  { title: 'Conversion Rate', dataIndex: 'conversionRate', key: 'conversionRate' },
  { title: 'Clicks', dataIndex: 'clicks', key: 'clicks' },
]

// Columns for the Insights table (for display, not for modal editing)
const insightsColumns = [
  { title: 'Day', dataIndex: 'day', key: 'day' },
  { title: 'Value', dataIndex: 'value', key: 'value' },
  { title: 'Percentage', dataIndex: 'percentage', key: 'percentage' },
]

export const DEFAULT_DASHBOARD_STATE = {
  metricsData: {
    traffic: {
      impressions: {
        value: '131',
        percentage: '-90',
        today: '11',
        yesterday: '19',
        trendLine: true,
        showToday: true,
      },
      clicks: {
        value: '94',
        percentage: '100',
        today: '10',
        yesterday: '13',
        trendLine: true,
        showToday: true,
      },
      ctl: {
        value: '100%', // CTL is a percentage itself
        percentage: '100',
        today: '100%',
        yesterday: '100%',
        trendLine: true,
        showToday: true,
      },
    },
    conversion: {
      leads: {
        value: '2',
        percentage: '90',
        today: '1',
        yesterday: '19',
        trendLine: true,
        showToday: true,
      },
      ftds: {
        value: '0',
        percentage: '0',
        today: '10',
        yesterday: '90',
        trendLine: true, // No trend line shown in the image for FTDs
        showToday: true,
      },
      cr: {
        value: '0%',
        percentage: '0',
        today: '0%',
        yesterday: '4%',
        trendLine: true, // No trend line shown in the image for CR
        showToday: true,
      },
    },
    finance: {
      payout: {
        value: '131',
        percentage: '100',
        today: '11',
        yesterday: '19',
        trendLine: true,
        showToday: true,
      },
    },
    balance: {
      payout: {
        value: '131',
        percentage: '100',
        today: '11',
        yesterday: '19',
        trendLine: true,
        showToday: true,
      },
    },
  },
  affiliatesTableData: [
    {
      key: '1',
      name: 'ES (Spain)',
      impressions: 18,
      leads: 0,
      ftds: 0,
      conversionRate: '0%',
      clicks: 0,
    },
    {
      key: '2',
      name: 'CZ (Czech Republic)',
      impressions: 97,
      leads: 81,
      ftds: 0,
      conversionRate: '0%',
      clicks: 81,
    },
  ],
  insightsTableData: [
    { key: '1', day: 'Monday', value: 18, percentage: '0%' },
    { key: '2', day: 'Wednesday', value: 12, percentage: '0%' },
  ],
  chartData: {
    labels: ['04 Jul', '05 Jul', '06 Jul', '07 Jul', '08 Jul', '09 Jul', '10 Jul', '11 Jul'],
    datasets: [
      {
        label: 'Impressions 131',
        data: [18, 0, 4, 28, 22, 29, 18, 10], // Data points mimicking the orange line
        borderColor: '#e77445', // Orange color from the image
        backgroundColor: 'rgba(243, 199, 93, 0.2)', // Light orange fill
        pointBackgroundColor: '#e77445',
        pointBorderColor: '#e77445',
        pointRadius: 4,
        tension: 0.4, // Smooth curves
      },
      {
        label: 'Leads 94',
        data: [15, 0, 2, 23, 16, 19, 13, 10], // Data points mimicking the green line
        borderColor: '#2ed151', // Green color from the image
        backgroundColor: 'rgba(82, 196, 26, 0.2)', // Light green fill
        pointBackgroundColor: '#2ed151',
        pointBorderColor: '#2ed151',
        pointRadius: 4,
        tension: 0.4, // Smooth curves
      },
      {
        label: 'FTDs 0',
        data: [0, 0, 0, 0, 0, 0, 0, 0], // Data points for FTDs (appears flat at 0)
        borderColor: '#ffffff', // White color from the image
        backgroundColor: 'rgba(255, 255, 255, 0.1)', // Very light white fill
        pointBackgroundColor: '#ffffff',
        pointBorderColor: '#ffffff',
        pointRadius: 4,
        tension: 0.4, // Smooth curves
      },
    ],
  },
  trafficMapData: [
    {
      name: 'Spain',
      value: 116,
      percentage: '88.5%',
      coordinates: [-3.7038, 40.4168],
      color: 'red',
    },
    {
      name: 'Italy',
      value: 6,
      percentage: '4.6%',
      coordinates: [12.5674, 41.9028],
      color: 'orange',
    },
    {
      name: 'Ukraine',
      value: 4,
      percentage: '3.1%',
      coordinates: [30.5234, 50.4501],
      color: 'gold',
    },
    {
      name: 'Czech Republic',
      value: 3,
      percentage: '2.3%',
      coordinates: [14.4378, 50.0755],
      color: 'green',
    },
    {
      name: 'Canada',
      value: 2,
      percentage: '1.5%',
      coordinates: [-75.6972, 45.4215],
      color: 'blue',
    },
  ],
  currentTheme: THEME_PALETTES[0],
  dateRangeText: periodMenu[3].date,
}

const DashboardPage = () => {
  // Unified state for all dashboard data
  const [dashboardState, setDashboardState] = useState(DEFAULT_DASHBOARD_STATE)

  // States for modal visibility and current editing items (these don't need to be persisted)
  const [isEditMetricModalVisible, setIsEditMetricModalVisible] = useState(false)
  const [currentEditingMetricType, setCurrentEditingMetricType] = useState(null)
  const [currentEditingMetricName, setCurrentEditingMetricName] = useState(null)
  const [initialFormValues, setInitialFormValues] = useState({})

  const [isEditTableModalVisible, setIsEditTableModalVisible] = useState(false)
  const [currentEditingTableType, setCurrentEditingTableType] = useState(null)
  const [initialTableModalData, setInitialTableModalData] = useState([])

  const [isEditChartModalVisible, setIsEditChartModalVisible] = useState(false)
  const [isEditTrafficMapModalVisible, setIsEditTrafficMapModal] = useState(false)
  const [isEditDateRangeModalVisible, setIsEditDateRangeModalVisible] = useState(false)

  // Loading state for initial dashboard data load
  const [isLoading, setIsLoading] = useState<boolean | null>(null)
  const [periodMenuActive, setPeriodMenuActive] = useState<number | null>(null)

  const handleChangePeriod = (index: number) => {
    setPeriodMenuActive(index)

    updateDashboardState({ dateRangeText: periodMenu[index].date })
  }

  const updateFullState = (data: any) => {
    setDashboardState(data)
    localStorage.setItem('fullDashboardState', JSON.stringify(data))
  }

  // Effect to load all dashboard state from localStorage on component mount
  useEffect(() => {
    try {
      setIsLoading(true)
      const savedState = localStorage.getItem('fullDashboardState')
      if (savedState) {
        const parsedState = JSON.parse(savedState)
        setDashboardState(parsedState)
      } else {
        updateFullState(DEFAULT_DASHBOARD_STATE)
      }
    } catch (error) {
      console.error('Failed to load dashboard state from localStorage:', error)
      // Fallback to default if there's an error
      setDashboardState(DEFAULT_DASHBOARD_STATE)
    } finally {
      setTimeout(
        () => {
          setIsLoading(false)
        },
        // randomFromTo(600, 2300),
      )
    }
  }, []) // Run only once on mount

  // Helper function to update a nested state and save to localStorage
  const updateDashboardState = (newStateUpdates: any) => {
    setDashboardState((prevState) => {
      const updatedState = { ...prevState, ...newStateUpdates }
      localStorage.setItem('fullDashboardState', JSON.stringify(updatedState))
      return updatedState
    })
  }

  // --- Metric Edit Modal Handlers ---
  const handleMetricCardTitleClick = (metricType: any, metricName: any) => {
    setCurrentEditingMetricType(metricType)
    setCurrentEditingMetricName(metricName)
    setInitialFormValues((dashboardState as any).metricsData[metricType][metricName])
    setIsEditMetricModalVisible(true)
  }
  const handleMetricModalSave = (newValues: any) => {
    updateDashboardState({
      metricsData: {
        ...dashboardState.metricsData,
        [currentEditingMetricType as any]: {
          ...(dashboardState as any).metricsData[currentEditingMetricType as any],
          [currentEditingMetricName as any]: newValues,
        },
      },
    })
    setIsEditMetricModalVisible(false)
  }
  const handleMetricModalCancel = () => {
    setIsEditMetricModalVisible(false)
  }

  // --- Table Edit Modal Handlers ---
  const handleTableTitleClick = (tableType: any) => {
    setCurrentEditingTableType(tableType)
    if (tableType === 'affiliates') {
      setInitialTableModalData((dashboardState as any).affiliatesTableData)
    } else if (tableType === 'insights') {
      setInitialTableModalData((dashboardState as any).insightsTableData)
    }
    setIsEditTableModalVisible(true)
  }
  const handleTableModalSave = (newData: any) => {
    if (currentEditingTableType === 'affiliates') {
      updateDashboardState({ affiliatesTableData: newData })
    } else if (currentEditingTableType === 'insights') {
      updateDashboardState({ insightsTableData: newData })
    }
    setIsEditTableModalVisible(false)
  }
  const handleTableModalCancel = () => {
    setIsEditTableModalVisible(false)
  }

  // --- Chart Edit Modal Handlers ---
  const handleChartTitleClick = () => {
    setIsEditChartModalVisible(true)
  }
  const handleChartModalSave = (newChartData: any) => {
    updateDashboardState({ chartData: newChartData })
    setIsEditChartModalVisible(false)
  }
  const handleChartModalCancel = () => {
    setIsEditChartModalVisible(false)
  }

  // --- Traffic Map Modal Handlers ---
  const handleTrafficMapTitleClick = () => {
    setIsEditTrafficMapModal(true)
  }
  const handleTrafficMapModalSave = (newData: any) => {
    updateDashboardState({ trafficMapData: newData })
    setIsEditTrafficMapModal(false)
  }
  const handleTrafficMapModalCancel = () => {
    setIsEditTrafficMapModal(false)
  }

  // --- Date Range Modal Handlers ---
  const handleDateRangeClick = () => {
    setIsEditDateRangeModalVisible(true)
  }
  const handleDateRangeModalSave = (newText: any) => {
    updateDashboardState({ dateRangeText: newText })
    setIsEditDateRangeModalVisible(false)
  }
  const handleDateRangeModalCancel = () => {
    setIsEditDateRangeModalVisible(false)
  }

  if (isLoading == null) return

  if (isLoading) {
    // Use the default theme colors for the loading screen

    return (
      <div className={cls.loadingWrap}>
        <Spin size='large' />
      </div>
    )
  }

  return (
    <PageLayout
      header={{
        title: 'Dashboard',
      }}
    >
      <div className={cls.wrapper}>
        <Row>
          <Col lg={9} className={cls.filters}>
            <FilterIcon className={cls.filterIcon} />
            <Text onClick={() => updateFullState(DEFAULT_DASHBOARD_STATE)}>Filter</Text>
            <Text className={cls.filtersDate} onClick={handleDateRangeClick}>
              {dashboardState.dateRangeText}
            </Text>
            <RefreshIcon className={cls.refhreshIcon} />
          </Col>

          <Col className={cls.periodFilter}>
            {periodMenu.map((item, index) => (
              <Text
                className={classNames(cls.periodItem, index === periodMenuActive && cls.active)}
                key={index}
                onClick={() => handleChangePeriod(index)}
              >
                {item.title}
              </Text>
            ))}
          </Col>
        </Row>

        <Row>
          <Col span={11} lg={11} md={11} className={cls.leftSide}>
            <MetricBox title='Traffic'>
              <MetricCard
                title='Impressions'
                value={dashboardState.metricsData.traffic.impressions.value}
                today={dashboardState.metricsData.traffic.impressions.today}
                yesterday={dashboardState.metricsData.traffic.impressions.yesterday}
                percentage={dashboardState.metricsData.traffic.impressions.percentage}
                trendLine={dashboardState.metricsData.traffic.impressions.trendLine}
                showToday={dashboardState.metricsData.traffic.impressions.showToday}
                onTitleClick={() => handleMetricCardTitleClick('traffic', 'impressions')}
              />

              {/* Clicks Card */}
              <MetricCard
                title='Clicks'
                value={dashboardState.metricsData.traffic.clicks.value}
                today={dashboardState.metricsData.traffic.clicks.today}
                yesterday={dashboardState.metricsData.traffic.clicks.yesterday}
                percentage={dashboardState.metricsData.traffic.clicks.percentage}
                trendLine={dashboardState.metricsData.traffic.clicks.trendLine}
                showToday={dashboardState.metricsData.traffic.clicks.showToday}
                onTitleClick={() => handleMetricCardTitleClick('traffic', 'clicks')} // Pass callback
              />

              {/* CTL Card */}
              <MetricCard
                title='CTL'
                value={dashboardState.metricsData.traffic.ctl.value}
                today={dashboardState.metricsData.traffic.ctl.today}
                yesterday={dashboardState.metricsData.traffic.ctl.yesterday}
                percentage={dashboardState.metricsData.traffic.ctl.percentage}
                trendLine={dashboardState.metricsData.traffic.ctl.trendLine}
                showToday={dashboardState.metricsData.traffic.ctl.showToday}
                onTitleClick={() => handleMetricCardTitleClick('traffic', 'ctl')}
              />
            </MetricBox>
          </Col>

          <Col span={13} lg={13} md={13} className={cls.rightSide}>
            <Row className={cls.rightSideRow}>
              <Col span={12}>
                <MetricBox title='Finance' className={cls.rightSideRowInner}>
                  <MetricCard
                    span={24}
                    title='Payout'
                    value={dashboardState.metricsData.finance.payout.value}
                    today={dashboardState.metricsData.finance.payout.today}
                    yesterday={dashboardState.metricsData.finance.payout.yesterday}
                    percentage={dashboardState.metricsData.finance.payout.percentage}
                    trendLine={dashboardState.metricsData.finance.payout.trendLine}
                    showToday={dashboardState.metricsData.finance.payout.showToday}
                    onTitleClick={() => handleMetricCardTitleClick('finance', 'payout')}
                  />
                </MetricBox>
              </Col>
              <Col span={12}>
                <MetricBox title='Balance' className={cls.rightSideRowInner}>
                  <MetricCard
                    span={24}
                    title='Total Balance'
                    value={dashboardState.metricsData.balance.payout.value}
                    today={dashboardState.metricsData.balance.payout.today}
                    yesterday={dashboardState.metricsData.balance.payout.yesterday}
                    percentage={dashboardState.metricsData.balance.payout.percentage}
                    trendLine={dashboardState.metricsData.balance.payout.trendLine}
                    showToday={dashboardState.metricsData.balance.payout.showToday}
                    onTitleClick={() => handleMetricCardTitleClick('balance', 'payout')}
                  />
                </MetricBox>
              </Col>
            </Row>
          </Col>
        </Row>

        <Row>
          <Col span={11} lg={11} md={11} className={cls.leftSide}>
            <MetricBox title='Conversion'>
              <MetricCard
                title='Leads'
                value={dashboardState.metricsData.conversion.leads.value}
                today={dashboardState.metricsData.conversion.leads.today}
                yesterday={dashboardState.metricsData.conversion.leads.yesterday}
                percentage={dashboardState.metricsData.conversion.leads.percentage}
                trendLine={dashboardState.metricsData.conversion.leads.trendLine}
                showToday={dashboardState.metricsData.conversion.leads.showToday}
                onTitleClick={() => handleMetricCardTitleClick('conversion', 'leads')}
              />

              <MetricCard
                title='FTDs'
                value={dashboardState.metricsData.conversion.ftds.value}
                today={dashboardState.metricsData.conversion.ftds.today}
                yesterday={dashboardState.metricsData.conversion.ftds.yesterday}
                percentage={dashboardState.metricsData.conversion.ftds.percentage}
                trendLine={dashboardState.metricsData.conversion.ftds.trendLine}
                showToday={dashboardState.metricsData.conversion.ftds.showToday}
                onTitleClick={() => handleMetricCardTitleClick('conversion', 'ftds')}
              />

              <MetricCard
                title='CR'
                value={dashboardState.metricsData.conversion.cr.value}
                today={dashboardState.metricsData.conversion.cr.today}
                yesterday={dashboardState.metricsData.conversion.cr.yesterday}
                percentage={dashboardState.metricsData.conversion.cr.percentage}
                trendLine={dashboardState.metricsData.conversion.cr.trendLine}
                showToday={dashboardState.metricsData.conversion.cr.showToday}
                onTitleClick={() => handleMetricCardTitleClick('conversion', 'cr')}
              />
            </MetricBox>

            <MetricBox
              title='Top 10 Countries'
              className={cls.flexContentStart}
              dropDownTitle='Country'
              onTitleClick={() => handleTableTitleClick('affiliates')}
            >
              <CustomTable
                title={`Showing ${insightsColumns.length} Items`}
                columns={affiliatesColumns}
                data={dashboardState.affiliatesTableData}
              />
            </MetricBox>
          </Col>

          {/* Right Section: Finance, Balance, Statistics Chart */}
          <Col span={13} lg={13} md={13}>
            <MetricBox
              title='Statistics'
              dropDownTitle='3 selected'
              onTitleClick={handleChartTitleClick}
            >
              <StatisticsChart chartData={dashboardState.chartData} />
            </MetricBox>

            <Row>
              <Col span={12}>
                <MetricBox
                  title='Traffic Map'
                  dropDownTitle='Impressions'
                  onTitleClick={handleTrafficMapTitleClick}
                >
                  <TrafficMap mapData={dashboardState.trafficMapData} />
                </MetricBox>
              </Col>

              <Col span={12} className={cls.dFlex}>
                <MetricBox
                  title='Insights'
                  className={cls.flexContentStart}
                  dropDownTitle='Impressions'
                  onTitleClick={() => handleTableTitleClick('insights')}
                >
                  <CustomTable
                    title={`Showing ${dashboardState.insightsTableData.length} Items`}
                    columns={insightsColumns}
                    data={dashboardState.insightsTableData}
                  />
                </MetricBox>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
      <EditMetricModal
        visible={isEditMetricModalVisible}
        onCancel={handleMetricModalCancel}
        onSave={handleMetricModalSave}
        initialValues={initialFormValues}
      />
      {/* The Edit Table Modal */}
      <EditTableModal
        visible={isEditTableModalVisible}
        onCancel={handleTableModalCancel}
        onSave={handleTableModalSave}
        initialTableData={initialTableModalData}
        tableType={currentEditingTableType} // Pass type to differentiate columns
      />
      <EditChartModal
        visible={isEditChartModalVisible}
        onCancel={handleChartModalCancel}
        onSave={handleChartModalSave}
        initialChartData={dashboardState.chartData} // Pass the chartData in Chart.js format
      />
      <EditTrafficMapModal
        visible={isEditTrafficMapModalVisible}
        onCancel={handleTrafficMapModalCancel}
        onSave={handleTrafficMapModalSave}
        initialTrafficMapData={dashboardState.trafficMapData}
      />
      {/* NEW: The Edit Date Range Modal */}
      <EditTextModal
        visible={isEditDateRangeModalVisible}
        onCancel={handleDateRangeModalCancel}
        onSave={handleDateRangeModalSave}
        initialText={dashboardState.dateRangeText}
      />
    </PageLayout>
  )
}

export default DashboardPage
