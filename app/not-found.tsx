import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-svh w-full max-w-5xl flex-col justify-center px-5 md:px-8">
      <div className="border-t-[3px] border-[color:var(--rule)] pt-3">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.24em]">
          Official <span className="text-[color:var(--accent)]">Result</span>
        </p>
      </div>
      <h1 className="mt-10 text-5xl font-extrabold uppercase leading-[0.95] tracking-[-0.03em] md:text-7xl">
        Wrong turn.
      </h1>
      <p className="mt-6 max-w-md text-lg leading-relaxed text-[color:var(--muted)]">
        This isn&apos;t on the course. Error 404 — the marshals have been notified.
      </p>
      <Link
        href="/"
        className="mt-10 inline-flex w-fit items-center gap-2 bg-[color:var(--accent)] px-6 py-3 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--accent-ink)] transition hover:bg-[color:var(--accent-bright)]"
      >
        Back to the start line
      </Link>
      <div className="mt-16 flex items-center justify-between border-b border-[color:var(--line)] pb-4">
        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[color:var(--muted)]">
          KM —.— / 42.2
        </p>
        <div className="barcode h-5 w-24" aria-hidden />
      </div>
    </main>
  )
}
