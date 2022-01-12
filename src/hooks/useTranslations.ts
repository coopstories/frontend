import { useCallback } from 'react'
import { useIntl } from 'react-intl'

const useTranslations = () => {
  const intl = useIntl()

  const t = useCallback(
    (key: string, values = {}) =>
      intl.formatMessage({ id: key, defaultMessage: key }, values),
    [intl],
  )

  return t
}

export default useTranslations
