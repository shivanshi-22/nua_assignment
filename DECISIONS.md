
# Architectural Decisions & Reflections

## Key Architectural Decision: State Management

One architectural decision I could have gone either way on was how to manage global state—specifically, the cart and selected product variant. The main options were:

- **React Context API** (what I chose)

### Why Context API?
- **Simplicity:** For a small-to-medium app, Context is built-in, easy to set up, and doesn't require extra dependencies or boilerplate. The cart and variant state are not deeply nested or highly dynamic, so Context is sufficient.
- **Performance:** With careful memoization and separation of concerns, Context can be performant enough for this use case. Redux or Zustand would be overkill unless the app grows much larger.
- **Developer Experience:** Context is familiar to most React developers and integrates well with hooks and TypeScript.

### Why not Redux or Zustand?
- **Overhead:** These libraries add complexity and bundle size. For this project, the benefits (time-travel debugging, middleware, etc.) aren't needed.
- **Learning Curve:** Context is more approachable for contributors who may not know Redux/Zustand.

### Why not Prop Drilling?
- **Scalability:** Passing props through many layers quickly becomes unmanageable as the app grows. Context avoids this problem.

## What I'd Clean Up or Do Differently With More Time

- **Product Browsing & Filtering:** Currently, only the first women's clothing product is shown. With more time, I'd implement category browsing, filtering, and a product list page.
- **Image Gallery:** The gallery uses placeholder images for variety. In a real app, I'd support multiple real images per product, with zoom and swipe gestures on mobile.
- **Accessibility:** While basic ARIA labels are present, I'd invest more in keyboard navigation, focus management, and screen reader support.
- **Testing:** Add more unit and integration tests, especially for cart logic and URL state syncing.
- **Styling Consistency:** Some styles are hardcoded or duplicated. I'd refactor to use a design system or variables for colors, spacing, etc.
- **Error Handling:** Improve error boundaries and user feedback for network failures or invalid URLs.
- **SSR/SEO:** For a real storefront, I'd consider Next.js or SSR for better SEO and faster initial load.
- **Performance:** Optimize bundle size, lazy-load images/components, and audit for unnecessary re-renders.
