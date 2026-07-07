import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'ArvandSmartControl — Intelligent Chiller Monitoring Platform'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OGImage() {
  // Load BYekan locally (48 KB — small enough)
  const byekan = fetch(
    new URL('@/app/fonts/BYekan.ttf', import.meta.url),
  ).then((res) => res.arrayBuffer())

  // Fetch Inter from Google Fonts CDN at runtime so it doesn't bloat the edge bundle
  // Only the weights we need: 400 (body), 600 (brand)
  const [inter400, inter600] = await Promise.all([
    fetch(
      'https://fonts.gstatic.com/s/inter/v18/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa2JL7W0Q5n-wU.woff2',
      { headers: { 'User-Agent': 'Mozilla/5.0' } },
    ).then((r) => r.arrayBuffer()),
    fetch(
      'https://fonts.gstatic.com/s/inter/v18/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa2pL7W0Q5n-wU.woff2',
      { headers: { 'User-Agent': 'Mozilla/5.0' } },
    ).then((r) => r.arrayBuffer()),
  ])

  try {
    return new ImageResponse(
      (
        <div
          style={{
            width: 1200,
            height: 630,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
            position: 'relative',
          }}
        >
          {/* Subtle grid pattern */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage:
                'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
              backgroundSize: '60px 60px',
            }}
          />

          {/* Top accent line */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              width: '40%',
              height: 3,
              background: 'linear-gradient(90deg, transparent, #60a5fa, transparent)',
              borderRadius: '0 0 2px 2px',
            }}
          />

          {/* Bottom accent line */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              width: '40%',
              height: 3,
              background: 'linear-gradient(90deg, transparent, #60a5fa, transparent)',
              borderRadius: '2px 2px 0 0',
            }}
          />

          {/* Glow dots */}
          <div
            style={{
              position: 'absolute',
              top: '20%',
              right: '15%',
              width: 200,
              height: 200,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(96,165,250,0.08) 0%, transparent 70%)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '20%',
              left: '10%',
              width: 250,
              height: 250,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(52,211,153,0.06) 0%, transparent 70%)',
            }}
          />

          {/* Main content */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1,
              padding: '0 80px',
              textAlign: 'center',
            }}
          >
            {/* Logo / Brand mark */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                marginBottom: 20,
              }}
            >
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
              <span
                style={{
                  fontSize: 28,
                  fontFamily: '"Inter"',
                  fontWeight: 600,
                  color: '#e2e8f0',
                  letterSpacing: '0.05em',
                }}
              >
                ARVAND
              </span>
              <span
                style={{
                  fontSize: 28,
                  fontFamily: '"Inter"',
                  fontWeight: 400,
                  color: '#60a5fa',
                  letterSpacing: '0.03em',
                }}
              >
                SMART CONTROL
              </span>
            </div>

            {/* Title — Persian */}
            <div
              style={{
                fontSize: 32,
                fontFamily: '"BYekan"',
                fontWeight: 700,
                color: '#94a3b8',
                marginBottom: 20,
                lineHeight: 1.4,
              }}
            >
              پلتفرم هوشمند پایش و کنترل چیلر
            </div>

            {/* English subtitle */}
            <div
              style={{
                fontSize: 20,
                fontFamily: '"Inter"',
                fontWeight: 400,
                color: '#64748b',
                marginBottom: 32,
                lineHeight: 1.5,
                maxWidth: 700,
              }}
            >
              Intelligent Chiller Monitoring &bull; Energy Analytics &bull; Predictive Maintenance
            </div>

            {/* Divider */}
            <div
              style={{
                width: 80,
                height: 2,
                background: 'linear-gradient(90deg, transparent, #60a5fa, transparent)',
                marginBottom: 24,
              }}
            />

            {/* Features row */}
            <div
              style={{
                display: 'flex',
                gap: 40,
                fontSize: 14,
                fontFamily: '"Inter"',
                fontWeight: 400,
                color: '#475569',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
              }}
            >
              <span>No Gateway Required</span>
              <span>Real-time Monitoring</span>
              <span>Multi-Brand Support</span>
            </div>
          </div>

          {/* URL at bottom */}
          <div
            style={{
              position: 'absolute',
              bottom: 28,
              fontSize: 13,
              fontFamily: '"Inter"',
              fontWeight: 400,
              color: '#475569',
              letterSpacing: '0.1em',
            }}
          >
            arvandsmart.com
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: 'Inter',
            data: await inter400,
            weight: 400,
            style: 'normal',
          },
          {
            name: 'Inter',
            data: await inter600,
            weight: 600,
            style: 'normal',
          },
          {
            name: 'BYekan',
            data: await byekan,
            weight: 700,
            style: 'normal',
          },
        ],
      },
    )
  } catch {
    // Fallback simple OG image if fonts fail
    return new ImageResponse(
      (
        <div
          style={{
            width: 1200,
            height: 630,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#0f172a',
            color: '#e2e8f0',
            fontSize: 48,
            fontWeight: 600,
          }}
        >
          ArvandSmartControl
        </div>
      ),
      { width: 1200, height: 630 },
    )
  }
}
