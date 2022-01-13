import React, { useMemo } from 'react'
import { useQuery } from 'urql'
import Button from '../../ui/components/Button'
import BasicLayout from '../../ui/layouts/BasicLayout'
import { CREATE_STORY } from '../routes'

const AccessFullStoryQuery = /* GraphQL */ `
  query ($id: Int!, $masterPassword: String!) {
    accessFullStory(id: $id, masterPassword: $masterPassword) {
      id
      title
      creatorName
      createdAt
      storyFragments {
        id
        contributorName
        content
      }
    }
  }
`

type FullStoryResponse = {
  accessFullStory: {
    id: number
    title: string
    creatorName: string
    createdAt: string
    storyFragments: {
      id: number
      contributorName: string
      content: string
    }[]
  }
}

const FullStoryPage: React.FC<{ params: { storyId: string } }> = ({
  params,
}) => {
  const masterPassword = useMemo(() => {
    const urlSearchParams = new URLSearchParams(window.location.search)
    return urlSearchParams.get('masterPassword')
  }, [])

  const [result] = useQuery<FullStoryResponse>({
    query: AccessFullStoryQuery,
    variables: { id: parseInt(params.storyId, 10), masterPassword },
    pause: !masterPassword,
  })

  const { fetching, data, error } = result

  return (
    <BasicLayout
      customNavBarActions={
        <Button title="Create new story" to={CREATE_STORY.linkTo()} />
      }
    >
      {fetching ? (
        <p>Loading full story...</p>
      ) : error ? (
        <p>{error.graphQLErrors[0].message}</p>
      ) : data ? (
        <>
          <h1 className="text-3xl mb-6">
            "{data.accessFullStory.title}" by {data.accessFullStory.creatorName}
          </h1>

          <div className="space-y-3">
            {data.accessFullStory.storyFragments.map(
              ({ id, content }: { id: number; content: string }) => (
                <article key={id} className="p-6 rounded-lg bg-light-primary">
                  <pre className="whitespace-pre-wrap">{content}</pre>
                </article>
              ),
            )}
          </div>
        </>
      ) : null}
    </BasicLayout>
  )
}

export default FullStoryPage
