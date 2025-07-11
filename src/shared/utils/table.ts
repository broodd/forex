import { IListRequestParams } from '~/lib/api/types'
import { ITableParams } from '../ui/table/ui/table'

export const tableParamsToListRequestParams = (tableParams: ITableParams): IListRequestParams => {
  const defaultSortParams: IListRequestParams = { desc: 'createdAt' }

  const { sortField, sortOrder } = tableParams
  const sorterValue = Array.isArray(sortField) ? sortField.join('.') : sortField

  if (sorterValue && sortOrder) {
    const listRequestParams: IListRequestParams = {
      ...(sortOrder === 'ascend' ? { asc: sorterValue } : { desc: sorterValue }),
    }

    return listRequestParams
  }

  return defaultSortParams
}
