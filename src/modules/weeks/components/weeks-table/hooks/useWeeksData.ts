import { useQuery } from '@tanstack/react-query'
import { ColumnProps, TablePaginationConfig } from 'antd/es/table'
import { FilterValue, SorterResult } from 'antd/es/table/interface'
import dayjs from 'dayjs'
import { createElement, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { getWeeks } from '~/lib/api/services/weeks'
import { IWeek, QueryKeys } from '~/lib/api/types'
import { SchemaTypeTag, VisibleTag } from '~/lib/components'
import { SettingsBtn } from '~/lib/components/settings-btn'
import { useWeeksStore } from '~/modules/weeks/store'
import { EDrawerKeys } from '~/modules/weeks/types'
import { useDrawerContext } from '~/shared/ui/drawer/hooks'
import { ITableParams } from '~/shared/ui/table/ui/table'
import { tableParamsToListRequestParams } from '~/shared/utils/table'

export const useWeeksData = () => {
  const { id } = useParams()
  const { t } = useTranslation()
  const { setWeekID } = useWeeksStore()
  const { openDrawer } = useDrawerContext()
  const [tableParams, setTableParams] = useState<ITableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
    sortField: 'position',
    sortOrder: 'ascend',
  })

  const {
    data: weeks,
    isFetching,
    isLoading: isDataLoading,
  } = useQuery({
    queryKey: [
      QueryKeys.GET_WEEKS,
      tableParams.pagination?.current,
      tableParams.pagination?.total,
      tableParams.sortField,
      tableParams.sortOrder,
    ],
    queryFn: () =>
      getWeeks({
        courseId: id || '',
        page: tableParams.pagination?.current,
        take: tableParams.pagination?.pageSize,
        ...(tableParams.sortField &&
          tableParams.sortOrder &&
          tableParamsToListRequestParams(tableParams)),
      }),
    enabled: !!id,
  })

  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<IWeek> | SorterResult<IWeek>[],
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

  const onSettingsClick = (id: string) => {
    setWeekID(id)
    openDrawer(EDrawerKeys.WEEK_VIEW)
  }

  const columns: ColumnProps<IWeek>[] = [
    {
      title: '№',
      dataIndex: 'position',
      key: 'position',
      width: '5%',
      sorter: true,
      defaultSortOrder: 'ascend',
    },
    {
      title: t('TABLE.COLUMNS.WEEK_TITLE'),
      dataIndex: 'title',
      key: 'title',
      width: '45%',
      sorter: true,
    },
    {
      title: t('TABLE.COLUMNS.STATUS'),
      dataIndex: 'isVisible',
      key: 'isVisible',
      width: '15%',
      sorter: true,
      render: (isVisible) => createElement(VisibleTag, { isVisible }),
    },
    {
      title: t('TABLE.COLUMNS.TYPE'),
      dataIndex: 'type',
      key: 'type',
      width: '15%',
      sorter: true,
      render: (type) => createElement(SchemaTypeTag, { type }),
    },
    {
      title: t('TABLE.COLUMNS.POST_DATE'),
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: '15%',
      sorter: true,
      render: (createdAt) => dayjs(createdAt).format('MMM DD, YY'),
    },
    {
      title: t('TABLE.COLUMNS.SETTINGS'),
      dataIndex: 'settings',
      key: 'settings',
      width: '10%',
      align: 'center',
      render: (_, record) =>
        createElement(SettingsBtn, { onClick: () => onSettingsClick(record.id) }),
    },
  ]

  return {
    weeks: weeks?.result || [],
    total: weeks?.count || 0,
    columns,
    handleTableChange,
    isLoading: isDataLoading || isFetching,
    tableParams,
    setTableParams,
  }
}
