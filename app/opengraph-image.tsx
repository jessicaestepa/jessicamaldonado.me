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
          justifyContent: 'space-between',
          background: '#f3f7f6',
          color: '#15201e',
          padding: '56px 64px',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            borderTop: '6px solid #15201e',
            paddingTop: 18,
          }}
        >
          <div style={{ display: 'flex', fontSize: 22, letterSpacing: 6, fontWeight: 700 }}>
            <span>OFFICIAL&nbsp;</span>
            <span style={{ color: '#3fa89a' }}>RESULT</span>
          </div>
          <div style={{ fontSize: 20, letterSpacing: 4, color: '#5a6b67' }}>BIB 001 · CHIP OK</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              fontSize: 92,
              fontWeight: 800,
              letterSpacing: -3,
              lineHeight: 1,
              textTransform: 'uppercase',
            }}
          >
            Maldonado,
          </div>
          <div
            style={{
              fontSize: 92,
              fontWeight: 800,
              letterSpacing: -3,
              lineHeight: 1,
              textTransform: 'uppercase',
            }}
          >
            Jessica
          </div>
          <div style={{ fontSize: 26, letterSpacing: 5, color: '#5a6b67', marginTop: 22, textTransform: 'uppercase' }}>
            {site.profession} · {site.city}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '2px solid #15201e',
            paddingBottom: 20,
          }}
        >
          <div style={{ fontSize: 24, color: '#15201e' }}>
            I buy profitable tech companies and make them more profitable.
          </div>
          <div style={{ display: 'flex', fontSize: 22, fontWeight: 700, color: '#3fa89a', letterSpacing: 2 }}>
            42K · IN PROGRESS ●
          </div>
        </div>
      </div>
    ),
    size
  )
}
