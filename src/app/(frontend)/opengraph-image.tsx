import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import path from 'node:path'

export const alt = 'MedHelper — AI-асистент для медичних працівників'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

/** Default branded Open Graph image (overridable per page / in Site Settings). */
export default async function OgImage() {
  const font = await readFile(path.join(process.cwd(), 'node_modules/geist/dist/fonts/geist-sans/Geist-SemiBold.ttf'))
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 72,
          background: 'radial-gradient(circle at 85% 15%, rgba(23,184,166,0.35), transparent 45%), #101B2B',
          color: '#fff',
          fontFamily: 'Geist',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 34 }}>
          <div style={{ width: 56, height: 56, borderRadius: 16, background: 'linear-gradient(135deg,#8DE4D1,#17B8A6)' }} />
          MedHelper
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ fontSize: 72, lineHeight: 1.05, letterSpacing: -2, maxWidth: 950 }}>
            Інтелектуальний помічник медика
          </div>
          <div style={{ fontSize: 30, color: '#A9B7C7', maxWidth: 900 }}>
            Клінічні рішення · Кодування НСЗУ · Медична документація · Клінічні шкали
          </div>
        </div>
      </div>
    ),
    { ...size, fonts: [{ name: 'Geist', data: font, weight: 600, style: 'normal' }] },
  )
}
