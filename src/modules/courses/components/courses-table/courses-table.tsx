import classNames from 'classnames'
import { FC, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { ECourseType, ICourse } from '~/lib/api/types'
import { PageEmpty } from '~/shared/ui/page-empty'
import { Table } from '~/shared/ui/table'
import cls from './courses-table.module.scss'
import { useCoursesData } from './hooks'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '~/lib/constants/routes'

interface ICoursesTableProps {
  className?: string
}

export const CoursesTable: FC<ICoursesTableProps> = ({ className }) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { columns, courses, handleTableChange, isLoading, total, tableParams, setTableParams } =
    useCoursesData()

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-expect-error
    if (!isLoading && courses.length === 0 && tableParams?.pagination?.current > 1) {
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
  }, [courses, isLoading, setTableParams, tableParams?.pagination])

  return (
    <>
      {courses.length > 0 ? (
        <Table<ICourse>
          className={classNames(cls.wrapper, [className])}
          dataSource={courses}
          columns={columns}
          pagination={{ ...tableParams.pagination, total: total }}
          loading={isLoading}
          onChange={handleTableChange}
          scroll={{ y: 'calc(100vh - 183px)' }}
          onRow={(data) => {
            return {
              onClick: () => {
                return data.type === ECourseType.COURSE
                  ? navigate(ROUTES.WEEKS.getPath(data.id, data.title))
                  : navigate(ROUTES.DAYS.getPath(data.id, data.title))
              },
            }
          }}
        />
      ) : (
        <PageEmpty text={t('PAGES.COURSES.EMPTY')} render={!isLoading} />
      )}
    </>
  )
}
