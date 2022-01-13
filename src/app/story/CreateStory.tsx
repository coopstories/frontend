import React, { useMemo } from 'react'
import { useFormik } from 'formik'
import { useMutation } from 'urql'
import { createContinueStoryURL } from '../routes'

const CreateStoryMutation = /* GraphQL */ `
  mutation ($title: String!, $creator: String!, $content: String!) {
    createStory(title: $title, creator: $creator, content: $content) {
      storyId
      nextPassword
      masterPassword
    }
  }
`

const CreateStory: React.FC = () => {
  const [{ fetching, data }, createStory] = useMutation(CreateStoryMutation)

  const continuationLink = useMemo(() => {
    if (!data) {
      return
    }

    return createContinueStoryURL(
      data.createStory.storyId,
      data.createStory.nextPassword,
    )
  }, [data])

  const { values, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: {
      title: '',
      creator: '',
      content: '',
    },

    onSubmit: (values) => {
      createStory(values)
    },
  })

  if (fetching) {
    return <p>Creating story...</p>
  }

  return data ? (
    <div>
      <p>Story created successfully!!</p>
      <p>
        Please remember your master password:{' '}
        <pre>{data.createStory.masterPassword}</pre>
      </p>

      <p>
        Share this link with your friends for continuing the story:
        <a href={continuationLink}>{continuationLink}</a>
      </p>
    </div>
  ) : (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">Story title</label>
      <input
        id="title"
        name="title"
        type="text"
        onChange={handleChange}
        value={values.title}
      />

      <br />
      <br />

      <label htmlFor="creator">Creator</label>
      <input
        id="creator"
        name="creator"
        type="text"
        onChange={handleChange}
        value={values.creator}
      />

      <br />
      <br />

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

export default CreateStory
