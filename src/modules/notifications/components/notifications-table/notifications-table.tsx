import classNames from 'classnames'
import { Dispatch, FC, SetStateAction, useEffect } from 'react'

import { ColumnProps, TablePaginationConfig } from 'antd/es/table'
import { FilterValue, SorterResult } from 'antd/es/table/interface'
import { useTranslation } from 'react-i18next'
import { INotification } from '~/lib/api/types'
import { PageEmpty } from '~/shared/ui/page-empty'
import { Table } from '~/shared/ui/table'
import { ITableParams } from '~/shared/ui/table/ui/table'
import cls from './notifications-table.module.scss'

interface INotificationsTableProps {
  className?: string
  notifications: INotification[]
  columns: ColumnProps<INotification>[]
  total: number
  tableParams: ITableParams
  setTableParams: Dispatch<SetStateAction<ITableParams>>
  handleTableChange: (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<INotification> | SorterResult<INotification>[],
  ) => void
  isLoading: boolean
}

export const NotificationsTable: FC<INotificationsTableProps> = ({
  className,
  notifications,
  columns,
  total,
  tableParams,
  setTableParams,
  handleTableChange,
  isLoading,
}) => {
  const { t } = useTranslation()

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-expect-error
    if (!isLoading && notifications.length === 0 && tableParams?.pagination?.current > 1) {
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
  }, [notifications, isLoading, setTableParams, tableParams?.pagination])

  return (
    <>
      {notifications.length > 0 ? (
        <Table<INotification>
          className={classNames(cls.wrapper, [className])}
          dataSource={notifications}
          columns={columns}
          pagination={{ ...tableParams.pagination, total: total }}
          loading={isLoading}
          onChange={handleTableChange}
          scroll={{ y: 'calc(100vh - 183px)' }}
        />
      ) : (
        <PageEmpty text={t('PAGES.NOTIFICATIONS.EMPTY')} render={!isLoading} />
      )}
    </>
  )
}
