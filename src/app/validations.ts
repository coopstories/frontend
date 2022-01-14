import { useMemo } from 'react'
import useTranslations, { TranslationFn } from '../hooks/useTranslations'

const validationErrorsFactory = (t: TranslationFn) => ({
  required: (values: object) => t('errors:required', values),
  minLength: (values: object) => t('errors:min-length', values),
})

export const useValidationErrors = () => {
  const t = useTranslations()

  const validationErrors = useMemo(() => validationErrorsFactory(t), [t])

  return validationErrors
}
