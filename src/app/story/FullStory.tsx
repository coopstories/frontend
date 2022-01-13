import React, { useCallback, useEffect, useState } from 'react'
import { useQuery } from 'urql'

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

const FullStoryPage: React.FC<{ params: { storyId: string } }> = ({
  params,
}) => {
  const [masterPassword, setMasterPassword] = useState<string | null>(null)

  const [result] = useQuery({
    query: AccessFullStoryQuery,
    variables: { id: parseInt(params.storyId, 10), masterPassword },
    pause: !masterPassword,
  })

  const { fetching, data, error } = result

  const introducePassword = useCallback(() => {
    const introducedPassword = prompt('Enter master password:')
    setMasterPassword(introducedPassword)
  }, [])

  useEffect(
    () => introducePassword(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

  if (fetching) {
    return <p>Loading full story...</p>
  }

  if (error || !data) {
    return (
      <div>
        <p>Error fetching story</p>
        <p>{error?.message}</p>

        <button onClick={introducePassword}>Try again</button>
      </div>
    )
  }

  return (
    <div>
      <h2>
        {data.accessFullStory.title} by {data.accessFullStory.creatorName}
      </h2>

      {data.accessFullStory.storyFragments.map(
        ({ id, content }: { id: number; content: string }) => (
          <p key={id}>{content}</p>
        ),
      )}
    </div>
  )
}

export default FullStoryPage
