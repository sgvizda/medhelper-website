/**
 * Locale configuration. Ukrainian is the primary (and currently only active)
 * language. To enable another locale, set `enabled: true`, add its dictionary in
 * `src/i18n/dictionaries`, and translate content in the CMS (locale switcher in /admin).
 */
export const locales = [
  { code: 'uk', label: 'Українська', htmlLang: 'uk', ogLocale: 'uk_UA', enabled: true },
  { code: 'en', label: 'English', htmlLang: 'en', ogLocale: 'en_US', enabled: false },
  { code: 'ru', label: 'Русский', htmlLang: 'ru', ogLocale: 'ru_RU', enabled: false },
] as const

export type Locale = (typeof locales)[number]['code']
export const defaultLocale: Locale = 'uk'
export const activeLocales = locales.filter((l) => l.enabled)
export const getLocaleMeta = (code: Locale) => locales.find((l) => l.code === code) ?? locales[0]
