# DECISIONS.md

## Tabs vs Accordion for Product Details Section
**Decision:** Tabs

**Justification:**
- Tabs provide a clear, always-visible navigation for Description, Specifications, and Reviews, which is more discoverable and user-friendly on desktop.
- Accordions are better for mobile, but tabs can be made responsive (stacked or scrollable on mobile).
- Tabs are a common pattern for PDPs in premium e-commerce, supporting quick comparison between sections.

## State Management: Context API
**Decision:** React Context API

**Justification:**
- The app is small-to-medium in scope, and Context API is sufficient for global state (cart, selected variant, etc.).
- No need for Redux or external state libraries, keeping dependencies minimal.
- Context API integrates well with hooks and localStorage for persistence.

## Routing
**Decision:** React Router (if multiple pages or deep-linking is needed)

**Justification:**
- Required for reflecting selected variant in the URL and supporting deep links.
- If only a single PDP is needed, routing can be minimal or skipped.

## CSS: SCSS Modules
**Decision:** SCSS Modules

**Justification:**
- Scoped styles prevent leakage and conflicts.
- SCSS features (nesting, variables, mixins) improve maintainability.
- No Tailwind or CSS-in-JS per requirements.

---

This file documents architectural and implementation decisions for maintainers and reviewers.