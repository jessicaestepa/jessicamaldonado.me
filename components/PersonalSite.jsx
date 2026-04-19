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
      <rect width="900" height="420" fill="#ffffff" />
      <path
        d="M0 360 L0 300 L80 300 L80 260 L140 260 L140 280 L220 280 L220 240 L300 240 L300 280 L380 280 L380 220 L460 220 L460 280 L540 280 L540 250 L620 250 L620 300 L700 300 L700 260 L780 260 L780 300 L860 300 L860 240 L900 240 L900 360 Z"
        fill="#bbf7d0"
        stroke="#14532d"
        strokeWidth="3"
      />
      <path
        d="M0 420 L0 360 L900 360 L900 420 Z"
        fill="#4ade80"
        stroke="#14532d"
        strokeWidth="3"
      />
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
      <div className="absolute inset-0 overflow-hidden opacity-100" style={slow}>
        <div className="flex h-full w-[200%] will-change-transform" style={track(38)}>
          <HillStrip />
          <HillStrip />
        </div>
      </div>
      <div className="absolute inset-0 overflow-hidden opacity-95" style={mid}>
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

function PixelCloud({ className = '' }) {
  return (
    <div className={`flex items-end gap-0.5 ${className}`} aria-hidden>
      <div className="h-5 w-10 border-2 border-black bg-neutral-200" />
      <div className="mb-2 h-5 w-6 border-2 border-black bg-neutral-200" />
      <div className="h-5 w-8 border-2 border-black bg-neutral-200" />
    </div>
  )
}

function HeroScene({ parallax, onMove, showCue, watchRef, onWatchClick }) {
  const { x, y } = parallax
  const skyX = x * 14
  const skyY = y * 8
  const runnerParallax = { transform: `translate3d(${x * 10}px, ${y * 5}px, 0)` }
  const stroke = '#0a0a0a'
  const sw = 3

  return (
    <div
      className="relative h-[min(86vh,720px)] w-full max-w-5xl overflow-hidden rounded-lg border-4 border-black bg-white shadow-[8px_8px_0_0_rgba(23,23,23,0.9)]"
      onMouseMove={onMove}
      role="presentation"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, #000 0, #000 1px, transparent 1px, transparent 4px), repeating-linear-gradient(90deg, #000 0, #000 1px, transparent 1px, transparent 4px)',
          backgroundSize: '4px 4px',
        }}
        aria-hidden
      />

      <div
        className="absolute inset-x-0 top-6 flex justify-center gap-16 md:gap-24"
        style={{
          transform: `translate3d(${skyX}px, ${skyY}px, 0)`,
          transition: 'transform 120ms linear',
        }}
      >
        <PixelCloud />
        <PixelCloud className="scale-110" />
        <PixelCloud className="hidden sm:flex" />
      </div>

      <div className="absolute inset-x-0 bottom-0 top-[22%]">
        <ScrollingBackdrop parallax={parallax} />
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-[18%] h-1 bg-black" aria-hidden />

      <div
        className="absolute bottom-0 left-0 right-0 flex h-[18%] items-start justify-center border-t-4 border-black bg-emerald-400 pt-2"
        aria-hidden
      >
        <span className="font-mono text-[10px] font-black uppercase tracking-[0.35em] text-emerald-950">
          ················
        </span>
      </div>

      <div
        className="absolute bottom-[3%] left-1/2 z-10 w-[min(96vw,520px)] -translate-x-1/2 will-change-transform md:bottom-[4%]"
        style={{ ...runnerParallax, transition: 'transform 120ms linear' }}
      >
        <div className="hero-runner-bob relative mx-auto">
          <svg
            className="relative z-0 block w-full"
            viewBox="0 0 480 300"
            role="img"
            aria-label="Muñeca en estilo videojuego retro corriendo de perfil"
            style={{ shapeRendering: 'crispEdges' }}
          >
            <ellipse cx="248" cy="278" rx="68" ry="12" fill="#000" opacity="0.12" />

            <rect x="158" y="72" width="20" height="56" rx="2" fill="#713f12" stroke={stroke} strokeWidth={sw} />
            <rect x="178" y="78" width="14" height="48" rx="2" fill="#92400e" stroke={stroke} strokeWidth={sw} />

            <circle cx="228" cy="98" r="44" fill="#fecaca" stroke={stroke} strokeWidth={sw} />

            <rect x="188" y="92" width="36" height="14" fill="#fbcfe8" stroke={stroke} strokeWidth={sw} />
            <rect x="196" y="84" width="10" height="10" fill={stroke} />
            <rect x="214" y="84" width="10" height="10" fill={stroke} />
            <rect x="204" y="102" width="12" height="4" fill={stroke} />
            <rect x="200" y="108" width="6" height="6" fill="#fb7185" stroke={stroke} strokeWidth="1.5" />
            <rect x="218" y="108" width="6" height="6" fill="#fb7185" stroke={stroke} strokeWidth="1.5" />

            <rect x="210" y="136" width="36" height="12" fill="#fecaca" stroke={stroke} strokeWidth={sw} />

            <path
              d="M188 148 L268 148 L258 228 L198 228 Z"
              fill="#fbcfe8"
              stroke={stroke}
              strokeWidth={sw}
              strokeLinejoin="miter"
            />
            <rect x="208" y="160" width="40" height="8" fill="#facc15" stroke={stroke} strokeWidth={2} />

            <g transform="translate(228, 218)">
              <g className="hero-leg-back">
                <path
                  d="M0 0 L-8 44 L-36 82"
                  fill="none"
                  stroke="#fecaca"
                  strokeWidth="20"
                  strokeLinecap="square"
                  strokeLinejoin="miter"
                />
                <rect x="-48" y="76" width="28" height="12" fill="#fff" stroke={stroke} strokeWidth={sw} />
                <rect x="-50" y="86" width="32" height="8" fill="#171717" stroke={stroke} strokeWidth={2} />
              </g>
              <g className="hero-leg-front">
                <path
                  d="M0 0 L10 46 L44 78"
                  fill="none"
                  stroke="#fecaca"
                  strokeWidth="20"
                  strokeLinecap="square"
                  strokeLinejoin="miter"
                />
                <rect x="32" y="72" width="28" height="12" fill="#fff" stroke={stroke} strokeWidth={sw} />
                <rect x="30" y="82" width="32" height="8" fill="#171717" stroke={stroke} strokeWidth={2} />
              </g>
            </g>

            <g className="hero-arm-back" transform="translate(248, 150)">
              <path
                d="M0 0 L28 38 L48 52"
                fill="none"
                stroke="#fecaca"
                strokeWidth="16"
                strokeLinecap="square"
              />
              <rect x="44" y="46" width="14" height="14" fill="#fecaca" stroke={stroke} strokeWidth={sw} />
            </g>

            <rect x="232" y="148" width="20" height="28" fill="#fbcfe8" stroke={stroke} strokeWidth={sw} />
            <path
              d="M232 160 L168 172 L128 176"
              fill="none"
              stroke="#fecaca"
              strokeWidth="16"
              strokeLinecap="square"
            />

            <path
              d="M128 176 L96 182"
              fill="none"
              stroke="#fecaca"
              strokeWidth="14"
              strokeLinecap="square"
            />
          </svg>

          <div
            className="pointer-events-none absolute left-[20.5%] top-[46%] z-[19] -translate-x-1/2 -translate-y-full text-neutral-900"
            aria-hidden
          >
            <span className="hero-pointer-nudge inline-flex drop-shadow-[1px_1px_0_#fff]">
              <MousePointer2 className="h-9 w-9 md:h-11 md:w-11" strokeWidth={2.5} />
            </span>
          </div>

          <div
            className="pointer-events-none absolute left-[20.5%] top-[52%] z-[18] flex h-[min(48vw,260px)] w-[min(48vw,260px)] -translate-x-1/2 -translate-y-1/2 items-center justify-center"
            aria-hidden
          >
            <span className="hero-watch-ring h-full w-full rounded-full border-4 border-amber-500" />
          </div>

          <div className="absolute left-[20.5%] top-[52%] z-20 -translate-x-1/2 -translate-y-1/2">
            <button
              ref={watchRef}
              type="button"
              onClick={onWatchClick}
              className="group relative flex aspect-square w-[clamp(10rem,38vmin,17rem)] cursor-pointer items-center justify-center rounded-full focus:outline-none focus-visible:ring-4 focus-visible:ring-amber-500"
              aria-label="Abrir panel del reloj"
              style={{
                animation:
                  'watch-glow 2.2s ease-in-out infinite, hero-watch-pulse 1.05s ease-in-out infinite',
              }}
            >
              <span className="pointer-events-none absolute inset-[-12px] rounded-full border-4 border-amber-500/70" />
              <span className="absolute inset-0 rounded-full bg-amber-400/35 blur-lg" />
              <span className="relative flex h-[86%] w-[86%] flex-col items-center justify-center gap-0.5 rounded-full border-4 border-black bg-gradient-to-b from-zinc-500 to-zinc-900 p-2 shadow-[inset_0_3px_0_rgba(255,255,255,0.25),0_10px_0_#000,0_14px_0_rgba(0,0,0,0.25)] ring-4 ring-amber-400 ring-offset-4 ring-offset-white">
                <span className="absolute top-1.5 text-[8px] font-black uppercase tracking-widest text-amber-200">
                  Pulsa
                </span>
                <span className="flex h-[56%] w-[56%] flex-col items-center justify-center rounded-full border-2 border-teal-400 bg-[#020617]">
                  <Heart className="h-7 w-7 text-rose-400 md:h-9 md:w-9" strokeWidth={2.2} fill="#fb7185" />
                  <span className="mt-0.5 font-mono text-[9px] font-bold text-teal-300">142</span>
                </span>
                <span className="text-[7px] font-black uppercase tracking-[0.15em] text-zinc-400">Garmin</span>
              </span>
            </button>
          </div>

          <div
            className="pointer-events-none absolute left-[20.5%] top-[74%] z-[21] w-[min(88%,240px)] -translate-x-1/2 text-center"
            aria-hidden
          >
            <span className="inline-block border-2 border-black bg-amber-300 px-3 py-1.5 font-mono text-[10px] font-black uppercase tracking-wide text-black shadow-[3px_3px_0_#000]">
              ¡Pulsa el reloj!
            </span>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-2 flex justify-center px-4">
        <p
          className={`max-w-lg text-center font-mono text-[10px] font-bold uppercase tracking-wide text-neutral-600 md:text-xs ${
            showCue ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            transition: 'opacity 800ms ease',
            animation: showCue ? 'cue-fade 900ms ease-out forwards' : 'none',
          }}
        >
          El reloj es el botón del juego — ábrelo para el tablero.
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
        <header className="mb-6 w-full max-w-5xl text-left">
          <h1
            className={`font-serif text-2xl font-semibold tracking-tight md:text-3xl ${
              darkMode ? 'text-zinc-100' : 'text-zinc-900'
            }`}
          >
            {site.name}
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
