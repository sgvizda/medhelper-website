import type { SiteSetting } from '@/payload-types'
import { SITE_URL, mediaUrl } from '@/lib/seo'

/** Serializes JSON-LD safely (prevents </script> breakout). */
export function JsonLd({ data }: { data: object | object[] }) {
  const json = JSON.stringify(Array.isArray(data) && data.length === 1 ? data[0] : data).replace(/</g, '\\u003c')
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />
}

export const organizationJsonLd = (s: SiteSetting) => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: s.siteName,
  url: SITE_URL,
  ...(mediaUrl(s.logo) ? { logo: mediaUrl(s.logo) } : {}),
  ...(s.email ? { email: s.email } : {}),
  ...(s.phone ? { telephone: s.phone } : {}),
  sameAs: [...(s.socials ?? []).map((x) => x.url), ...(s.telegram ? [s.telegram] : [])],
})

export const softwareJsonLd = (s: SiteSetting) => ({
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: s.siteName,
  applicationCategory: 'HealthApplication',
  applicationSubCategory: 'Medical AI assistant',
  operatingSystem: 'Web',
  inLanguage: 'uk',
  description: s.seoDescription || s.tagline || undefined,
  url: SITE_URL,
  publisher: { '@id': `${SITE_URL}/#organization` },
  audience: { '@type': 'MedicalAudience', audienceType: 'Clinician' },
})
