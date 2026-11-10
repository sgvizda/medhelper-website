/**
 * Seeds the CMS with the default Ukrainian content.
 *   pnpm seed            — fills empty globals/collections (safe to re-run)
 *   pnpm seed --force    — overwrites globals with defaults
 * Optional: SEED_ADMIN_EMAIL + SEED_ADMIN_PASSWORD create the first Super Admin.
 */
import { getPayload } from 'payload'
import config from '@payload-config'
import { defaultFaqs, defaultFooter, defaultHeader, defaultHomeLayout, defaultSettings } from '@/content/defaults'
import { privacyContent, termsContent } from './legal'

const force = process.argv.includes('--force')

async function run() {
  const payload = await getPayload({ config })
  const log = (m: string) => payload.logger.info(`[seed] ${m}`)
  const ctx = { overrideAccess: true, locale: 'uk' as const }

  // Admin
  const email = process.env.SEED_ADMIN_EMAIL
  const password = process.env.SEED_ADMIN_PASSWORD
  if (email && password) {
    const { totalDocs } = await payload.count({ collection: 'users', where: { email: { equals: email } } })
    if (!totalDocs) {
      await payload.create({ collection: 'users', data: { email, password, name: 'Super Admin', roles: ['super-admin'] }, ...ctx })
      log(`created super admin ${email}`)
    }
  }

  // Globals
  const settings = await payload.findGlobal({ slug: 'site-settings', ...ctx })
  if (force || !settings.siteName) {
    await payload.updateGlobal({ slug: 'site-settings', data: defaultSettings, ...ctx })
    log('site-settings')
  }
  const header = await payload.findGlobal({ slug: 'header', ...ctx })
  if (force || !header.nav?.length) {
    await payload.updateGlobal({ slug: 'header', data: defaultHeader, ...ctx })
    log('header')
  }
  const footer = await payload.findGlobal({ slug: 'footer', ...ctx })
  if (force || !footer.columns?.length) {
    await payload.updateGlobal({ slug: 'footer', data: defaultFooter, ...ctx })
    log('footer')
  }
  const home = await payload.findGlobal({ slug: 'home-page', ...ctx })
  if (force || !home.layout?.length) {
    await payload.updateGlobal({
      slug: 'home-page',
      data: {
        layout: defaultHomeLayout,
        meta: { title: defaultSettings.seoTitle, description: defaultSettings.seoDescription },
      },
      ...ctx,
    })
    log('home-page')
  }

  // FAQ
  const faqCount = await payload.count({ collection: 'faqs' })
  if (!faqCount.totalDocs) {
    for (const [i, f] of defaultFaqs.entries()) {
      await payload.create({ collection: 'faqs', data: { ...f, order: (i + 1) * 10, published: true }, ...ctx })
    }
    log(`faqs (${defaultFaqs.length})`)
  }

  // Legal pages
  const legal = [
    {
      slug: 'privacy',
      title: 'Політика конфіденційності',
      intro: 'Як ми збираємо, використовуємо та захищаємо персональні дані відвідувачів сайту.',
      content: privacyContent,
    },
    {
      slug: 'terms',
      title: 'Умови використання',
      intro: 'Правила користування сайтом та важливі застереження щодо AI-асистента.',
      content: termsContent,
    },
  ]
  for (const page of legal) {
    const existing = await payload.find({ collection: 'pages', where: { slug: { equals: page.slug } }, limit: 1, ...ctx })
    if (existing.totalDocs && !force) continue
    const data = {
      title: page.title,
      slug: page.slug,
      intro: page.intro,
      _status: 'published' as const,
      layout: [{ blockType: 'richText' as const, content: page.content as never }],
      meta: { title: page.title, description: page.intro },
    }
    if (existing.totalDocs) await payload.update({ collection: 'pages', id: existing.docs[0].id, data, ...ctx })
    else await payload.create({ collection: 'pages', data, ...ctx })
    log(`page /${page.slug}`)
  }

  log('done')
  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
