'use client'

import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import { site } from '@/lib/site'

export default function PersonalSite() {
  return (
    <main className="fixed inset-0 overflow-hidden bg-zinc-950">
      <h1 className="sr-only">{site.name}</h1>

      <DotLottieReact
        src="/lottie/girl-running.lottie"
        loop
        autoplay
        layout={{ fit: 'cover', align: [0.5, 0.45] }}
        className="absolute inset-0 h-full w-full [&_canvas]:!h-full [&_canvas]:!w-full"
        aria-hidden
      />

      <section
        className="absolute inset-x-0 bottom-0 z-10 max-h-[min(58svh,520px)] overflow-y-auto bg-gradient-to-t from-zinc-950 via-zinc-950/95 to-transparent px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-20 sm:px-8 md:px-12"
        aria-labelledby="about-heading"
      >
        <div className="mx-auto max-w-2xl">
          <h2
            id="about-heading"
            className="font-mono text-[11px] font-semibold uppercase tracking-[0.35em] text-orange-500"
          >
            {site.about.title}
          </h2>
          <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-zinc-200 sm:text-base sm:leading-relaxed">
            {site.about.paragraphs.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
