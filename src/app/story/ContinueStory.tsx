import React, { useMemo } from 'react'
import { useFormik } from 'formik'
import { useMutation, useQuery } from 'urql'
import { createContinueStoryURL } from '../routes'

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

const ContinueStory: React.FC<{ params: { storyId: string } }> = ({
  params,
}) => {
  const password = useMemo(() => {
    const urlSearchParams = new URLSearchParams(window.location.search)
    return urlSearchParams.get('password')
  }, [])

  const [{ fetching: isLoadingStoryData, data: storyData }] = useQuery({
    query: AccessStoryQuery,
    variables: { id: parseInt(params.storyId, 10), password },
    pause: !password,
  })

  const [
    { fetching: isContinuingStory, data: continueStoryData },
    continueStory,
  ] = useMutation(ContinueStoryMutation)

  const continuationLink = useMemo(() => {
    if (!continueStoryData) {
      return
    }

    return createContinueStoryURL(
      continueStoryData.continueStory.storyId,
      continueStoryData.continueStory.nextPassword,
    )
  }, [continueStoryData])

  const { values, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: {
      contributor: '',
      content: '',
    },

    onSubmit: (values) => {
      continueStory({
        id: storyData.accessStory.id,
        password: password,

        contributor: values.contributor,
        content: values.content,
      })
    },
  })

  if (!password) {
    return <p>Password is required!</p>
  }

  if (isLoadingStoryData || isContinuingStory) {
    return <p>Loading story...</p>
  }

  return continueStoryData ? (
    <div>
      <p>Story continued successfully!!</p>

      <p>
        Share this link with your friends for continuing the story:
        <a href={continuationLink}>{continuationLink}</a>
      </p>
    </div>
  ) : (
    <form onSubmit={handleSubmit}>
      <h2>{storyData.accessStory.title}</h2>

      <label htmlFor="contributor">Contributor</label>
      <input
        id="contributor"
        name="contributor"
        type="text"
        onChange={handleChange}
        value={values.contributor}
      />

      <br />
      <br />
      <p>
        Continue your story from:{' '}
        <i>{storyData.accessStory.previousFragment}</i>
      </p>

      <label htmlFor="content">Content</label>
      <textarea
        id="content"
        name="content"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.content}
      ></textarea>

      <br />
      <br />

      <input type="submit" value="Submit" />
    </form>
  )
}

export default ContinueStory
