import { useCallback } from 'react'
import { useIntl } from 'react-intl'
import { PrimitiveType, FormatXMLElementFn } from 'intl-messageformat'

export type TranslationFn = (key: string, values?: any) => string

type Values = Record<string, PrimitiveType | FormatXMLElementFn<string, string>>

const useTranslations = () => {
  const intl = useIntl()

  const t: TranslationFn = useCallback(
    (key: string, values: Values = {}) =>
      intl.formatMessage({ id: key, defaultMessage: key }, values),
    [intl],
  )

  return t
}

export default useTranslations
