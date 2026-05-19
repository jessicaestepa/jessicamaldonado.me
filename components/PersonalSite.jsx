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
    title: site.about.title,
    tooltip: 'About',
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

function SectionBody({ id, compact = false }) {
  const text = compact
    ? 'w-full min-w-0 max-w-full break-words font-mono text-[10px] leading-relaxed text-zinc-300 [overflow-wrap:anywhere] sm:text-[11px]'
    : 'font-mono text-sm leading-relaxed text-zinc-300'

  if (id === 'about') {
    return (
      <article
        className={
          compact
            ? 'mx-auto w-full min-w-0 max-w-full space-y-3 break-words [overflow-wrap:anywhere]'
            : 'max-w-3xl space-y-4'
        }
      >
        {site.about.paragraphs.map((paragraph, i) => (
          <p key={i} className={text}>
            {paragraph}
          </p>
        ))}
      </article>
    )
  }

  if (id === 'projects') {
    return (
      <div className="space-y-2">
        {[
          { title: 'Atlas Notes', blurb: 'Notes surface with spatial cues.', tag: 'Web' },
          { title: 'Relay Forms', blurb: 'Composable form runtime.', tag: 'Product' },
        ].map((p) => (
          <div key={p.title} className="rounded-lg border border-white/10 bg-black/30 p-3">
            <p className="font-mono text-[9px] uppercase text-orange-400/90">{p.tag}</p>
            <p className="mt-1 font-mono text-[10px] font-semibold text-zinc-100">{p.title}</p>
            <p className={`mt-1 ${text} text-zinc-400`}>{p.blurb}</p>
          </div>
        ))}
      </div>
    )
  }

  if (id === 'now') {
    return <p className={text}>Portfolio, case studies, performance on mobile.</p>
  }
  if (id === 'journey') {
    return <p className={text}>Rappi → VC ops → Vorena micro-PE.</p>
  }
  if (id === 'writing') {
    return <p className={text}>Essays and field notes — coming soon.</p>
  }
  if (id === 'contact') {
    return (
      <a className={`${text} text-orange-300 underline`} href={`mailto:${site.email}`}>
        {site.email}
      </a>
    )
  }
  return null
}

function WatchFace({
  darkMode,
  activeSection,
  onZone,
  onBackToMenu,
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
    <div className="relative flex w-full items-center justify-center p-2 sm:p-4">
      <div className="relative aspect-square w-[min(98vmin,min(98vw,1100px))]">
        <div
          className="absolute -left-2 top-1/2 z-20 flex -translate-y-1/2 flex-col gap-2.5 sm:-left-3 md:-left-4"
          aria-label="Botones del reloj: volver, tema y sonido"
        >
          <GarminButton
            onClick={activeSection ? onBackToMenu : onBackHero}
            label={activeSection ? 'Volver al menú' : 'Volver al inicio'}
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
              className={`relative flex h-full w-full min-w-0 flex-col overflow-hidden rounded-full ring-2 ring-inset ${darkMode ? 'ring-zinc-800' : 'ring-zinc-400'} ${screen}`}
            >
              <div
                className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_18%,rgba(251,146,60,0.14),transparent_42%),radial-gradient(circle_at_50%_100%,rgba(0,0,0,0.35),transparent_55%)]"
                aria-hidden
              />
              {activeSection ? (
                <>
                  <div className="relative z-10 flex shrink-0 items-center justify-between gap-1 border-b border-orange-500/20 px-[12%] py-2.5">
                    <button
                      type="button"
                      onClick={onBackToMenu}
                      className="inline-flex items-center gap-1 rounded-md border border-orange-500/25 bg-black/40 px-2 py-1 font-mono text-[9px] uppercase tracking-wide text-orange-100/90 transition hover:border-orange-400/50"
                    >
                      <ArrowLeft className="h-3 w-3" strokeWidth={2} />
                      Menú
                    </button>
                    <p className="min-w-0 truncate px-1 text-center font-mono text-[9px] font-semibold uppercase tracking-wide text-orange-500 sm:text-[10px]">
                      {SECTIONS[activeSection].title}
                    </p>
                    <span className="w-12 shrink-0" aria-hidden />
                  </div>
                  <div className="watch-screen-scroll relative z-10 mx-auto min-h-0 w-full min-w-0 max-w-full flex-1 overflow-x-hidden overflow-y-auto overscroll-contain px-[14%] pb-14 pt-3 sm:px-[16%]">
                    <SectionBody id={activeSection} compact />
                  </div>
                </>
              ) : (
                <>
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
                </>
              )}
            </div>
          </div>
        </div>
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

        {phase === 'dashboard' && watchFrom && (
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
                activeSection={activeSection}
                onZone={onZone}
                onBackToMenu={backToDashboard}
                onBackHero={backToHero}
                onToggleDark={() => setDarkMode((v) => !v)}
                onToggleSound={() => setSoundOn((v) => !v)}
                soundOn={soundOn}
              />
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
