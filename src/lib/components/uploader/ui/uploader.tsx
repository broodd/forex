import { RcFile, UploadFile } from 'antd/es/upload'
import classNames from 'classnames'
import { Dispatch, FC, SetStateAction, useState } from 'react'
import { IFile } from '~/lib/api/types'
import { acceptedFormats } from '~/lib/constants/file-formats'
import { DragAndDropUploader } from '~/shared/ui/drag-ang-drop-uploader'
import { DeleteIcon } from '~/shared/ui/icon'
import { ETextSizes, Text } from '~/shared/ui/text'
import { beforeUpload, formatFileSize } from '~/shared/utils/upload'
import cls from './uploader.module.scss'

interface IUploaderProps {
  className?: string
  label?: string
  setImage?: Dispatch<SetStateAction<File | null>>
  multiple?: boolean
  formats?: string
  setImages?: Dispatch<SetStateAction<(File | IFile)[]>>
  description?: string
  initialFiles?: IFile[]
}

export const Uploader: FC<IUploaderProps> = ({
  className,
  label,
  setImage,
  multiple = false,
  formats,
  setImages,
  description,
  initialFiles,
}) => {
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

  const handleRemove = (file: UploadFile) => {
    setFileList((prev) => prev.filter((item) => item.uid !== file.uid))

    if (multiple) {
      setImages?.((prev) =>
        prev.filter((f) =>
          typeof f === 'string'
            ? f !== file.url
            : f instanceof File
              ? (f as File).name !== file.name
              : f.id !== file.uid,
        ),
      )
    } else {
      setImage?.(null)
    }
  }

  const classes = classNames({
    [cls.dragger]: true,
    [cls.invalid]: !!errorMessage,
    [className as string]: !!className,
  })

  return (
    <div className={cls.wrapper}>
      {label && (
        <Text size={ETextSizes.SFS} className={cls.label}>
          {label}
        </Text>
      )}
      <DragAndDropUploader
        onRemove={handleRemove}
        fileList={fileList}
        listType='picture'
        description={description}
        accept={formats ? formats : acceptedFormats}
        multiple={multiple}
        maxCount={multiple ? undefined : 1}
        beforeUpload={(file) => beforeUpload(file, setErrorMessage)}
        className={classes}
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
        customRequest={({ onSuccess, file }) => {
          try {
            const fileObj = file as RcFile

            const newFile: UploadFile = {
              uid: fileObj.uid,
              name: fileObj.name,
              status: 'done',
              originFileObj: fileObj,
            }

            if (multiple) {
              setFileList((prev) => [...prev, newFile])
              setImages?.((prev) => [...(prev || []), file as File])
            } else {
              setFileList(() => [newFile])
              setImage?.(file as File)
            }

            onSuccess?.('OK')
          } catch (error) {
            console.error('File upload error:', error)
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
