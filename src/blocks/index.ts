import type { Block } from 'payload'
import { iconField, linkGroup, sectionHeader, text } from '@/fields'

const items = (name: string, label: string, fields: Block['fields'], maxRows = 12) =>
  ({ name, label, type: 'array', maxRows, fields }) as Block['fields'][number]

export const HeroBlock: Block = {
  slug: 'hero',
  labels: { singular: 'Hero', plural: 'Hero' },
  interfaceName: 'HeroBlock',
  fields: [
    text({ name: 'eyebrow', label: 'Надзаголовок / бейдж', max: 60 }),
    text({ name: 'heading', label: 'Заголовок', max: 80, required: true }),
    text({
      name: 'highlight',
      label: 'Виділена частина заголовка',
      max: 40,
    }),
    text({ name: 'subheading', label: 'Підзаголовок', max: 260, textarea: true }),
    linkGroup('primaryCta', 'Основна кнопка'),
    linkGroup('secondaryCta', 'Додаткова кнопка'),
    items('badges', 'Короткі переваги під кнопками', [text({ name: 'text', label: 'Текст', max: 40 })], 4),
  ],
}

export const CapabilitiesBlock: Block = {
  slug: 'capabilities',
  labels: { singular: 'Можливості (Bento)', plural: 'Можливості (Bento)' },
  interfaceName: 'CapabilitiesBlock',
  fields: [
    ...sectionHeader(),
    items(
      'items',
      'Напрямки',
      [
        {
          name: 'kind',
          label: 'Тип демонстрації',
          type: 'select',
          required: true,
          options: [
            { label: 'Клінічний асистент', value: 'clinical' },
            { label: 'НСЗУ та ПМГ', value: 'nhsu' },
            { label: 'Медична документація', value: 'docs' },
            { label: 'Шкали та калькулятори', value: 'scales' },
            { label: 'Розпізнавання документів', value: 'ocr' },
          ],
        },
        text({ name: 'title', label: 'Назва', max: 50, required: true }),
        text({ name: 'description', label: 'Опис', max: 200, textarea: true }),
        text({ name: 'linkLabel', label: 'Текст посилання', max: 30 }),
        { name: 'href', label: 'Посилання (якір)', type: 'text', maxLength: 100 },
      ],
      5,
    ),
  ],
}

export const NhsuBlock: Block = {
  slug: 'nhsu',
  labels: { singular: 'НСЗУ та ПМГ', plural: 'НСЗУ та ПМГ' },
  interfaceName: 'NhsuBlock',
  fields: [
    ...sectionHeader(),
    items(
      'features',
      'Можливості',
      [
        text({ name: 'title', label: 'Назва', max: 60, required: true }),
        text({ name: 'description', label: 'Опис', max: 160, textarea: true }),
      ],
      8,
    ),
    text({ name: 'highlightTitle', label: 'Акцент: заголовок', max: 80 }),
    text({ name: 'highlightText', label: 'Акцент: текст', max: 300, textarea: true }),
  ],
}

export const ScalesBlock: Block = {
  slug: 'scales',
  labels: { singular: 'Клінічні шкали', plural: 'Клінічні шкали' },
  interfaceName: 'ScalesBlock',
  fields: [
    ...sectionHeader(),
    items(
      'categories',
      'Категорії',
      [
        text({ name: 'name', label: 'Назва категорії', max: 50, required: true }),
        items('tools', 'Інструменти', [text({ name: 'name', label: 'Назва', max: 40, required: true })], 10),
      ],
      6,
    ),
    items('steps', 'Що робить асистент', [text({ name: 'text', label: 'Текст', max: 100 })], 6),
  ],
}

export const DocumentsBlock: Block = {
  slug: 'documents',
  labels: { singular: 'Медична документація', plural: 'Медична документація' },
  interfaceName: 'DocumentsBlock',
  fields: [
    ...sectionHeader(),
    items(
      'documents',
      'Документи',
      [
        text({ name: 'code', label: 'Код форми', max: 30, required: true }),
        text({ name: 'title', label: 'Назва', max: 80 }),
        text({ name: 'description', label: 'Опис', max: 160, textarea: true }),
      ],
      8,
    ),
    items('highlights', 'Особливості', [text({ name: 'text', label: 'Текст', max: 100 })], 8),
    text({ name: 'note', label: 'Застереження', max: 240, textarea: true }),
  ],
}

export const OcrBlock: Block = {
  slug: 'ocr',
  labels: { singular: 'Розпізнавання документів', plural: 'Розпізнавання документів' },
  interfaceName: 'OcrBlock',
  fields: [
    ...sectionHeader(),
    {
      name: 'printed',
      label: 'Друковані документи',
      type: 'group',
      fields: [
        text({ name: 'title', label: 'Заголовок', max: 40 }),
        items('items', 'Типи', [text({ name: 'text', label: 'Текст', max: 40 })], 8),
      ],
    },
    {
      name: 'handwritten',
      label: 'Рукописні документи',
      type: 'group',
      fields: [
        text({ name: 'title', label: 'Заголовок', max: 40 }),
        items('items', 'Типи', [text({ name: 'text', label: 'Текст', max: 40 })], 8),
      ],
    },
  ],
}

export const ComparisonBlock: Block = {
  slug: 'comparison',
  labels: { singular: 'Не просто чат', plural: 'Не просто чат' },
  interfaceName: 'ComparisonBlock',
  fields: [
    ...sectionHeader(),
    text({ name: 'genericLabel', label: 'Назва колонки «універсальний чат»', max: 40 }),
    text({ name: 'specializedLabel', label: 'Назва колонки «наш асистент»', max: 40 }),
    items(
      'rows',
      'Пункти порівняння',
      [
        iconField(),
        text({ name: 'title', label: 'Аспект', max: 50, required: true }),
        text({ name: 'generic', label: 'Універсальний AI-чат', max: 120, textarea: true }),
        text({ name: 'specialized', label: 'Медичний асистент', max: 160, textarea: true }),
      ],
      10,
    ),
  ],
}

export const StepsBlock: Block = {
  slug: 'steps',
  labels: { singular: 'Як це працює', plural: 'Як це працює' },
  interfaceName: 'StepsBlock',
  fields: [
    ...sectionHeader(),
    items(
      'steps',
      'Кроки',
      [
        iconField(),
        text({ name: 'title', label: 'Назва', max: 60, required: true }),
        text({ name: 'description', label: 'Опис', max: 200, textarea: true }),
      ],
      5,
    ),
    linkGroup('cta', 'Кнопка під кроками'),
  ],
}

export const AudienceBlock: Block = {
  slug: 'audience',
  labels: { singular: 'Для кого', plural: 'Для кого' },
  interfaceName: 'AudienceBlock',
  fields: [
    ...sectionHeader(),
    items(
      'items',
      'Аудиторії',
      [
        iconField(),
        text({ name: 'title', label: 'Назва', max: 50, required: true }),
        text({ name: 'description', label: 'Опис', max: 180, textarea: true }),
      ],
      9,
    ),
  ],
}

export const FaqBlock: Block = {
  slug: 'faq',
  labels: { singular: 'FAQ', plural: 'FAQ' },
  interfaceName: 'FaqBlock',
  fields: [
    ...sectionHeader(),
    {
      name: 'faqs',
      label: 'Питання (порожньо — усі опубліковані за порядком)',
      type: 'relationship',
      relationTo: 'faqs',
      hasMany: true,
    },
  ],
}

export const CtaBlock: Block = {
  slug: 'cta',
  labels: { singular: 'Фінальний CTA', plural: 'Фінальний CTA' },
  interfaceName: 'CtaBlock',
  fields: [
    ...sectionHeader({ eyebrow: true }),
    linkGroup('primaryCta', 'Основна кнопка'),
    linkGroup('secondaryCta', 'Додаткова кнопка'),
  ],
}

export const ContactBlock: Block = {
  slug: 'contact',
  labels: { singular: 'Контактна форма', plural: 'Контактні форми' },
  interfaceName: 'ContactBlock',
  fields: [...sectionHeader()],
}

export const RichTextBlock: Block = {
  slug: 'richText',
  labels: { singular: 'Текстовий блок', plural: 'Текстові блоки' },
  interfaceName: 'RichTextBlock',
  fields: [
    text({ name: 'heading', label: 'Заголовок (необовʼязково)', max: 110 }),
    { name: 'content', label: 'Вміст', type: 'richText', localized: true, required: true },
  ],
}

/** Blocks available on the home page. */
export const homeBlocks: Block[] = [
  HeroBlock,
  CapabilitiesBlock,
  NhsuBlock,
  ScalesBlock,
  DocumentsBlock,
  OcrBlock,
  ComparisonBlock,
  StepsBlock,
  AudienceBlock,
  FaqBlock,
  CtaBlock,
  ContactBlock,
]

/** Blocks available on CMS pages (all of the above + rich text). */
export const pageBlocks: Block[] = [RichTextBlock, ...homeBlocks]
