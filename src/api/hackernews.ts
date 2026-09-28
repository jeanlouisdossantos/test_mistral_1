export interface NewsItem {
  id: number
  title: string
  url: string | null
  points: number
  author: string
  createdAt: string
  commentCount: number
}

interface AlgoliaHit {
  objectID: string
  title: string | null
  url: string | null
  points: number | null
  author: string | null
  created_at: string | null
  num_comments: number | null
}

interface AlgoliaResponse {
  hits: AlgoliaHit[]
}

export async function fetchMistralNews(limit = 10): Promise<NewsItem[]> {
  const response = await fetch(
    `https://hn.algolia.com/api/v1/search?query=mistral&tags=story&hitsPerPage=${limit}`,
  )
  if (!response.ok) {
    throw new Error(`Hacker News API error: ${response.status}`)
  }
  const data: AlgoliaResponse = await response.json()
  return data.hits
    .filter((hit) => hit.title !== null)
    .map((hit) => ({
      id: Number(hit.objectID),
      title: hit.title as string,
      url: hit.url,
      points: hit.points ?? 0,
      author: hit.author ?? 'unknown',
      createdAt: hit.created_at ?? new Date().toISOString(),
      commentCount: hit.num_comments ?? 0,
    }))
}

export function timeAgo(isoDate: string): string {
  const seconds = Math.floor((Date.now() - new Date(isoDate).getTime()) / 1000)
  if (seconds < 60) return "à l'instant"
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `il y a ${minutes} min`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `il y a ${hours} h`
  const days = Math.floor(hours / 24)
  if (days < 30) return `il y a ${days} j`
  const months = Math.floor(days / 30)
  return `il y a ${months} mois`
}
