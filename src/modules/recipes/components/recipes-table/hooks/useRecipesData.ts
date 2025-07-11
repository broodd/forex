import { useQuery } from '@tanstack/react-query'
import { ColumnProps, TablePaginationConfig } from 'antd/es/table'
import { FilterValue, SorterResult } from 'antd/es/table/interface'
import dayjs from 'dayjs'
import { createElement, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { getRecipes } from '~/lib/api/services'
import { IRecipe, QueryKeys } from '~/lib/api/types'
import { VisibleTag } from '~/lib/components'
import { SettingsBtn } from '~/lib/components/settings-btn'
import { useRecipesStore } from '~/modules/recipes/store'
import { EDrawerRecipesKeys } from '~/modules/recipes/types'
import { useDrawerContext } from '~/shared/ui/drawer/hooks'
import { ITableParams } from '~/shared/ui/table/ui/table'
import { tableParamsToListRequestParams } from '~/shared/utils/table'

export const useRecipesData = () => {
  const { t } = useTranslation()
  const { setRecipeID } = useRecipesStore()
  const { openDrawer } = useDrawerContext()
  const [tableParams, setTableParams] = useState<ITableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
    sortField: 'createdAt',
    sortOrder: 'descend',
  })

  const {
    data: recipes,
    isFetching,
    isLoading: isDataLoading,
  } = useQuery({
    queryKey: [
      QueryKeys.GET_RECIPES,
      tableParams.pagination?.current,
      tableParams.pagination?.total,
      tableParams.sortField,
      tableParams.sortOrder,
    ],
    queryFn: () =>
      getRecipes({
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
    sorter: SorterResult<IRecipe> | SorterResult<IRecipe>[],
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
    setRecipeID(id)
    openDrawer(EDrawerRecipesKeys.RECIPE_VIEW)
  }

  const columns: ColumnProps<IRecipe>[] = [
    {
      title: t('TABLE.COLUMNS.ID'),
      dataIndex: 'id',
      key: 'id',
      width: '11%',
    },
    {
      title: t('TABLE.COLUMNS.TITLE'),
      dataIndex: 'title',
      key: 'title',
      width: '30%',
      sorter: true,
    },
    {
      title: t('TABLE.COLUMNS.STATUS'),
      dataIndex: 'isVisible',
      key: 'isVisible',
      width: '8%',
      sorter: true,
      render: (isVisible) => createElement(VisibleTag, { isVisible }),
    },
    {
      title: t('TABLE.COLUMNS.CATEGORY'),
      dataIndex: 'categories',
      key: 'categories',
      width: '17.5%',
      sorter: true,
      render: (categories) => categories && categories.join(', '),
    },
    {
      title: t('TABLE.COLUMNS.DATE'),
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: '7%',
      sorter: true,
      render: (createdAt) => dayjs(createdAt).format('MMM DD, YY'),
      align: 'center',
    },

    {
      title: t('TABLE.COLUMNS.VIEWS'),
      dataIndex: 'viewsCount',
      key: 'viewsCount',
      width: '7%',
      sorter: true,
      align: 'center',
    },
    {
      title: t('TABLE.COLUMNS.SETTINGS'),
      dataIndex: 'settings',
      key: 'settings',
      width: '7%',
      align: 'center',
      render: (_, record) =>
        createElement(SettingsBtn, { onClick: () => onSettingsClick(record.id) }),
    },
  ]

  return {
    recipes: recipes?.result || [],
    total: recipes?.count || 0,
    columns,
    handleTableChange,
    isLoading: isDataLoading || isFetching,
    tableParams,
    setTableParams,
  }
}
