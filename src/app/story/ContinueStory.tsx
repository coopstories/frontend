import React, { useMemo } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useMutation, useQuery } from 'urql'
import BasicLayout from '../../ui/layouts/BasicLayout'
import Input from '../../ui/components/Input'
import Textarea from '../../ui/components/Textarea'
import Button from '../../ui/components/Button'
import SuccessMessage from '../../ui/components/SuccessMessage'
import { useValidationErrors } from '../validations'
import useTranslations from '../../hooks/useTranslations'

const AccessStoryQuery = /* GraphQL */ `
  query ($id: Int!, $password: String!) {
    accessStory(id: $id, password: $password) {
      id
      title
      creatorName
      createdAt
      previousFragment
    }
  }
`

type AccessStoryResponse = {
  accessStory: {
    id: number
    title: string
    creatorName: string
    createdAt: string
    previousFragment: string
  }
}

const ContinueStoryMutation = /* GraphQL */ `
  mutation (
    $id: Int!
    $password: String!
    $contributor: String!
    $content: String!
  ) {
    continueStory(
      id: $id
      password: $password
      contributor: $contributor
      content: $content
    ) {
      storyId
      nextPassword
    }
  }
`

type ContinueStoryResponse = {
  continueStory: {
    storyId: number
    nextPassword: string
  }
}

const ContinueStory: React.FC<{ params: { storyId: string } }> = ({
  params,
}) => {
  const t = useTranslations()
  const validationErrors = useValidationErrors()

  const password = useMemo(() => {
    const urlSearchParams = new URLSearchParams(window.location.search)
    return urlSearchParams.get('password')
  }, [])

  const [
    { fetching: isLoadingStoryData, data: storyData, error: errorLoadingStory },
  ] = useQuery<AccessStoryResponse>({
    query: AccessStoryQuery,
    variables: { id: parseInt(params.storyId, 10), password },
    pause: !password,
  })

  const [
    { fetching: isContinuingStory, data: continueStoryData },
    continueStory,
  ] = useMutation<ContinueStoryResponse>(ContinueStoryMutation)

  const { values, touched, errors, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: {
        contributor: '',
        content: '',
      },

      validateOnBlur: true,
      validationSchema: Yup.object().shape({
        contributor: Yup.string()
          .min(3, validationErrors.minLength)
          .required(validationErrors.required),

        content: Yup.string()
          .min(180, validationErrors.minLength)
          .required(validationErrors.required),
      }),

      onSubmit: (values) => {
        if (!storyData) {
          return
        }

        continueStory({
          id: storyData.accessStory.id,
          password: password,

          contributor: values.contributor,
          content: values.content,
        })
      },
    })

  if (continueStoryData) {
    return (
      <BasicLayout>
        <SuccessMessage
          title={t('message:story-continued-success')}
          storyId={continueStoryData.continueStory.storyId}
          nextPassword={continueStoryData.continueStory.nextPassword}
        />
      </BasicLayout>
    )
  }

  return (
    <BasicLayout>
      {!password ? (
        <p className="font-serif text-lg">{t('message:password-required')}</p>
      ) : isLoadingStoryData ? (
        <p className="font-serif text-lg">{t('message:loading-story')}</p>
      ) : errorLoadingStory ? (
        <p className="font-serif text-lg">
          {errorLoadingStory.graphQLErrors[0].message}
        </p>
      ) : storyData ? (
        <>
          <h1 className="text-3xl text-gray-800 py-5">
            {t('heading:continue-story', {
              storyTitle: storyData.accessStory.title,
            })}
          </h1>

          <form className="space-y-6 font-serif mt-3" onSubmit={handleSubmit}>
            <Input
              label={t('label:contributor')}
              name="contributor"
              value={values.contributor}
              placeholder={t('placeholder:contributor')}
              errorMessage={
                touched.contributor && !!errors.contributor
                  ? errors.contributor
                  : undefined
              }
              onChange={handleChange}
              onBlur={handleBlur}
            />

            <div className="my-5 p-5 rounded-lg font-serif bg-light-primary">
              <p className="mb-4">{t('message:story-introduction')}</p>

              <pre className="whitespace-pre-wrap">
                {storyData.accessStory.previousFragment}
              </pre>
            </div>

            <Textarea
              label={t('label:continue-story')}
              name="content"
              value={values.content}
              placeholder={t('placeholder:continue-story')}
              errorMessage={
                touched.content && !!errors.content ? errors.content : undefined
              }
              onChange={handleChange}
              onBlur={handleBlur}
            />

            <Button
              title={t('action:continue-story')}
              isLoading={isContinuingStory}
              onClick={handleSubmit}
            />
          </form>
        </>
      ) : null}
    </BasicLayout>
  )
}

export default ContinueStory
