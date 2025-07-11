import { Divider, Flex, Form } from 'antd'
import classNames from 'classnames'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { ESelectionType, ISection } from '~/lib/api/types'
import { FilesUpload } from '~/lib/components/files-upload'
import { Button } from '~/shared/ui/button'
import { AddIcon, DeleteIcon } from '~/shared/ui/icon'
import { InputText } from '~/shared/ui/input-text'
import cls from './section-list.module.scss'
import { acceptedFormatOnlyImages } from '~/lib/constants/file-formats'
import { TextArea } from '~/shared/ui/textarea'

interface ISectionListProps {
  className?: string
  sections: ISection[] | undefined
}

export const SectionList: FC<ISectionListProps> = ({ className, sections }) => {
  const { t } = useTranslation()

  return (
    <Form.List
      name='sections'
      initialValue={
        sections
          ? sections.map((item) => {
              if (item.type === ESelectionType.TITLE) {
                return { type: item.type, title: item.text }
              }
              if (item.type === ESelectionType.TEXT) {
                return { type: item.type, text: item.text }
              }
              if (item.type === ESelectionType.FILE) {
                return { type: item.type, file: item.file, filePlaceholder: item.filePlaceholder }
              }
            })
          : undefined
      }
    >
      {(fields, { add, remove }) => {
        const onAdd = (type: ESelectionType) => {
          add({ type })
        }
        return (
          <div className={classNames(cls.wrapper, [className])}>
            {fields.map(({ key, name }) => {
              return (
                <div key={key}>
                  <Divider>
                    <Button
                      onClick={() => {
                        remove(name)
                      }}
                      icon={<DeleteIcon style={{ fontSize: 24 }} />}
                      type='link'
                      danger
                    />
                  </Divider>

                  <Flex vertical>
                    <Form.Item shouldUpdate noStyle>
                      {(form) => {
                        const type = form.getFieldValue(['sections', name, 'type'])
                        const initialFile = form.getFieldValue(['sections', name, 'file'])
                        const initialFilePlaceholder = form.getFieldValue([
                          'sections',
                          name,
                          'filePlaceholder',
                        ])

                        return (
                          <>
                            {type === ESelectionType.TITLE && (
                              <>
                                <Form.Item name={[name, 'type']} hidden initialValue={type}>
                                  <InputText hidden value={type} />
                                </Form.Item>
                                <Form.Item
                                  name={[name, 'title']}
                                  rules={[{ required: true }, { min: 3 }, { max: 128 }]}
                                  label={t(`FORM.TITLE.LABEL`)}
                                >
                                  <InputText />
                                </Form.Item>
                              </>
                            )}

                            {type === ESelectionType.TEXT && (
                              <>
                                <Form.Item name={[name, 'type']} hidden initialValue={type}>
                                  <InputText hidden value={type} />
                                </Form.Item>
                                <Form.Item
                                  name={[name, 'text']}
                                  rules={[{ required: true }, { min: 3 }, { max: 5120 }]}
                                  label={t(`FORM.TEXT.LABEL`)}
                                >
                                  <TextArea autoSize showCount maxLength={5120} />
                                </Form.Item>
                              </>
                            )}

                            {type === ESelectionType.FILE && (
                              <>
                                <Form.Item name={[name, 'type']} hidden initialValue={type}>
                                  <InputText hidden value={type} />
                                </Form.Item>
                                <Form.Item name={[name, 'file']} noStyle></Form.Item>
                                <FilesUpload
                                  form={form}
                                  name={['sections', name, 'file']}
                                  label={t('FORM.IMAGE_OR_VIDEO.LABEL')}
                                  initialFiles={initialFile ? [initialFile] : []}
                                />
                                <Form.Item name={[name, 'filePlaceholder']} noStyle></Form.Item>
                                <FilesUpload
                                  form={form}
                                  name={['sections', name, 'filePlaceholder']}
                                  label={t('FORM.VIDEO_PLACEHOLDER.LABEL')}
                                  formats={acceptedFormatOnlyImages}
                                  description='FORM.UPLOADER_ONLY_IMAGES.PLACEHOLDER'
                                  initialFiles={
                                    initialFilePlaceholder ? [initialFilePlaceholder] : []
                                  }
                                />
                              </>
                            )}
                          </>
                        )
                      }}
                    </Form.Item>
                  </Flex>
                </div>
              )
            })}
            <Flex align='center' gap={16}>
              <Button icon={<AddIcon />} type='primary' onClick={() => onAdd(ESelectionType.TITLE)}>
                {t('ACTIONS.ADD_TITLE')}
              </Button>
              <Button icon={<AddIcon />} type='primary' onClick={() => onAdd(ESelectionType.TEXT)}>
                {t('ACTIONS.ADD_TEXT')}
              </Button>
              <Button icon={<AddIcon />} type='primary' onClick={() => onAdd(ESelectionType.FILE)}>
                {t('ACTIONS.ADD_IMAGE_OR_VIDEO')}
              </Button>
            </Flex>
          </div>
        )
      }}
    </Form.List>
  )
}
