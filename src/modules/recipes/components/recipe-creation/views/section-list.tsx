import { Divider, Flex, Form } from 'antd'
import classNames from 'classnames'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { ESelectionType } from '~/lib/api/types'
import { FilesUpload } from '~/lib/components/files-upload'
import { Button } from '~/shared/ui/button'
import { AddIcon, DeleteIcon } from '~/shared/ui/icon'
import { InputText } from '~/shared/ui/input-text'
import cls from './section-list.module.scss'
import { acceptedFormatOnlyImages } from '~/lib/constants/file-formats'
import { TextArea } from '~/shared/ui/textarea'

interface ISectionListProps {
  className?: string
}

export const SectionList: FC<ISectionListProps> = ({ className }) => {
  const { t } = useTranslation()

  return (
    <Form.List name='sections'>
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
                      onClick={() => remove(name)}
                      icon={<DeleteIcon style={{ fontSize: 24 }} />}
                      type='link'
                      danger
                    />
                  </Divider>

                  <Flex vertical>
                    <Form.Item shouldUpdate noStyle>
                      {(form) => {
                        const type = form.getFieldValue(['sections', name, 'type'])
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
                                />
                                <Form.Item name={[name, 'filePlaceholder']} noStyle></Form.Item>
                                <FilesUpload
                                  form={form}
                                  name={['sections', name, 'filePlaceholder']}
                                  label={t('FORM.VIDEO_PLACEHOLDER.LABEL')}
                                  formats={acceptedFormatOnlyImages}
                                  description='FORM.UPLOADER_ONLY_IMAGES.PLACEHOLDER'
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
