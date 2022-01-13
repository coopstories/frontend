import React from 'react'
import NavBar from '../ui/components/NavBar'
import Hero from '../ui/components/Hero'
import HowItWorks from '../ui/components/HowItWorks'
import Button from '../ui/components/Button'
import { CREATE_STORY } from './routes'

const Landing: React.FC = () => {
  return (
    <>
      <NavBar
        actionsSlot={
          <Button title="Create a story" to={CREATE_STORY.linkTo()} />
        }
      />

      <Hero />
      <HowItWorks />
    </>
  )
}

export default Landing
