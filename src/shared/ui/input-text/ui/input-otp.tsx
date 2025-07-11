import type { GetProps } from 'antd'
import { Input as AntdInput } from 'antd'
import classNames from 'classnames'
import { FC } from 'react'

type OTPProps = GetProps<typeof AntdInput.OTP>

import cls from './input-otp.module.scss'

interface IInputOTPProps extends OTPProps {
  className?: string
}

export const InputOTP: FC<IInputOTPProps> = ({ className, ...props }) => {
  return <AntdInput.OTP className={classNames(cls.wrapper, [className])} {...props} />
}
