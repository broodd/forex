import { dayjs, Dayjs } from '~/shared/providers'
import { THEME_PALETTES } from './theme-pallets'

export const getArray = (length: number, start = 0): number[] => {
  return Array.from({ length }, (_, i) => start + i)
}

export const formatDate = (date: Dayjs): string => {
  return date.format('DD/MM/YYYY')
}

export function randomFromTo(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

/**
 * Розподіляє загальну суму між елементами масиву,
 * де кожен елемент випадково відхиляється від середнього на ± maxDeviationPercent.
 * @param {number} total - Загальна сума (наприклад, crTotal або leadTotal).
 * @param {number} length - Кількість елементів у масиві (arraylength).
 * @param {number} [maxDeviationPercent=10] - Максимальний відсоток відхилення.
 * @returns {number[]} - Масив чисел, сума яких дорівнює total.
 */
export function distributeWithRandomness(total: number, length: number, maxDeviationPercent = 10) {
  if (length <= 0) return []
  if (total === 0) return new Array(length).fill(0)
  if (length === 1) return new Array(length).fill(total)

  // 1. Обчислюємо середнє значення
  const average = total / length
  let remainingTotal = total
  const result = []

  for (let i = 0; i < length; i++) {
    // 2. Обчислюємо максимальне і мінімальне значення для рандомізації
    const deviation = maxDeviationPercent / 100 // 0.1
    const min = average * (1 - deviation)
    const max = average * (1 + deviation)

    let randomValue

    if (i < length - 1) {
      // 3. Генеруємо випадкове значення
      // Використовуємо Math.random() * (max - min) + min
      randomValue = Math.random() * (max - min) + min

      // Обмежуємо, щоб не перевищити залишок, особливо для останніх елементів
      randomValue = Math.min(randomValue, remainingTotal)

      // Округлюємо до цілого числа (якщо це лічильники)
      randomValue = Math.round(randomValue)

      result.push(randomValue)
      remainingTotal -= randomValue
    } else {
      // 4. Останній елемент отримує весь залишок, щоб сума точно зійшлася
      randomValue = Math.max(0, remainingTotal) // Гарантуємо, що значення >= 0
      result.push(randomValue)
    }
  }

  return result
}

export function getHourlyGaps(
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
export function biasedRandom(min: number, max: number, power = 1) {
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

export function distributeRandomlyWithBias(x: number, n: number, biasPower = 1) {
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

/**
 * Розділяє загальне значення x на n частин так, щоб
 * кожна частина була приблизно рівномірною, з похибкою, що задається.
 *
 * @param {number} x Загальне значення для розподілу.
 * @param {number} n Кількість частин.
 * @param {number} maxErrorPercentage Максимальна відносна похибка (наприклад, 0.1 для 10%).
 * @returns {number[]} Масив n частин, сума яких дорівнює x.
 */
export function distributeWithControlledError(
  x: number,
  n: number,
  maxErrorPercentage = 0.1,
): number[] {
  if (!n || x <= 0) return []
  if (n === 1) return [x]

  const result: number[] = []
  const baseValue = x / n
  const maxError = baseValue * maxErrorPercentage

  let remainingSum = x

  for (let i = 0; i < n - 1; i++) {
    const minVal = Math.max(0, baseValue - maxError)
    // Обмеження, щоб забезпечити, що залишок може бути розподілений між елементами, що залишилися
    const maxVal = Math.min(remainingSum - (n - 1 - i) * minVal, baseValue + maxError)

    let nextValue
    if (minVal > maxVal) {
      nextValue = Math.min(remainingSum, baseValue)
    } else {
      // uniformRandom: Генерує випадкове число в діапазоні [min, max]
      nextValue = minVal + Math.random() * (maxVal - minVal)
    }

    result.push(nextValue)
    remainingSum -= nextValue
  }

  // Останнє значення - це залишок
  result.push(remainingSum)

  // Округлити всі значення до найближчого цілого.
  // Якщо вам потрібна більша точність (наприклад, 2 знаки після коми),
  // використовуйте: v => parseFloat(v.toFixed(2))
  const roundedResult = result.map((v) => Math.round(v))

  // Перевірка суми після округлення (дуже важливо!)
  // Округлення може змінити суму, тому потрібно скоригувати останній елемент.
  const sumAfterRounding = roundedResult.reduce((sum, val) => sum + val, 0)
  const difference = x - sumAfterRounding

  // Додаємо або віднімаємо різницю до останнього елемента
  if (roundedResult.length > 0) {
    roundedResult[roundedResult.length - 1] += difference
  }

  return roundedResult
}

export function convertTwoDigitNumber(num: number): number {
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

export const today = dayjs().add(0, 'day')
export const yesterday = today.add(-1, 'day')

export const generalWorkGap = getHourlyGaps(9, 18, today.hour() + 1)
export const countryWorkGap = {
  CA: { start: 17, end: 24 },
  AU: { start: 21, end: 6 },
}

export const periodMenu = [
  {
    inx: 0,
    title: 'Today',
    date: [today, today],
    startGap: generalWorkGap.passedNonWorkHours,
    labels: generalWorkGap.passedWorkHours[0],
    endGap: generalWorkGap.remainingHours,
    clickRand: convertTwoDigitNumber(randomFromTo(28, 36)),
    leadRand: 1,
    leadKoef: 1,
  },
  {
    inx: 1,
    title: 'Yesterday',
    date: [today.subtract(1, 'day'), today.subtract(1, 'day')],
    startGap: generalWorkGap.passedNonWorkHours,
    labels: generalWorkGap.passedWorkHours[0],
    endGap: generalWorkGap.remainingHours,
    clickRand: convertTwoDigitNumber(randomFromTo(28, 36)),
    leadRand: convertTwoDigitNumber(randomFromTo(-30, 30)),
    leadKoef: 1,
  },
  {
    inx: 2,
    title: 'Last 7 Days',
    date: [today.subtract(6, 'day'), today],
    startGap: [],
    endGap: [],
    labels: getArray(today.diff(today.subtract(6, 'day'), 'day') + 1).map((item) => {
      return today.subtract(6, 'day').add(item, 'day').format('DD MMM')
    }),
    clickRand: convertTwoDigitNumber(randomFromTo(28, 36)),
    leadRand: convertTwoDigitNumber(randomFromTo(-30, 30)),
    leadKoef: 7,
  },
  {
    inx: 3,
    title: 'This Week',
    date: [today.startOf('week'), today.endOf('week').add(1, 'day')],
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
    clickRand: convertTwoDigitNumber(randomFromTo(28, 36)),
    leadRand: convertTwoDigitNumber(randomFromTo(-30, 30)),
    leadKoef: today.day() + 1,
    ftdsKoef: today.day(),
  },
  {
    inx: 4,
    title: 'This Month',
    date: [today.startOf('month'), today.endOf('month')],
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
    clickRand: convertTwoDigitNumber(randomFromTo(28, 36)),
    leadRand: convertTwoDigitNumber(randomFromTo(-30, 30)),
    leadKoef: today.date(),
  },
  {
    inx: 5,
    title: 'Last Month',
    date: [today.subtract(1, 'month').startOf('month'), today.subtract(1, 'month').endOf('month')],
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
    clickRand: convertTwoDigitNumber(randomFromTo(28, 36)),
    leadRand: convertTwoDigitNumber(randomFromTo(-30, 30)),
    leadKoef: today.subtract(1, 'month').daysInMonth(),
  },
  {
    inx: 6,
    title: 'Custom',
    date: [today.subtract(6, 'day'), today],
    startGap: [],
    endGap: [],
    labels: [],
    clickRand: convertTwoDigitNumber(randomFromTo(28, 36)),
    leadRand: 1,
    leadKoef: 1,
  },
]
export const DEFAULT_DASHBOARD_STATE = {
  v: '4.1',
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
        calcByFormula: true,
      },
      ftds: {
        value: '0',
        percentage: randomFromTo(10, 40).toString(),
        today: '0',
        yesterday: '0',
        trendLine: true, // No trend line shown in the image for FTDs
        showToday: true,
        calcByFormula: true,
      },
      cr: {
        value: '0',
        percentage: randomFromTo(5, 20).toString(),
        today: '0%',
        yesterday: '0%',
        trendLine: true, // No trend line shown in the image for CR
        showToday: true,
        calcByFormula: true,
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
      name: 'Canada',
      value: 0,
      percentage: '0%',
      color: '#b66d6d',
      coordinates: [-75.6972, 45.4215],
      code: 'CA',
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
  affiliates: [],
  currentTheme: THEME_PALETTES[0],
  dateRangeText: `${formatDate(today)} - ${formatDate(today)}`,
  customDateRange: periodMenu[6].date,
  periodMenuActive: 0,
  dayLeads: '40',
  dayFTDs: '0',
  metricsToday: {
    leads: '40',
    impressions: '0',
    clicks: '0',
    ctl: '0',
    ftds: '0',
    cr: '0',
  },
  metricsYersterday: {
    leads: '40',
    impressions: '0',
    clicks: '0',
    ctl: '0',
    ftds: '0',
    cr: '0',
  },
}
