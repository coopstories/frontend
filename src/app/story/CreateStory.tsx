import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useMutation } from 'urql'
import Input from '../../ui/components/Input'
import BasicLayout from '../../ui/layouts/BasicLayout'
import Button from '../../ui/components/Button'
import SuccessMessage from '../../ui/components/SuccessMessage'
import Textarea from '../../ui/components/Textarea'
import useTranslations from '../../hooks/useTranslations'
import { useValidationErrors } from '../validations'

const CreateStoryMutation = /* GraphQL */ `
  mutation ($title: String!, $creator: String!, $content: String!) {
    createStory(title: $title, creator: $creator, content: $content) {
      storyId
      nextPassword
      masterPassword
    }
  }
`

type CreateStoryResult = {
  createStory: { storyId: number; nextPassword: string; masterPassword: string }
}

const CreateStory: React.FC = () => {
  const t = useTranslations()
  const validationErrors = useValidationErrors()

  const [{ fetching, data: createStoryResult }, createStory] = useMutation<
    CreateStoryResult,
    { title: string; creator: string; content: string }
  >(CreateStoryMutation)

  const { values, touched, errors, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: {
        title: '',
        creator: '',
        content: '',
      },

      validateOnBlur: true,
      validationSchema: Yup.object().shape({
        title: Yup.string()
          .min(3, validationErrors.minLength)
          .required(validationErrors.required),

        creator: Yup.string()
          .min(3, validationErrors.minLength)
          .required(validationErrors.required),

        content: Yup.string()
          .min(180, validationErrors.minLength)
          .required(validationErrors.required),
      }),

      onSubmit: (values) => {
        createStory(values)
      },
    })

  if (createStoryResult) {
    return (
      <BasicLayout>
        <SuccessMessage
          title={t('message:story-created-success')}
          storyId={createStoryResult.createStory.storyId}
          nextPassword={createStoryResult.createStory.nextPassword}
          masterPassword={createStoryResult.createStory.masterPassword}
        />
      </BasicLayout>
    )
  }

  return (
    <BasicLayout>
      <>
        <h1 className="text-3xl text-gray-800 py-5">
          {t('heading:create-new-story')}
        </h1>

        <form className="space-y-6 font-serif mt-3" onSubmit={handleSubmit}>
          <Input
            label={t('label:story-title')}
            name="title"
            value={values.title}
            placeholder={t('placeholder:story-title')}
            errorMessage={
              touched.title && !!errors.title ? errors.title : undefined
            }
            onChange={handleChange}
            onBlur={handleBlur}
          />

          <Input
            label={t('label:creator')}
            name="creator"
            value={values.creator}
            placeholder={t('placeholder:creator')}
            errorMessage={
              touched.creator && !!errors.creator ? errors.creator : undefined
            }
            onChange={handleChange}
            onBlur={handleBlur}
          />

          <Textarea
            label={t('label:start-story')}
            name="content"
            value={values.content}
            placeholder={t('placeholder:start-story')}
            errorMessage={
              touched.content && !!errors.content ? errors.content : undefined
            }
            onChange={handleChange}
            onBlur={handleBlur}
          />

          <Button
            title={t('action:create-story')}
            isLoading={fetching}
            onClick={handleSubmit}
          />
        </form>
      </>
    </BasicLayout>
  )
}

export default CreateStory
