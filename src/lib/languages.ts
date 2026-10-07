/** The content languages the apps can write an itinerary in. */
export type Language = 'en' | 'ja'

export const SUPPORTED_LANGUAGES: Language[] = ['en', 'ja']

/** Each language in its own script — the name a reader of it recognises. */
export const LANGUAGE_NAMES: Record<Language, string> = {
  en: 'English',
  ja: '日本語',
}
