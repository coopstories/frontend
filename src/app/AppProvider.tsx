import React, { useMemo } from 'react'
import { IntlProvider } from 'react-intl'
import { setupI18n } from '../libs/i18n'

const AppProvider: React.FC = ({ children }) => {
  const { locale, messages } = useMemo(() => setupI18n(), [])

  return (
    <IntlProvider
      locale={locale}
      messages={messages}
      textComponent={React.Fragment}
    >
      {children}
    </IntlProvider>
  )
}

export default AppProvider
