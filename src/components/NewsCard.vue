<script setup lang="ts">
import type { NewsItem } from '../api/hackernews'
import { timeAgo } from '../api/hackernews'

defineProps<{
  item: NewsItem
  index: number
}>()

function hostname(url: string | null): string {
  if (!url) return 'news.ycombinator.com'
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return 'news.ycombinator.com'
  }
}

function discussionUrl(id: number): string {
  return `https://news.ycombinator.com/item?id=${id}`
}
</script>

<template>
  <a
    class="news-card"
    :href="item.url ?? discussionUrl(item.id)"
    target="_blank"
    rel="noopener noreferrer"
    :style="{ animationDelay: `${index * 60}ms` }"
  >
    <div class="rank">{{ String(index + 1).padStart(2, '0') }}</div>
    <div class="content">
      <h3 class="title">{{ item.title }}</h3>
      <div class="meta">
        <span class="host">{{ hostname(item.url) }}</span>
        <span class="dot" aria-hidden="true">·</span>
        <span class="score">▲ {{ item.points }}</span>
        <span class="dot" aria-hidden="true">·</span>
        <span class="author">{{ item.author }}</span>
        <span class="dot" aria-hidden="true">·</span>
        <span class="time">{{ timeAgo(item.createdAt) }}</span>
        <span class="dot" aria-hidden="true">·</span>
        <span class="comments">
          {{ item.commentCount }} {{ item.commentCount > 1 ? 'commentaires' : 'commentaire' }}
        </span>
      </div>
    </div>
    <div class="arrow" aria-hidden="true">→</div>
  </a>
</template>

<style scoped>
.news-card {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 20px 24px;
  border: 1px solid var(--border);
  border-radius: 16px;
  background: var(--card-bg);
  text-decoration: none;
  color: inherit;
  transition:
    transform 0.25s cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 0.25s ease,
    border-color 0.25s ease;
  animation: card-in 0.5s cubic-bezier(0.22, 1, 0.36, 1) backwards;
}

.news-card:hover {
  transform: translateY(-3px);
  border-color: var(--accent-border);
  box-shadow: var(--shadow);
}

.news-card:hover .arrow {
  transform: translateX(4px);
  color: var(--accent);
}

.rank {
  font-family: var(--mono);
  font-size: 15px;
  font-weight: 600;
  color: var(--accent);
  background: var(--accent-bg);
  border-radius: 10px;
  min-width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.content {
  flex: 1;
  min-width: 0;
}

.title {
  margin: 0 0 6px;
  font-size: 17px;
  font-weight: 600;
  line-height: 1.4;
  color: var(--text-h);
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: var(--text-muted);
}

.dot {
  opacity: 0.5;
}

.host {
  color: var(--accent);
  font-weight: 500;
}

.score {
  font-weight: 600;
}

.arrow {
  font-size: 20px;
  color: var(--text-muted);
  transition:
    transform 0.25s ease,
    color 0.25s ease;
  flex-shrink: 0;
}

@keyframes card-in {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 640px) {
  .news-card {
    padding: 16px;
    gap: 14px;
  }
  .rank {
    display: none;
  }
}
</style>
