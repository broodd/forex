import dayjs, { Dayjs } from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import quarterOfYear from 'dayjs/plugin/quarterOfYear'

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(quarterOfYear)

export { dayjs, Dayjs, utc, timezone, quarterOfYear }
