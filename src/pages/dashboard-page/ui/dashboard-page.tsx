/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Col, Row, Typography } from 'antd'
import { PageLayout } from '~/layouts'
import { EditTableModal, MetricBox, MetricCard } from '~/modules/dashboard/components/metric-card'
import StatisticsChart from '~/modules/dashboard/components/statistics-chart/statistics-card'
import CustomTable from '~/modules/dashboard/components/table/table'
import TrafficMap from '~/modules/dashboard/components/traffic-map/traffic-map'
import { useEffect, useState } from 'react'
import EditChartModal from '~/modules/dashboard/components/metric-card/edit-chart-modal'
import { EditTrafficMapModal } from '~/modules/dashboard/components/metric-card/edit-map-modal'
import { EditMetricModal } from '~/modules/dashboard/components/metric-card/edit-metric-modal'
import { FilterIcon } from '~/shared/ui/icon'
import { RefreshIcon } from '~/shared/ui/icon/ui/refresh-icon'
import cls from './dashboard-page.module.scss'
import { THEME_PALETTES } from '~/lib/constants/theme-pallets'
import classNames from 'classnames'
import { Dayjs, dayjs } from '~/shared/providers'

const { Text } = Typography

const getArray = (length: number): number[] => {
  return Array.from({ length }, (_, i) => i)
}

const formatDate = (date: Dayjs): string => {
  return date.format('DD/MM/YYYY')
}

function randomFromTo(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

/**
 * Генерує випадкове число з деяким "зміщенням" до кінця діапазону.
 * Можна налаштувати експоненційно, щоб більші значення були більш ймовірними.
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
function biasedRandom(min: number, max: number, power = 1) {
  // Використовуємо Math.pow для створення зміщення.
  // Чим більше ступінь (наприклад, 2 або 3), тим сильніше зміщення до більших чисел.
  // Math.pow(Math.random(), power) зі степенем > 1 зміщує до 0.
  // Math.pow(Math.random(), 1/power) зі степенем > 1 зміщує до 1.
  // Отже, для зміщення до більших чисел нам потрібен `1 - Math.pow(Math.random(), somePower)` або `Math.pow(Math.random(), 1/somePower)`

  let rand = Math.random()
  if (power !== 1) {
    rand = Math.pow(rand, power) // Якщо power < 1, Math.random()^power > Math.random() -> зміщення до більших
    // Якщо power > 1, Math.random()^power < Math.random() -> зміщення до менших
  }
  return Math.floor(min + rand * (max - min + 1)) // +1, щоб включити max
}

function distributeRandomlyWithBias(x: number, n: number, biasPower = 1) {
  const cutPoints = []
  for (let i = 0; i < n - 1; i++) {
    // Використовуємо biasedRandom для генерації точок розрізу
    // Діапазон від 0 до x
    cutPoints.push(biasedRandom(0, x, biasPower))
  }

  // Додаємо 0 та x до точок розрізу, сортуємо їх
  cutPoints.push(0)
  cutPoints.push(x)
  cutPoints.sort((a, b) => a - b)

  // Обчислюємо різниці між послідовними точками розрізу
  const result = []
  for (let i = 0; i < n; i++) {
    result.push(cutPoints[i + 1] - cutPoints[i])
  }

  return result
}

// function distributeRandomly(x: number, n: number): number[] {
//   // Створюємо n-1 випадкових точок розрізу (роздільників)
//   // Ці точки будуть знаходитись у діапазоні від 0 до x
//   const cutPoints = []
//   for (let i = 0; i < n - 1; i++) {
//     cutPoints.push(Math.floor(Math.random() * (x + 1))) // +1, щоб включити x
//   }

//   // Додаємо 0 та x до точок розрізу, сортуємо їх
//   // Це визначає початок та кінець "лінії", яку ми розділяємо
//   cutPoints.push(0)
//   cutPoints.push(x)
//   cutPoints.sort((a, b) => a - b)

//   // Обчислюємо різниці між послідовними точками розрізу
//   // Ці різниці і є елементами нашого масиву
//   const result = []
//   for (let i = 0; i < n; i++) {
//     result.push(cutPoints[i + 1] - cutPoints[i])
//   }

//   return result
// }

function convertTwoDigitNumber(num: number): number {
  const sign = Math.sign(num)
  let absoluteNum = Math.abs(num)

  if (sign === -1) {
    absoluteNum = 100 - absoluteNum
  }

  let numStr = String(absoluteNum)

  if (numStr.length === 1) {
    numStr = '0' + numStr
  }
  const resultStr = sign === 1 ? `1.${numStr}` : `0.${numStr}`
  return parseFloat(resultStr)
}

const today = dayjs()

const periodMenu = [
  {
    title: 'Today',
    date: `${formatDate(today)} - ${formatDate(today)}`,
    labels: getArray(24),
    dataset: [],
    leadRand: 1,
    leadKoef: 1,
  },
  {
    title: 'Yesterday',
    date: `${formatDate(today.subtract(1, 'day'))} - ${formatDate(today.subtract(1, 'day'))}`,
    labels: getArray(24),
    dataset: [],
    leadRand: convertTwoDigitNumber(randomFromTo(-30, 30)),
    leadKoef: 1,
  },
  {
    title: 'Last 7 Days',
    date: `${formatDate(today.subtract(6, 'day'))} - ${formatDate(today)}`,
    labels: getArray(today.diff(today.subtract(6, 'day'), 'day') + 1).map((item) => {
      return today.subtract(6, 'day').add(item, 'day').format('DD MMM')
    }),
    dataset: [],
    leadRand: convertTwoDigitNumber(randomFromTo(-30, 30)),
    leadKoef: 7,
  },
  {
    title: 'This Week',
    date: `${formatDate(today.startOf('week'))} - ${formatDate(today.endOf('week').add(1, 'day'))}`,
    labels: getArray(today.endOf('week').add(1, 'day').diff(today.startOf('week'), 'day') + 1).map(
      (item) => {
        return today.startOf('week').add(item, 'day').format('DD MMM')
      },
    ),
    dataset: [],
    leadRand: convertTwoDigitNumber(randomFromTo(-30, 30)),
    leadKoef: today.day() + 1,
  },
  {
    title: 'This Month',
    date: `${formatDate(today.startOf('month'))} - ${formatDate(today.endOf('month'))}`,
    labels: [
      today.startOf('month'),
      today.date(7),
      today.date(15),
      today.date(21),
      today.endOf('month'),
    ].map((item) => item.format('DD MMM')),
    // labels: getArray(today.endOf('month').diff(today.startOf('month'), 'day') + 1).map((item) => {
    //   return today.startOf('month').add(item, 'day').format('DD MMM')
    // }),
    dataset: [],
    leadRand: convertTwoDigitNumber(randomFromTo(-30, 30)),
    leadKoef: today.date(),
  },
  {
    title: 'Last Month',
    date: `${formatDate(today.subtract(1, 'month').startOf('month'))} - ${formatDate(today.subtract(1, 'month').endOf('month'))}`,
    labels: getArray(
      today
        .subtract(1, 'month')
        .endOf('month')
        .diff(today.subtract(1, 'month').startOf('month'), 'day'),
    ).map((item) => {
      return today.subtract(1, 'month').startOf('month').add(item, 'day').format('DD MMM')
    }),
    dataset: [],
    leadRand: convertTwoDigitNumber(randomFromTo(-30, 30)),
    leadKoef: today.subtract(1, 'month').daysInMonth(),
  },
  {
    title: 'Custom',
    date: `${formatDate(today.subtract(6, 'day'))} - ${formatDate(today.endOf('week'))}`,
    labels: [],
    dataset: [],
    leadRand: 1,
    leadKoef: 1,
  },
]

// Columns for the Affiliates table (for display, not for modal editing)
const countyColumns = [
  { title: 'Name', dataIndex: 'name', key: 'name' },
  { title: 'Impressions', dataIndex: 'impressions', key: 'impressions' },
  { title: 'Leads', dataIndex: 'leads', key: 'leads' },
  { title: 'FTDs', dataIndex: 'ftds', key: 'ftds' },
  { title: 'Conversion Rate', dataIndex: 'cr', key: 'cr' },
  { title: 'Clicks', dataIndex: 'clicks', key: 'clicks' },
]

// Columns for the Insights table (for display, not for modal editing)
const insightsColumns = [
  { title: 'Day', dataIndex: 'day', key: 'day' },
  { title: 'Value', dataIndex: 'value', key: 'value' },
  { title: 'Percentage', dataIndex: 'percentage', key: 'percentage' },
]

const DEFAULT_DASHBOARD_STATE = {
  metricsData: {
    traffic: {
      impressions: {
        value: '0',
        percentage: '0',
        today: '0',
        yesterday: '0',
        trendLine: true,
        showToday: true,
      },
      clicks: {
        value: '0',
        percentage: '0',
        today: '0',
        yesterday: '0',
        trendLine: true,
        showToday: true,
      },
      ctl: {
        value: '0',
        percentage: '0',
        today: '0',
        yesterday: '0',
        trendLine: true,
        showToday: true,
      },
    },
    conversion: {
      leads: {
        value: '40',
        percentage: '0',
        today: '0',
        yesterday: '0',
        trendLine: true,
        showToday: true,
      },
      ftds: {
        value: '0',
        percentage: '0',
        today: '0',
        yesterday: '0',
        trendLine: true, // No trend line shown in the image for FTDs
        showToday: true,
      },
      cr: {
        value: '0%',
        percentage: '0',
        today: '0%',
        yesterday: '0%',
        trendLine: true, // No trend line shown in the image for CR
        showToday: true,
      },
    },
    finance: {
      revenue: {
        value: '0',
        percentage: '0',
        today: '0',
        yesterday: convertTwoDigitNumber(randomFromTo(-30, 30)),
        trendLine: true,
        showToday: true,
      },
      payout: {
        value: '0',
        percentage: '0',
        today: '0',
        yesterday: convertTwoDigitNumber(randomFromTo(-30, 30)),
        trendLine: true,
        showToday: true,
      },
      net: {
        value: '0',
        percentage: '0',
        today: '0',
        yesterday: convertTwoDigitNumber(randomFromTo(-30, 30)),
        trendLine: true,
        showToday: true,
      },
    },
  },
  trafficMapData: [
    {
      name: 'Spain',
      code: 'ES',
      value: 116,
      percentage: '88.5%',
      coordinates: [-3.7038, 40.4168],
      color: 'red',
    },
  ],
  chartData: {
    labels: ['04 Jul', '05 Jul', '06 Jul', '07 Jul', '08 Jul', '09 Jul', '10 Jul', '11 Jul'],
    datasets: [
      {
        label: 'Impressions',
        data: [18, 0, 4, 28, 22, 29, 18, 10], // Data points mimicking the orange line
        borderColor: '#e77445', // Orange color from the image
        backgroundColor: 'rgba(243, 199, 93, 0.2)', // Light orange fill
        pointBackgroundColor: '#e77445',
        pointBorderColor: '#e77445',
        pointRadius: 4,
        tension: 0.4, // Smooth curves
      },
      {
        label: 'Leads',
        data: [15, 0, 2, 23, 16, 19, 13, 10], // Data points mimicking the green line
        borderColor: '#2ed151', // Green color from the image
        backgroundColor: 'rgba(82, 196, 26, 0.2)', // Light green fill
        pointBackgroundColor: '#2ed151',
        pointBorderColor: '#2ed151',
        pointRadius: 4,
        tension: 0.4, // Smooth curves
      },
      {
        label: 'FTDs',
        data: [0, 0, 0, 0, 0, 0, 0, 0], // Data points for FTDs (appears flat at 0)
        borderColor: '#ffffff', // White color from the image
        backgroundColor: 'rgba(255, 255, 255, 0.1)', // Very light white fill
        pointBackgroundColor: '#ffffff',
        pointBorderColor: '#ffffff',
        pointRadius: 4,
        tension: 0.4,
      },
    ],
  },
  insightsTableData: [
    { key: '1', day: 'Monday', value: 18, percentage: '0%' },
    { key: '2', day: 'Wednesday', value: 12, percentage: '0%' },
  ],
  currentTheme: THEME_PALETTES[0],
  dateRangeText: periodMenu[0].date,
  periodMenuActive: 0,
  dayLeads: '40',
  metricsToday: {
    leads: '40',
    impressions: '0',
    clicks: '0',
    ctl: '0',
  },
  metricsYersterday: {
    leads: '40',
    impressions: '0',
    clicks: '0',
    ctl: '0',
  },
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

  // Loading state for initial dashboard data load
  const [isLoading, setIsLoading] = useState<boolean | null>(null)

  const handleChangePeriod = (index: number) => {
    setIsLoading(true)
    updateDashboardState({ dateRangeText: periodMenu[index].date, periodMenuActive: index })
    calcMetciByPeriodAndUpdate(index)
    setTimeout(() => setIsLoading(false), randomFromTo(300, 1100))
  }

  const setFullLoading = () => {
    setIsLoading(true)
    setTimeout(() => setIsLoading(false), randomFromTo(500, 2200))
  }

  // Effect to load all dashboard state from localStorage on component mount
  useEffect(() => {
    try {
      setIsLoading(true)
      const savedState = localStorage.getItem('fullDashboardState')
      if (savedState) {
        const parsedState = JSON.parse(savedState)

        calcMetciByPeriodAndUpdate(parsedState.periodMenuActive, parsedState.dayLeads)

        const metricsToday = calcMetciByPeriod(0, parsedState.dayLeads)
        const metricsYersterday = calcMetciByPeriod(1, parsedState.dayLeads)

        updateDashboardState({
          metricsToday: { ...metricsToday, leads: metricsToday.periodLeads },
          metricsYersterday: { ...metricsYersterday, leads: metricsYersterday.periodLeads },
        })
      } else {
        updateDashboardState(DEFAULT_DASHBOARD_STATE)
        calcMetciByPeriodAndUpdate(
          DEFAULT_DASHBOARD_STATE.periodMenuActive,
          DEFAULT_DASHBOARD_STATE.dayLeads,
        )
      }
    } catch (error) {
      console.error('Failed to load dashboard state from localStorage:', error)
      setDashboardState(DEFAULT_DASHBOARD_STATE)
    } finally {
      setFullLoading()
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
    if (currentEditingMetricType == 'conversion' && currentEditingMetricName == 'leads') {
      const data = periodMenu[dashboardState.periodMenuActive]
      const dayLeads = (newValues.value / (data.leadKoef * data.leadRand)).toFixed(3)
      calcMetciByPeriodAndUpdate(dashboardState.periodMenuActive, dayLeads)
    } else {
      updateDashboardState({
        metricsData: {
          ...dashboardState.metricsData,
          [currentEditingMetricType as any]: {
            ...(dashboardState as any).metricsData[currentEditingMetricType as any],
            [currentEditingMetricName as any]: newValues,
          },
        },
      })
    }
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

  /**
   * =====
   * Algoritms
   */

  const getLeadsByPeriod = (value: string, period?: number): string | number => {
    const data = periodMenu[period ?? dashboardState.periodMenuActive]
    return Math.ceil(parseFloat((parseFloat(value) * data.leadKoef * data.leadRand).toFixed(1)))
  }

  const calcMetciByPeriod = (period: number, inputLeads?: string) => {
    const dayLeads = parseFloat(inputLeads ? inputLeads : dashboardState.dayLeads)
    const periodLeads = parseFloat(getLeadsByPeriod(dayLeads.toString(), period).toString())

    // console.log('--- calcMetciByPeriodAndUpdate', {
    //   period,
    //   inputLeads,
    //   dashboardState: dashboardState.metricsData.conversion.leads.value,
    //   dayLeads,
    //   periodLeads,
    // })
    const impressions = Math.ceil(periodLeads * 1.22)
    const clicks = Math.ceil(periodLeads * 1.35)
    const ctl = ((impressions / clicks) * 100).toFixed(0)

    return {
      dayLeads,
      periodLeads,
      impressions,
      clicks,
      ctl,
    }
  }

  const calcMetciByPeriodAndUpdate = (period: number, inputLeads?: string) => {
    const res = calcMetciByPeriod(period, inputLeads)

    const labels = periodMenu[period].labels

    const datasets = [
      distributeRandomlyWithBias(res.impressions, labels.length),
      distributeRandomlyWithBias(res.periodLeads, labels.length),
      distributeRandomlyWithBias(0, labels.length),
    ]

    setDashboardState((prevState: any) => {
      const prevMetrics = prevState.metricsData
      const prevChart = prevState.chartData

      const updatedState = {
        ...prevState,
        chartData: {
          ...prevChart,
          labels,
          datasets: prevChart.datasets.map((item: any, index: number) => ({
            ...item,
            data: datasets[index],
          })),
        },
        metricsData: {
          ...prevMetrics,
          traffic: {
            ...prevMetrics.traffic,
            impressions: {
              ...prevMetrics.traffic.impressions,
              value: res.impressions,
            },
            clicks: {
              ...prevMetrics.traffic.clicks,
              value: res.clicks,
            },
            ctl: {
              ...prevMetrics.traffic.ctl,
              value: res.ctl,
            },
          },
          conversion: {
            ...prevMetrics.conversion,
            leads: {
              ...prevMetrics.conversion.leads,
              value: res.periodLeads,
            },
          },
        },
        dayLeads: res.dayLeads,
      }

      localStorage.setItem('fullDashboardState', JSON.stringify(updatedState))

      return updatedState
    })

    return res
  }

  if (isLoading == null) return

  return (
    <PageLayout
      header={{
        title: 'Dashboard',
      }}
    >
      <div className={cls.wrapper}>
        {/* <pre style={{ background: 'white' }}>{JSON.stringify(dashboardState, null, 2)}</pre> */}
        <Row>
          <Col lg={9} className={cls.filters}>
            <FilterIcon className={cls.filterIcon} />
            <Text
              onClick={() => {
                updateDashboardState(DEFAULT_DASHBOARD_STATE)
                calcMetciByPeriodAndUpdate(
                  DEFAULT_DASHBOARD_STATE.periodMenuActive,
                  DEFAULT_DASHBOARD_STATE.dayLeads,
                )
              }}
            >
              Filter
            </Text>
            <Text className={cls.filtersDate}>{dashboardState.dateRangeText}</Text>
            <RefreshIcon className={cls.refhreshIcon} onClick={setFullLoading} />
          </Col>

          <Col className={cls.periodFilter}>
            {periodMenu.map((item, index) => (
              <Text
                className={classNames(
                  cls.periodItem,
                  index === dashboardState.periodMenuActive && cls.active,
                )}
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
                isLoading={isLoading}
                value={dashboardState.metricsData.traffic.impressions.value}
                today={dashboardState.metricsToday.impressions}
                yesterday={dashboardState.metricsYersterday.impressions}
                percentage={dashboardState.metricsData.traffic.impressions.percentage}
                trendLine={dashboardState.metricsData.traffic.impressions.trendLine}
                showToday={dashboardState.metricsData.traffic.impressions.showToday}
                // onTitleClick={() => handleMetricCardTitleClick('traffic', 'impressions')}
              />

              {/* Clicks Card */}
              <MetricCard
                title='Clicks'
                isLoading={isLoading}
                value={dashboardState.metricsData.traffic.clicks.value}
                today={dashboardState.metricsToday.clicks}
                yesterday={dashboardState.metricsYersterday.clicks}
                percentage={dashboardState.metricsData.traffic.clicks.percentage}
                trendLine={dashboardState.metricsData.traffic.clicks.trendLine}
                showToday={dashboardState.metricsData.traffic.clicks.showToday}
                // onTitleClick={() => handleMetricCardTitleClick('traffic', 'clicks')}
              />

              {/* CTL Card */}
              <MetricCard
                title='CTL'
                isLoading={isLoading}
                value={dashboardState.metricsData.traffic.ctl.value}
                today={dashboardState.metricsToday.ctl}
                yesterday={dashboardState.metricsYersterday.ctl}
                percentage={dashboardState.metricsData.traffic.ctl.percentage}
                trendLine={dashboardState.metricsData.traffic.ctl.trendLine}
                showToday={dashboardState.metricsData.traffic.ctl.showToday}
                // onTitleClick={() => handleMetricCardTitleClick('traffic', 'ctl')}
              />
            </MetricBox>
          </Col>

          <Col span={13} lg={13} md={13} className={cls.rightSide}>
            <MetricBox title='Finance' className={cls.rightSideRowInner}>
              <MetricCard
                isLoading={isLoading}
                title='Revenue'
                value={dashboardState.metricsData.finance.revenue.value}
                today={dashboardState.metricsData.finance.revenue.today}
                yesterday={
                  parseFloat(dashboardState.metricsData.finance.revenue.value) *
                  dashboardState.metricsData.finance.revenue.yesterday
                }
                percentage={dashboardState.metricsData.finance.revenue.percentage}
                trendLine={dashboardState.metricsData.finance.revenue.trendLine}
                showToday={dashboardState.metricsData.finance.revenue.showToday}
                onTitleClick={() => handleMetricCardTitleClick('finance', 'revenue')}
              />
              <MetricCard
                isLoading={isLoading}
                title='Payout'
                value={dashboardState.metricsData.finance.payout.value}
                today={dashboardState.metricsData.finance.payout.today}
                yesterday={
                  parseFloat(dashboardState.metricsData.finance.payout.value) *
                  dashboardState.metricsData.finance.payout.yesterday
                }
                percentage={dashboardState.metricsData.finance.payout.percentage}
                trendLine={dashboardState.metricsData.finance.payout.trendLine}
                showToday={dashboardState.metricsData.finance.payout.showToday}
                onTitleClick={() => handleMetricCardTitleClick('finance', 'payout')}
              />
              <MetricCard
                isLoading={isLoading}
                title='Net Profit'
                value={dashboardState.metricsData.finance.net.value}
                today={dashboardState.metricsData.finance.net.today}
                yesterday={
                  parseFloat(dashboardState.metricsData.finance.net.value) *
                  dashboardState.metricsData.finance.net.yesterday
                }
                percentage={dashboardState.metricsData.finance.net.percentage}
                trendLine={dashboardState.metricsData.finance.net.trendLine}
                showToday={dashboardState.metricsData.finance.net.showToday}
                onTitleClick={() => handleMetricCardTitleClick('finance', 'net')}
              />
            </MetricBox>
          </Col>
        </Row>

        <Row>
          <Col span={11} lg={11} md={11} className={cls.leftSide}>
            <MetricBox title='Conversion'>
              <MetricCard
                title='Leads'
                isLoading={isLoading}
                value={dashboardState.metricsData.conversion.leads.value}
                today={dashboardState.metricsToday.leads}
                yesterday={dashboardState.metricsYersterday.leads}
                percentage={dashboardState.metricsData.conversion.leads.percentage}
                trendLine={dashboardState.metricsData.conversion.leads.trendLine}
                showToday={dashboardState.metricsData.conversion.leads.showToday}
                onTitleClick={() => handleMetricCardTitleClick('conversion', 'leads')}
              />

              <MetricCard
                title='FTDs'
                isLoading={isLoading}
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
                isLoading={isLoading}
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
              isLoading={isLoading}
              loadingTable={5}
              className={cls.flexContentStart}
              dropDownTitle='Country'
              // onTitleClick={() => handleTableTitleClick('affiliates')}
            >
              <CustomTable
                title={`Showing ${dashboardState.trafficMapData.length} Items`}
                columns={countyColumns}
                data={dashboardState.trafficMapData.map((item) => {
                  return {
                    ...item,
                    impressions: dashboardState.metricsData.traffic.impressions.value,
                    leads: dashboardState.metricsData.conversion.leads.value,
                    ftds: dashboardState.metricsData.conversion.ftds.value,
                    cr: dashboardState.metricsData.conversion.cr.value,
                    clicks: dashboardState.metricsData.traffic.clicks.value,
                    name: `(${item.code}) ${item.name}`,
                  }
                })}
              />
            </MetricBox>
          </Col>

          {/* Right Section: Finance, Balance, Statistics Chart */}
          <Col span={13} lg={13} md={13}>
            <Row>
              <Col span={24} className={cls.dFlex}>
                <MetricBox
                  className={cls.flex1}
                  title='Statistics'
                  isLoading={isLoading}
                  dropDownTitle='3 selected'
                  onTitleClick={handleChartTitleClick}
                >
                  <StatisticsChart chartData={dashboardState.chartData} />
                </MetricBox>
              </Col>
            </Row>

            <Row>
              <Col span={12} className={cls.dFlex}>
                <MetricBox
                  className={cls.flex1}
                  title='Traffic Map'
                  isLoading={isLoading}
                  dropDownTitle='Impressions'
                  onTitleClick={handleTrafficMapTitleClick}
                >
                  <TrafficMap
                    // mapData={dashboardState.trafficMapData}
                    mapData={dashboardState.trafficMapData.map((item) => {
                      return {
                        ...item,
                        value: dashboardState.metricsData.traffic.impressions.value,
                        percentage: dashboardState.metricsData.traffic.ctl.value + '%',
                      }
                    })}
                  />
                </MetricBox>
              </Col>

              <Col span={12} className={cls.dFlex}>
                <MetricBox
                  title='Insights'
                  isLoading={isLoading}
                  loadingTable={3}
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
    </PageLayout>
  )
}

export default DashboardPage
