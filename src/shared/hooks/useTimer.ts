import { useEffect, useState } from 'react'

const getDefaultTime = (start: number, end: number, direction: 'up' | 'down') => {
  const suppliedProps = typeof start !== 'undefined' && typeof end !== 'undefined'
  switch (direction) {
    case 'down':
      if (suppliedProps && start >= end) {
        return [start, end]
      } else if (suppliedProps && start < end) {
        return [start, start]
      }
      return [start || 60, end || 0]
    default:
      if (suppliedProps && start <= end) {
        return [start, end]
      } else if (suppliedProps && start > end) {
        return [start, start]
      }
      return [start || 0, end || 60]
  }
}

const handleTime = (
  time: number,
  direction: 'up' | 'down',
  start: number,
  end: number,
  multiplier: number,
) => {
  const reverseCase = direction === 'down'
  if (reverseCase) {
    multiplier =
      end + ((start - end) % multiplier) === time ? (start - end) % multiplier : multiplier
    return time - multiplier
  }
  multiplier = end - ((end - start) % multiplier) === time ? (end - start) % multiplier : multiplier
  return time + multiplier
}

interface IUseTimer {
  startTime: number
  endTime?: number
  direction?: 'up' | 'down'
  multiplier?: number
  timeOut?: number
}

export const useTimer = ({
  startTime,
  endTime = 0,
  direction = 'down',
  multiplier = 1,
  timeOut = 1000,
}: IUseTimer) => {
  const [start, end] = getDefaultTime(startTime, endTime, direction)
  const [time, setTime] = useState(start)
  const [ticker, setTicker] = useState<number | null>(null)

  useEffect(() => {
    if (!ticker) {
      setTicker(
        setInterval(() => {
          setTime((oldTime) => handleTime(oldTime, direction, start, end, multiplier))
        }, timeOut),
      )
    } else if (time === end) {
      clearInterval(ticker)
      setTicker(null)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [time])

  return [time, setTime]
}
