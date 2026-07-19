'use client'

import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { ArrowDown, ArrowUpRight, Moon, Sun } from 'lucide-react'
import { site } from '@/lib/site'
import { formatPostDate, type SubstackPost } from '@/lib/substack'

const NAV = [
  { id: 'about', label: 'About' },
  { id: 'splits', label: 'Splits' },
  { id: 'now', label: 'Now' },
  { id: 'writing', label: 'Wire' },
  { id: 'beyond', label: 'Beyond' },
  { id: 'contact', label: 'Contact' },
]

function t(ms: number): CSSProperties {
  return { '--t': `${ms}ms` } as CSSProperties
}

function useLocalTime() {
  const [time, setTime] = useState('--:--')
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZone: site.timeZone,
    })
    const tick = () => setTime(fmt.format(new Date()))
    tick()
    const id = setInterval(tick, 30_000)
    return () => clearInterval(id)
  }, [])
  return time
}

function useRaceCountdown() {
  const [days, setDays] = useState<number | null>(null)
  useEffect(() => {
    const race = new Date(site.race.date).getTime()
    const tick = () => setDays(Math.max(0, Math.ceil((race - Date.now()) / 86_400_000)))
    tick()
    const id = setInterval(tick, 60_000)
    return () => clearInterval(id)
  }, [])
  return days
}

/** Scroll progress measured in marathon kilometers. */
function useKmProgress() {
  const [km, setKm] = useState(0)
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      const p = max > 0 ? window.scrollY / max : 0
      setKm(Math.round(p * site.doc.distance * 10) / 10)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return km
}

/** Time on course since the page loaded — the visitor's "official time". */
function useOfficialTime() {
  const [elapsed, setElapsed] = useState('00:00:00')
  useEffect(() => {
    const start = Date.now()
    const tick = () => {
      const s = Math.floor((Date.now() - start) / 1000)
      const hh = String(Math.floor(s / 3600)).padStart(2, '0')
      const mm = String(Math.floor((s % 3600) / 60)).padStart(2, '0')
      const ss = String(s % 60).padStart(2, '0')
      setElapsed(`${hh}:${mm}:${ss}`)
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])
  return elapsed
}

/** The one orchestrated moment below the fold: split rows time in on first view. */
function useSplitReveal(ref: React.RefObject<HTMLTableSectionElement | null>) {
  useEffect(() => {
    const body = ref.current
    if (!body || !('IntersectionObserver' in window)) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          Array.from(body.rows).forEach((row, i) => {
            row.style.setProperty('--t', `${i * 140}ms`)
            row.classList.add('time-in')
          })
          io.disconnect()
        })
      },
      { threshold: 0.3 },
    )
    io.observe(body)
    return () => io.disconnect()
  }, [ref])
}

function Header() {
  const time = useLocalTime()
  const km = useKmProgress()
  const [scrolled, setScrolled] = useState(false)
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    const current = document.documentElement.dataset.theme
    if (current === 'light' || current === 'dark') setTheme(current)
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light'
    setTheme(next)
    document.documentElement.dataset.theme = next
    try {
      localStorage.setItem('jm-theme', next)
    } catch {
      /* noop */
    }
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-[color:var(--line)] bg-[color:var(--paper)]/90 backdrop-blur-md'
          : 'border-b border-transparent'
      }`}
    >
      <div className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between px-5 md:px-8">
        <a
          href="#top"
          className={`font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--accent)] transition-opacity duration-300 ${
            scrolled ? 'opacity-100' : 'opacity-0'
          }`}
          tabIndex={scrolled ? 0 : -1}
          aria-hidden={!scrolled}
        >
          {site.doc.label}
        </a>

        <nav className="hidden items-center gap-6 md:flex" aria-label="Sections">
          {NAV.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="link-sweep font-mono text-[10px] uppercase tracking-[0.22em] text-[color:var(--muted)] transition-colors hover:text-[color:var(--ink)]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <p className="hidden font-mono text-[10px] uppercase tracking-[0.14em] text-[color:var(--muted)] sm:block">
            KM <span className="tabular-nums text-[color:var(--ink)]">{km.toFixed(1)}</span> /{' '}
            {site.doc.distance}
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[color:var(--muted)]">
            <span className="tabular-nums text-[color:var(--ink)]">{time}</span> CDMX
          </p>
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === 'light' ? 'Night race mode' : 'Race day mode'}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-[color:var(--line)] text-[color:var(--muted)] transition hover:border-[color:var(--accent)] hover:text-[color:var(--ink)]"
          >
            {theme === 'light' ? (
              <Moon className="h-3.5 w-3.5" strokeWidth={2} />
            ) : (
              <Sun className="h-3.5 w-3.5" strokeWidth={2} />
            )}
          </button>
        </div>
      </div>
    </header>
  )
}

function Masthead() {
  const days = useRaceCountdown()
  return (
    <section id="top" className="mx-auto w-full max-w-5xl px-5 pt-28 md:px-8 md:pt-36">
      <div className="time-in border-t-[3px] border-[color:var(--rule)]" style={t(0)}>
        <div className="flex items-baseline justify-between pt-3">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-[color:var(--ink)]">
            {site.doc.label.split(' ')[0]}{' '}
            <span className="text-[color:var(--accent)]">{site.doc.label.split(' ')[1]}</span>
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--muted)]">
            {site.doc.bib}
          </p>
        </div>
      </div>

      <h1
        className="time-in mt-10 text-[13vw] font-extrabold uppercase leading-[0.92] tracking-[-0.03em] text-[color:var(--ink)] md:text-8xl"
        style={t(120)}
      >
        {site.displayName}
      </h1>
      <p
        className="time-in mt-4 font-mono text-[11px] uppercase tracking-[0.22em] text-[color:var(--muted)]"
        style={t(220)}
      >
        {site.profession} · {site.city}
      </p>

      <p
        className="time-in mt-12 max-w-2xl text-2xl font-medium leading-snug tracking-[-0.01em] md:text-[2rem]"
        style={t(320)}
      >
        {site.hero.heading}
      </p>
      <p
        className="time-in mt-5 max-w-xl text-base leading-relaxed text-[color:var(--muted)] md:text-lg"
        style={t(400)}
      >
        {site.hero.sub}
      </p>

      <div className="time-in mt-10 flex flex-wrap items-center gap-6" style={t(480)}>
        <a
          href="#contact"
          className="inline-flex items-center gap-2 bg-[color:var(--accent)] px-6 py-3 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--accent-ink)] transition hover:bg-[color:var(--accent-bright)]"
        >
          {site.hero.ctaPrimary}
          <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.5} />
        </a>
        <a
          href="#about"
          className="link-sweep inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-[color:var(--muted)] hover:text-[color:var(--ink)]"
        >
          {site.hero.ctaSecondary}
          <ArrowDown className="h-3.5 w-3.5" strokeWidth={2} />
        </a>
      </div>

      <div
        className="time-in mt-16 flex items-center justify-between gap-6 border-b border-[color:var(--line)] pb-5"
        style={t(560)}
      >
        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[color:var(--muted)]">
          Next start: Berlin · {site.race.displayDate} ·{' '}
          <span className="font-semibold text-[color:var(--accent)]">
            T−{days ?? '--'} days
          </span>
        </p>
        <div className="barcode h-6 w-28 shrink-0 md:w-40" aria-hidden />
      </div>
    </section>
  )
}

function Vitals() {
  const days = useRaceCountdown()
  const items = [
    { label: 'Race', value: `${site.race.shortLabel} · T−${days ?? '--'}`, live: true },
    { label: 'Base', value: site.city, live: false },
    { label: 'Acquisitions', value: site.vitals.acquisitions, live: false },
    { label: 'Training', value: site.vitals.training, live: false },
    { label: 'Commits', value: site.vitals.commits, live: false },
  ]
  return (
    <section aria-label="Vitals" className="mx-auto w-full max-w-5xl px-5 md:px-8">
      <div className="vitals-scroll flex w-full items-stretch overflow-x-auto border-b border-[color:var(--line)]">
        {items.map((item, i) => (
          <div
            key={item.label}
            className={`flex shrink-0 flex-col gap-1 py-4 pr-8 ${
              i > 0 ? 'border-l border-[color:var(--line-soft)] pl-8' : ''
            }`}
          >
            <p className="font-mono text-[9px] uppercase tracking-[0.26em] text-[color:var(--faint)]">
              {item.label}
            </p>
            <p className="flex items-center gap-2 whitespace-nowrap font-mono text-xs font-semibold uppercase tracking-[0.1em] tabular-nums text-[color:var(--ink)]">
              {item.live && <span className="live-dot" aria-hidden />}
              {item.value}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

function SectionRule({ label }: { label: string }) {
  return (
    <div className="border-t-2 border-[color:var(--rule)] pt-3">
      <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-[color:var(--muted)]">
        <span className="font-semibold text-[color:var(--accent)]">Section</span> — {label}
      </p>
    </div>
  )
}

function About() {
  return (
    <section id="about" className="mx-auto w-full max-w-5xl scroll-mt-24 px-5 pt-24 md:px-8 md:pt-32">
      <SectionRule label={site.about.title} />
      <div className="mt-10 grid gap-10 md:grid-cols-[1fr_240px] md:gap-16">
        <div className="max-w-2xl space-y-6">
          {site.about.paragraphs.map((paragraph, i) => (
            <p key={i} className="text-lg leading-relaxed md:text-xl md:leading-[1.7]">
              {paragraph}
            </p>
          ))}
          <p className="!mt-12 text-3xl font-extrabold uppercase leading-tight tracking-[-0.02em] md:text-4xl">
            I don&apos;t sprint.
            <br />I <span className="bg-[color:var(--mint)] px-1 text-[color:var(--accent)]">compound</span>.
          </p>
        </div>
        <aside className="max-w-[240px] self-start border-l border-[color:var(--line)] pl-5 md:mt-2">
          <p className="font-mono text-[9px] uppercase tracking-[0.26em] text-[color:var(--faint)]">
            Margin note
          </p>
          <p className="mt-2 text-[13px] italic leading-relaxed text-[color:var(--muted)]">
            {site.about.marginNote}
          </p>
        </aside>
      </div>
    </section>
  )
}

function Splits() {
  const bodyRef = useRef<HTMLTableSectionElement | null>(null)
  useSplitReveal(bodyRef)

  return (
    <section id="splits" className="mx-auto w-full max-w-5xl scroll-mt-24 px-5 pt-24 md:px-8 md:pt-32">
      <SectionRule label="The splits" />
      <p className="mt-4 max-w-md text-sm leading-relaxed text-[color:var(--muted)]">
        Every race reads better in splits. So does a career.
      </p>
      <div className="mt-8 overflow-x-auto">
        <table className="w-full min-w-[560px] border-collapse">
          <thead>
            <tr className="border-b-2 border-[color:var(--rule)]">
              <th className="w-20 pb-2 text-left font-mono text-[9px] font-semibold uppercase tracking-[0.24em] text-[color:var(--faint)]">
                Split
              </th>
              <th className="pb-2 text-left font-mono text-[9px] font-semibold uppercase tracking-[0.24em] text-[color:var(--faint)]">
                Stage
              </th>
              <th className="pb-2 text-right font-mono text-[9px] font-semibold uppercase tracking-[0.24em] text-[color:var(--faint)]">
                Result
              </th>
            </tr>
          </thead>
          <tbody ref={bodyRef}>
            {site.splits.map((split) => (
              <tr
                key={split.km}
                className={`align-top ${split.live ? '' : 'border-b border-[color:var(--line-soft)]'}`}
              >
                <td className="py-6 pr-4 font-mono text-xs font-semibold tabular-nums text-[color:var(--muted)]">
                  {split.km}
                </td>
                <td className="max-w-xl py-6 pr-8">
                  <p className="text-xl font-bold tracking-[-0.01em] md:text-2xl">{split.name}</p>
                  <p className="mt-2 text-[15px] leading-relaxed text-[color:var(--muted)] md:text-base">
                    {split.body}
                  </p>
                </td>
                <td className="py-6 text-right">
                  <span
                    className={`inline-flex items-center gap-2 whitespace-nowrap font-mono text-[11px] font-semibold uppercase tracking-[0.16em] ${
                      split.live ? 'text-[color:var(--accent)]' : 'text-[color:var(--ink)]'
                    }`}
                  >
                    {split.result}
                    {split.live && <span className="live-dot" aria-hidden />}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

function Now() {
  return (
    <section id="now" className="mx-auto w-full max-w-5xl scroll-mt-24 px-5 pt-24 md:px-8 md:pt-32">
      <SectionRule label="This season" />
      <ul className="mt-10 max-w-2xl space-y-5">
        {site.now.map((item, i) => (
          <li key={i} className="flex items-start gap-4 text-lg leading-relaxed md:text-xl">
            <span
              className="mt-[0.5em] font-mono text-sm leading-none text-[color:var(--accent)]"
              aria-hidden
            >
              →
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}

function Writing({ post }: { post: SubstackPost }) {
  const date = formatPostDate(post.pubDate)
  return (
    <section id="writing" className="mx-auto w-full max-w-5xl scroll-mt-24 px-5 pt-24 md:px-8 md:pt-32">
      <SectionRule label="On the wire" />
      <div className="mt-10 grid gap-12 md:grid-cols-[1.4fr_1fr] md:gap-0">
        <article className="md:pr-12">
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[color:var(--muted)]">
            Substack
            {date ? (
              <>
                {' '}
                · <span className="text-[color:var(--ink)]">{date}</span>
              </>
            ) : null}
          </p>
          <h2 className="mt-4 text-3xl font-extrabold tracking-[-0.02em] md:text-4xl">
            <a
              href={post.link}
              target="_blank"
              rel="noreferrer noopener"
              className="link-sweep transition-colors hover:text-[color:var(--accent)]"
            >
              {post.title}
            </a>
          </h2>
          {post.description ? (
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-[color:var(--muted)]">
              {post.description}
            </p>
          ) : null}
          <a
            href={post.link}
            target="_blank"
            rel="noreferrer noopener"
            className="link-sweep mt-8 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.22em] text-[color:var(--accent)]"
          >
            Read on Substack
            <ArrowUpRight className="h-3 w-3" strokeWidth={2} />
          </a>
        </article>

        <aside className="md:border-l md:border-[color:var(--line-soft)] md:pl-12">
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[color:var(--muted)]">
            On X
          </p>
          <a
            href={site.social.twitter}
            target="_blank"
            rel="noreferrer noopener"
            className="mt-4 block"
          >
            <p className="text-2xl font-bold tracking-[-0.01em] transition-colors hover:text-[color:var(--accent)] md:text-3xl">
              {site.social.twitterHandle}
            </p>
          </a>
          <p className="mt-4 text-[15px] leading-relaxed text-[color:var(--muted)]">
            Thoughts in public — deals, training, and whatever I&apos;m building.
          </p>
          <a
            href={site.social.twitter}
            target="_blank"
            rel="noreferrer noopener"
            className="link-sweep mt-8 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.22em] text-[color:var(--accent)]"
          >
            View profile
            <ArrowUpRight className="h-3 w-3" strokeWidth={2} />
          </a>
        </aside>
      </div>
    </section>
  )
}

function Beyond() {
  return (
    <section id="beyond" className="mx-auto w-full max-w-5xl scroll-mt-24 px-5 pt-24 md:px-8 md:pt-32">
      <SectionRule label="Beyond the desk" />
      <div className="mt-10 grid gap-10 md:grid-cols-3 md:gap-0">
        {site.beyond.map((card, i) => (
          <article
            key={card.title}
            className={`md:pr-10 ${i > 0 ? 'md:border-l md:border-[color:var(--line-soft)] md:pl-10' : ''}`}
          >
            <h3 className="text-lg font-bold tracking-[-0.01em]">{card.title}</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-[color:var(--muted)]">{card.body}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

function Contact() {
  const socials = [
    { label: 'LinkedIn', href: site.social.linkedin },
    { label: 'GitHub', href: site.social.github },
    { label: 'X', href: site.social.twitter },
    { label: 'Substack', href: site.social.substack },
    { label: 'Instagram', href: site.social.instagram },
  ]
  return (
    <section id="contact" className="mx-auto w-full max-w-5xl scroll-mt-24 px-5 pt-24 md:px-8 md:pt-32">
      <SectionRule label={site.contact.kicker} />
      <div className="mt-10 max-w-3xl">
        <h2 className="text-4xl font-extrabold uppercase leading-[1.02] tracking-[-0.02em] md:text-6xl">
          {site.contact.heading}
        </h2>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-[color:var(--muted)]">
          {site.contact.body}
        </p>
        <a
          href={`mailto:${site.email}`}
          className="link-sweep mt-10 inline-block text-xl font-bold tracking-[-0.01em] text-[color:var(--accent)] md:text-3xl"
        >
          {site.email}
        </a>
        <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4">
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noreferrer noopener"
              className="link-sweep inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.22em] text-[color:var(--muted)] transition-colors hover:text-[color:var(--ink)]"
            >
              {social.label}
              <ArrowUpRight className="h-3 w-3" strokeWidth={2} />
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

function FinishLine() {
  const elapsed = useOfficialTime()
  const commit = process.env.NEXT_PUBLIC_COMMIT ?? 'local'
  return (
    <footer className="mx-auto mt-24 w-full max-w-5xl px-5 pb-10 md:px-8 md:mt-32">
      <div className="border-t-[3px] border-[color:var(--rule)] pt-4">
        <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[color:var(--muted)]">
            Official time{' '}
            <span className="ml-2 font-semibold tabular-nums text-[color:var(--ink)]">{elapsed}</span>
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[color:var(--muted)]">
            Finisher — <span className="text-[color:var(--ink)]">{site.name}</span>
          </p>
          <div className="barcode h-5 w-24" aria-hidden />
        </div>
        <div className="mt-6 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 border-t border-[color:var(--line-soft)] pt-4">
          <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-[color:var(--faint)]">
            © {new Date().getFullYear()} · {site.city} · Built in public, one commit at a time
          </p>
          <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-[color:var(--faint)]">
            Set in Archivo &amp; IBM Plex Mono · Next.js · commit{' '}
            <span className="text-[color:var(--accent)]">{commit}</span>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default function Site({ latestPost }: { latestPost: SubstackPost }) {
  return (
    <div className="relative min-h-svh">
      <Header />
      <main>
        <Masthead />
        <div className="mt-14">
          <Vitals />
        </div>
        <About />
        <Splits />
        <Now />
        <Writing post={latestPost} />
        <Beyond />
        <Contact />
      </main>
      <FinishLine />
    </div>
  )
}
