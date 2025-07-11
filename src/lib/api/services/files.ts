import { IFile } from '../types'
import { queryBuilder } from './base-api-query'

export const uploadFile = async (file: FormData): Promise<IFile> => {
  const loader = queryBuilder.enableAuth().enableErrorHandler().build()
  const response = await loader.post('files', file, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return response.data
}

export const deleteFile = async (id: string): Promise<IFile> => {
  const loader = queryBuilder.enableAuth().enableErrorHandler().build()
  const response = await loader.delete(`files/${id}`)
  return response.data
}

export const getFile = async (id: string): Promise<IFile> => {
  const loader = queryBuilder.enableAuth().enableErrorHandler().build()
  const response = await loader.get(`files/${id}`)
  return response.data
}
