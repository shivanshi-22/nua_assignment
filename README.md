# Premium Outdoor Gear Store - Product Detail Page (PDP)

A production-quality React 18+ (TypeScript) Product Detail Page for a premium outdoor gear store, built with Vite and SCSS modules.

## Features
- Image gallery with zoom, thumbnails, and responsive layout
- Product info panel with color/size/quantity selection, sale pricing, and delivery estimate
- Cart state persisted in localStorage
- Product details section with tabs (Description, Specifications, Reviews)
- Responsive design for desktop and mobile
- Context API for global state management
- Deep-linkable variant selection via URL
- Data from [Fake Store API](https://fakestoreapi.com)

## Stack
- React 18+ with hooks
- TypeScript
- Vite
- SCSS Modules
- Context API
- React Router (for deep-linking)

## Project Structure
- `/src/components` — UI components
- `/src/hooks` — custom hooks
- `/src/stores` — global state
- `/src/router` — routing
- `/src/data` — local constants/config
- `/src/styles` — global styles
- `/tests` — unit tests
- `/docs` — documentation and Lighthouse screenshot

## Getting Started
1. Clone the repo
2. Run `npm install`
3. Run `npm run dev` (Node 18+ required)

## Decisions
See [DECISIONS.md](DECISIONS.md) for architectural choices.

---

This project is structured for maintainability and real-world use, not as a tutorial.
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
