<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { fetchMistralNews, type NewsItem } from '../api/hackernews'
import NewsCard from './NewsCard.vue'

const news = ref<NewsItem[]>([])
const loading = ref(true)
const error = ref<string | null>(null)
const lastUpdated = ref<Date | null>(null)

async function load() {
  loading.value = true
  error.value = null
  try {
    news.value = await fetchMistralNews(10)
    lastUpdated.value = new Date()
  } catch (e) {
    error.value =
      e instanceof Error ? e.message : 'Erreur inconnue lors du chargement des actualités.'
  } finally {
    loading.value = false
  }
}

onMounted(load)
</script>

<template>
  <section class="news-list" aria-live="polite">
    <div v-if="error" class="state error">
      <p class="state-icon" aria-hidden="true">⚠️</p>
      <p class="state-title">Impossible de charger les actualités</p>
      <p class="state-text">{{ error }}</p>
      <button class="retry" @click="load">Réessayer</button>
    </div>

    <template v-else-if="loading">
      <div v-for="i in 5" :key="i" class="skeleton" :aria-hidden="true">
        <div class="skeleton-rank"></div>
        <div class="skeleton-body">
          <div class="skeleton-line w-80"></div>
          <div class="skeleton-line w-50"></div>
        </div>
      </div>
    </template>

    <template v-else>
      <NewsCard v-for="(item, i) in news" :key="item.id" :item="item" :index="i" />
      <p v-if="lastUpdated" class="updated">
        Dernière mise à jour : {{ lastUpdated.toLocaleTimeString('fr-FR') }}
      </p>
    </template>
  </section>
</template>

<style scoped>
.news-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.state {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 48px 24px;
  text-align: center;
}

.state-icon {
  font-size: 32px;
  margin: 0;
}

.state-title {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: var(--text-h);
}

.state-text {
  margin: 0;
  font-size: 14px;
  color: var(--text-muted);
}

.retry {
  margin-top: 12px;
  padding: 10px 24px;
  border: 1px solid var(--accent-border);
  border-radius: 999px;
  background: var(--accent-bg);
  color: var(--accent);
  font: inherit;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: box-shadow 0.25s ease;
}

.retry:hover {
  box-shadow: var(--shadow);
}

.retry:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

.skeleton {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 20px 24px;
  border: 1px solid var(--border);
  border-radius: 16px;
  background: var(--card-bg);
}

.skeleton-rank {
  width: 44px;
  height: 44px;
  border-radius: 10px;
  flex-shrink: 0;
}

.skeleton-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.skeleton-line {
  height: 14px;
  border-radius: 7px;
}

.w-80 {
  width: 80%;
}

.w-50 {
  width: 50%;
}

.skeleton-rank,
.skeleton-line {
  background: linear-gradient(90deg, var(--skeleton-a) 25%, var(--skeleton-b) 50%, var(--skeleton-a) 75%);
  background-size: 200% 100%;
  animation: shimmer 1.4s ease-in-out infinite;
}

.updated {
  margin: 8px 0 0;
  text-align: center;
  font-size: 12px;
  color: var(--text-muted);
}

@keyframes shimmer {
  from {
    background-position: 200% 0;
  }
  to {
    background-position: -200% 0;
  }
}
</style>
