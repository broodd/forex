import classNames from 'classnames'
import { FC, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { EWeekType, IWeek } from '~/lib/api/types'
import { PageEmpty } from '~/shared/ui/page-empty'
import { Table } from '~/shared/ui/table'
import { useWeeksData } from './hooks'
import cls from './weeks-table.module.scss'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '~/lib/constants/routes'

interface IWeeksTableProps {
  className?: string
}

export const WeeksTable: FC<IWeeksTableProps> = ({ className }) => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { columns, handleTableChange, isLoading, setTableParams, tableParams, total, weeks } =
    useWeeksData()

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-expect-error
    if (!isLoading && weeks.length === 0 && tableParams?.pagination?.current > 1) {
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
  }, [weeks, isLoading, setTableParams, tableParams?.pagination])

  return (
    <>
      {weeks.length > 0 ? (
        <Table<IWeek>
          type='weeks'
          className={classNames(cls.wrapper, [className])}
          dataSource={weeks}
          columns={columns}
          pagination={{ ...tableParams.pagination, total: total }}
          loading={isLoading}
          onChange={handleTableChange}
          scroll={{ y: 'calc(100vh - 183px)' }}
          onRow={(data) => {
            return {
              onClick: () => {
                return data.type === EWeekType.WEEK
                  ? navigate(ROUTES.LESSONS.getPath(data.id, data.title, data.courseId))
                  : navigate(ROUTES.BONUSES.getPath(data.id, data.title, data.courseId))
              },
            }
          }}
        />
      ) : (
        <PageEmpty text={t('PAGES.WEEKS.EMPTY')} render={!isLoading} />
      )}
    </>
  )
}
