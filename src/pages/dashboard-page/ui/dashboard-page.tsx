/* eslint-disable @typescript-eslint/no-explicit-any */
import { useTranslation } from 'react-i18next'

import { Col, Row, Typography } from 'antd'
import { PageLayout } from '~/layouts'
import { EditTableModal, MetricBox, MetricCard } from '~/modules/dashboard/components/metric-card'
import StatisticsChart from '~/modules/dashboard/components/statistics-chart/statistics-card'
import CustomTable from '~/modules/dashboard/components/table/table'
import TrafficMap from '~/modules/dashboard/components/traffic-map/traffic-map'
// import { Menu } from '~/shared/ui/menu'
import { useState } from 'react'
import { EditMetricModal } from '~/modules/dashboard/components/metric-card/edit-metric-modal'
import { FilterIcon } from '~/shared/ui/icon'
import { RefreshIcon } from '~/shared/ui/icon/ui/refresh-icon'
import cls from './dashboard-page.module.scss'
import EditChartModal from '~/modules/dashboard/components/metric-card/edit-chart-modal'
import { EditTrafficMapModal } from '~/modules/dashboard/components/metric-card/edit-map-modal'
import EditTextModal from '~/modules/dashboard/components/metric-card/edit-text-modal'

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
        trendLine: false,
        showToday: false,
      },
    },
    balance: {
      payout: {
        value: '131',
        percentage: '100',
        today: '11',
        yesterday: '19',
        trendLine: false,
        showToday: false,
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
          trendLine: newValues.trendLine,
          showToday: newValues.showToday,
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

  // State for table data
  const [affiliatesTableData, setAffiliatesTableData] = useState([
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

  const [insightsTableData, setInsightsTableData] = useState([
    { key: '1', day: 'Monday', value: 18, percentage: '0%' },
    { key: '2', day: 'Wednesday', value: 12, percentage: '0%' },
  ])

  const [isEditTableModalVisible, setIsEditTableModalVisible] = useState(false)
  const [currentEditingTableType, setCurrentEditingTableType] = useState(null) // 'affiliates' or 'insights'
  const [initialTableModalData, setInitialTableModalData] = useState([])

  // --- Table Edit Modal Handlers ---
  const handleTableTitleClick = (tableType: any) => {
    setCurrentEditingTableType(tableType)
    if (tableType === 'affiliates') {
      setInitialTableModalData(affiliatesTableData as any)
    } else if (tableType === 'insights') {
      setInitialTableModalData(insightsTableData as any)
    }
    setIsEditTableModalVisible(true)
  }

  const handleTableModalSave = (newData: any) => {
    console.log('--- ', newData)

    if (currentEditingTableType === 'affiliates') {
      setAffiliatesTableData(newData)
    } else if (currentEditingTableType === 'insights') {
      setInsightsTableData(newData)
    }
    setIsEditTableModalVisible(false)
    setCurrentEditingTableType(null)
  }

  const handleTableModalCancel = () => {
    setIsEditTableModalVisible(false)
    setCurrentEditingTableType(null)
  }

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

  // State for chart data - NOW MANAGED HERE IN Dashboard.js
  const [chartData, setChartData] = useState({
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
  })

  // State for chart edit modal
  const [isEditChartModalVisible, setIsEditChartModalVisible] = useState(false)

  // --- Chart Edit Modal Handlers ---
  const handleChartTitleClick = () => {
    setIsEditChartModalVisible(true)
  }

  const handleChartModalSave = (newChartData: any) => {
    // newChartData is already in the Chart.js format thanks to the modal's transformation
    setChartData(newChartData)
    setIsEditChartModalVisible(false)
  }

  const handleChartModalCancel = () => {
    setIsEditChartModalVisible(false)
  }

  // --- NEW STATE FOR TRAFFIC MAP DATA ---
  const [trafficMapData, setTrafficMapData] = useState([
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
  ])

  // --- NEW STATE FOR TRAFFIC MAP MODAL ---
  const [isEditTrafficMapModalVisible, setIsEditTrafficMapModalVisible] = useState(false)

  // --- NEW TRAFFIC MAP MODAL HANDLERS ---
  const handleTrafficMapTitleClick = () => {
    setIsEditTrafficMapModalVisible(true)
  }

  const handleTrafficMapModalSave = (newData: any) => {
    setTrafficMapData(newData)
    setIsEditTrafficMapModalVisible(false)
  }

  const handleTrafficMapModalCancel = () => {
    setIsEditTrafficMapModalVisible(false)
  }

  // NEW STATE FOR DATE RANGE
  const [dateRangeText, setDateRangeText] = useState(
    `${formatDate(lastWeek)} - ${formatDate(today)}`,
  )
  const [isEditDateRangeModalVisible, setIsEditDateRangeModalVisible] = useState(false)

  const handleDateRangeClick = () => {
    setIsEditDateRangeModalVisible(true)
  }

  const handleDateRangeModalSave = (newText: string) => {
    setDateRangeText(newText)
    setIsEditDateRangeModalVisible(false)
  }

  const handleDateRangeModalCancel = () => {
    setIsEditDateRangeModalVisible(false)
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
            <Text className={cls.filtersDate} onClick={handleDateRangeClick}>
              {dateRangeText}
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
                showToday={metricsData.traffic.impressions.showToday}
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
                showToday={metricsData.traffic.clicks.showToday}
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
                showToday={metricsData.traffic.ctl.showToday}
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
                    value={metricsData.finance.payout.value}
                    today={metricsData.finance.payout.today}
                    yesterday={metricsData.finance.payout.yesterday}
                    percentage={metricsData.finance.payout.percentage}
                    trendLine={metricsData.finance.payout.trendLine}
                    showToday={metricsData.finance.payout.showToday}
                    onTitleClick={() => handleMetricCardTitleClick('finance', 'payout')}
                  />
                </MetricBox>
              </Col>
              <Col span={12}>
                <MetricBox title='Balance' className={cls.rightSideRowInner}>
                  <MetricCard
                    span={24}
                    title='Total Balance'
                    value={metricsData.balance.payout.value}
                    today={metricsData.balance.payout.today}
                    yesterday={metricsData.balance.payout.yesterday}
                    percentage={metricsData.balance.payout.percentage}
                    trendLine={metricsData.balance.payout.trendLine}
                    showToday={metricsData.balance.payout.showToday}
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
                value={metricsData.conversion.leads.value}
                today={metricsData.conversion.leads.today}
                yesterday={metricsData.conversion.leads.yesterday}
                percentage={metricsData.conversion.leads.percentage}
                trendLine={metricsData.conversion.leads.trendLine}
                showToday={metricsData.conversion.leads.showToday}
                onTitleClick={() => handleMetricCardTitleClick('conversion', 'leads')}
              />

              <MetricCard
                title='FTDs'
                value={metricsData.conversion.ftds.value}
                today={metricsData.conversion.ftds.today}
                yesterday={metricsData.conversion.ftds.yesterday}
                percentage={metricsData.conversion.ftds.percentage}
                trendLine={metricsData.conversion.ftds.trendLine}
                showToday={metricsData.conversion.ftds.showToday}
                onTitleClick={() => handleMetricCardTitleClick('conversion', 'ftds')}
              />

              <MetricCard
                title='CR'
                value={metricsData.conversion.cr.value}
                today={metricsData.conversion.cr.today}
                yesterday={metricsData.conversion.cr.yesterday}
                percentage={metricsData.conversion.cr.percentage}
                trendLine={metricsData.conversion.cr.trendLine}
                showToday={metricsData.conversion.cr.showToday}
                onTitleClick={() => handleMetricCardTitleClick('conversion', 'cr')}
              />
            </MetricBox>

            <MetricBox
              title='Top 10 Affiliates'
              className={cls.flexContentStart}
              dropDownTitle='Affiliate'
              onTitleClick={() => handleTableTitleClick('affiliates')}
            >
              <CustomTable
                title={`Showing ${insightsColumns.length} Items`}
                columns={affiliatesColumns}
                data={affiliatesTableData}
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
              <StatisticsChart chartData={chartData} />
            </MetricBox>

            <Row>
              <Col span={12}>
                <MetricBox
                  title='Traffic Map'
                  dropDownTitle='Impressions'
                  onTitleClick={handleTrafficMapTitleClick}
                >
                  <TrafficMap mapData={trafficMapData} />
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
                    title={`Showing ${insightsTableData.length} Items`}
                    columns={insightsColumns}
                    data={insightsTableData}
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
        initialChartData={chartData} // Pass the chartData in Chart.js format
      />
      <EditTrafficMapModal
        visible={isEditTrafficMapModalVisible}
        onCancel={handleTrafficMapModalCancel}
        onSave={handleTrafficMapModalSave}
        initialTrafficMapData={trafficMapData}
      />
      {/* NEW: The Edit Date Range Modal */}
      <EditTextModal
        visible={isEditDateRangeModalVisible}
        onCancel={handleDateRangeModalCancel}
        onSave={handleDateRangeModalSave}
        initialText={dateRangeText}
      />
    </PageLayout>
  )
}

export default DashboardPage
