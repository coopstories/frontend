import * as pathToRegexp from 'path-to-regexp'

const makePath = <P extends Object = {}>(path: string) => ({
  path,
  linkTo: (parameters?: P) => pathToRegexp.compile(path)(parameters),
})

export const LANDING = makePath('/')

export const CREATE_STORY = makePath('/story/create')

export const STORY_PAGE = makePath<{ storyId: number }>('/story/:storyId')

export const FULL_STORY_PAGE = makePath<{ storyId: number }>(
  '/story/:storyId/full',
)

export const createContinueStoryURL = (storyId: number, password: string) => {
  const base = window.location.origin
  const path = STORY_PAGE.linkTo({ storyId })

  return `${base}${path}?password=${password}`
}
