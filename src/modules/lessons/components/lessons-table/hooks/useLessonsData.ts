import { useQuery } from '@tanstack/react-query'
import { ColumnProps, TablePaginationConfig } from 'antd/es/table'
import { FilterValue, SorterResult } from 'antd/es/table/interface'
import dayjs from 'dayjs'
import { createElement, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { getLessons } from '~/lib/api/services/lessons'
import { ILesson, QueryKeys } from '~/lib/api/types'
import { VisibleTag } from '~/lib/components'
import { SettingsBtn } from '~/lib/components/settings-btn'
import { useLessonsStore } from '~/modules/lessons/store'
import { EDrawerLessonKeys } from '~/modules/lessons/types'
import { useDrawerContext } from '~/shared/ui/drawer/hooks'
import { ITableParams } from '~/shared/ui/table/ui/table'
import { tableParamsToListRequestParams } from '~/shared/utils/table'

export const useLessonsData = () => {
  const { id } = useParams()
  const { t } = useTranslation()
  const { setLessonID } = useLessonsStore()
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
    data: lessons,
    isFetching,
    isLoading: isDataLoading,
  } = useQuery({
    queryKey: [
      QueryKeys.GET_LESSONS,
      tableParams.pagination?.current,
      tableParams.pagination?.total,
      tableParams.sortField,
      tableParams.sortOrder,
    ],
    queryFn: () =>
      getLessons({
        weekId: id || '',
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
    sorter: SorterResult<ILesson> | SorterResult<ILesson>[],
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
    setLessonID(id)
    openDrawer(EDrawerLessonKeys.LESSON_VIEW)
  }

  const columns: ColumnProps<ILesson>[] = [
    {
      title: '№',
      dataIndex: 'position',
      key: 'position',
      width: '5%',
      sorter: true,
      defaultSortOrder: 'ascend',
    },
    {
      title: t('TABLE.COLUMNS.LESSON_TITLE'),
      dataIndex: 'title',
      key: 'title',
      width: '50%',
      sorter: true,
    },
    {
      title: t('TABLE.COLUMNS.STATUS'),
      dataIndex: 'isVisible',
      key: 'isVisible',
      width: '20%',
      sorter: true,
      render: (isVisible) => createElement(VisibleTag, { isVisible }),
    },
    {
      title: t('TABLE.COLUMNS.POST_DATE'),
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: '20%',
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
    lessons: lessons?.result || [],
    total: lessons?.count || 0,
    columns,
    handleTableChange,
    isLoading: isDataLoading || isFetching,
    tableParams,
    setTableParams,
  }
}
