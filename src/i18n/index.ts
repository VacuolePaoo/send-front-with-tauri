import { createI18n } from 'vue-i18n'

const messages = Object.fromEntries(
  Object.entries(
    import.meta.glob<{ default: any }>('./locales/*.json', { eager: true }),
  )
  .filter(([key]) => !key.includes('/es.'))
  .map(([key, value]) => [key.slice(10, -5), value.default]),
)

export default createI18n({
  locale: 'zh',
  fallbackLocale: 'zh',
  legacy: false,
  globalInjection: true,
  messages,
})