import type { GlobalConfig } from 'payload'
import { revalidatePath } from 'next/cache'
import { anyone, staff, superAdmin } from '@/access'
import { homeBlocks } from '@/blocks'
import { linkGroup, seoGroup, text } from '@/fields'

const revalidateAll = () => {
  try {
    revalidatePath('/', 'layout')
  } catch {
    /* outside request context */
  }
}

const hex = (v: unknown) => (!v || /^#[0-9a-fA-F]{6}$/.test(String(v)) ? true : 'Формат #RRGGBB')

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Налаштування сайту',
  admin: { group: 'Налаштування' },
  access: { read: anyone, update: superAdmin },
  hooks: { afterChange: [revalidateAll] },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Бренд',
          fields: [
            text({ name: 'siteName', label: 'Назва продукту', max: 40, required: true }),
            text({ name: 'tagline', label: 'Слоган', max: 120 }),
            { name: 'logo', label: 'Логотип (світла тема, SVG/PNG)', type: 'upload', relationTo: 'media' },
            { name: 'logoDark', label: 'Логотип (темний фон)', type: 'upload', relationTo: 'media' },
            {
              name: 'colors',
              label: 'Основні кольори',
              type: 'group',
              admin: { description: 'Залиште порожнім, щоб використовувати кольори дизайн-системи' },
              fields: [
                {
                  type: 'row',
                  fields: [
                    { name: 'primary', label: 'Акцент (Teal)', type: 'text', validate: hex, admin: { placeholder: '#17B8A6' } },
                    { name: 'accent', label: 'Світлий акцент (Mint)', type: 'text', validate: hex, admin: { placeholder: '#8DE4D1' } },
                    { name: 'ink', label: 'Темний (Navy)', type: 'text', validate: hex, admin: { placeholder: '#101B2B' } },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Платформа та контакти',
          fields: [
            {
              name: 'platformUrl',
              label: 'URL AI-платформи',
              type: 'text',
              required: true,
              admin: { description: 'Куди ведуть кнопки «Спробувати асистента»' },
            },
            {
              name: 'loginUrl',
              label: 'URL входу',
              type: 'text',
              admin: { description: 'Якщо порожньо — використовується URL платформи' },
            },
            { name: 'email', label: 'Email', type: 'email' },
            { name: 'phone', label: 'Телефон', type: 'text', maxLength: 30 },
            { name: 'telegram', label: 'Telegram (URL)', type: 'text', maxLength: 200 },
            text({ name: 'address', label: 'Адреса / регіон', max: 120 }),
            {
              name: 'socials',
              label: 'Соціальні мережі',
              type: 'array',
              maxRows: 8,
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'network',
                      label: 'Мережа',
                      type: 'select',
                      required: true,
                      options: ['facebook', 'instagram', 'linkedin', 'youtube', 'x', 'telegram'].map((v) => ({
                        label: v,
                        value: v,
                      })),
                    },
                    { name: 'url', label: 'URL', type: 'text', required: true },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'SEO за замовчуванням',
          fields: [
            text({ name: 'seoTitle', label: 'Заголовок сайту (title)', max: 70 }),
            {
              name: 'titleTemplate',
              label: 'Шаблон title',
              type: 'text',
              defaultValue: '%s — MedHelper',
              admin: { description: '%s буде замінено назвою сторінки' },
            },
            text({ name: 'seoDescription', label: 'Meta description', max: 170, textarea: true }),
            { name: 'ogImage', label: 'Open Graph зображення', type: 'upload', relationTo: 'media' },
          ],
        },
        {
          label: 'Застереження',
          fields: [
            text({
              name: 'disclaimer',
              label: 'Медичне застереження',
              max: 400,
              textarea: true,
            }),
          ],
        },
      ],
    },
  ],
}

export const Header: GlobalConfig = {
  slug: 'header',
  label: 'Шапка сайту',
  admin: { group: 'Налаштування' },
  access: { read: anyone, update: staff },
  hooks: { afterChange: [revalidateAll] },
  fields: [
    {
      name: 'nav',
      label: 'Пункти меню',
      type: 'array',
      maxRows: 7,
      fields: [
        {
          type: 'row',
          fields: [
            text({ name: 'label', label: 'Назва', max: 24, required: true }),
            { name: 'href', label: 'Посилання', type: 'text', required: true, admin: { placeholder: '#features' } },
          ],
        },
        text({ name: 'description', label: 'Опис (для мобільного меню)', max: 80 }),
      ],
    },
    linkGroup('login', 'Кнопка входу'),
    linkGroup('cta', 'Основна CTA'),
  ],
}

export const Footer: GlobalConfig = {
  slug: 'footer',
  label: 'Підвал сайту',
  admin: { group: 'Налаштування' },
  access: { read: anyone, update: staff },
  hooks: { afterChange: [revalidateAll] },
  fields: [
    text({ name: 'description', label: 'Короткий опис', max: 240, textarea: true }),
    {
      name: 'columns',
      label: 'Колонки посилань',
      type: 'array',
      maxRows: 4,
      fields: [
        text({ name: 'title', label: 'Заголовок', max: 30, required: true }),
        {
          name: 'links',
          label: 'Посилання',
          type: 'array',
          maxRows: 8,
          fields: [
            {
              type: 'row',
              fields: [
                text({ name: 'label', label: 'Назва', max: 40, required: true }),
                { name: 'href', label: 'URL', type: 'text', required: true },
              ],
            },
          ],
        },
      ],
    },
    text({ name: 'copyright', label: 'Копірайт', max: 120 }),
  ],
}

export const HomePage: GlobalConfig = {
  slug: 'home-page',
  label: 'Головна сторінка',
  admin: {
    group: 'Контент',
    description: 'Перетягуйте блоки, щоб змінити порядок секцій. Видаліть блок, щоб приховати секцію.',
  },
  access: { read: anyone, update: staff },
  versions: { drafts: false, max: 30 },
  hooks: { afterChange: [revalidateAll] },
  fields: [
    { name: 'layout', label: 'Секції', type: 'blocks', blocks: homeBlocks, minRows: 1 },
    seoGroup,
  ],
}
