import { ImageResponse } from 'next/og'
import { site } from '@/lib/site'

export const runtime = 'edge'

export const alt = site.name

export const size = { width: 1200, height: 630 }

export const contentType = 'image/png'

export default async function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'linear-gradient(135deg, #1a1a1a 0%, #2a1a0a 100%)',
          color: '#fff',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <div style={{ fontSize: 64, fontWeight: 700, textAlign: 'center', padding: '0 48px' }}>
          {site.name}
        </div>
        <div style={{ fontSize: 28, color: '#94a3b8', marginTop: 24 }}>jessicamaldonado.me</div>
      </div>
    ),
    size
  )
}
