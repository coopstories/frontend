import React, { useMemo } from 'react'
import { useFormik } from 'formik'
import { useMutation, useQuery } from 'urql'
import FormLayout from '../../ui/layouts/FormLayout'
import Input from '../../ui/components/Input'
import Textarea from '../../ui/components/Textarea'
import Button from '../../ui/components/Button'
import SuccessMessage from '../../ui/components/SuccessMessage'

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

  const { values, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: {
      contributor: '',
      content: '',
    },

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
      <FormLayout>
        <SuccessMessage
          title="Story continued successfully!"
          storyId={continueStoryData.continueStory.storyId}
          nextPassword={continueStoryData.continueStory.nextPassword}
        />
      </FormLayout>
    )
  }

  return (
    <FormLayout>
      {!password ? (
        <p>Password is required!</p>
      ) : isLoadingStoryData ? (
        <p>Loading story...</p>
      ) : errorLoadingStory ? (
        <p>{errorLoadingStory.graphQLErrors[0].message}</p>
      ) : storyData ? (
        <>
          <h1 className="text-3xl text-gray-800 py-5">
            Continue "{storyData.accessStory.title}"
          </h1>

          <form className="space-y-6 font-serif mt-3" onSubmit={handleSubmit}>
            <Input
              label="Name"
              name="contributor"
              value={values.contributor}
              onChange={handleChange}
              onBlur={handleBlur}
            />

            <div className="my-5 p-5 rounded-lg font-serif bg-light-primary">
              <p className="mb-4">The story goes something like...</p>

              <pre className="whitespace-pre-wrap">
                {storyData.accessStory.previousFragment}
              </pre>
            </div>

            <Textarea
              label="Continue the story"
              name="content"
              value={values.content}
              onChange={handleChange}
              onBlur={handleBlur}
            />

            <Button
              title="Continue story"
              isLoading={isContinuingStory}
              onClick={handleSubmit}
            />
          </form>
        </>
      ) : null}
    </FormLayout>
  )
}

export default ContinueStory
