import React, { useMemo } from 'react'
import { ReactComponent as ShareIcon } from '../../assets/icons/share.svg'
import { ReactComponent as WarningIcon } from '../../assets/icons/warning.svg'
import { createContinueStoryURL, createFullStoryURL } from '../../app/routes'

type SuccessMessageProps = {
  title: string
  storyId: number
  nextPassword: string
  masterPassword?: string
}

const SuccessMessage: React.FC<SuccessMessageProps> = ({
  title,
  storyId,
  nextPassword,
  masterPassword,
}) => {
  const continuationLink = useMemo(() => {
    if (!storyId || !nextPassword) {
      return
    }

    return createContinueStoryURL(storyId, nextPassword)
  }, [nextPassword, storyId])

  const fullStoryLink = useMemo(() => {
    if (!storyId || !masterPassword) {
      return
    }

    return createFullStoryURL(storyId, masterPassword)
  }, [masterPassword, storyId])

  return (
    <>
      <h1 className="text-3xl text-gray-800 py-5">{title}</h1>

      {!!masterPassword && !!fullStoryLink ? (
        <article className="px-4 py-5 rounded-lg text-lg font-serif bg-light-primary mb-4">
          <p className="font-bold mb-3">
            <WarningIcon className="w-5 h-5 inline-block mr-1" />

            <span>
              IMPORTANT! Save this link for when you want to read the full
              story.
            </span>
          </p>

          <a className="text-secondary" href={fullStoryLink}>
            {fullStoryLink}
          </a>
        </article>
      ) : null}

      <article className="px-4 py-5 rounded-lg text-lg font-serif bg-green-mid">
        <p className="font-bold">
          <ShareIcon className="w-5 h-5 inline-block mr-1" />

          <span>
            Share this link with your friends for continuing the story
          </span>
        </p>

        <a className="text-gray-50" href={continuationLink}>
          {continuationLink}
        </a>
      </article>
    </>
  )
}

export default SuccessMessage
