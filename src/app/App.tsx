import React from 'react'
import { Redirect, Route, Switch } from 'wouter'
import * as routes from './routes'
import Landing from './Landing'
import CreateStory from './story/CreateStory'
import FullStoryPage from './story/FullStory'
import ContinueStory from './story/ContinueStory'

//

const App: React.FC = () => {
  return (
    <Switch>
      <Route path={routes.LANDING.path} component={Landing} />

      <Route path={routes.CREATE_STORY.path} component={CreateStory} />

      <Route path={routes.FULL_STORY_PAGE.path} component={FullStoryPage} />

      <Route path={routes.STORY_PAGE.path} component={ContinueStory} />

      <Route component={() => <Redirect to={routes.LANDING.path} />} />
    </Switch>
  )
}

export default App
