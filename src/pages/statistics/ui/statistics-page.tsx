/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { DownOutlined } from '@ant-design/icons'
import { Button, Col, Dropdown, Input, Row, Tabs, Typography } from 'antd'
import dayjs, { Dayjs } from 'dayjs'
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
import { MetricBox } from '~/modules/dashboard/components/metric-card'
import StatisticsChart from '~/modules/dashboard/components/statistics-chart/statistics-card'
import CustomTable from '~/modules/dashboard/components/table/table'
import { FilterIcon } from '~/shared/ui/icon'
import { HouseIcon } from '~/shared/ui/icon/ui/house-icon'
import { RefreshIcon } from '~/shared/ui/icon/ui/refresh-icon'
import cls from '../../dashboard-page/ui/dashboard-page.module.scss'

const { Text } = Typography

// Columns for the Affiliates table (for display, not for modal editing)
const countyColumns = [
  { title: 'Name', dataIndex: 'name', key: 'name' },
  // { title: 'Impressions', dataIndex: 'impressions', key: 'impressions' },
  // { title: 'Clicks', dataIndex: 'clicks', key: 'clicks' },
  // { title: 'CTR', dataIndex: 'ctr', key: 'ctr' },
  { title: 'Leads', dataIndex: 'leads', key: 'leads' },
  // { title: 'CTL', dataIndex: 'ctl', key: 'ctl' },
  { title: 'FTDS', dataIndex: 'ftds', key: 'ftds' },
  // { title: 'C2FTD', dataIndex: 'c2ftd', key: 'c2ftd' },
  { title: 'CR', dataIndex: 'cr', key: 'cr' },
  { title: '', dataIndex: 'noon', key: 'noon' },
  // { title: 'Total Payout', dataIndex: 'total', key: 'total' },
  // { title: 'Soft Failures', dataIndex: 'softFail', key: 'softFail' },
  // { title: 'Hard Failures', dataIndex: 'hardFail', key: 'hardFail' },
  // { title: 'Unassigned', dataIndex: 'unassigned', key: 'unassigned' },
  // { title: 'Payout', dataIndex: 'payout', key: 'payout' },
  // { title: 'dynamicLevel', dataIndex: 'dynamicLevel', key: 'dynamicLevel' },
]

const StatisticsPage = () => {
  // Unified state for all dashboard data
  const [dashboardState, setDashboardState] = useState(DEFAULT_DASHBOARD_STATE)

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
    console.log('--- periodInx', periodInx)

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
                <Text className={cls.filtersDate}>
                  countries ({dashboardState.trafficMapData.length})
                </Text>
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

            <Row>
              <Col span={24} className={cls.dFlex}>
                <MetricBox className={cls.flex1} title='' isLoading={isLoading}>
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

            <Row>
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
                    data={dashboardState.affiliates}
                  />
                </MetricBox>
              </Col>
            </Row>
          </Col>
        </MetricBox>
      </div>
      {/* <EditStatsTableModal
        visible={isEditTableModalVisible}
        onCancel={handleTableModalCancel}
        onSave={handleTableModalSave}
        initialTableData={dashboardState.statsTableData}
      /> */}
      {/* <EditChartModal
        visible={isEditChartModalVisible}
        onCancel={handleChartModalCancel}
        onSave={handleChartModalSave}
        initialChartData={dashboardState.chartData}
      /> */}
    </PageLayout>
  )
}

export default StatisticsPage
