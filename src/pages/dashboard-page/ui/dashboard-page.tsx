/* eslint-disable @typescript-eslint/no-explicit-any */
import { Col, Row, Typography } from 'antd'
import classNames from 'classnames'
import { useEffect, useState } from 'react'
import { PageLayout } from '~/layouts'
import {
  convertTwoDigitNumber,
  countryWorkGap,
  DEFAULT_DASHBOARD_STATE,
  distributeRandomlyWithBias,
  distributeWithControlledError,
  distributeWithRandomness,
  formatDate,
  getArray,
  getHourlyGaps,
  periodMenu,
  randomFromTo,
  today,
  yesterday,
} from '~/lib/constants/dashboard.constants'
import { EditTableModal, MetricBox, MetricCard } from '~/modules/dashboard/components/metric-card'
import EditChartModal from '~/modules/dashboard/components/metric-card/edit-chart-modal'
import EditDateModal from '~/modules/dashboard/components/metric-card/edit-date-modal'
import { EditTrafficMapModal } from '~/modules/dashboard/components/metric-card/edit-map-modal'
import { EditMetricModal } from '~/modules/dashboard/components/metric-card/edit-metric-modal'
import StatisticsChart from '~/modules/dashboard/components/statistics-chart/statistics-card'
import CustomTable from '~/modules/dashboard/components/table/table'
import TrafficMap from '~/modules/dashboard/components/traffic-map/traffic-map'
import { Dayjs, dayjs } from '~/shared/providers'
import { FilterIcon } from '~/shared/ui/icon'
import { RefreshIcon } from '~/shared/ui/icon/ui/refresh-icon'
import cls from './dashboard-page.module.scss'

const { Text } = Typography

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

const exportColumns = [
  { title: 'Issued By', dataIndex: 'issuedBy', key: 'issuedBy' },
  { title: 'Issue Date', dataIndex: 'issueDate', key: 'issueDate' },
  { title: 'Source', dataIndex: 'source', key: 'source' },
]

// Columns for the Insights table (for display, not for modal editing)
const insightsColumns = [
  { title: 'Day', dataIndex: 'day', key: 'day' },
  { title: 'Value', dataIndex: 'value', key: 'value' },
  { title: 'Percentage', dataIndex: 'percentage', key: 'percentage' },
]

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

  const [isDateModalVisible, setIsDateModalVisible] = useState(false)

  // Loading state for initial dashboard data load
  const [isLoading, setIsLoading] = useState<boolean | null>(null)

  const checkIsCustomPeriod = (index: number, dateRange?: Dayjs[]) => {
    let dateRangeText, period
    dateRange = dateRange ? dateRange : dashboardState.customDateRange
    dateRange = dateRange.map((d) => dayjs(d))

    if (index == 6 && dateRange) {
      dateRangeText = `${formatDate(dateRange[0])} - ${formatDate(dateRange[1])}`
      period = {
        inx: 6,
        date: dateRange,
        title: 'Customy',
        startGap: [] as string[],
        endGap: [] as string[],
        labels: getArray(dateRange[1].diff(dateRange[0], 'day') + 1).map((item) => {
          return dateRange[0].add(item, 'day').format('DD MMM')
        }),
        leadRand: 1,
        leadKoef: dateRange[1].diff(dateRange[0], 'day') + 1,
      }

      if (today.isSameOrAfter(period.date[0]) && today.isSameOrBefore(period.date[1])) {
        const includeYersterday = yesterday.isSameOrAfter(period.date[0]) ? 1 : 0
        const startGapCount = today.diff(period.date[0], 'day') - includeYersterday
        const endGapCount = period.date[1].diff(today, 'day') + 1

        period.startGap = getArray(startGapCount).map((item) => {
          return dateRange[0].add(item, 'day').format('DD MMM')
        })

        period.labels = [today.format('DD MMM')]
        if (includeYersterday) period.labels.unshift(yesterday.format('DD MMM'))

        period.endGap = getArray(endGapCount).map((item) => {
          return today.add(item + 1, 'day').format('DD MMM')
        })
      }
    } else {
      dateRangeText = `${formatDate(periodMenu[index].date[0])} - ${formatDate(periodMenu[index].date[1])}`
      period = periodMenu[index]
      period.inx = index
    }

    updateDashboardState(
      Object.assign(
        {
          dateRangeText,
          periodMenuActive: index,
        },
        dateRange && {
          customDateRange: dateRange,
        },
      ),
    )

    return { period, dateRangeText }
  }

  const handleChangePeriod = (index: number, dateRange?: Dayjs[]) => {
    setIsLoading(true)
    const { period } = checkIsCustomPeriod(index, dateRange)

    calcMetciByPeriodAndUpdate(period)
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
      const version = localStorage.getItem('version')
      if (savedState && DEFAULT_DASHBOARD_STATE.v == version) {
        const parsedState = JSON.parse(savedState)

        setDashboardState(parsedState)
        let period: any = periodMenu[parsedState.periodMenuActive]
        if (parsedState.periodMenuActive == 6)
          period = checkIsCustomPeriod(6, parsedState.customDateRange).period

        calcMetciByPeriodAndUpdate(period, parsedState.dayLeads, parsedState.dayFTDs)
      } else {
        console.log('--- SET DEFAULT')
        updateDashboardState(DEFAULT_DASHBOARD_STATE)
        calcMetciByPeriodAndUpdate(
          periodMenu[DEFAULT_DASHBOARD_STATE.periodMenuActive],
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
      localStorage.setItem('fullDashboardState', JSON.stringify(updatedState))
      localStorage.setItem('version', DEFAULT_DASHBOARD_STATE.v)
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

  const calcAffilliatesWithRandom = (state: any) => {
    const impressionsValues = distributeWithRandomness(
      +state.metricsData.traffic.impressions.value,
      state.trafficMapData.length,
    )
    const leadValues = distributeWithRandomness(
      +state.metricsData.conversion.leads.value,
      state.trafficMapData.length,
    )
    const clicksValues = distributeWithRandomness(
      +state.metricsData.conversion.cr.value,
      state.trafficMapData.length,
    )
    const ftdsValues = distributeWithRandomness(
      +state.metricsData.conversion.ftds.value,
      state.trafficMapData.length,
    )

    return state.trafficMapData.map((item: any, index: number) => {
      const leads = leadValues[index]
      const ftds = ftdsValues[index]

      return {
        ...item,
        impressions: impressionsValues[index],
        ftds,
        leads,
        clicks: clicksValues[index],
        cr: !ftds || !leads ? 0 : Math.round((ftds / leads) * 100) + '%',
        name: `(${item.code}) ${item.name}`,
      }
    })
  }

  const handleMetricModalSave = (newValues: any) => {
    let period: any = periodMenu[dashboardState.periodMenuActive]
    if (dashboardState.periodMenuActive == 6)
      period = checkIsCustomPeriod(6, dashboardState.customDateRange).period

    if (currentEditingMetricType == 'conversion' && currentEditingMetricName == 'leads') {
      const dayLeads = (newValues.value / (period.leadKoef * period.leadRand)).toFixed(3)
      calcMetciByPeriodAndUpdate(period, dayLeads)
    } else if (currentEditingMetricType == 'conversion' && currentEditingMetricName == 'ftds') {
      const dayFTDs = (newValues.value / period.leadKoef).toFixed(3)
      calcMetciByPeriodAndUpdate(periodMenu[dashboardState.periodMenuActive], undefined, dayFTDs)
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
      calcMetciByPeriodAndUpdate(periodMenu[dashboardState.periodMenuActive])
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
    calcMetciByPeriodAndUpdate(periodMenu[dashboardState.periodMenuActive])
    setIsEditTrafficMapModal(false)
  }
  const handleTrafficMapModalCancel = () => {
    setIsEditTrafficMapModal(false)
  }

  /**
   * =====
   * Algoritms
   */

  const getLeadsByPeriod = (value: string, period?: any): string | number => {
    const data = period ? period : periodMenu[dashboardState.periodMenuActive]
    return Math.ceil(parseFloat((parseFloat(value) * data.leadKoef * data.leadRand).toFixed(1)))
  }

  const getFTDsByPeriod = (value: string, period?: any): string | number => {
    const data = period ? period : periodMenu[dashboardState.periodMenuActive]
    return Math.ceil(parseFloat((parseFloat(value) * (data.ftdsKoef || data.leadKoef)).toFixed(1)))
  }

  const calcMetciByPeriod = (period: any, inputLeads?: string, inputFTDs?: string) => {
    const dayLeads = parseFloat(inputLeads ? inputLeads : dashboardState.dayLeads)
    const periodLeads = parseFloat(getLeadsByPeriod(dayLeads.toString(), period).toString())

    const dayFTDs = parseFloat(inputFTDs ? inputFTDs : dashboardState.dayFTDs)
    const periodFTDs = parseFloat(getFTDsByPeriod(dayFTDs.toString(), period).toString())

    const clicks = Math.ceil(periodLeads * 1.3)
    const impressions = Math.ceil(clicks * 1.3)
    const ctl = !clicks || !impressions ? 0 : ((impressions / clicks) * 100).toFixed(0)
    const cr = !periodFTDs ? 0 : ((periodFTDs / periodLeads) * 100).toFixed(2)

    return {
      dayLeads,
      periodLeads,
      dayFTDs,
      periodFTDs,
      impressions,
      clicks,
      ctl,
      cr,
    }
  }

  const calcMetciByPeriodAndUpdate = (
    period: any,
    inputLeads?: string | undefined,
    inputFTDs?: string | undefined,
  ) => {
    const res = calcMetciByPeriod(period, inputLeads, inputFTDs)
    const periodInx = period.inx

    let labels = period.labels
    let startGap: any[] = period.startGap
    let endGap: any[] = period.endGap

    const startGapZero = startGap.map(() => 0)
    const endGapZero = endGap.map(() => 0)

    let datasets: any[] = []
    let labelsConcated: any[] = []

    setDashboardState((prevState: any) => {
      const prevMetrics = prevState.metricsData
      const prevChart = prevState.chartData

      const ftds = res.periodFTDs
      const cr = !ftds ? 0 : ((ftds / res.periodLeads) * 100).toFixed(2)

      const metricsToday = calcMetciByPeriod(periodMenu[0], res.dayLeads as any)
      const metricsYersterday = calcMetciByPeriod(periodMenu[1], res.dayLeads as any)

      const calcGraficArrow = (t: any, y: any) => {
        const tparsed = parseFloat(t)
        const yparsed = parseFloat(y)
        const result = Math.round(((tparsed - yparsed) / yparsed) * 100) || 0
        if (result === Infinity) return 0
        return result
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
              percentage: calcGraficArrow(metricsToday.cr, metricsYersterday.cr),
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
      if (code && code in countryWorkGap && (periodInx == 0 || periodInx == 1)) {
        const { start, end } = countryWorkGap[code as keyof typeof countryWorkGap]
        const generalWorkGap = getHourlyGaps(start, end, periodInx === 1 ? 23 : today.hour())

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
              distributeWithControlledError(
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
            distributeWithControlledError(res.periodFTDs / 2, labels.length, labels.length).concat(
              startGapZero,
              distributeWithControlledError(
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
        if (periodInx == 2 || periodInx == 3 || periodInx == 4) {
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
              distributeWithControlledError(
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
        } else if (
          periodInx === 6 &&
          today.isSameOrAfter(period.date[0]) &&
          today.isSameOrBefore(period.date[1])
        ) {
          const includeYersterday = yesterday.isSameOrAfter(period.date[0]) ? 1 : 0

          if (includeYersterday) {
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
                distributeWithControlledError(
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
                distributeRandomlyWithBias(
                  res.impressions - parseFloat(dashboardState.metricsToday.impressions),
                  labels.length - 1,
                ),
                [parseFloat(dashboardState.metricsToday.impressions)],
                endGapZero,
              ),
              startGapZero.concat(
                distributeRandomlyWithBias(
                  res.periodLeads - parseFloat(dashboardState.metricsToday.leads),
                  labels.length - 1,
                ),
                [parseFloat(dashboardState.metricsToday.leads)],
                endGapZero,
              ),
              startGapZero.concat(
                distributeWithControlledError(
                  res.periodFTDs - parseFloat(dashboardState.metricsToday.ftds),
                  labels.length - 1,
                ),
                [parseFloat(dashboardState.metricsToday.ftds)],
                endGapZero,
              ),
            ]
          }
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
              distributeWithControlledError(
                res.periodFTDs,
                labels.length,
                // labels.length * convertTwoDigitNumber(randomFromTo(-30, 30)),
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

      updatedState.affiliates = calcAffilliatesWithRandom(updatedState)

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
        <Row>
          <Col lg={9} className={cls.filters}>
            <FilterIcon className={cls.filterIcon} />
            <Text
              onClick={() => {
                updateDashboardState(DEFAULT_DASHBOARD_STATE)
                calcMetciByPeriodAndUpdate(
                  periodMenu[DEFAULT_DASHBOARD_STATE.periodMenuActive],
                  DEFAULT_DASHBOARD_STATE.dayLeads,
                )
              }}
            >
              Filter
            </Text>
            <Text onClick={() => setIsDateModalVisible(true)} className={cls.filtersDate}>
              {dashboardState.dateRangeText}
            </Text>
            <Text className={cls.filtersDate}>
              Countries ({dashboardState.trafficMapData.length})
            </Text>
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
                value={dashboardState.metricsData.traffic.ctl.value + '%'}
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
            <Row>
              <Col span={12}>
                <MetricBox title='Finance' className={cls.rightSideRowInner}>
                  <MetricCard
                    isLoading={isLoading}
                    span={24}
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
                </MetricBox>
              </Col>
              <Col span={12}>
                <MetricBox title='Balance' className={cls.rightSideRowInner}>
                  <MetricCard
                    isLoading={isLoading}
                    span={24}
                    title='Total balance'
                    value={dashboardState.metricsData.balance.total.value}
                    today={dashboardState.metricsData.balance.total.today}
                    yesterday={
                      parseFloat(dashboardState.metricsData.balance.total.value) *
                      dashboardState.metricsData.balance.total.yesterday
                    }
                    percentage={dashboardState.metricsData.balance.total.percentage}
                    trendLine={dashboardState.metricsData.balance.total.trendLine}
                    showToday={dashboardState.metricsData.balance.total.showToday}
                    onTitleClick={() => handleMetricCardTitleClick('balance', 'total')}
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
                title='Q-Leads'
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
                title='Q-FTDs'
                isLoading={isLoading}
                value={dashboardState.metricsData.conversion.ftds.value}
                // today={dashboardState.metricsData.conversion.ftds.today}
                // yesterday={dashboardState.metricsData.conversion.ftds.yesterday}
                today={dashboardState.metricsToday.ftds}
                yesterday={dashboardState.metricsYersterday.ftds}
                percentage={dashboardState.metricsData.conversion.ftds.percentage}
                trendLine={dashboardState.metricsData.conversion.ftds.trendLine}
                showToday={dashboardState.metricsData.conversion.ftds.showToday}
                onTitleClick={() => handleMetricCardTitleClick('conversion', 'ftds')}
              />

              <MetricCard
                title='CR'
                isLoading={isLoading}
                value={dashboardState.metricsData.conversion.cr.value + '%'}
                today={dashboardState.metricsToday.cr + '%'}
                yesterday={dashboardState.metricsYersterday.cr + '%'}
                percentage={dashboardState.metricsData.conversion.cr.percentage}
                trendLine={dashboardState.metricsData.conversion.cr.trendLine}
                showToday={dashboardState.metricsData.conversion.cr.showToday}
                onTitleClick={() => handleMetricCardTitleClick('conversion', 'cr')}
              />
            </MetricBox>

            <MetricBox
              title='Top 10 Affiliates'
              isLoading={isLoading}
              loadingTable={5}
              className={classNames(cls.flexContentStart, cls.top10)}
              dropDownTitle='Country'
              onTitleClick={() => handleTableTitleClick('affiliates')}
            >
              <CustomTable
                title={`Showing ${dashboardState.trafficMapData.length} Items`}
                columns={countyColumns}
                data={dashboardState.affiliates}
                // data={dashboardState.trafficMapData.map((item) => {
                //   return {
                //     ...item,
                //     impressions: dashboardState.metricsData.traffic.impressions.value,
                //     leads: dashboardState.metricsData.conversion.leads.value,
                //     ftds: dashboardState.metricsData.conversion.ftds.value,
                //     cr: dashboardState.metricsData.conversion.cr.value,
                //     clicks: dashboardState.metricsData.traffic.clicks.value,
                //     name: `(${item.code}) ${item.name}`,
                //   }
                // })}
              />
            </MetricBox>
          </Col>

          {/* Right Section: Finance, Balance, Statistics Chart */}
          <Col span={13} lg={13} md={13}>
            <Row>
              <Col span={24} className={cls.dFlex}>
                <MetricBox
                  className={classNames(cls.flex1, cls.exportBlock, cls.flexContentStart)}
                  title='Export'
                  loadingTable={5}
                  isLoading={isLoading}
                  dropDownTitle='View all Exports'
                >
                  <CustomTable title='' columns={exportColumns} data={[]} />
                  <Col span={24}>
                    <Row justify='center'>
                      <Col span={5}>
                        <img src='no_data_dark_updated.webp' />
                      </Col>
                    </Row>
                  </Col>
                </MetricBox>
              </Col>
            </Row>

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

      <EditDateModal
        visible={isDateModalVisible}
        onCancel={() => setIsDateModalVisible(false)}
        onSave={(dates) => {
          // updateDashboardState({ customDateRange: dates })
          handleChangePeriod(6, dates)
          setIsDateModalVisible(false)
        }}
        initialRange={dashboardState.customDateRange}
      />

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
