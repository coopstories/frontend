import { Locales, TRANSLATIONS } from '../config/translations'

export const DEFAULT_LOCALE = Locales.en

export const findMatchingLocale = (language = undefined) => {
  const matchingLocale = Object.values(Locales).find((locale) =>
    RegExp(locale, 'gi').test(
      language
        ? language
        : typeof navigator !== 'undefined' && navigator
        ? navigator.language
        : DEFAULT_LOCALE,
    ),
  )

  return matchingLocale ?? DEFAULT_LOCALE
}

export const setupI18n = (language = undefined) => {
  const locale = findMatchingLocale(language)

  const messages = TRANSLATIONS[locale] || TRANSLATIONS[DEFAULT_LOCALE]

  if (!TRANSLATIONS[locale]) {
    console.warn(`Missing translations for locale ${locale}`)
  }

  return {
    messages,
    locale,
  }
}
