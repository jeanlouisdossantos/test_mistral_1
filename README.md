# Mistral News

Écran d'accueil affichant les **10 dernières actualités concernant Mistral AI**, agrégées en direct depuis Hacker News (API Algolia).

Construit avec **Vite**, **Vue 3** et **TypeScript**.

## Fonctionnalités

- 🔎 Récupération en direct des 10 dernières stories Hacker News mentionnant « mistral »
- ✨ Entrées animées en cascade et skeleton loading (shimmer)
- 🌗 Thème clair / sombre automatique (`prefers-color-scheme`)
- 📱 Design fluide et responsive (mobile-first, layout adaptatif)
- ♿ Accessibilité : `aria-live`, focus visible, respect de `prefers-reduced-motion`
- 🔄 Gestion d'erreur avec bouton « Réessayer »

## Démarrage

```bash
npm install
npm run dev
```

L'application est alors disponible sur l'URL locale affichée par Vite (par défaut `http://localhost:5173`).

## Scripts

| Commande          | Description                              |
| ----------------- | ---------------------------------------- |
| `npm run dev`     | Serveur de développement avec HMR        |
| `npm run build`  | Vérification TypeScript + build prod     |
| `npm run preview` | Prévisualisation du build de production  |

## Structure

```
src/
├── api/
│   └── hackernews.ts        # Client API Hacker News (Algolia) + helpers
├── components/
│   ├── NewsCard.vue         # Carte d'une actualité
│   └── NewsList.vue         # Liste, états loading / erreur / données
├── App.vue                  # Écran d'accueil (hero + feed + footer)
├── main.ts                  # Point d'entrée
└── style.css                # Design tokens & thème clair/sombre
```

## Source des données

Les actualités proviennent de l'API publique [Hacker News (Algolia)](https://hn.algolia.com/api) :
`https://hn.algolia.com/api/v1/search?query=mistral&tags=story&hitsPerPage=10`
