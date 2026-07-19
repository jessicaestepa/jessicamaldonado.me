import Site from '@/components/Site'
import { getLatestSubstackPost } from '@/lib/substack'

export default async function Home() {
  const latestPost = await getLatestSubstackPost()
  return <Site latestPost={latestPost} />
}
