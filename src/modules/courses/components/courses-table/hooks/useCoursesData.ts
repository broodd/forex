import { useQuery } from '@tanstack/react-query'
import { ColumnProps, TablePaginationConfig } from 'antd/es/table'
import { FilterValue, SorterResult } from 'antd/es/table/interface'
import { createElement, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { getCourses } from '~/lib/api/services'
import { ICourse, QueryKeys } from '~/lib/api/types'
import { SchemaTypeTag, VisibleTag } from '~/lib/components'
import { SettingsBtn } from '~/lib/components/settings-btn'
import { useCoursesStore } from '~/modules/courses/store'
import { EDrawerKeys } from '~/modules/courses/types'
import { useDrawerContext } from '~/shared/ui/drawer/hooks'
import { ITableParams } from '~/shared/ui/table/ui/table'
import { tableParamsToListRequestParams } from '~/shared/utils/table'

export const useCoursesData = () => {
  const { t } = useTranslation()
  const { setCourseID } = useCoursesStore()
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
    data: courses,
    isFetching,
    isLoading: isDataLoading,
  } = useQuery({
    queryKey: [
      QueryKeys.GET_COURSES,
      tableParams.pagination?.current,
      tableParams.pagination?.total,
      tableParams.sortField,
      tableParams.sortOrder,
    ],
    queryFn: () =>
      getCourses({
        page: tableParams.pagination?.current,
        take: tableParams.pagination?.pageSize,
        ...(tableParams.sortField &&
          tableParams.sortOrder &&
          tableParamsToListRequestParams(tableParams)),
      }),
  })

  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<ICourse> | SorterResult<ICourse>[],
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
    setCourseID(id)
    openDrawer(EDrawerKeys.COURSE_VIEW)
  }

  const columns: ColumnProps<ICourse>[] = [
    {
      title: '№',
      dataIndex: 'position',
      key: 'position',
      width: '5%',
      sorter: true,
      defaultSortOrder: 'ascend',
    },
    {
      title: t('TABLE.COLUMNS.COURSE_NAME'),
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
      title: t('TABLE.COLUMNS.SUBSCRIBERS'),
      dataIndex: '__subscribers_count',
      key: '__subscribers_count',
      width: '15%',
      sorter: true,
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
    courses: courses?.result || [],
    total: courses?.count || 0,
    columns,
    handleTableChange,
    isLoading: isDataLoading || isFetching,
    tableParams,
    setTableParams,
  }
}
