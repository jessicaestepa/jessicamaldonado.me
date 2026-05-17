'use client'

import { useEffect, useRef, useState } from 'react'
import {
  ArrowDown,
  ArrowLeft,
  Battery,
  Calendar,
  Heart,
  MapPin,
  Moon,
  Mountain,
  Settings,
  Sun,
  Timer,
  Volume2,
  VolumeX,
} from 'lucide-react'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import { site } from '@/lib/site'

const ZOOM_MS = 900
const ZOOM_EASE = 'cubic-bezier(0.34, 1.35, 0.64, 1)'
const WATCH_EXPANDED_SIZE = 'min(98vmin, min(98vw, 1100px))'

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

function HeroScene({ parallax, onMove, showCue, watchRef, onWatchClick, darkMode }) {
  const { x, y } = parallax
  const runnerParallax = { transform: `translate3d(${x * 10}px, ${y * 6}px, 0)` }

  const shell =
    darkMode === false
      ? 'bg-gradient-to-b from-amber-50 via-slate-100 to-slate-200'
      : 'bg-zinc-950'

  return (
    <div
      className={`relative min-h-svh w-screen max-w-[100vw] overflow-hidden ${shell}`}
      style={{ marginLeft: 'calc(50% - 50vw)', marginRight: 'calc(50% - 50vw)' }}
      onMouseMove={onMove}
      role="presentation"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_50%_40%,rgba(251,191,36,0.12),transparent_55%),radial-gradient(ellipse_80%_50%_at_50%_100%,rgba(45,212,191,0.08),transparent_50%)]"
        aria-hidden
      />

      <div
        className="absolute inset-0 flex items-stretch justify-center"
        style={{ ...runnerParallax, transition: 'transform 120ms linear' }}
      >
        <div className="hero-runner-bob relative h-full min-h-svh w-full">
          <div
            className="absolute inset-0 min-h-svh w-full"
            role="img"
            aria-label="Animación: chica corriendo"
          >
            <DotLottieReact
              src="/lottie/girl-running.lottie"
              loop
              autoplay
              layout={{ fit: 'cover', align: [0.5, 0.55] }}
              className="h-full min-h-svh w-full [&_canvas]:!h-full [&_canvas]:!w-full"
            />
          </div>
        </div>
      </div>

      <div
        className={`pointer-events-none absolute inset-x-0 bottom-0 z-10 flex flex-col items-center bg-gradient-to-t pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-32 ${
          darkMode === false
            ? 'from-slate-200 via-slate-200/90 to-transparent'
            : 'from-zinc-950 via-zinc-950/85 to-transparent'
        }`}
      >
        <div className="pointer-events-auto flex flex-col items-center gap-3 px-4">
          <ArrowDown
            className={`h-8 w-8 motion-safe:animate-bounce ${
              darkMode === false ? 'text-amber-700' : 'text-amber-200/90'
            }`}
            strokeWidth={2.5}
            aria-hidden
          />
          <button
            ref={watchRef}
            type="button"
            onClick={onWatchClick}
            className={`rounded-full px-10 py-3 text-sm font-semibold tracking-wide shadow-lg transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
              darkMode === false
                ? 'bg-zinc-900 text-amber-50 shadow-zinc-900/20 hover:bg-zinc-800 focus-visible:ring-zinc-500 focus-visible:ring-offset-amber-50'
                : 'bg-amber-500 text-zinc-950 shadow-amber-500/25 hover:bg-amber-400 focus-visible:ring-amber-300 focus-visible:ring-offset-zinc-950'
            }`}
            aria-label="Abrir el tablero"
          >
            Click here
          </button>
          <p
            className={`max-w-md text-center text-xs ${
              darkMode === false ? 'text-zinc-600' : 'text-zinc-400'
            } ${showCue ? 'opacity-100' : 'opacity-0'} transition-opacity duration-700`}
            style={{
              animation: showCue ? 'cue-fade 900ms ease-out forwards' : 'none',
            }}
          >
            Usa el botón para abrir el tablero tipo reloj.
          </p>
        </div>
      </div>
    </div>
  )
}

function GarminButton({ className = '', onClick, label, active = false, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className={`flex items-center justify-center rounded-md bg-gradient-to-b from-zinc-500 via-zinc-700 to-zinc-900 shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_2px_6px_rgba(0,0,0,0.45)] ring-1 ring-black/70 transition hover:from-zinc-400 hover:via-zinc-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/80 ${active ? 'ring-orange-500/60' : ''} ${className}`}
    >
      {children}
    </button>
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
  const [clock, setClock] = useState('')

  useEffect(() => {
    const tick = () =>
      setClock(
        new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
      )
    tick()
    const id = setInterval(tick, 30_000)
    return () => clearInterval(id)
  }, [])

  const zones = [
    { id: 'about', row: 'row-start-1 col-start-1', accent: 'border-rose-500/25 bg-rose-950/40' },
    { id: 'projects', row: 'row-start-1 col-start-2', accent: 'border-cyan-500/25 bg-cyan-950/35' },
    { id: 'now', row: 'row-start-2 col-start-1', accent: 'border-orange-500/35 bg-orange-950/35' },
    { id: 'journey', row: 'row-start-2 col-start-2', accent: 'border-emerald-500/25 bg-emerald-950/35' },
    { id: 'writing', row: 'row-start-3 col-start-1', accent: 'border-indigo-500/25 bg-indigo-950/35' },
    { id: 'contact', row: 'row-start-3 col-start-2', accent: 'border-zinc-400/20 bg-zinc-900/50' },
  ]

  const screen = darkMode
    ? 'bg-zinc-950 text-zinc-100'
    : 'bg-zinc-200 text-zinc-900'

  return (
    <div className="relative flex w-full items-center justify-center p-0">
      <div className="relative aspect-square w-[min(98vmin,min(98vw,1100px))]">
        <div
          className="absolute -left-2 top-1/2 z-20 flex -translate-y-1/2 flex-col gap-2.5 sm:-left-3 md:-left-5 lg:-left-6"
          aria-label="Botones del reloj: volver, tema y sonido"
        >
          <GarminButton
            onClick={onBackHero}
            label="Volver al inicio"
            className="h-12 w-3.5 sm:h-14 sm:w-4"
          >
            <ArrowLeft className="h-4 w-4 text-zinc-200" strokeWidth={2.5} />
          </GarminButton>
          <GarminButton
            onClick={onToggleDark}
            label={darkMode ? 'Modo claro' : 'Modo oscuro'}
            className="h-14 w-3.5 sm:h-16 sm:w-4"
          >
            {darkMode ? (
              <Sun className="h-3.5 w-3.5 text-amber-300" strokeWidth={2} />
            ) : (
              <Moon className="h-3.5 w-3.5 text-zinc-300" strokeWidth={2} />
            )}
          </GarminButton>
          <GarminButton
            onClick={onToggleSound}
            label={soundOn ? 'Apagar sonido' : 'Activar sonido'}
            active={soundOn}
            className="h-12 w-3.5 sm:h-14 sm:w-4"
          >
            {soundOn ? (
              <Volume2 className="h-3.5 w-3.5 text-orange-400" strokeWidth={2} />
            ) : (
              <VolumeX className="h-3.5 w-3.5 text-zinc-400" strokeWidth={2} />
            )}
          </GarminButton>
        </div>

        <div
          className="relative h-full w-full rounded-full bg-gradient-to-br from-zinc-600 via-zinc-800 to-zinc-950 p-[3px] shadow-[0_32px_90px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.12)] ring-1 ring-orange-600/25"
          role="img"
          aria-label="Pantalla circular estilo Garmin"
        >
          <div className="h-full w-full rounded-full bg-gradient-to-b from-zinc-700 to-zinc-950 p-[10px] ring-1 ring-zinc-500/40">
            <div
              className={`relative flex h-full w-full flex-col overflow-hidden rounded-full ring-2 ring-inset ${darkMode ? 'ring-zinc-800' : 'ring-zinc-400'} ${screen}`}
            >
              <div
                className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_18%,rgba(251,146,60,0.14),transparent_42%),radial-gradient(circle_at_50%_100%,rgba(0,0,0,0.35),transparent_55%)]"
                aria-hidden
              />
              <div className="relative z-10 shrink-0 border-b border-orange-500/20 px-4 pb-2 pt-4 text-center sm:pt-5">
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.45em] text-orange-500 sm:text-xs">
                  Menú
                </p>
                <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.2em] text-zinc-500 sm:text-[10px]">
                  {clock || '--:--'}
                </p>
              </div>
              <div className="relative z-10 grid min-h-0 flex-1 grid-cols-2 grid-rows-3 gap-2 px-3 pb-9 pt-2 sm:gap-2.5 sm:px-4 sm:pb-10">
                {zones.map((z) => {
                  const meta = SECTIONS[z.id]
                  const Icon = meta.icon
                  return (
                    <button
                      key={z.id}
                      type="button"
                      onClick={() => onZone(z.id)}
                      className={`group flex flex-col items-center justify-center gap-1.5 rounded-md border bg-zinc-900/70 px-1.5 py-2.5 text-center transition hover:border-orange-500/50 hover:bg-zinc-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/70 sm:py-3 ${z.accent} ${z.row} ${darkMode ? '' : 'bg-white/80'}`}
                    >
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-sm bg-black/40 text-orange-400 ring-1 ring-orange-500/20 transition group-hover:text-orange-300 sm:h-9 sm:w-9">
                        {z.id === 'contact' ? (
                          <>
                            <Battery className="h-3.5 w-3.5 sm:h-4 sm:w-4" strokeWidth={2} />
                            <Settings className="h-3.5 w-3.5 sm:h-4 sm:w-4" strokeWidth={2} />
                          </>
                        ) : (
                          <Icon className="h-4 w-4 sm:h-[18px] sm:w-[18px]" strokeWidth={2} />
                        )}
                      </span>
                      <p className="font-mono text-[10px] font-semibold uppercase leading-tight tracking-wide text-zinc-100 sm:text-xs">
                        {meta.title}
                      </p>
                      <p className="font-mono text-[8px] uppercase tracking-wider text-orange-500/70 opacity-80 sm:text-[9px]">
                        {z.id === 'contact' ? 'Ajustes' : 'Campo'}
                      </p>
                    </button>
                  )
                })}
              </div>
              <p className="pointer-events-none absolute bottom-3 left-1/2 z-10 -translate-x-1/2 font-mono text-[8px] font-semibold uppercase tracking-[0.55em] text-zinc-600 sm:text-[9px]">
                Garmin
              </p>
            </div>
          </div>
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
      className={`section-dive relative mx-auto flex h-[min(78vh,760px)] w-[min(92vw,980px)] flex-col overflow-hidden rounded-3xl border shadow-[0_40px_120px_rgba(0,0,0,0.45)] backdrop-blur-md ${panel}`}
    >
      <div className="pointer-events-none absolute inset-0 rounded-3xl ring-4 ring-zinc-900/90 ring-inset" />
      <div className="pointer-events-none absolute inset-2 rounded-2xl ring-1 ring-orange-500/25" />

      <header className="relative z-10 flex items-center justify-between gap-3 border-b border-orange-500/15 px-5 py-4 md:px-8">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-orange-500/90">
            Pantalla Garmin
          </p>
          <h2 className="font-mono text-xl font-semibold uppercase tracking-wide text-zinc-100 md:text-2xl">
            {meta.title}
          </h2>
        </div>
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 rounded-md border border-orange-500/25 bg-zinc-900/60 px-3 py-2 font-mono text-xs uppercase tracking-wide text-orange-100/90 shadow-inner transition hover:border-orange-400/50 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/70"
        >
          <ArrowLeft className="h-4 w-4" strokeWidth={2} />
          <span className="hidden sm:inline">Volver</span>
        </button>
      </header>

      <div className={`relative z-10 flex-1 overflow-y-auto px-5 py-6 md:px-10 md:py-8 ${bodyClass}`}>
        {id === 'about' && (
          <article className="max-w-3xl">
            <p className="font-serif text-lg leading-relaxed text-amber-50/95">
              Hola, soy Jessica Maldonado Estepa — trabajo en diseño de producto e interfaces que se
              sienten claras, cuidadas y humanas. Como Jessica Maldonado, he construido piezas donde
              el detalle importa tanto como el resultado.
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
    const onKey = (e) => {
      if (e.key !== 'Escape') return
      if (activeSection) {
        setActiveSection(null)
        return
      }
      if (phase === 'dashboard') {
        setPhase('hero')
        setWatchFrom(null)
        setWatchExpanded(false)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [activeSection, phase])

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

  const target = WATCH_EXPANDED_SIZE

  return (
    <div className={`relative min-h-svh overflow-x-hidden ${shellBg}`}>
      <div
        className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_20%_0%,rgba(251,191,36,0.12),transparent_45%),radial-gradient(circle_at_80%_100%,rgba(45,212,191,0.12),transparent_45%)]"
        aria-hidden
      />
      <GrainOverlay />

      <div className="relative z-10 mx-auto flex min-h-svh w-full max-w-full flex-col">
        <header className="pointer-events-none absolute inset-x-0 top-0 z-30 px-4 pt-8 text-left md:px-8">
          <h1
            className={`pointer-events-auto font-serif text-2xl font-semibold tracking-tight drop-shadow-md md:text-3xl ${
              darkMode ? 'text-zinc-100' : 'text-zinc-900'
            }`}
          >
            {site.name}
          </h1>
        </header>

        <div
          className={`relative w-full flex-1 transition-[filter,opacity,transform] ${
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
            darkMode={darkMode}
          />
        </div>

        {phase === 'dashboard' && watchFrom && !activeSection && (
          <div
            role="presentation"
            className="fixed inset-0 z-40 cursor-pointer bg-black/55 backdrop-blur-[2px] transition-opacity"
            style={{
              opacity: watchExpanded ? 1 : 0.55,
              transitionDuration: `${ZOOM_MS}ms`,
            }}
            onClick={backToHero}
          />
        )}

        {phase === 'dashboard' && watchFrom && !activeSection && (
          <button
            type="button"
            onClick={backToHero}
            className="fixed left-4 top-[max(1rem,env(safe-area-inset-top))] z-[60] inline-flex items-center gap-2 rounded-full border border-white/15 bg-zinc-900/90 px-4 py-2.5 text-sm font-medium text-zinc-100 shadow-lg backdrop-blur-sm transition hover:border-amber-400/50 hover:bg-zinc-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/80"
          >
            <ArrowLeft className="h-4 w-4 shrink-0" strokeWidth={2} />
            Volver al inicio
          </button>
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
