import type { Field, GroupField } from 'payload'

/** Icons editors can choose from. Mapped to Lucide components in `components/ui/icon.tsx`. */
export const iconOptions = [
  { label: 'Стетоскоп-пульс (клініка)', value: 'activity' },
  { label: 'Щит (НСЗУ)', value: 'shield-check' },
  { label: 'Документ', value: 'file-text' },
  { label: 'Калькулятор', value: 'calculator' },
  { label: 'Сканування', value: 'scan-text' },
  { label: 'Лікар', value: 'user-round' },
  { label: 'Лікарня', value: 'hospital' },
  { label: 'Амбулаторія', value: 'house-plus' },
  { label: 'Статистика', value: 'chart-column' },
  { label: 'Код', value: 'binary' },
  { label: 'Керівник', value: 'briefcase-medical' },
  { label: 'Адміністрування', value: 'building-2' },
  { label: 'Ваги (нормативи)', value: 'scale' },
  { label: 'Список', value: 'list-checks' },
  { label: 'Порівняння', value: 'git-compare' },
  { label: 'Гаманець (фін. ризики)', value: 'wallet' },
  { label: 'Мова', value: 'languages' },
  { label: 'Іскра (AI)', value: 'sparkles' },
  { label: 'Вхід', value: 'log-in' },
  { label: 'Повідомлення', value: 'message-square-text' },
] as const

export type IconName = (typeof iconOptions)[number]['value']

export const iconField = (overrides: Partial<Field> = {}): Field =>
  ({
    name: 'icon',
    label: 'Іконка',
    type: 'select',
    options: iconOptions as unknown as { label: string; value: string }[],
    ...overrides,
  }) as Field

type TextOpts = { name: string; label: string; max?: number; required?: boolean; textarea?: boolean }

/** Localized text with an enforced max length to protect the layout. */
export const text = ({ name, label, max = 120, required = false, textarea = false }: TextOpts): Field => ({
  name,
  label,
  type: textarea ? 'textarea' : 'text',
  localized: true,
  required,
  maxLength: max,
  admin: { description: `Максимум ${max} символів` },
})

export const sectionHeader = (opts: { eyebrow?: boolean; description?: boolean } = {}): Field[] => [
  ...(opts.eyebrow === false ? [] : [text({ name: 'eyebrow', label: 'Надзаголовок', max: 40 })]),
  text({ name: 'heading', label: 'Заголовок', max: 110, required: true }),
  ...(opts.description === false
    ? []
    : [text({ name: 'description', label: 'Опис', max: 320, textarea: true })]),
  {
    name: 'anchor',
    label: 'Якір (id секції)',
    type: 'text',
    maxLength: 40,
    admin: { description: 'Латиницею, без #. Напр. "features". Використовується в навігації.' },
    validate: (v: unknown) =>
      !v || /^[a-z0-9-]+$/.test(String(v)) ? true : 'Лише малі латинські літери, цифри та дефіс',
  },
]

/**
 * Reusable link. `platform` resolves to the AI platform URL from Site Settings,
 * so the destination can be changed in one place.
 */
export const linkGroup = (name: string, label: string, required = false): GroupField => ({
  name,
  label,
  type: 'group',
  fields: [
    {
      type: 'row',
      fields: [
        { ...(text({ name: 'label', label: 'Текст кнопки', max: 40, required }) as object), admin: { width: '50%' } } as Field,
        {
          name: 'type',
          label: 'Призначення',
          type: 'select',
          defaultValue: 'platform',
          options: [
            { label: 'AI-платформа (з налаштувань)', value: 'platform' },
            { label: 'Вхід у платформу (з налаштувань)', value: 'login' },
            { label: 'Внутрішнє посилання / якір', value: 'internal' },
            { label: 'Зовнішній URL', value: 'external' },
          ],
          admin: { width: '50%' },
        },
      ],
    },
    {
      name: 'url',
      label: 'URL або якір',
      type: 'text',
      maxLength: 300,
      admin: {
        condition: (_, sibling) => sibling?.type === 'internal' || sibling?.type === 'external',
        description: 'Напр. "#features", "/contacts" або "https://…"',
      },
    },
  ],
})

export const seoGroup: GroupField = {
  name: 'meta',
  label: 'SEO',
  type: 'group',
  fields: [
    text({ name: 'title', label: 'Meta title', max: 70 }),
    text({ name: 'description', label: 'Meta description', max: 170, textarea: true }),
    { name: 'image', label: 'Open Graph зображення (1200×630)', type: 'upload', relationTo: 'media' },
    {
      name: 'canonical',
      label: 'Canonical URL',
      type: 'text',
      maxLength: 300,
      admin: { description: 'Залиште порожнім для автоматичного значення' },
    },
    { name: 'noindex', label: 'Заборонити індексацію (noindex)', type: 'checkbox', defaultValue: false },
  ],
}
