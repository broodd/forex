import dayjs from 'dayjs'

export const getResendTime = (resendDate: string): number => {
  const startTime = dayjs(resendDate).add(120, 'second')
  const endTime = dayjs()
  return startTime.diff(endTime, 'second') > 0 ? startTime.diff(endTime, 'second') : 0
}
