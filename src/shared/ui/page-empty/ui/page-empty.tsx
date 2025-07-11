import classNames from 'classnames'
import { FC } from 'react'

import { useTranslation } from 'react-i18next'
import { Title } from '../../title'

import cls from './page-empty.module.scss'

interface IPageEmptyProps {
  className?: string
  text?: string
  render?: boolean
}

export const PageEmpty: FC<IPageEmptyProps> = ({ className, text, render = true }) => {
  const { t } = useTranslation()
  return (
    <>
      {render && (
        <div className={classNames(cls.wrapper, [className])}>
          <Title level={1} className={cls.title} type='secondary'>
            {text ? text : t('ACTIONS.NO_RESULT')}
          </Title>
        </div>
      )}
    </>
  )
}
