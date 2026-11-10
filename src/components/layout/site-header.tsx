import type { Header, SiteSetting } from '@/payload-types'
import { getHomePage } from '@/lib/cms'
import { resolveLink, normalizeHref } from '@/lib/links'
import { HeaderClient, type MegaItem, type NavItem } from './site-header.client'

/** Server wrapper: resolves CMS links, then hands plain data to the client header. */
export async function SiteHeader({ header, settings }: { header: Header; settings: SiteSetting }) {
  const home = await getHomePage()
  const caps = home.layout?.find((b) => b.blockType === 'capabilities')
  const mega: MegaItem[] =
    caps && caps.blockType === 'capabilities'
      ? (caps.items ?? []).map((i) => ({
          kind: i.kind,
          title: i.title,
          description: i.description ?? '',
          href: normalizeHref(i.href || '#features'),
        }))
      : []

  const nav: NavItem[] = (header.nav ?? []).map((n) => ({
    label: n.label,
    href: normalizeHref(n.href),
    description: n.description ?? '',
  }))

  return (
    <HeaderClient
      siteName={settings.siteName}
      logo={settings.logo ?? null}
      nav={nav}
      mega={mega}
      login={resolveLink(header.login, settings, 'Увійти')}
      cta={resolveLink(header.cta, settings, 'Спробувати асистента')}
    />
  )
}
