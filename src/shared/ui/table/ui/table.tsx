import { DndContext } from '@dnd-kit/core'
import { restrictToVerticalAxis } from '@dnd-kit/modifiers'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { Table as AntdTable, TablePaginationConfig, TableProps } from 'antd'
import { FilterValue } from 'antd/es/table/interface'
import classNames from 'classnames'
import { ArrowDownIcon } from '../../icon'
import { ETextSizes, Text } from '../../text'
import { useDrag } from '../hooks'
import { DraggableRow } from './draggable-row'
import cls from './table.module.scss'

interface ITableProps<T> extends TableProps<T> {
  className?: string
  type?: 'courses' | 'weeks' | 'lessons'
  draggable?: boolean
}
export interface ITableParams {
  pagination?: TablePaginationConfig
  sortField?: string
  sortOrder?: 'ascend' | 'descend' | null
  filters?: Record<string, FilterValue | null>
}

export const Table = <T extends { id: string; position?: number }>({
  className,
  pagination,
  dataSource = [],
  type = 'courses',
  draggable = true,
  ...props
}: ITableProps<T>) => {
  const { onDragEnd, sensors } = useDrag<T>(dataSource, type)

  const table = (
    <AntdTable<T>
      rowKey='id'
      dataSource={dataSource}
      components={
        draggable
          ? {
              body: { row: DraggableRow },
            }
          : undefined
      }
      className={classNames(cls.wrapper, [className])}
      {...props}
      pagination={{
        size: 'default',
        position: ['bottomLeft'],
        hideOnSinglePage: true,
        showSizeChanger: {
          className: cls.showSizer,
          variant: 'filled',
          showSearch: false,
          suffixIcon: (
            <>
              <ArrowDownIcon style={{ fontSize: 24 }} />
              <Text size={ETextSizes.PSR} type='secondary'>
                on a page
              </Text>
            </>
          ),
          options: [
            { label: '10', value: 10 },
            { label: '20', value: 20 },
            { label: '50', value: 50 },
            { label: '100', value: 100 },
          ],
          prefix: (
            <Text size={ETextSizes.PSR} type='secondary'>
              Show:
            </Text>
          ),
        },
        showLessItems: false,
        ...pagination,
      }}
    />
  )

  return draggable ? (
    <DndContext sensors={sensors} modifiers={[restrictToVerticalAxis]} onDragEnd={onDragEnd}>
      <SortableContext items={dataSource.map((i) => i.id)} strategy={verticalListSortingStrategy}>
        {table}
      </SortableContext>
    </DndContext>
  ) : (
    table
  )
}
