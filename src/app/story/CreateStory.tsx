import React from 'react'
import { useFormik } from 'formik'
import { useMutation } from 'urql'
import Input from '../../ui/components/Input'
import BasicLayout from '../../ui/layouts/BasicLayout'
import Button from '../../ui/components/Button'
import SuccessMessage from '../../ui/components/SuccessMessage'
import Textarea from '../../ui/components/Textarea'

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
  const [{ fetching, data: createStoryResult }, createStory] = useMutation<
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

  if (createStoryResult) {
    return (
      <BasicLayout>
        <SuccessMessage
          title="Story created successfully!"
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

          <Textarea
            label="Start your story"
            name="content"
            value={values.content}
            onChange={handleChange}
            onBlur={handleBlur}
          />

          <Button
            title="Create story"
            isLoading={fetching}
            onClick={handleSubmit}
          />
        </form>
      </>
    </BasicLayout>
  )
}

export default CreateStory
