import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { TablePaginationConfig } from 'antd'
import { ColumnProps } from 'antd/es/table'
import { FilterValue, SorterResult } from 'antd/es/table/interface'
import dayjs from 'dayjs'
import { createElement, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { deleteNotification, getNotifications } from '~/lib/api/services'
import { INotification, QueryKeys } from '~/lib/api/types'
import { ITableParams } from '~/shared/ui/table/ui/table'
import { message } from '~/shared/utils/antd-static-functions'
import { tableParamsToListRequestParams } from '~/shared/utils/table'
import { Actions } from '../components/notifications-table/views'

export const useNotificationData = () => {
  const queryClient = useQueryClient()
  const { t } = useTranslation()
  const [tableParams, setTableParams] = useState<ITableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  })

  const {
    data: notifications,
    isFetching,
    isLoading: isDataLoading,
  } = useQuery({
    queryKey: [
      QueryKeys.GET_NOTIFICATIONS,
      tableParams.pagination?.current,
      tableParams.pagination?.total,
      tableParams.sortField,
      tableParams.sortOrder,
    ],
    queryFn: () =>
      getNotifications({
        page: tableParams.pagination?.current,
        take: tableParams.pagination?.pageSize,
        ...(tableParams.sortField &&
          tableParams.sortOrder &&
          tableParamsToListRequestParams(tableParams)),
      }),
  })

  const deleteNotificationMutation = useMutation({
    mutationFn: deleteNotification,
    onSuccess: async () => {
      message.success(t('NOTIFICATION.NOTIFICATION_DELETED'))
      queryClient.invalidateQueries({ queryKey: [QueryKeys.GET_NOTIFICATIONS] })
    },
  })

  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<INotification> | SorterResult<INotification>[],
  ) => {
    const sortOrder = Array.isArray(sorter) ? sorter[0].order : sorter.order
    const sortField = Array.isArray(sorter) ? sorter[0].field : sorter.field
    setTableParams({
      pagination,
      filters,
      sortField: sortField as string,
      sortOrder,
    })
  }

  const columns: ColumnProps<INotification>[] = [
    {
      title: t('TABLE.COLUMNS.ID'),
      dataIndex: 'id',
      key: 'id',
      width: '10%',
    },
    {
      title: t('TABLE.COLUMNS.TITLE'),
      dataIndex: 'title',
      key: 'title',
      width: '25%',
    },
    {
      title: t('TABLE.COLUMNS.TEXT'),
      dataIndex: 'body',
      key: 'body',
      width: '25%',
    },
    {
      title: t('TABLE.COLUMNS.DATE'),
      dataIndex: 'startDate',
      key: 'startDate',
      width: '20%',
      sorter: true,
      render: (startDate, { endDate }) => (
        <>
          {`${startDate ? dayjs(startDate).format('MMM DD, YYYY') : ''}${endDate ? ' - ' + dayjs(endDate).format('MMM DD, YYYY') : ''}`}
        </>
      ),
    },
    {
      title: t('TABLE.COLUMNS.SETTINGS'),
      dataIndex: 'settings',
      key: 'settings',
      width: '5%',
      align: 'center',
      render: (_, record) => {
        const onDelete = () => {
          deleteNotificationMutation.mutate(record.id)
        }
        return createElement(Actions, { onDelete: onDelete })
      },
    },
  ]

  return {
    notifications: notifications?.result || [],
    total: notifications?.count || 0,
    isLoading: isDataLoading || isFetching,
    handleTableChange,
    columns,
    tableParams,
    setTableParams,
  }
}
