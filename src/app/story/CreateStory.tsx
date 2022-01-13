import React, { useMemo } from 'react'
import { useFormik } from 'formik'
import { useMutation } from 'urql'
import { createContinueStoryURL, FULL_STORY_PAGE, LANDING } from '../routes'
import NavBar from '../../ui/components/NavBar'
import Input from '../../ui/components/Input'
import FormLayout from '../../ui/layouts/FormLayout'
import Button from '../../ui/components/Button'

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

const SuccessMessage: React.FC<{
  data: CreateStoryResult
}> = ({ data }) => {
  const continuationLink = useMemo(() => {
    if (!data) {
      return
    }

    return createContinueStoryURL(
      data.createStory.storyId,
      data.createStory.nextPassword,
    )
  }, [data])

  const fullStoryLink = useMemo(
    () =>
      `${window.location.origin}${FULL_STORY_PAGE.linkTo({
        storyId: data.createStory.storyId,
      })}`,
    [],
  )

  return (
    <>
      <h1 className="text-3xl text-gray-800 py-5">
        Story created successfully!
      </h1>

      <article className="px-4 py-5 rounded-lg text-lg font-serif bg-light-primary mb-4">
        <p className="font-bold mb-3">
          IMPORTANT! Save this info to access the full story.
        </p>

        <ul className="space-y-3">
          <li>
            <span>Master password: </span>
            <pre className="bg-primary inline-block">
              {data.createStory.masterPassword}
            </pre>
          </li>

          <li>
            <span>Link to access story: </span>
            <a className="text-secondary inline-block" href={fullStoryLink}>
              {fullStoryLink}
            </a>
          </li>
        </ul>
      </article>

      <article className="px-4 py-5 rounded-lg text-lg font-serif bg-green-mid">
        <p className="font-bold">
          Share this link with your friends for continuing the story
        </p>

        <a className="text-gray-50" href={continuationLink}>
          {continuationLink}
        </a>
      </article>
    </>
  )
}

const CreateStory: React.FC = () => {
  const [{ fetching, data }, createStory] = useMutation<
    CreateStoryResult,
    { title: string; creator: string; content: string }
  >(CreateStoryMutation)

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

  return (
    <>
      <NavBar
        actionsSlot={<Button title="How it works" to={LANDING.linkTo()} />}
      />

      <FormLayout>
        {!data ? (
          <>
            <h1 className="text-3xl text-gray-800 py-5">Create a new story</h1>

            <form className="space-y-6 font-serif mt-3" onSubmit={handleSubmit}>
              <Input
                label="Story title"
                name="title"
                value={values.title}
                onChange={handleChange}
                onBlur={handleBlur}
              />

              <Input
                label="Creator"
                name="creator"
                value={values.creator}
                onChange={handleChange}
                onBlur={handleBlur}
              />

              <label className="block">
                <span className="text-gray-700">Start your story</span>
                <textarea
                  className="
        mt-1 block w-full rounded-md border-gray-300 shadow-sm

        focus:border-primary focus:ring-0"
                  rows={7}
                  name="content"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.content}
                ></textarea>
              </label>

              <Button
                title="Create story"
                isLoading={fetching}
                onClick={handleSubmit}
              />
            </form>
          </>
        ) : (
          <SuccessMessage data={data} />
        )}
      </FormLayout>
    </>
  )
}

export default CreateStory
