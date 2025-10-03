/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Col, Dropdown, Input, Row, Tabs, Typography } from 'antd'
import { useEffect, useState } from 'react'
import { PageLayout } from '~/layouts'
import { DownOutlined } from '@ant-design/icons'
import { THEME_PALETTES } from '~/lib/constants/theme-pallets'
import { EditTableModal, MetricBox } from '~/modules/dashboard/components/metric-card'
import EditChartModal from '~/modules/dashboard/components/metric-card/edit-chart-modal'
import { EditTrafficMapModal } from '~/modules/dashboard/components/metric-card/edit-map-modal'
import { EditMetricModal } from '~/modules/dashboard/components/metric-card/edit-metric-modal'
import StatisticsChart from '~/modules/dashboard/components/statistics-chart/statistics-card'
import CustomTable from '~/modules/dashboard/components/table/table'
import { Dayjs, dayjs } from '~/shared/providers'
import { FilterIcon } from '~/shared/ui/icon'
import { RefreshIcon } from '~/shared/ui/icon/ui/refresh-icon'
import cls from '../../dashboard-page/ui/dashboard-page.module.scss'
import { HouseIcon } from '~/shared/ui/icon/ui/house-icon'

const { Text } = Typography

const getArray = (length: number, start = 0): number[] => {
  return Array.from({ length }, (_, i) => start + i)
}

const formatDate = (date: Dayjs): string => {
  return date.format('DD/MM/YYYY')
}

function randomFromTo(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function getHourlyGaps(
  startWorkingHours: number,
  endWorkingHours: number,
  currentHour: number,
): { passedNonWorkHours: number[]; passedWorkHours: number[][]; remainingHours: number[] } {
  const passedNonWorkHours = []
  const passedWorkHoursFlat = [] // Temporary array to collect all passed working hours
  const remainingHours = []

  if (startWorkingHours < endWorkingHours) {
    const isWorkingHour = (hour: number) => {
      if (startWorkingHours <= endWorkingHours) {
        // Normal contiguous working period (e.g., 9:00 to 17:00)
        return hour >= startWorkingHours && hour <= endWorkingHours
      } else {
        // Working period spans midnight (e.g., 21:00 to 06:00)
        // An hour is working if it's from startWorkingHours to 23:59 OR from 0:00 to endWorkingHours-1
        return hour >= startWorkingHours || hour < endWorkingHours
      }
    }

    // Populate startGap and workGap: hours that have already passed (from 0 up to currentHour)
    for (let i = 0; i < currentHour; i++) {
      if (isWorkingHour(i)) {
        passedWorkHoursFlat.push(i)
      } else {
        passedNonWorkHours.push(i)
      }
    }

    // Populate endGap: all hours from the currentHour until the end of the day (23)
    for (let i = currentHour; i < 24; i++) {
      remainingHours.push(i)
    }
    return { passedNonWorkHours, passedWorkHours: [passedWorkHoursFlat], remainingHours }
  }

  // Helper function to check if a given hour falls within the defined working period.
  // Handles both contiguous (e.g., 9-17) and wrapped (e.g., 21-6) working hours.
  const isWorkingHour = (hour: number) => {
    if (startWorkingHours <= endWorkingHours) {
      // Normal contiguous working period (e.g., 9:00 to 17:00)
      // Note: endWorkingHours is exclusive for the working period itself (e.g., 17 means up to 16:59)
      return hour >= startWorkingHours && hour < endWorkingHours
    } else {
      // Working period spans midnight (e.g., 21:00 to 06:00)
      // An hour is working if it's from startWorkingHours to 23:59 OR from 0:00 to endWorkingHours-1
      return hour >= startWorkingHours || hour <= endWorkingHours
    }
  }

  // Populate passedNonWorkHours and passedWorkHoursFlat: hours that have already passed (from 0 up to and including currentHour)
  for (let i = 0; i <= currentHour; i++) {
    // Loop includes currentHour
    if (isWorkingHour(i)) {
      passedWorkHoursFlat.push(i)
    } else {
      passedNonWorkHours.push(i)
    }
  }

  // Populate remainingHours: all hours from the currentHour + 1 until the end of the day (23)
  for (let i = currentHour + 1; i < 24; i++) {
    // Loop starts from currentHour + 1
    remainingHours.push(i)
  }

  // --- Segment passedWorkHoursFlat into contiguous blocks ---
  const passedWorkHours = []
  if (passedWorkHoursFlat.length > 0) {
    // Sort the flat array to ensure correct segmentation, especially for midnight spanning cases
    passedWorkHoursFlat.sort((a, b) => a - b)

    let currentSegment = [passedWorkHoursFlat[0]]
    for (let i = 1; i < passedWorkHoursFlat.length; i++) {
      const prevHour = passedWorkHoursFlat[i - 1]
      const currentHourInFlat = passedWorkHoursFlat[i]

      // If the current hour is not consecutive to the previous one, start a new segment
      // This handles breaks in continuity, including the "gap" when wrapping around midnight
      // (e.g., after 23, the next hour is 0, but if 23 is followed by 5, that's a break)
      if (currentHourInFlat !== prevHour + 1) {
        passedWorkHours.push(currentSegment)
        currentSegment = [currentHourInFlat]
      } else {
        currentSegment.push(currentHourInFlat)
      }
    }
    passedWorkHours.push(currentSegment) // Push the last segment
  }

  return { passedNonWorkHours, passedWorkHours, remainingHours }
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
  if (!n) return []

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

const generalWorkGap = getHourlyGaps(9, 18, today.hour() + 1)
const countryWorkGap = {
  CA: { start: 17, end: 24 },
  AU: { start: 21, end: 6 },
}

const periodMenu = [
  {
    title: 'Today',
    date: `${formatDate(today)} - ${formatDate(today)}`,
    startGap: generalWorkGap.passedNonWorkHours,
    labels: generalWorkGap.passedWorkHours[0],
    endGap: generalWorkGap.remainingHours,
    leadRand: 1,
    leadKoef: 1,
  },
  {
    title: 'Yesterday',
    date: `${formatDate(today.subtract(1, 'day'))} - ${formatDate(today.subtract(1, 'day'))}`,
    startGap: generalWorkGap.passedNonWorkHours,
    labels: generalWorkGap.passedWorkHours[0],
    endGap: generalWorkGap.remainingHours,
    leadRand: convertTwoDigitNumber(randomFromTo(-30, 30)),
    leadKoef: 1,
  },
  {
    title: 'Last 7 Days',
    date: `${formatDate(today.subtract(6, 'day'))} - ${formatDate(today)}`,
    startGap: [],
    endGap: [],
    labels: getArray(today.diff(today.subtract(6, 'day'), 'day') + 1).map((item) => {
      return today.subtract(6, 'day').add(item, 'day').format('DD MMM')
    }),
    leadRand: convertTwoDigitNumber(randomFromTo(-30, 30)),
    leadKoef: 7,
  },
  {
    title: 'This Week',
    date: `${formatDate(today.startOf('week'))} - ${formatDate(today.endOf('week').add(1, 'day'))}`,
    startGap: [],
    endGap: getArray(today.endOf('week').add(1, 'day').diff(today, 'day')).map((item) => {
      return today
        .startOf('week')
        .add(today.day() + item + 1, 'day')
        .format('DD MMM')
    }),
    labels: getArray(today.diff(today.startOf('week'), 'day')).map((item) => {
      return today
        .startOf('week')
        .add(item + 1, 'day')
        .format('DD MMM')
    }),
    leadRand: convertTwoDigitNumber(randomFromTo(-30, 30)),
    leadKoef: today.day() + 1,
    ftdsKoef: today.day(),
  },
  {
    title: 'This Month',
    date: `${formatDate(today.startOf('month'))} - ${formatDate(today.endOf('month'))}`,
    startGap: [],
    endGap: getArray(today.endOf('month').diff(today, 'day')).map((item) => {
      return today.add(item + 1, 'day').format('DD MMM')
    }),
    // labels: [
    //   today.startOf('month'),
    //   today.date(7),
    //   today.date(15),
    //   today.date(21),
    //   today.endOf('month'),
    // ].map((item) => item.format('DD MMM')),
    // from start to end
    labels: getArray(today.diff(today.startOf('month'), 'day') + 1).map((item) => {
      return today.startOf('month').add(item, 'day').format('DD MMM')
    }),
    leadRand: convertTwoDigitNumber(randomFromTo(-30, 30)),
    leadKoef: today.date(),
  },
  {
    title: 'Last Month',
    date: `${formatDate(today.subtract(1, 'month').startOf('month'))} - ${formatDate(today.subtract(1, 'month').endOf('month'))}`,
    startGap: [],
    endGap: [],
    labels: getArray(
      today
        .subtract(1, 'month')
        .endOf('month')
        .diff(today.subtract(1, 'month').startOf('month'), 'day'),
    ).map((item) => {
      return today.subtract(1, 'month').startOf('month').add(item, 'day').format('DD MMM')
    }),
    leadRand: convertTwoDigitNumber(randomFromTo(-30, 30)),
    leadKoef: today.subtract(1, 'month').daysInMonth(),
  },
  {
    title: 'Custom',
    date: `${formatDate(today.subtract(6, 'day'))} - ${formatDate(today.endOf('week'))}`,
    startGap: [],
    endGap: [],
    labels: [],
    leadRand: 1,
    leadKoef: 1,
  },
]

// Columns for the Affiliates table (for display, not for modal editing)
const countyColumns = [
  { title: 'Name', dataIndex: 'name', key: 'name' },
  { title: 'Impressions', dataIndex: 'impressions', key: 'impressions' },
  { title: 'Total Leads', dataIndex: 'totalLeads', key: 'totalLeads' },
  { title: 'Q-Leads', dataIndex: 'leads', key: 'leads' },
  { title: 'Total FTDs', dataIndex: 'total_ftds', key: 'total_ftds' },
  { title: 'FTDs', dataIndex: 'ftds', key: 'ftds' },
  { title: 'Conversion Rate', dataIndex: 'cr', key: 'cr' },
  { title: 'Clicks', dataIndex: 'clicks', key: 'clicks' },
]

const DEFAULT_DASHBOARD_STATE = {
  v: '2',
  metricsData: {
    traffic: {
      impressions: {
        value: '0',
        percentage: randomFromTo(10, 40).toString(),
        today: '0',
        yesterday: '0',
        trendLine: true,
        showToday: true,
      },
      clicks: {
        value: '0',
        percentage: randomFromTo(10, 40).toString(),
        today: '0',
        yesterday: '0',
        trendLine: true,
        showToday: true,
      },
      ctl: {
        value: '0',
        percentage: randomFromTo(10, 40).toString(),
        today: '0',
        yesterday: '0',
        trendLine: true,
        showToday: true,
      },
    },
    conversion: {
      leads: {
        value: '40',
        percentage: randomFromTo(10, 40).toString(),
        today: '0',
        yesterday: '0',
        trendLine: true,
        showToday: true,
      },
      ftds: {
        value: '0',
        percentage: randomFromTo(10, 40).toString(),
        today: '0',
        yesterday: '0',
        trendLine: true, // No trend line shown in the image for FTDs
        showToday: true,
      },
      cr: {
        value: '0%',
        percentage: randomFromTo(5, 20).toString(),
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
    balance: {
      total: {
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
        borderColor: '#ff4147', // White color from the image
        backgroundColor: 'rgba(255, 255, 255, 0.1)', // Very light white fill
        pointBackgroundColor: '#ff4147',
        pointBorderColor: '#ff4147',
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
  dateRangeText: `${formatDate(today)} - ${formatDate(today)}`,
  periodMenuActive: 2,
  dayLeads: '40',
  dayFTDs: '0',
  metricsToday: {
    leads: '40',
    impressions: '0',
    clicks: '0',
    ctl: '0',
    ftds: '0',
  },
  metricsYersterday: {
    leads: '40',
    impressions: '0',
    clicks: '0',
    ctl: '0',
    ftds: '0',
  },
}

const StatisticsPage = () => {
  // Unified state for all dashboard data
  const [dashboardState, setDashboardState] = useState(DEFAULT_DASHBOARD_STATE)

  // States for modal visibility and current editing items (these don't need to be persisted)
  const [isEditMetricModalVisible, setIsEditMetricModalVisible] = useState(false)
  const [currentEditingMetricType] = useState(null)
  const [currentEditingMetricName] = useState(null)
  const [initialFormValues] = useState({})

  const [isEditTableModalVisible, setIsEditTableModalVisible] = useState(false)
  const [currentEditingTableType] = useState(null)
  const [initialTableModalData] = useState([])

  const [isEditChartModalVisible, setIsEditChartModalVisible] = useState(false)
  const [isEditTrafficMapModalVisible, setIsEditTrafficMapModal] = useState(false)

  // Loading state for initial dashboard data load
  const [isLoading, setIsLoading] = useState<boolean | null>(null)

  const setFullLoading = () => {
    setIsLoading(true)
    setTimeout(() => setIsLoading(false), randomFromTo(500, 2200))
  }

  // Effect to load all dashboard state from localStorage on component mount
  useEffect(() => {
    try {
      setIsLoading(true)
      const savedState = localStorage.getItem('fullDashboardState-stats')
      const version = localStorage.getItem('version-stats')
      if (savedState && DEFAULT_DASHBOARD_STATE.v == version) {
        const parsedState = JSON.parse(savedState)

        setDashboardState(parsedState)
        calcMetciByPeriodAndUpdate(
          parsedState.periodMenuActive,
          parsedState.dayLeads,
          parsedState.dayFTDs,
        )
      } else {
        console.log('--- SET DEFAULT')
        updateDashboardState(DEFAULT_DASHBOARD_STATE)
        calcMetciByPeriodAndUpdate(
          DEFAULT_DASHBOARD_STATE.periodMenuActive,
          DEFAULT_DASHBOARD_STATE.dayLeads,
          DEFAULT_DASHBOARD_STATE.dayFTDs,
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
      localStorage.setItem('fullDashboardState-stats', JSON.stringify(updatedState))
      localStorage.setItem('version-stats', DEFAULT_DASHBOARD_STATE.v)
      return updatedState
    })
  }

  // --- Metric Edit Modal Handlers ---

  const handleMetricModalSave = (newValues: any) => {
    if (currentEditingMetricType == 'conversion' && currentEditingMetricName == 'leads') {
      const data = periodMenu[dashboardState.periodMenuActive]
      const dayLeads = (newValues.value / (data.leadKoef * data.leadRand)).toFixed(3)
      calcMetciByPeriodAndUpdate(dashboardState.periodMenuActive, dayLeads)
    } else if (currentEditingMetricType == 'conversion' && currentEditingMetricName == 'ftds') {
      const data = periodMenu[dashboardState.periodMenuActive]
      const dayFTDs = (newValues.value / data.leadKoef).toFixed(3)
      calcMetciByPeriodAndUpdate(dashboardState.periodMenuActive, undefined, dayFTDs)
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
      calcMetciByPeriodAndUpdate(dashboardState.periodMenuActive)
    }
    setIsEditMetricModalVisible(false)
  }
  const handleMetricModalCancel = () => {
    setIsEditMetricModalVisible(false)
  }

  // --- Table Edit Modal Handlers ---
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
  const handleTrafficMapModalSave = (newData: any) => {
    updateDashboardState({ trafficMapData: newData })
    calcMetciByPeriodAndUpdate(dashboardState.periodMenuActive)
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

  const getFTDsByPeriod = (value: string, period?: number): string | number => {
    const data = periodMenu[period ?? dashboardState.periodMenuActive]
    return Math.ceil(parseFloat((parseFloat(value) * (data.ftdsKoef || data.leadKoef)).toFixed(1)))
  }

  const calcMetciByPeriod = (period: number, inputLeads?: string, inputFTDs?: string) => {
    const dayLeads = parseFloat(inputLeads ? inputLeads : dashboardState.dayLeads)
    const periodLeads = parseFloat(getLeadsByPeriod(dayLeads.toString(), period).toString())

    const dayFTDs = parseFloat(inputFTDs ? inputFTDs : dashboardState.dayFTDs)
    const periodFTDs = parseFloat(getFTDsByPeriod(dayFTDs.toString(), period).toString())

    const impressions = Math.ceil(periodLeads * 1.22)
    const clicks = Math.ceil(periodLeads * 1.35)
    const ctl = ((impressions / clicks) * 100).toFixed(0)

    return {
      dayLeads,
      periodLeads,
      dayFTDs,
      periodFTDs,
      impressions,
      clicks,
      ctl,
    }
  }

  const calcMetciByPeriodAndUpdate = (
    period: number,
    inputLeads?: string | undefined,
    inputFTDs?: string | undefined,
  ) => {
    const res = calcMetciByPeriod(period, inputLeads, inputFTDs)

    let labels = periodMenu[period].labels
    let startGap: any[] = periodMenu[period].startGap
    let endGap: any[] = periodMenu[period].endGap

    const startGapZero = startGap.map(() => 0)
    const endGapZero = endGap.map(() => 0)

    let datasets: any[] = []
    let labelsConcated: any[] = []

    setDashboardState((prevState: any) => {
      const prevMetrics = prevState.metricsData
      const prevChart = prevState.chartData

      const ftds = res.periodFTDs
      const cr = !ftds ? 0 : ((ftds / res.periodLeads) * 100).toFixed(2)

      const metricsToday = calcMetciByPeriod(0, res.dayLeads as any)
      const metricsYersterday = calcMetciByPeriod(1, res.dayLeads as any)

      const calcGraficArrow = (t: any, y: any) => {
        const tparsed = parseFloat(t)
        const yparsed = parseFloat(y)
        return Math.round(((tparsed - yparsed) / yparsed) * 100)
      }

      const updatedState = {
        ...prevState,
        metricsData: {
          ...prevMetrics,
          traffic: {
            ...prevMetrics.traffic,
            impressions: {
              ...prevMetrics.traffic.impressions,
              percentage: calcGraficArrow(metricsToday.impressions, metricsYersterday.impressions),
              value: res.impressions,
            },
            clicks: {
              ...prevMetrics.traffic.clicks,
              percentage: calcGraficArrow(metricsToday.clicks, metricsYersterday.clicks),
              value: res.clicks,
            },
            ctl: {
              ...prevMetrics.traffic.ctl,
              percentage: calcGraficArrow(metricsToday.ctl, metricsYersterday.ctl),
              value: res.ctl,
            },
          },
          conversion: {
            ...prevMetrics.conversion,
            leads: {
              ...prevMetrics.conversion.leads,
              percentage: calcGraficArrow(metricsToday.periodLeads, metricsYersterday.periodLeads),
              value: res.periodLeads,
            },
            ftds: {
              ...prevMetrics.conversion.ftds,
              percentage: calcGraficArrow(metricsToday.dayFTDs, metricsYersterday.dayFTDs),
              value: res.periodFTDs,
            },
            cr: {
              ...prevMetrics.conversion.cr,
              value: cr,
            },
          },
        },
        dayLeads: res.dayLeads,
        dayFTDs: res.dayFTDs,
      }

      updatedState.metricsToday = {
        ...metricsToday,
        leads: metricsToday.periodLeads,
        ftds: metricsToday.periodFTDs,
      }
      updatedState.metricsYersterday = {
        ...metricsYersterday,
        leads: metricsYersterday.periodLeads,
        ftds: metricsYersterday.periodFTDs,
      }

      const country = prevState.trafficMapData[0]
      const code = country?.code
      if (code && code in countryWorkGap && (period == 0 || period == 1)) {
        const { start, end } = countryWorkGap[code as keyof typeof countryWorkGap]
        const generalWorkGap = getHourlyGaps(start, end, period === 1 ? 23 : today.hour())

        if (start < end) {
          startGap = generalWorkGap.passedNonWorkHours
          labels = generalWorkGap.passedWorkHours[0]
          endGap = generalWorkGap.remainingHours

          const startGapZero = startGap.map(() => 0)
          const endGapZero = endGap.map(() => 0)

          datasets = [
            startGapZero.concat(
              distributeRandomlyWithBias(res.impressions, labels.length),
              endGapZero,
            ),
            startGapZero.concat(
              distributeRandomlyWithBias(res.periodLeads, labels.length),
              endGapZero,
            ),
            startGapZero.concat(
              distributeRandomlyWithBias(
                res.periodFTDs,
                labels.length,
                labels.length * convertTwoDigitNumber(randomFromTo(-30, 30)),
              ),
              endGapZero,
            ),
          ]

          labelsConcated = startGap.concat(labels, endGap)
        } else {
          labels = generalWorkGap.passedWorkHours[0]
          startGap = generalWorkGap.passedNonWorkHours
          const labels2 = generalWorkGap.passedWorkHours[1] || []
          endGap = generalWorkGap.remainingHours

          const startGapZero = startGap.map(() => 0)
          const endGapZero = endGap.map(() => 0)

          datasets = [
            distributeRandomlyWithBias(res.impressions / 2, labels.length).concat(
              startGapZero,
              distributeRandomlyWithBias(res.impressions / 2, labels2?.length),
              endGapZero,
            ),
            distributeRandomlyWithBias(res.periodLeads / 2, labels.length).concat(
              startGapZero,
              distributeRandomlyWithBias(res.periodLeads / 2, labels2?.length),
              endGapZero,
            ),
            distributeRandomlyWithBias(res.periodFTDs / 2, labels.length, labels.length).concat(
              startGapZero,
              distributeRandomlyWithBias(
                res.periodFTDs / 2,
                labels2?.length,
                labels2?.length * convertTwoDigitNumber(randomFromTo(-30, 30)),
              ),
              endGapZero,
            ),
          ]

          labelsConcated = labels.concat(startGap, labels2, endGap)
        }
      } else {
        if (period == 3 || period == 4 || period == 2) {
          datasets = [
            startGapZero.concat(
              distributeRandomlyWithBias(
                res.impressions -
                  parseFloat(dashboardState.metricsYersterday.impressions) -
                  parseFloat(dashboardState.metricsToday.impressions),
                labels.length - 2,
              ),
              [
                parseFloat(dashboardState.metricsYersterday.impressions),
                parseFloat(dashboardState.metricsToday.impressions),
              ],
              endGapZero,
            ),
            startGapZero.concat(
              distributeRandomlyWithBias(
                res.periodLeads -
                  parseFloat(dashboardState.metricsYersterday.leads) -
                  parseFloat(dashboardState.metricsToday.leads),
                labels.length - 2,
              ),
              [
                parseFloat(dashboardState.metricsYersterday.leads),
                parseFloat(dashboardState.metricsToday.leads),
              ],
              endGapZero,
            ),
            startGapZero.concat(
              distributeRandomlyWithBias(
                res.periodFTDs -
                  parseFloat(dashboardState.metricsYersterday.ftds) -
                  parseFloat(dashboardState.metricsToday.ftds),
                labels.length - 2,
              ),
              [
                parseFloat(dashboardState.metricsYersterday.ftds),
                parseFloat(dashboardState.metricsToday.ftds),
              ],
              endGapZero,
            ),
          ]
        } else {
          datasets = [
            startGapZero.concat(
              distributeRandomlyWithBias(res.impressions, labels.length),
              endGapZero,
            ),
            startGapZero.concat(
              distributeRandomlyWithBias(res.periodLeads, labels.length),
              endGapZero,
            ),
            startGapZero.concat(
              distributeRandomlyWithBias(
                res.periodFTDs,
                labels.length,
                labels.length * convertTwoDigitNumber(randomFromTo(-30, 30)),
              ),
              endGapZero,
            ),
          ]
        }

        labelsConcated = startGap.concat(labels, endGap)
      }

      updatedState.chartData = {
        ...prevChart,
        labels: labelsConcated,
        datasets: prevChart.datasets.map((item: any, index: number) => ({
          ...item,
          data: datasets[index],
        })),
      }

      localStorage.setItem('fullDashboardState', JSON.stringify(updatedState))

      return updatedState
    })

    return res
  }

  if (isLoading == null) return

  return (
    <PageLayout
      className={cls.stats}
      headerClassName={cls.staty}
      header={{
        title: 'Statistics',
      }}
    >
      <div className={cls.wrapper}>
        <MetricBox title=''>
          <Col span={24} style={{ paddingLeft: 15, paddingRight: 15 }}>
            <Tabs
              className={cls.tabi}
              type='editable-card'
              defaultActiveKey='1'
              items={[
                {
                  key: '1',
                  label: 'Main View',
                  icon: <HouseIcon />,
                },
              ]}
            />
          </Col>

          <Col span={24}>
            <Row
              justify='space-between'
              style={{ paddingLeft: 15, paddingRight: 15, paddingTop: 15 }}
            >
              <Col lg={12} className={cls.filters}>
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
                <Text className={cls.filtersDate}>levels (1)</Text>
                <Text className={cls.filtersDate}>country (1)</Text>
                <RefreshIcon className={cls.refhreshIcon} onClick={setFullLoading} />
              </Col>
              <Col className={cls.filterSearchWrap}>
                <Dropdown
                  menu={{
                    items: [
                      { key: '1', label: 'Option 1' },
                      { key: '2', label: 'Option 2' },
                      { key: '3', label: 'Option 3' },
                    ],
                  }}
                  trigger={['click']}
                >
                  <Button
                    type='link'
                    style={{ color: 'white', display: 'flex', alignItems: 'center' }}
                  >
                    Name
                    <DownOutlined style={{ marginLeft: 5 }} />
                  </Button>
                </Dropdown>
                <Input placeholder='Search by Name...'></Input>
              </Col>
            </Row>
            <Row>
              <Col span={24} style={{ padding: 15 }}>
                <div className={cls.quote}>Performance Graph</div>
              </Col>
            </Row>

            <Row onClick={handleChartTitleClick}>
              <Col span={24} className={cls.dFlex}>
                <MetricBox
                  className={cls.flex1}
                  title=''
                  isLoading={isLoading}
                  onTitleClick={handleChartTitleClick}
                >
                  <StatisticsChart
                    chartData={dashboardState.chartData}
                    options={{
                      plugins: {
                        legend: {
                          display: true,
                          position: 'bottom',
                          align: 'center',
                          labels: {
                            color: 'white', // Legend text color
                            font: {
                              size: 11,
                            },
                            usePointStyle: true, // Use circular points for legend items
                            boxHeight: 5,
                            boxWidth: 3, // Size of the color box
                            padding: 30, // Padding between legend items
                          },
                        },
                        tooltip: {
                          mode: 'index',
                          intersect: false,
                          backgroundColor: 'rgba(0,0,0,0.7)', // Dark tooltip background
                          titleColor: 'white',
                          bodyColor: 'white',
                          borderColor: '#4a4a4a',
                          borderWidth: 1,
                          callbacks: {
                            label: function (context) {
                              // context.dataset.label gives "Impressions", "Leads", "FTDs"
                              // context.parsed.y gives the data value (e.g., 18, 0, 2)
                              return `${context.dataset.label?.split(' ')[0]}: ${context.parsed.y}` // This will show "Impressions: 18", "Leads: 0", etc.
                            },
                          },
                        },
                        title: {
                          display: false, // We'll use Ant Design Typography for the title
                        },
                      },
                    }}
                  />
                </MetricBox>
              </Col>
            </Row>

            <Row onClick={() => setIsEditTrafficMapModal(true)}>
              <Col span={24} className={cls.dFlex}>
                <MetricBox
                  title=''
                  loadingTable={3}
                  isLoading={isLoading}
                  className={cls.flexContentStart}
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
            </Row>
          </Col>
        </MetricBox>
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

export default StatisticsPage
