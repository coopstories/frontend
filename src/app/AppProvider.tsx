import React, { useMemo } from 'react'
import { IntlProvider } from 'react-intl'
import { createClient, Provider as UrqlProvider } from 'urql'
import { Router } from 'wouter'
import { setupI18n } from '../libs/i18n'

const GRAPHQL_API = process.env.REACT_APP_BACKEND_URL || 'http://localhost:4000'

const AppProvider: React.FC = ({ children }) => {
  const { locale, messages } = useMemo(() => setupI18n(), [])

  const client = createClient({
    url: GRAPHQL_API,
  })

  return (
    <IntlProvider
      locale={locale}
      messages={messages}
      textComponent={React.Fragment}
    >
      <UrqlProvider value={client}>
        <Router>{children}</Router>
      </UrqlProvider>
    </IntlProvider>
  )
}

export default AppProvider
