import { RcFile } from 'antd/es/upload'
import { Dispatch, SetStateAction } from 'react'
import { IFile } from '~/lib/api/types'

const STORE_MIME_TYPE = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'application/pdf',
  'video/mp4',
  'video/webm',
]

// export const MAX_SIZE = 104857600

export const beforeUpload = (
  file: RcFile,
  setErrorMessage: Dispatch<SetStateAction<string | undefined>>,
) => {
  const isAllowedType = STORE_MIME_TYPE.includes(file.type)

  if (!isAllowedType) {
    setErrorMessage(() => 'You can only upload JPEG, JPG, PNG, PDF, MP4 and WEBM files')
    return false
  }
  // const isWithinMaxSize = file.size <= MAX_SIZE

  // if (!isWithinMaxSize) {
  //   setErrorMessage(() => `File size should not exceed ${MAX_SIZE / 1024 / 1024}MB`)
  //   return false
  // }

  setErrorMessage(() => undefined)
  return true
}

export const getBase64 = (files: RcFile[], callback: (previews: string[]) => void) => {
  const readers = files.map((file) => {
    return new Promise<string>((resolve) => {
      const reader = new FileReader()
      reader.onload = () => resolve(reader.result as string)
      reader.readAsDataURL(file)
    })
  })

  Promise.all(readers).then(callback)
}

export const formatFileSize = (bytes: number) => {
  if (bytes === 0) return '0 Bytes'

  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(1024))

  const size = bytes / Math.pow(1024, i)
  return `${size.toFixed(2)} ${sizes[i]}`
}

export const createFileFromSrc = async (image: IFile) => {
  const res = await fetch(image.src)
  const blob = await res.blob()
  const file = new File([blob], image.filename, { type: image.mimetype })
  return file
}
