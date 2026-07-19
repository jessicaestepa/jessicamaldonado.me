import { site } from '@/lib/site'

export type SubstackPost = {
  title: string
  description: string
  link: string
  pubDate: string
}

const FALLBACK_POST: SubstackPost = {
  title: 'Remote Work Privatized Connection',
  description:
    "We didn't stop wanting people. We lost the low-cost encounters that made connection part of ordinary life.",
  link: 'https://jessicamaldonado423298.substack.com/p/remote-work-privatized-connection',
  pubDate: 'Fri, 17 Jul 2026 01:25:17 GMT',
}

function stripCdata(value: string): string {
  return value.replace(/^<!\[CDATA\[([\s\S]*?)\]\]>$/, '$1').trim()
}

function decodeEntities(value: string): string {
  return stripCdata(value)
    .replace(/&#(\d+);/g, (_, code: string) => String.fromCharCode(Number(code)))
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&nbsp;/g, ' ')
}

function tagValue(xml: string, tag: string): string | null {
  const re = new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)</${tag}>`, 'i')
  const match = xml.match(re)
  if (!match?.[1]) return null
  return decodeEntities(match[1])
}

function parseLatestItem(xml: string): SubstackPost | null {
  const item = xml.match(/<item>([\s\S]*?)<\/item>/i)?.[1]
  if (!item) return null

  const title = tagValue(item, 'title')
  const link = tagValue(item, 'link')
  const description = tagValue(item, 'description')
  const pubDate = tagValue(item, 'pubDate')

  if (!title || !link) return null

  return {
    title,
    link,
    description: description ?? '',
    pubDate: pubDate ?? '',
  }
}

/** Latest Substack post from the public RSS feed. Revalidates hourly. */
export async function getLatestSubstackPost(): Promise<SubstackPost> {
  try {
    const res = await fetch(`${site.social.substack}/feed`, {
      next: { revalidate: 3600 },
      headers: { Accept: 'application/rss+xml, application/xml, text/xml, */*' },
    })
    if (!res.ok) return FALLBACK_POST

    const post = parseLatestItem(await res.text())
    return post ?? FALLBACK_POST
  } catch {
    return FALLBACK_POST
  }
}

export function formatPostDate(pubDate: string): string {
  const date = new Date(pubDate)
  if (Number.isNaN(date.getTime())) return ''
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date)
}
