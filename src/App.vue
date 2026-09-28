<script setup lang="ts">
import NewsList from './components/NewsList.vue'

const year = new Date().getFullYear()
</script>

<template>
  <div class="page">
    <header class="hero">
      <p class="badge">
        <span class="pulse" aria-hidden="true"></span>
        Live · Hacker News
      </p>
      <h1>Actualités <span class="gradient">Mistral AI</span></h1>
      <p class="subtitle">
        Les 10 dernières actualités concernant Mistral, agrégées depuis Hacker News.
      </p>
    </header>

    <main class="feed">
      <NewsList />
    </main>

    <footer class="footer">
      <p>Données fournies par l'API Hacker News (Algolia) · {{ year }}</p>
    </footer>
  </div>
</template>

<style scoped>
.page {
  width: min(860px, 100% - 40px);
  margin: 0 auto;
  padding: 64px 0 40px;
  display: flex;
  flex-direction: column;
  min-height: 100svh;
  box-sizing: border-box;
}

.hero {
  text-align: center;
  margin-bottom: 48px;
  animation: fade-up 0.6s cubic-bezier(0.22, 1, 0.36, 1);
}

.badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 14px;
  border: 1px solid var(--accent-border);
  border-radius: 999px;
  background: var(--accent-bg);
  color: var(--accent);
  font-size: 13px;
  font-weight: 600;
  margin: 0 0 20px;
}

.pulse {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--accent);
  animation: pulse 2s ease-in-out infinite;
}

h1 {
  margin: 0 0 16px;
  font-size: clamp(36px, 6vw, 56px);
  line-height: 1.1;
  letter-spacing: -1.5px;
}

.gradient {
  background: linear-gradient(120deg, var(--accent), #ff8a5c);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.subtitle {
  margin: 0 auto;
  max-width: 520px;
  font-size: 17px;
  line-height: 1.6;
  color: var(--text-muted);
}

.feed {
  flex: 1;
}

.footer {
  margin-top: 48px;
  padding-top: 24px;
  border-top: 1px solid var(--border);
  text-align: center;
  font-size: 13px;
  color: var(--text-muted);
}

.footer p {
  margin: 0;
}

@keyframes fade-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
    box-shadow: 0 0 0 0 var(--accent-border);
  }
  50% {
    opacity: 0.6;
    box-shadow: 0 0 0 6px transparent;
  }
}
</style>
