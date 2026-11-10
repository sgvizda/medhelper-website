import path from 'path'
import { fileURLToPath } from 'url'
import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import { s3Storage } from '@payloadcms/storage-s3'
import { uk } from '@payloadcms/translations/languages/uk'
import { en } from '@payloadcms/translations/languages/en'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Faqs } from './collections/Faqs'
import { Leads } from './collections/Leads'
import { Footer, Header, HomePage, SiteSettings } from './globals'
import { locales, defaultLocale } from './i18n/config'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
const smtpConfigured = Boolean(process.env.SMTP_HOST)
const s3Configured = Boolean(process.env.S3_BUCKET)

export default buildConfig({
  serverURL: siteUrl,
  secret: process.env.PAYLOAD_SECRET || '',
  admin: {
    user: Users.slug,
    meta: { titleSuffix: ' — MedHelper CMS' },
    importMap: { baseDir: path.resolve(dirname) },
  },
  i18n: { supportedLanguages: { uk, en }, fallbackLanguage: 'uk' },
  localization: {
    locales: locales.map((l) => ({ code: l.code, label: l.label })),
    defaultLocale,
    fallback: true,
  },
  collections: [Pages, Faqs, Leads, Media, Users],
  globals: [HomePage, Header, Footer, SiteSettings],
  editor: lexicalEditor(),
  db: postgresAdapter({
    pool: { connectionString: process.env.DATABASE_URI || '' },
    // Automatically create and sync tables if migrations were not manually run
    push: true,
  }),
  sharp,
  cors: [siteUrl, 'http://localhost:3000', 'http://localhost', 'http://127.0.0.1:3000', 'http://127.0.0.1'],
  csrf: [siteUrl, 'http://localhost:3000', 'http://localhost', 'http://127.0.0.1:3000', 'http://127.0.0.1'],
  onInit: async (payload) => {
    try {
      if (!process.env.DATABASE_URI) return
      const { totalDocs } = await payload.count({ collection: 'users' })
      if (totalDocs === 0) {
        const email = process.env.SEED_ADMIN_EMAIL || 'admin@medhelper.ua'
        const password = process.env.SEED_ADMIN_PASSWORD || 'AdminMedhelper2026!'
        await payload.create({
          collection: 'users',
          data: { email, password, name: 'Super Admin', roles: ['super-admin'] },
          overrideAccess: true,
        })
        payload.logger.info(`[onInit] Initial admin created: ${email}`)
      }
    } catch (err) {
      payload.logger.warn(`[onInit] ${(err as Error).message}`)
    }
  },
  graphQL: { disablePlaygroundInProduction: true },
  typescript: { outputFile: path.resolve(dirname, 'payload-types.ts') },
  email: smtpConfigured
    ? nodemailerAdapter({
        defaultFromAddress: (process.env.EMAIL_FROM || 'no-reply@example.com').replace(/.*<(.+)>.*/, '$1'),
        defaultFromName: 'MedHelper',
        transportOptions: {
          host: process.env.SMTP_HOST,
          port: Number(process.env.SMTP_PORT || 587),
          secure: process.env.SMTP_SECURE === 'true',
          auth: process.env.SMTP_USER
            ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD }
            : undefined,
        },
      })
    : undefined,
  plugins: [
    s3Storage({
      enabled: s3Configured,
      collections: { media: true },
      bucket: process.env.S3_BUCKET || '',
      config: {
        region: process.env.S3_REGION || 'auto',
        endpoint: process.env.S3_ENDPOINT || undefined,
        forcePathStyle: process.env.S3_FORCE_PATH_STYLE === 'true',
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
        },
      },
    }),
  ],
})
