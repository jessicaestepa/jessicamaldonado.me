'use client'

import { useEffect, useRef, useState } from 'react'
import {
  ArrowLeft,
  Battery,
  Calendar,
  Heart,
  MapPin,
  MousePointer2,
  Mountain,
  Settings,
  Timer,
} from 'lucide-react'
import { site } from '@/lib/site'

const ZOOM_MS = 900
const ZOOM_EASE = 'cubic-bezier(0.34, 1.35, 0.64, 1)'

const SECTIONS = {
  about: {
    title: 'Sobre mí',
    tooltip: 'Quién soy',
    icon: Heart,
  },
  projects: {
    title: 'Projects',
    tooltip: 'Things shipped',
    icon: MapPin,
  },
  now: {
    title: 'Now',
    tooltip: 'This week',
    icon: Timer,
  },
  journey: {
    title: 'Journey',
    tooltip: 'Path so far',
    icon: Mountain,
  },
  writing: {
    title: 'Notes',
    tooltip: 'Writing desk',
    icon: Calendar,
  },
  contact: {
    title: 'Contacto',
    tooltip: 'Hola',
    icon: Battery,
  },
}

function GrainOverlay() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[60] opacity-[0.14] mix-blend-soft-light"
      aria-hidden
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E")`,
        backgroundSize: '180px 180px',
      }}
    />
  )
}

function HillStrip() {
  return (
    <svg className="h-full w-1/2 shrink-0" viewBox="0 0 900 420" preserveAspectRatio="none" aria-hidden>
      <path
        d="M0 300 L140 220 L280 260 L420 200 L560 240 L700 180 L900 140 L900 420 L0 420 Z"
        fill="#52525b"
      />
      <path
        d="M0 340 L200 280 L360 320 L520 260 L720 300 L900 260 L900 420 L0 420 Z"
        fill="#3f3f46"
      />
      <path d="M0 380 L240 340 L420 360 L600 330 L900 350 L900 420 L0 420 Z" fill="#0a0a0a" />
    </svg>
  )
}

function ScrollingBackdrop({ parallax }) {
  const { x, y } = parallax
  const slow = { transform: `translate3d(${x * 18}px, ${y * 10}px, 0)` }
  const mid = { transform: `translate3d(${x * 28}px, ${y * 14}px, 0)` }
  const fast = { transform: `translate3d(${x * 42}px, ${y * 8}px, 0)` }

  const track = (durationSec) => ({
    animation: `hero-bg-scroll ${durationSec}s linear infinite`,
  })

  return (
    <>
      <div className="absolute inset-0 overflow-hidden opacity-90" style={slow}>
        <div className="flex h-full w-[200%] will-change-transform" style={track(38)}>
          <HillStrip />
          <HillStrip />
        </div>
      </div>
      <div className="absolute inset-0 overflow-hidden opacity-[0.97]" style={mid}>
        <div className="flex h-full w-[200%] will-change-transform" style={track(26)}>
          <HillStrip />
          <HillStrip />
        </div>
      </div>
      <div className="absolute inset-0 overflow-hidden" style={fast}>
        <div className="flex h-full w-[200%] will-change-transform" style={track(16)}>
          <HillStrip />
          <HillStrip />
        </div>
      </div>
    </>
  )
}

function HeroScene({ parallax, onMove, showCue, watchRef, onWatchClick }) {
  const { x, y } = parallax
  const skyX = x * 22
  const skyY = y * 14
  const runnerParallax = { transform: `translate3d(${x * 12}px, ${y * 6}px, 0)` }
  const stroke = '#0f172a'
  const sw = 3.5

  return (
    <div
      className="relative h-[min(88vh,780px)] w-full max-w-5xl overflow-hidden rounded-[2rem] border-4 border-zinc-800 bg-[#1a1025] shadow-[0_40px_120px_rgba(0,0,0,0.55)]"
      onMouseMove={onMove}
      role="presentation"
    >
      <div
        className="absolute inset-0 will-change-transform"
        style={{
          transform: `translate3d(${skyX}px, ${skyY}px, 0) scale(1.06)`,
          transition: 'transform 120ms linear',
        }}
      >
        <svg className="h-[58%] w-full" viewBox="0 0 1200 360" preserveAspectRatio="xMidYMid slice" aria-hidden>
          <defs>
            <linearGradient id="hero-sky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#312e81" />
              <stop offset="50%" stopColor="#9d174d" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>
          </defs>
          <rect width="1200" height="360" fill="url(#hero-sky)" />
          <circle cx="1020" cy="70" r="48" fill="#fde047" stroke={stroke} strokeWidth={sw} opacity="0.95" />
        </svg>
      </div>

      <div className="absolute inset-x-0 bottom-0 top-[26%]">
        <ScrollingBackdrop parallax={parallax} />
      </div>

      <div
        className="absolute inset-x-0 bottom-0 h-[34%] bg-gradient-to-t from-[#0f172a] via-[#0f172a]/95 to-transparent"
        aria-hidden
      />

      <div className="pointer-events-none absolute inset-x-0 bottom-[24%] h-2 bg-[#fbbf24]/90 shadow-[0_0_20px_rgba(251,191,36,0.5)]" />

      <div
        className="absolute bottom-[4%] left-1/2 z-10 w-[min(96vw,560px)] -translate-x-1/2 will-change-transform md:bottom-[5%]"
        style={{ ...runnerParallax, transition: 'transform 120ms linear' }}
      >
        <div className="hero-runner-bob relative mx-auto">
          <svg
            className="relative z-0 block w-full"
            viewBox="0 0 480 320"
            role="img"
            aria-label="Personaje 2D corriendo de perfil; el reloj en la muñeca es el botón principal"
            style={{ shapeRendering: 'geometricPrecision' }}
          >
            <ellipse cx="248" cy="298" rx="72" ry="14" fill="#000" opacity="0.35" />

            <g className="hero-ponytail" transform="translate(208, 108)">
              <path
                d="M0 0 Q-52 8 -68 52 Q-72 88 -48 108"
                fill="#5c2e0a"
                stroke={stroke}
                strokeWidth={sw}
                strokeLinejoin="round"
              />
            </g>

            <g transform="translate(278, 232)">
              <g className="hero-leg-back">
                <path
                  d="M0 0 L-6 48 L-38 92"
                  fill="none"
                  stroke="#334155"
                  strokeWidth="22"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <rect x="-52" y="86" width="36" height="14" rx="4" fill="#f8fafc" stroke={stroke} strokeWidth={sw} />
              </g>
              <g className="hero-leg-front">
                <path
                  d="M0 0 L10 50 L48 88"
                  fill="none"
                  stroke="#334155"
                  strokeWidth="22"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <rect x="34" y="82" width="38" height="16" rx="4" fill="#f8fafc" stroke={stroke} strokeWidth={sw} />
              </g>
            </g>

            <path
              d="M248 232 L268 128 L308 118"
              fill="none"
              stroke="#0d9488"
              strokeWidth="20"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="312" cy="116" r="11" fill="#fecdd3" stroke={stroke} strokeWidth={sw} />

            <rect
              x="252"
              y="128"
              width="56"
              height="72"
              rx="10"
              transform="rotate(8 280 164)"
              fill="#14b8a6"
              stroke={stroke}
              strokeWidth={sw}
            />
            <rect
              x="258"
              y="188"
              width="52"
              height="36"
              rx="8"
              transform="rotate(4 284 206)"
              fill="#1e3a8a"
              stroke={stroke}
              strokeWidth={sw}
            />

            <g className="hero-arm-back" transform="translate(268, 142)">
              <path
                d="M0 0 Q18 28 42 52"
                fill="none"
                stroke="#0f766e"
                strokeWidth="18"
                strokeLinecap="round"
              />
              <circle cx="46" cy="56" r="10" fill="#fecdd3" stroke={stroke} strokeWidth={sw} />
            </g>

            <path
              d="M268 150 L210 168 L168 172"
              fill="none"
              stroke="#0f766e"
              strokeWidth="20"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M168 172 L128 178"
              fill="none"
              stroke="#fecdd3"
              strokeWidth="18"
              strokeLinecap="round"
            />

            <ellipse cx="318" cy="102" rx="34" ry="38" fill="#fecdd3" stroke={stroke} strokeWidth={sw} />
            <circle cx="332" cy="96" r="5" fill={stroke} />
            <path
              d="M338 108 Q342 112 336 114"
              fill="none"
              stroke={stroke}
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <ellipse cx="326" cy="112" rx="5" ry="3" fill="#fda4af" opacity="0.9" />

            <text
              x="380"
              y="56"
              fill="#fbbf24"
              fontSize="14"
              fontFamily="ui-monospace, monospace"
              fontWeight="bold"
              opacity="0.85"
            >
              2D
            </text>
          </svg>

          <div
            className="pointer-events-none absolute left-[19.5%] top-[48%] z-[19] -translate-x-1/2 -translate-y-full text-amber-300 drop-shadow-[0_2px_0_#000]"
            aria-hidden
          >
            <span className="hero-pointer-nudge inline-flex">
              <MousePointer2 className="h-10 w-10 md:h-12 md:w-12" strokeWidth={2.5} />
            </span>
          </div>

          <div
            className="pointer-events-none absolute left-[19.5%] top-[54%] z-[18] flex h-[min(52vw,280px)] w-[min(52vw,280px)] -translate-x-1/2 -translate-y-1/2 items-center justify-center"
            aria-hidden
          >
            <span className="hero-watch-ring h-full w-full rounded-full border-4 border-amber-400/80" />
          </div>

          <div className="absolute left-[19.5%] top-[54%] z-20 -translate-x-1/2 -translate-y-1/2">
            <button
              ref={watchRef}
              type="button"
              onClick={onWatchClick}
              className="group relative flex aspect-square w-[clamp(11.5rem,42vmin,19rem)] cursor-pointer items-center justify-center rounded-full focus:outline-none focus-visible:ring-4 focus-visible:ring-amber-300"
              aria-label="Abrir panel del reloj"
              style={{
                animation:
                  'watch-glow 2.4s ease-in-out infinite, hero-watch-pulse 1.1s ease-in-out infinite',
              }}
            >
            <span className="pointer-events-none absolute inset-[-14px] rounded-full border-4 border-amber-400/50" />
            <span className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-300/50 via-orange-500/35 to-teal-400/40 blur-xl" />
            <span className="relative flex h-[86%] w-[86%] flex-col items-center justify-center gap-1 rounded-full bg-gradient-to-b from-zinc-600 to-zinc-950 p-2 shadow-[inset_0_4px_12px_rgba(255,255,255,0.2),0_12px_0_#020617,0_20px_40px_rgba(0,0,0,0.65)] ring-4 ring-amber-400/90 ring-offset-4 ring-offset-[#1a1025]">
              <span className="absolute top-2 text-[9px] font-black uppercase tracking-widest text-amber-200">
                Pulsa
              </span>
              <span className="flex h-[58%] w-[58%] flex-col items-center justify-center rounded-full bg-[#020617] ring-2 ring-teal-400/80">
                <Heart className="h-8 w-8 text-rose-400 md:h-10 md:w-10" strokeWidth={2.2} fill="#fb7185" />
                <span className="mt-0.5 font-mono text-[10px] font-bold text-teal-300">142</span>
              </span>
              <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-zinc-400">Garmin</span>
            </span>
            </button>
          </div>

          <div
            className="pointer-events-none absolute left-[19.5%] top-[78%] z-[21] w-[min(90%,280px)] -translate-x-1/2 text-center"
            aria-hidden
          >
            <span className="inline-block rounded-full border-2 border-amber-400 bg-black/80 px-4 py-2 font-black uppercase tracking-wide text-amber-300 shadow-lg">
              ¡Pulsa el reloj!
            </span>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-3 flex justify-center px-4">
        <p
          className={`max-w-lg text-center font-mono text-xs font-bold uppercase tracking-wide text-amber-200 md:text-sm ${
            showCue ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            transition: 'opacity 800ms ease',
            animation: showCue ? 'cue-fade 900ms ease-out forwards' : 'none',
          }}
        >
          El reloj enorme es el botón: ábrelo para ver el tablero.
        </p>
      </div>
    </div>
  )
}

function WatchFace({
  darkMode,
  onZone,
  onBackHero,
  onToggleDark,
  onToggleSound,
  soundOn,
}) {
  const zones = [
    { id: 'about', row: 'row-start-1 col-start-1', accent: 'from-rose-500/25 to-amber-500/10' },
    { id: 'projects', row: 'row-start-1 col-start-2', accent: 'from-teal-500/25 to-cyan-500/10' },
    { id: 'now', row: 'row-start-2 col-start-1', accent: 'from-amber-500/25 to-orange-500/10' },
    { id: 'journey', row: 'row-start-2 col-start-2', accent: 'from-emerald-500/20 to-teal-500/10' },
    { id: 'writing', row: 'row-start-3 col-start-1', accent: 'from-indigo-500/25 to-teal-500/10' },
    { id: 'contact', row: 'row-start-3 col-start-2', accent: 'from-zinc-500/30 to-amber-500/10' },
  ]

  const shell = darkMode
    ? 'bg-zinc-950 text-zinc-100 border-zinc-800'
    : 'bg-amber-50 text-zinc-900 border-amber-200/70'

  return (
    <div className="relative flex items-center justify-center px-[clamp(0.25rem,2vw,1.25rem)]">
      <div className="relative flex items-stretch gap-1 md:gap-2">
        <div className="flex flex-col items-center justify-between py-10">
          <button
            type="button"
            onClick={onBackHero}
            className="flex h-10 w-3 items-center justify-center rounded-full bg-gradient-to-b from-zinc-600 to-zinc-900 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] ring-1 ring-black/60"
            aria-label="Back to scene"
          >
            <span className="h-6 w-[3px] rounded-full bg-zinc-800" />
          </button>
          <button
            type="button"
            onClick={onToggleDark}
            className="flex h-14 w-3 items-center justify-center rounded-full bg-gradient-to-b from-zinc-500 to-zinc-900 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] ring-1 ring-black/60"
            aria-label="Toggle theme"
          />
          <button
            type="button"
            onClick={onToggleSound}
            className={`flex h-10 w-3 items-center justify-center rounded-full bg-gradient-to-b from-teal-700 to-zinc-900 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] ring-1 ring-black/60 ${
              soundOn ? 'ring-teal-400/50' : ''
            }`}
            aria-label="Ambient sound"
          />
        </div>

        <div
          className={`relative aspect-square w-[min(72vmin,92vw)] rounded-[28%] border-[10px] border-zinc-950 bg-gradient-to-b from-zinc-800 via-zinc-950 to-black p-[10px] shadow-[0_50px_120px_rgba(0,0,0,0.65),inset_0_2px_0_rgba(255,255,255,0.06)] ring-1 ring-zinc-700/60`}
        >
          <div
            className={`relative h-full w-full overflow-hidden rounded-[22%] border border-black/60 ${shell}`}
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_15%,rgba(251,191,36,0.12),transparent_45%),radial-gradient(circle_at_80%_80%,rgba(45,212,191,0.12),transparent_40%)]" />
            <div className="relative grid h-full w-full grid-cols-2 grid-rows-3 gap-2 p-3 md:p-4">
              {zones.map((z) => {
                const meta = SECTIONS[z.id]
                const Icon = meta.icon
                return (
                  <button
                    key={z.id}
                    type="button"
                    onClick={() => onZone(z.id)}
                    className={`group relative flex flex-col items-start justify-between overflow-hidden rounded-2xl border border-white/5 bg-gradient-to-br p-3 text-left shadow-inner transition ${z.accent} hover:border-amber-400/40 hover:shadow-[0_0_24px_rgba(251,191,36,0.18)] focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/70 md:p-4 ${z.row}`}
                  >
                    <div className="flex w-full items-start justify-between gap-2">
                      <span className="inline-flex h-9 w-9 items-center justify-center gap-0.5 rounded-xl bg-black/30 text-amber-300/90 ring-1 ring-white/10 transition group-hover:text-teal-200">
                        {z.id === 'contact' ? (
                          <>
                            <Battery className="h-3.5 w-3.5" strokeWidth={2} />
                            <Settings className="h-3.5 w-3.5" strokeWidth={2} />
                          </>
                        ) : (
                          <Icon className="h-4 w-4" strokeWidth={2} />
                        )}
                      </span>
                      <span className="hidden rounded-full bg-black/35 px-2 py-1 font-mono text-[10px] uppercase tracking-wide text-amber-100/80 opacity-0 ring-1 ring-white/10 transition group-hover:opacity-100 md:inline">
                        {meta.tooltip}
                      </span>
                    </div>
                    <div>
                      <p className="font-serif text-sm tracking-wide text-zinc-100 md:text-base">
                        {meta.title}
                      </p>
                      <p className="mt-1 font-mono text-[10px] text-zinc-400 md:text-[11px]">
                        {z.id === 'contact' ? 'Battery · Settings' : 'Data field'}
                      </p>
                    </div>
                    <span className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100">
                      <span className="absolute inset-0 bg-gradient-to-t from-amber-500/10 to-transparent" />
                    </span>
                  </button>
                )
              })}
            </div>
            <div className="pointer-events-none absolute left-1/2 top-2 h-2 w-16 -translate-x-1/2 rounded-full bg-black/70 ring-1 ring-white/10" />
          </div>
        </div>

        <div className="flex flex-col items-center justify-between py-10">
          <div className="h-10 w-3 rounded-full bg-gradient-to-b from-zinc-600 to-zinc-900 opacity-70 ring-1 ring-black/60" />
          <div className="h-14 w-3 rounded-full bg-gradient-to-b from-zinc-500 to-zinc-900 opacity-70 ring-1 ring-black/60" />
          <div className="h-10 w-3 rounded-full bg-gradient-to-b from-zinc-600 to-zinc-900 opacity-70 ring-1 ring-black/60" />
        </div>
      </div>
    </div>
  )
}

function SectionPanel({ id, darkMode, onBack }) {
  const meta = SECTIONS[id]
  const panel = darkMode
    ? 'border-white/10 bg-zinc-950/85 text-zinc-100'
    : 'border-amber-200/60 bg-white/90 text-zinc-900'

  const bodyClass = darkMode ? 'text-zinc-300' : 'text-zinc-700'

  return (
    <div
      className={`section-dive relative mx-auto flex h-[min(78vh,760px)] w-[min(92vw,980px)] flex-col overflow-hidden rounded-[2.2rem] border shadow-[0_40px_120px_rgba(0,0,0,0.45)] backdrop-blur-md ${panel}`}
    >
      <div className="pointer-events-none absolute inset-0 rounded-[2.2rem] ring-[10px] ring-black/70 ring-inset" />
      <div className="pointer-events-none absolute inset-3 rounded-[1.7rem] ring-1 ring-teal-500/15" />

      <header className="relative z-10 flex items-center justify-between gap-3 border-b border-white/5 px-5 py-4 md:px-8">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-teal-400/90">
            Garmin view
          </p>
          <h2 className="font-serif text-2xl tracking-tight text-amber-100 md:text-3xl">
            {meta.title}
          </h2>
        </div>
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-3 py-2 font-mono text-xs text-amber-100/90 shadow-inner transition hover:border-amber-400/40 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/70"
        >
          <ArrowLeft className="h-4 w-4" strokeWidth={2} />
          <span className="hidden sm:inline">Back</span>
        </button>
      </header>

      <div className={`relative z-10 flex-1 overflow-y-auto px-5 py-6 md:px-10 md:py-8 ${bodyClass}`}>
        {id === 'about' && (
          <article className="max-w-3xl">
            <p className="font-serif text-lg leading-relaxed text-amber-50/95">
              Hola, soy Jessica Maldonado Estepa — diseñadora de producto con foco en experiencias
              digitales que se sienten claras, cuidadas y humanas. Como Jessica Maldonado, he
              construido piezas donde el detalle importa tanto como el resultado.
            </p>
            <p className="mt-4 font-mono text-sm leading-relaxed">
              Jessica trabaja en la intersección de sistemas, narrativa y usabilidad: prototipos que
              convencen, equipos que alinean, y productos que la gente recuerda sin saber muy bien
              por qué. Me mueve la curiosidad, las carreras largas y la idea de que el software
              pueda ser tan intencional como una nota escrita a mano.
            </p>
            <p className="mt-4 font-mono text-sm leading-relaxed">
              Fuera del editor: kilómetros, libretas y listas que suenan a neón sobre lluvia. Este
              sitio es un tablero “desde la muñeca”: el mismo enfoque que llevo cuando Jessica M.
              Estepa pasa del concepto al envío.
            </p>
          </article>
        )}

        {id === 'projects' && (
          <div className="grid gap-4 md:grid-cols-2">
            {[
              {
                title: 'Atlas Notes',
                blurb: 'A cinematic notes surface with spatial cues and gentle motion.',
                tag: 'Web',
              },
              {
                title: 'Relay Forms',
                blurb: 'Composable form runtime with optimistic UI and typed validators.',
                tag: 'Product',
              },
              {
                title: 'Harbor Design System',
                blurb: 'Tokens, components, and documentation for a multi‑team org.',
                tag: 'Design',
              },
              {
                title: 'Pulse Analytics',
                blurb: 'Streaming dashboards with edge caching and human‑readable insights.',
                tag: 'Data',
              },
              {
                title: 'Wayfinder Mobile',
                blurb: 'Offline‑first companion app for field teams with live sync.',
                tag: 'Mobile',
              },
            ].map((p) => (
              <div
                key={p.title}
                className="rounded-2xl border border-white/10 bg-black/30 p-5 shadow-inner transition hover:border-teal-400/35"
              >
                <p className="font-mono text-[10px] uppercase tracking-widest text-teal-300/90">
                  {p.tag}
                </p>
                <h3 className="mt-2 font-serif text-xl text-amber-50">{p.title}</h3>
                <p className="mt-2 font-mono text-sm text-zinc-400">{p.blurb}</p>
              </div>
            ))}
          </div>
        )}

        {id === 'now' && (
          <div className="max-w-3xl space-y-5">
            <p className="font-serif text-xl text-amber-50">
              This month I am tightening storytelling on my portfolio, prototyping a new interaction
              for case studies, and learning more about performance budgets on mobile.
            </p>
            <ul className="space-y-3 font-mono text-sm">
              <li className="rounded-xl border border-white/10 bg-black/25 px-4 py-3">
                <span className="text-teal-300">Week focus:</span> ship the hero → watch transition,
                refine typography scale, record a short Loom walkthrough.
              </li>
              <li className="rounded-xl border border-white/10 bg-black/25 px-4 py-3">
                <span className="text-teal-300">Reading:</span> essays on motion design ethics + a
                few long runs with podcasts about city planning.
              </li>
              <li className="rounded-xl border border-white/10 bg-black/25 px-4 py-3">
                <span className="text-teal-300">Experiment:</span> ambient audio layers that respond
                to scroll velocity (gentle, not gimmicky).
              </li>
            </ul>
          </div>
        )}

        {id === 'journey' && (
          <div className="relative max-w-3xl space-y-6 border-l border-amber-500/25 pl-6">
            {[
              {
                year: '2016 — 2018',
                title: 'Foundations',
                detail: 'Studied design and computer science; first internships; learned to love the terminal.',
              },
              {
                year: '2019 — 2021',
                title: 'Product studio',
                detail: 'Shipped marketing sites and internal tools; discovered systems work and accessibility.',
              },
              {
                year: '2022',
                title: 'Leadership stretch',
                detail: 'Mentored juniors, led sprints, facilitated critiques that felt safe and honest.',
              },
              {
                year: '2023 — 2024',
                title: 'Platform thinking',
                detail: 'Owned component infrastructure, metrics for design quality, and cross‑team rituals.',
              },
              {
                year: '2025 — now',
                title: 'Narrative craft',
                detail: 'Exploring cinematic UX, personal sites as artifacts, and work that ages well.',
              },
            ].map((item) => (
              <div key={item.title} className="relative">
                <span className="absolute -left-[29px] top-1 h-3 w-3 rounded-full bg-gradient-to-br from-amber-400 to-teal-500 ring-4 ring-zinc-950" />
                <p className="font-mono text-xs uppercase tracking-widest text-teal-300/90">
                  {item.year}
                </p>
                <h3 className="mt-1 font-serif text-xl text-amber-50">{item.title}</h3>
                <p className="mt-2 font-mono text-sm text-zinc-400">{item.detail}</p>
              </div>
            ))}
          </div>
        )}

        {id === 'writing' && (
          <div className="max-w-3xl space-y-4">
            <p className="font-serif text-lg text-amber-50">
              Essays, snippets, and field notes — placeholders until you wire your CMS or Markdown.
            </p>
            <ul className="space-y-3 font-mono text-sm">
              <li className="rounded-xl border border-white/10 bg-black/25 px-4 py-3">
                <span className="text-teal-300">Draft</span> — The kindness of small transitions
              </li>
              <li className="rounded-xl border border-white/10 bg-black/25 px-4 py-3">
                <span className="text-teal-300">Note</span> — What I learned rebuilding my personal site
              </li>
              <li className="rounded-xl border border-white/10 bg-black/25 px-4 py-3">
                <span className="text-teal-300">Essay</span> — Tools that respect your attention
              </li>
            </ul>
          </div>
        )}

        {id === 'contact' && (
          <div className="max-w-xl space-y-6">
            <p className="font-serif text-lg text-amber-50">
              Escríbeme — colaboraciones, charlas o un café a distancia. Jessica Maldonado Estepa
              responde por email y redes.
            </p>
            <div className="flex flex-wrap items-center gap-3 font-mono text-sm">
              <a
                className="rounded-full border border-amber-400/40 bg-amber-500/10 px-4 py-2 text-amber-100 transition hover:border-teal-400/50 hover:text-white"
                href={`mailto:${site.email}`}
              >
                {site.email}
              </a>
              <span className="text-zinc-500">Jessica Maldonado Estepa</span>
            </div>
            <div className="flex flex-wrap gap-3 text-sm">
              <a
                href={site.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-3 py-2 font-mono text-zinc-300 transition hover:border-teal-400/40 hover:text-white"
              >
                <Settings className="h-4 w-4 text-teal-300" />
                LinkedIn
              </a>
              <a
                href={site.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-3 py-2 font-mono text-zinc-300 transition hover:border-teal-400/40 hover:text-white"
              >
                GitHub
              </a>
              <a
                href={site.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-3 py-2 font-mono text-zinc-300 transition hover:border-teal-400/40 hover:text-white"
              >
                Instagram
              </a>
              <a
                href={site.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-3 py-2 font-mono text-zinc-300 transition hover:border-teal-400/40 hover:text-white"
              >
                X / Twitter
              </a>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-3 py-2 font-mono text-zinc-300">
                <Battery className="h-4 w-4 text-amber-300" />
                Disponibilidad: proyectos selectos
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default function PersonalSite() {
  const [parallax, setParallax] = useState({ x: 0, y: 0 })
  const [showCue, setShowCue] = useState(false)
  const [phase, setPhase] = useState('hero')
  const [watchFrom, setWatchFrom] = useState(null)
  const [watchExpanded, setWatchExpanded] = useState(false)
  const [activeSection, setActiveSection] = useState(null)
  const [darkMode, setDarkMode] = useState(true)
  const [soundOn, setSoundOn] = useState(false)

  const watchRef = useRef(null)
  const audioCtxRef = useRef(null)
  const oscRef = useRef(null)
  const osc2Ref = useRef(null)

  useEffect(() => {
    const t = setTimeout(() => setShowCue(true), 2000)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (phase !== 'dashboard' || watchExpanded) return
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => setWatchExpanded(true))
    })
    return () => cancelAnimationFrame(id)
  }, [phase, watchExpanded])

  useEffect(() => {
    if (!soundOn) {
      if (oscRef.current) {
        try {
          oscRef.current.stop()
        } catch {
          /* noop */
        }
        oscRef.current = null
      }
      if (osc2Ref.current) {
        try {
          osc2Ref.current.stop()
        } catch {
          /* noop */
        }
        osc2Ref.current = null
      }
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {})
        audioCtxRef.current = null
      }
      return
    }
    const Ctx = window.AudioContext || window.webkitAudioContext
    if (!Ctx) return
    const ctx = new Ctx()
    audioCtxRef.current = ctx
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'sine'
    osc.frequency.value = 196
    gain.gain.value = 0.018
    const osc2 = ctx.createOscillator()
    osc2.type = 'triangle'
    osc2.frequency.value = 392.5
    const gain2 = ctx.createGain()
    gain2.gain.value = 0.008
    osc.connect(gain).connect(ctx.destination)
    osc2.connect(gain2).connect(ctx.destination)
    osc.start()
    osc2.start()
    oscRef.current = osc
    osc2Ref.current = osc2
    return () => {
      try {
        osc.stop()
        osc2.stop()
      } catch {
        /* noop */
      }
      ctx.close().catch(() => {})
    }
  }, [soundOn])

  const onMove = (e) => {
    const x = (e.clientX / window.innerWidth) * 2 - 1
    const y = (e.clientY / window.innerHeight) * 2 - 1
    setParallax({ x, y })
  }

  const openWatch = () => {
    const el = watchRef.current
    if (!el || phase !== 'hero') return
    const r = el.getBoundingClientRect()
    setWatchFrom({
      x: r.left + r.width / 2,
      y: r.top + r.height / 2,
      size: r.width,
    })
    setWatchExpanded(false)
    setPhase('dashboard')
  }

  const backToDashboard = () => setActiveSection(null)

  const backToHero = () => {
    setActiveSection(null)
    setPhase('hero')
    setWatchFrom(null)
    setWatchExpanded(false)
  }

  const onZone = (id) => setActiveSection(id)

  const shellBg = darkMode
    ? 'bg-zinc-950 text-zinc-100'
    : 'bg-amber-50 text-zinc-900'

  const target = 'min(70vmin, 92vw)'

  return (
    <div className={`relative min-h-svh overflow-x-hidden ${shellBg}`}>
      <div
        className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_20%_0%,rgba(251,191,36,0.12),transparent_45%),radial-gradient(circle_at_80%_100%,rgba(45,212,191,0.12),transparent_45%)]"
        aria-hidden
      />
      <GrainOverlay />

      <div className="relative z-10 mx-auto flex min-h-svh max-w-6xl flex-col items-center px-4 pb-10 pt-8 md:px-8">
        <header className="mb-8 w-full max-w-5xl text-left">
          <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-teal-400/90">
            {site.profession}
          </p>
          <h1 className="mt-2 font-serif text-3xl tracking-tight text-amber-50 md:text-4xl">
            <span className="block">{site.name}</span>
            <span className="mt-3 block text-lg font-normal leading-snug text-amber-200/80 md:text-xl">
              {site.tagline} — un recorrido en side-scroll, un Garmin gigante, tu mundo en la
              muñeca.
            </span>
          </h1>
        </header>

        <div
          className={`relative w-full transition-[filter,opacity,transform] ${
            phase !== 'hero'
              ? 'pointer-events-none blur-[14px] opacity-0 scale-[1.03]'
              : 'opacity-100'
          }`}
          style={{ transitionDuration: `${ZOOM_MS}ms`, transitionTimingFunction: ZOOM_EASE }}
        >
          <HeroScene
            parallax={parallax}
            onMove={onMove}
            showCue={showCue}
            watchRef={watchRef}
            onWatchClick={openWatch}
          />
        </div>

        {phase === 'dashboard' && watchFrom && !activeSection && (
          <div
            className="fixed inset-0 z-40 flex items-center justify-center bg-black/55 backdrop-blur-[2px] transition-opacity"
            style={{
              opacity: watchExpanded ? 1 : 0.55,
              transitionDuration: `${ZOOM_MS}ms`,
            }}
          />
        )}

        {phase === 'dashboard' && watchFrom && !activeSection && (
          <div
            className="fixed z-50 flex items-center justify-center"
            style={{
              left: watchExpanded ? '50vw' : `${watchFrom.x}px`,
              top: watchExpanded ? '50vh' : `${watchFrom.y}px`,
              width: watchExpanded ? target : `${watchFrom.size}px`,
              height: watchExpanded ? target : `${watchFrom.size}px`,
              transform: 'translate(-50%, -50%)',
              transition: `left ${ZOOM_MS}ms ${ZOOM_EASE}, top ${ZOOM_MS}ms ${ZOOM_EASE}, width ${ZOOM_MS}ms ${ZOOM_EASE}, height ${ZOOM_MS}ms ${ZOOM_EASE}`,
            }}
          >
            <div
              className={`h-full w-full transition-transform ${
                watchExpanded ? 'scale-100 rotate-0' : 'scale-90 rotate-[-4deg]'
              }`}
              style={{
                transitionDuration: `${ZOOM_MS}ms`,
                transitionTimingFunction: ZOOM_EASE,
              }}
            >
              <WatchFace
                darkMode={darkMode}
                onZone={onZone}
                onBackHero={backToHero}
                onToggleDark={() => setDarkMode((v) => !v)}
                onToggleSound={() => setSoundOn((v) => !v)}
                soundOn={soundOn}
              />
            </div>
          </div>
        )}

        {activeSection && (
          <div className="fixed inset-0 z-[55] flex items-center justify-center bg-black/65 px-3 py-6 backdrop-blur-sm md:px-6">
            <SectionPanel
              id={activeSection}
              darkMode={darkMode}
              onBack={backToDashboard}
            />
          </div>
        )}
      </div>
    </div>
  )
}
