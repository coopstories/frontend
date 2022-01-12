import React from 'react'
import useTranslations from '../hooks/useTranslations'

const App: React.FC = () => {
  const t = useTranslations()

  return <p>{t('hello:world')}</p>
}

export default App
