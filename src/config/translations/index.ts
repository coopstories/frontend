import en from './en.json'
import es from './es.json'

export enum Locales {
  en = 'en',
  es = 'es',
}

type Messages = { [key: string]: string }

type TranslationsType = { [key in Locales]: Messages }

export const TRANSLATIONS: TranslationsType = {
  [Locales.en]: en,
  [Locales.es]: es,
}
