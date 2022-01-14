import React from 'react'
import NavBar from '../ui/components/NavBar'
import Hero from '../ui/components/Hero'
import HowItWorks from '../ui/components/HowItWorks'
import Button from '../ui/components/Button'
import Footer from '../ui/components/Footer'
import { CREATE_STORY } from './routes'
import useTranslations from '../hooks/useTranslations'

const Landing: React.FC = () => {
  const t = useTranslations()

  return (
    <>
      <NavBar
        actionsSlot={
          <Button title={t('action:create-story')} to={CREATE_STORY.linkTo()} />
        }
      />

      <Hero />
      <HowItWorks />

      <Footer />
    </>
  )
}

export default Landing
