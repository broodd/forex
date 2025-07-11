import { useMutation } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { resetPasswordSendEmail } from '~/lib/api/services'
import { useTimer } from '~/shared/hooks/useTimer'
import { message } from '~/shared/utils/antd-static-functions'
import storage, { RESEND_TIME_KEY } from '~/shared/utils/storage'
import { getResendTime } from '~/shared/utils/time'

export const useResetPassword = () => {
  const { t } = useTranslation()
  const [resendDate, setResendDate] = useState<string | null>(
    storage.getFromStorage(RESEND_TIME_KEY),
  )
  const [resendTime, setResendTime] = useTimer({
    startTime: getResendTime(resendDate!),
  })

  const resetPassMutation = useMutation({
    mutationFn: resetPasswordSendEmail,
    onSuccess: async () => {
      const time = dayjs().toString()
      setResendDate(time)
      message.success(t('NOTIFICATION.EMAIL_WAS_SENT'))
    },
  })

  useEffect(() => {
    if (!resendDate) {
      return
    }
    storage.setToStorage(RESEND_TIME_KEY, resendDate)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-expect-error
    setResendTime(getResendTime(resendDate))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resendDate])

  const onFinish = async ({ email }: { email: string }) => resetPassMutation.mutate(email)

  return {
    onFinish,
    isLoading: resetPassMutation.isPending,
    cantResend: resendTime !== 0,
    resendTime,
  }
}
