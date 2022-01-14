import { useCallback } from 'react'
import { useIntl } from 'react-intl'

export type TranslationFn = (key: string, values?: any) => string

const useTranslations = () => {
  const intl = useIntl()

  const t: TranslationFn = useCallback(
    (key: string, values = {}) =>
      intl.formatMessage({ id: key, defaultMessage: key }, values),
    [intl],
  )

  return t
}

export default useTranslations
