import React, { FC } from 'react'
import classNames from 'classnames'
import cls from './questions-form-list.module.scss'
import { Divider, Flex, Form } from 'antd'
import { Button } from '~/shared/ui/button'
import { AddIcon, DeleteIcon } from '~/shared/ui/icon'
import { useTranslation } from 'react-i18next'
import { InputText } from '~/shared/ui/input-text'
import { ETextSizes, Text } from '~/shared/ui/text'
import { TextArea } from '~/shared/ui/textarea'

interface IQuestionsFormListProps {
  className?: string
}

export const QuestionsFormList: FC<IQuestionsFormListProps> = ({ className }) => {
  const { t } = useTranslation()
  return (
    <div className={classNames(cls.wrapper, [className])}>
      <Form.List name='questions'>
        {(questionFields, { add: addQuestion, remove: removeQuestion }) => (
          <div>
            {questionFields.map(({ key: questionKey, name: questionName }) => (
              <React.Fragment key={questionKey}>
                {questionName !== 0 && <Divider></Divider>}

                <Flex
                  align='center'
                  gap={12}
                  style={{
                    width: '100%',
                  }}
                >
                  <Text size={ETextSizes.H7}>
                    {t('FORM.QUESTIONS.QUESTION.LABEL', { num: questionKey + 1 })}
                  </Text>
                  <Button
                    onClick={() => removeQuestion(questionName)}
                    icon={<DeleteIcon style={{ fontSize: 24 }} />}
                    type='link'
                    danger
                  />
                </Flex>
                <Flex vertical>
                  <Form.Item
                    name={[questionName, 'question']}
                    label={t('FORM.QUESTIONS.QUESTION.LABEL', { num: questionKey + 1 })}
                    rules={[{ required: true }, { min: 1 }, { max: 5120 }]}
                  >
                    <TextArea
                      placeholder={t('FORM.QUESTIONS.QUESTION.PLACEHOLDER', {
                        num: questionKey + 1,
                      })}
                      autoSize
                      showCount
                      maxLength={5120}
                    />
                  </Form.Item>
                  <Form.Item
                    name={[questionName, 'answerCorrect']}
                    label={t('FORM.QUESTIONS.ANSWER_CORRECT.LABEL', { num: questionKey + 1 })}
                    rules={[{ required: true }, { min: 1 }, { max: 128 }]}
                  >
                    <InputText
                      placeholder={t('FORM.QUESTIONS.ANSWER_CORRECT.PLACEHOLDER', {
                        num: questionKey + 1,
                      })}
                    />
                  </Form.Item>
                  <Form.Item
                    name={[questionName, 'answerFalse1']}
                    label={t('FORM.QUESTIONS.ANSWER_FALSE.LABEL', { num: questionKey + 1 })}
                    rules={[{ required: true }, { min: 1 }, { max: 128 }]}
                  >
                    <InputText
                      placeholder={t('FORM.QUESTIONS.ANSWER_FALSE.PLACEHOLDER', {
                        num: questionKey + 1,
                      })}
                    />
                  </Form.Item>
                  <Form.Item
                    name={[questionName, 'answerFalse2']}
                    label={t('FORM.QUESTIONS.ANSWER_FALSE.LABEL', { num: questionKey + 1 })}
                    rules={[{ required: true }, { min: 1 }, { max: 128 }]}
                  >
                    <InputText
                      placeholder={t('FORM.QUESTIONS.ANSWER_FALSE.PLACEHOLDER', {
                        num: questionKey + 1,
                      })}
                    />
                  </Form.Item>
                  <Form.Item
                    name={[questionName, 'description']}
                    label={t('FORM.QUESTIONS.DESCRIPTION.LABEL', { num: questionKey + 1 })}
                    rules={[{ min: 1 }, { max: 5120 }]}
                  >
                    <TextArea
                      placeholder={t('FORM.QUESTIONS.DESCRIPTION.PLACEHOLDER', {
                        num: questionKey + 1,
                      })}
                      autoSize
                      showCount
                      maxLength={5120}
                    />
                  </Form.Item>
                </Flex>
              </React.Fragment>
            ))}

            <Form.Item>
              <Button type='primary' onClick={() => addQuestion()} block icon={<AddIcon />}>
                {t('ACTIONS.ADD_QUESTION')}
              </Button>
            </Form.Item>
          </div>
        )}
      </Form.List>
    </div>
  )
}
