import type { HomePage, SiteSetting } from '@/payload-types'
import { HeroSection } from './hero/hero-section'
import { CapabilitiesSection } from './capabilities/capabilities-section'
import { NhsuSection } from './nhsu/nhsu-section'
import { ScalesSection } from './scales/scales-section'
import { DocumentsSection } from './documents/documents-section'
import { OcrSection } from './ocr/ocr-section'
import { ComparisonSection } from './comparison/comparison-section'
import { StepsSection } from './steps/steps-section'
import { AudienceSection } from './audience/audience-section'
import { FaqSection } from './faq/faq-section'
import { CtaSection } from './cta/cta-section'
import { ContactSection } from './contact/contact-section'
import { RichTextSection } from './rich-text/rich-text-section'

export type AnyBlock = NonNullable<HomePage['layout']>[number] | { blockType: 'richText'; [k: string]: unknown }

/**
 * Maps CMS blocks to section components. Order & visibility come from the CMS.
 * Every section receives its block data and the global site settings.
 */
export function RenderBlocks({ blocks, settings }: { blocks: AnyBlock[]; settings: SiteSetting }) {
  return (
    <>
      {blocks.map((block, i) => {
        const key =
          'id' in block && typeof block.id === 'string' && block.id
            ? block.id
            : `${block.blockType}-${i}`
        switch (block.blockType) {
          case 'hero':
            return <HeroSection key={key} block={block} settings={settings} />
          case 'capabilities':
            return <CapabilitiesSection key={key} block={block} settings={settings} />
          case 'nhsu':
            return <NhsuSection key={key} block={block} settings={settings} />
          case 'scales':
            return <ScalesSection key={key} block={block} settings={settings} />
          case 'documents':
            return <DocumentsSection key={key} block={block} settings={settings} />
          case 'ocr':
            return <OcrSection key={key} block={block} settings={settings} />
          case 'comparison':
            return <ComparisonSection key={key} block={block} settings={settings} />
          case 'steps':
            return <StepsSection key={key} block={block} settings={settings} />
          case 'audience':
            return <AudienceSection key={key} block={block} settings={settings} />
          case 'faq':
            return <FaqSection key={key} block={block} settings={settings} />
          case 'cta':
            return <CtaSection key={key} block={block} settings={settings} />
          case 'contact':
            return <ContactSection key={key} block={block} settings={settings} />
          case 'richText':
            return <RichTextSection key={key} block={block as never} settings={settings} />
          default:
            return null
        }
      })}
    </>
  )
}
