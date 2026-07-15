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
          background: '#fbfbf7',
          color: '#171a15',
          padding: '56px 64px',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            borderTop: '6px solid #171a15',
            paddingTop: 18,
          }}
        >
          <div style={{ display: 'flex', fontSize: 22, letterSpacing: 6, fontWeight: 700 }}>
            <span>OFFICIAL&nbsp;</span>
            <span style={{ color: '#1d7a46' }}>RESULT</span>
          </div>
          <div style={{ fontSize: 20, letterSpacing: 4, color: '#5f665c' }}>BIB 001 · CHIP OK</div>
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
          <div style={{ fontSize: 26, letterSpacing: 5, color: '#5f665c', marginTop: 22, textTransform: 'uppercase' }}>
            {site.profession} · {site.city}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '2px solid #171a15',
            paddingBottom: 20,
          }}
        >
          <div style={{ fontSize: 24, color: '#171a15' }}>
            I buy profitable tech companies and make them more profitable.
          </div>
          <div style={{ display: 'flex', fontSize: 22, fontWeight: 700, color: '#1d7a46', letterSpacing: 2 }}>
            42K · IN PROGRESS ●
          </div>
        </div>
      </div>
    ),
    size
  )
}
