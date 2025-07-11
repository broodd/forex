import classNames from 'classnames'
import { FC, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { IRecipe } from '~/lib/api/types'
import { PageEmpty } from '~/shared/ui/page-empty'
import { Table } from '~/shared/ui/table'
import cls from './recipes-table.module.scss'
import { useRecipesData } from './hooks'

interface IRecipesTableProps {
  className?: string
}

export const RecipesTable: FC<IRecipesTableProps> = ({ className }) => {
  const { t } = useTranslation()

  const { columns, recipes, handleTableChange, isLoading, setTableParams, tableParams, total } =
    useRecipesData()

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-expect-error
    if (!isLoading && recipes?.length === 0 && tableParams?.pagination?.current > 1) {
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
  }, [recipes, isLoading, setTableParams, tableParams?.pagination])

  return (
    <>
      {recipes.length > 0 ? (
        <Table<IRecipe>
          draggable={false}
          className={classNames(cls.wrapper, [className])}
          dataSource={recipes}
          columns={columns}
          pagination={{ ...tableParams.pagination, total: total }}
          loading={isLoading}
          onChange={handleTableChange}
          scroll={{ y: 'calc(100vh - 183px)' }}
        />
      ) : (
        <PageEmpty text={t('PAGES.RECIPES.EMPTY')} render={!isLoading} />
      )}
    </>
  )
}
