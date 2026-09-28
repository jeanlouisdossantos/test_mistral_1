import { onMounted, ref } from 'vue'

type Theme = 'light' | 'dark'

const theme = ref<Theme>('light')

function systemTheme(): Theme {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function applyTheme(value: Theme) {
  document.documentElement.dataset.theme = value
}

export function useTheme() {
  onMounted(() => {
    const stored = localStorage.getItem('theme') as Theme | null
    theme.value = stored ?? systemTheme()
    applyTheme(theme.value)
  })

  function toggleTheme() {
    theme.value = theme.value === 'dark' ? 'light' : 'dark'
    localStorage.setItem('theme', theme.value)
    applyTheme(theme.value)
  }

  return { theme, toggleTheme }
}
