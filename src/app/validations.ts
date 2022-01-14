import { useMemo } from 'react'
import useTranslations, { TranslationFn } from '../hooks/useTranslations'

const validationErrorsFactory = (t: TranslationFn) => ({
  required: (values: object) => t('error:required', values),
  minLength: (values: object) => t('error:min-length', values),
})

export const useValidationErrors = () => {
  const t = useTranslations()

  const validationErrors = useMemo(() => validationErrorsFactory(t), [t])

  return validationErrors
}
