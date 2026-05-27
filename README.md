
# NUA Storefront

## Setup Steps

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Start the development server:**
   ```bash
   npm run dev
   ```
3. **Open your browser:**
   Visit [http://localhost:5173](http://localhost:5173) (or the port shown in your terminal).

---

## Design Decisions

- **React Context API for State Management:**
  - Used for global cart state and variant selection. Chosen for its simplicity and suitability for small/medium apps without extra dependencies.
- **Cart Persistence:**
  - Cart state is saved to `localStorage` and rehydrated on page load for a seamless user experience.
- **Deep-Linkable Variants:**
  - Selected color and size are reflected in the URL, allowing direct links to specific product configurations.
- **Component Structure:**
  - Modular components for gallery, product info, and details for maintainability and reusability.
- **Styling:**
  - SCSS modules for scoped, maintainable styles. Responsive design for desktop and mobile.
- **Fake Store API:**
  - Product data is fetched from [https://fakestoreapi.com](https://fakestoreapi.com) for demo purposes.

---

## Known Trade-offs

- **No Backend:**
  - All data is fetched from a public API; cart and user state are not synced across devices.
- **No Authentication:**
  - There is no user login or order history.
- **Gallery Images:**
  - Product images are simulated with placeholder services for variety; real e-commerce would use multiple product images per item.
- **Limited Product Filtering:**
  - Only the first women's clothing product is shown; browsing all products or categories is not implemented.
- **No Server-Side Rendering (SSR):**
  - The app is client-side only; SEO and initial load performance are not optimized for production.

---

## How to Contribute

1. Fork the repo
2. Create a feature branch
3. Commit and push your changes
4. Open a pull request

---

## License

MIT
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
