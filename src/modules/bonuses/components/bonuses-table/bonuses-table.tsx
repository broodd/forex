import classNames from 'classnames'
import { FC, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { ILesson } from '~/lib/api/types'
import { PageEmpty } from '~/shared/ui/page-empty'
import { Table } from '~/shared/ui/table'
import { useLessonsData } from './hooks'
import cls from './bonuses-table.module.scss'

interface IBonusesTableProps {
  className?: string
}

export const BonusesTable: FC<IBonusesTableProps> = ({ className }) => {
  const { t } = useTranslation()
  const { columns, handleTableChange, isLoading, setTableParams, tableParams, total, lessons } =
    useLessonsData()

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-expect-error
    if (!isLoading && lessons.length === 0 && tableParams?.pagination?.current > 1) {
      setTableParams((prev) => ({
        ...prev,
        pagination: {
          ...prev.pagination,
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-expect-error
          current: prev.pagination?.current - 1,
        },
      }))
    }
  }, [lessons, isLoading, setTableParams, tableParams?.pagination])

  return (
    <>
      {lessons.length > 0 ? (
        <Table<ILesson>
          type='lessons'
          className={classNames(cls.wrapper, [className])}
          dataSource={lessons}
          columns={columns}
          pagination={{ ...tableParams.pagination, total: total }}
          loading={isLoading}
          onChange={handleTableChange}
          scroll={{ y: 'calc(100vh - 183px)' }}
        />
      ) : (
        <PageEmpty text={t('PAGES.BONUSES.EMPTY')} render={!isLoading} />
      )}
    </>
  )
}
