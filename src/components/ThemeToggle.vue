<script setup lang="ts">
import { useTheme } from '../composables/useTheme'

const { theme, toggleTheme } = useTheme()
</script>

<template>
  <button
    class="toggle"
    type="button"
    :aria-label="theme === 'dark' ? 'Activer le mode clair' : 'Activer le mode sombre'"
    :title="theme === 'dark' ? 'Activer le mode clair' : 'Activer le mode sombre'"
    @click="toggleTheme"
  >
    <span class="icon sun" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
      </svg>
    </span>
    <span class="icon moon" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
    </span>
  </button>
</template>

<style scoped>
.toggle {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 10;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 1px solid var(--border);
  background: var(--card-bg);
  color: var(--text-h);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: var(--shadow);
  transition:
    transform 0.25s ease,
    border-color 0.25s ease,
    background 0.3s ease;
}

.toggle:hover {
  transform: scale(1.08);
  border-color: var(--accent-border);
}

.toggle:active {
  transform: scale(0.95);
}

.toggle:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

.icon {
  width: 20px;
  height: 20px;
  display: flex;
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.icon svg {
  width: 100%;
  height: 100%;
}

.sun {
  position: absolute;
  opacity: 0;
  transform: rotate(90deg) scale(0.5);
}

.moon {
  position: absolute;
  opacity: 1;
  transform: rotate(0deg) scale(1);
}

:global([data-theme='light']) .sun {
  opacity: 1;
  transform: rotate(0deg) scale(1);
}

:global([data-theme='light']) .moon {
  opacity: 0;
  transform: rotate(-90deg) scale(0.5);
}
</style>
