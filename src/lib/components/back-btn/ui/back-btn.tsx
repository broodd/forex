import classNames from 'classnames'
import { FC } from 'react'

import { Flex } from 'antd'
import { Link } from 'react-router-dom'
import { Button } from '~/shared/ui/button'
import { BackIcon } from '~/shared/ui/icon'
import { Title } from '~/shared/ui/title'

import cls from './back-btn.module.scss'

interface IBackBtnProps {
  className?: string
  to?: string | number
  title?: string | null
  custom?: React.ReactNode
}

export const BackBtn: FC<IBackBtnProps> = ({ className, to = -1, title, custom }) => {
  return (
    <>
      {custom ? (
        <>{custom}</>
      ) : (
        <Link to={to as string} className={classNames(cls.wrapper, [className])}>
          <Flex align='flex-end'>
            <Button type='link' icon={<BackIcon style={{ fontSize: 18 }} />} className={cls.btn} />
            <Title level={2} className={cls.title}>
              {title}
            </Title>
          </Flex>
        </Link>
      )}
    </>
  )
}
