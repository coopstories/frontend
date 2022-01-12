import en from './en.json'

export enum Locales {
  en = 'en',
}

type Messages = { [key: string]: string }

type TranslationsType = { [key in Locales]: Messages }

export const TRANSLATIONS: TranslationsType = {
  [Locales.en]: en,
}
