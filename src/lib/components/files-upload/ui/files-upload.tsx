/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from '@tanstack/react-query'
import { FormInstance, UploadFile } from 'antd'
import { RcFile } from 'antd/es/upload'
import classNames from 'classnames'
import { FC, useState } from 'react'
import { uploadFile } from '~/lib/api/services'
import { IFile } from '~/lib/api/types'
import { acceptedFormats } from '~/lib/constants/file-formats'
import { DragAndDropUploader } from '~/shared/ui/drag-ang-drop-uploader'
import { DeleteIcon } from '~/shared/ui/icon'
import { ETextSizes, Text } from '~/shared/ui/text'
import { beforeUpload, formatFileSize } from '~/shared/utils/upload'
import cls from './files-upload.module.scss'
import { useUploadStore } from '~/lib/store/uploadStore'

interface IFilesUploadProps {
  className?: string
  label?: string
  multiple?: boolean
  formats?: string
  description?: string
  initialFiles?: IFile[]
  name?: (string | number)[]
  form: FormInstance<any>
}

export const FilesUpload: FC<IFilesUploadProps> = ({
  className,
  label,
  description,
  formats,
  multiple = false,
  initialFiles,
  name,
  form,
}) => {
  const { setIsUploadLoading, resetUploadLoadingProgress } = useUploadStore()
  const [errorMessage, setErrorMessage] = useState<string>()
  const [fileList, setFileList] = useState<UploadFile[]>(
    initialFiles
      ? initialFiles.map((file) => ({
          uid: file.id,
          name: file.filename,
          status: 'done',
          url: file.src,
          size: Number(file.fileSize),
          type: file.mimetype,
        }))
      : [],
  )

  const uploadFileMutation = useMutation({
    mutationFn: uploadFile,
    onMutate: () => {
      setIsUploadLoading(true)
    },
    onError: () => {
      resetUploadLoadingProgress()
    },
    onSuccess: () => {
      resetUploadLoadingProgress()
    },
  })

  const handleRemove = async (file: UploadFile) => {
    setFileList((prev) => prev.filter((item) => item.uid !== file.uid))

    if (multiple) {
      const prev: IFile[] | File[] | null = await form.getFieldValue(name)
      form.setFieldValue(
        name,
        prev
          ? prev.filter((f) =>
              typeof f === 'string'
                ? f !== file.url
                : f instanceof File
                  ? (f as File).name !== file.name
                  : f.id !== file.uid,
            )
          : [],
      )
    } else {
      form.setFieldValue(name, null)
    }
  }

  const classes = classNames({
    [cls.dragger]: true,
    [cls.invalid]: !!errorMessage,
    [className as string]: !!className,
  })

  return (
    <div className={classNames(cls.wrapper, [className])}>
      {label && (
        <Text size={ETextSizes.SFS} className={cls.label}>
          {label}
        </Text>
      )}
      <DragAndDropUploader
        onRemove={handleRemove}
        fileList={fileList}
        className={classes}
        listType='picture'
        description={description}
        accept={formats ? formats : acceptedFormats}
        multiple={multiple}
        maxCount={multiple ? undefined : 1}
        beforeUpload={(file) => beforeUpload(file, setErrorMessage)}
        showUploadList={{
          removeIcon: <DeleteIcon style={{ fontSize: 24 }} />,
          extra: (file) => (
            <>
              {file.originFileObj?.size && (
                <Text size={ETextSizes.PSR} type='secondary'>
                  {formatFileSize(file.originFileObj.size)}
                </Text>
              )}
            </>
          ),
        }}
        customRequest={({ file, onSuccess, onError }) => {
          const fileObj = file as RcFile

          const uploadingFile: UploadFile = {
            uid: fileObj.uid,
            name: fileObj.name,
            status: 'uploading',
            percent: 0,
            originFileObj: fileObj,
          }
          setFileList((prev) => [...prev, uploadingFile])

          let progress = 0
          const interval = setInterval(() => {
            progress += Math.floor(Math.random() * 2) + 1
            setFileList((prev) =>
              prev.map((f) =>
                f.uid === fileObj.uid ? { ...f, percent: Math.min(progress, 90) } : f,
              ),
            )
            if (progress >= 90) clearInterval(interval)
          }, 2000)

          try {
            const formData = new FormData()
            formData.append('file', file)
            uploadFileMutation
              .mutateAsync(formData)
              .then((response) => {
                clearInterval(interval)
                setFileList((prev) =>
                  prev.map((f) =>
                    f.uid === fileObj.uid
                      ? { ...f, status: 'done', percent: 100, url: response.src }
                      : f,
                  ),
                )

                if (!multiple) {
                  form.setFieldValue(name, response)
                } else {
                  const prev = form.getFieldValue(name)
                  form.setFieldValue(name, [...(prev ? [prev] : []), response])
                }
              })
              .catch((error) => {
                clearInterval(interval)
                console.error('Uploading:', error)

                setFileList((prev) =>
                  prev.map((f) =>
                    f.uid === fileObj.uid ? { ...f, percent: 0, status: 'error' } : f,
                  ),
                )

                onError?.(error)
              })

            // const fileObj = file as RcFile

            // const newFile: UploadFile = {
            //   uid: fileObj.uid,
            //   name: fileObj.name,
            //   status: 'done',
            //   originFileObj: fileObj,
            // }

            // if (multiple) {
            //   setFileList((prev) => [...prev, newFile])
            // } else {
            //   setFileList(() => [newFile])
            // }

            onSuccess?.('OK')
          } catch (error) {
            console.error('Error uploading file:', error)
          }
        }}
      />

      {errorMessage && (
        <Text size={ETextSizes.SFS} type='danger' className={cls.error}>
          {errorMessage}
        </Text>
      )}
    </div>
  )
}
