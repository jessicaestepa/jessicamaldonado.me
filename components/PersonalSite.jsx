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
        layout={{ fit: 'cover', align: [0.5, 0.55] }}
        className="h-full w-full min-h-svh [&_canvas]:!h-full [&_canvas]:!w-full"
        aria-label="Animación: chica corriendo"
      />
    </main>
  )
}
