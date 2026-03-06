# PULSE Design System — Documentation

A standalone documentation site for the **PULSE Design System**, extracted from Figma and built with Vue 3 + Vite. Modeled after Supernova/Zeroheight with a clean, minimal light theme.

**Live site:** https://typocollector-kindof.github.io/medicare-pulse-documentation/

---

## Tech Stack

| Tool | Version |
|------|---------|
| Vue 3 | ^3.5 |
| Vite | ^7.3 |
| Vue Router | ^4.6 |
| Tailwind CSS v4 | ^4.2 |
| Heroicons | ^2.2 |

---

## Project Structure

```
pulse-docs/
├── index.html
├── vite.config.js
├── package.json
└── src/
    ├── main.js
    ├── App.vue
    ├── style/
    │   └── main.css              # Tailwind @theme + base styles
    ├── router/
    │   └── index.js              # Routes + NAV_TREE (single source of truth for nav)
    ├── data/
    │   ├── tokens.js             # All PULSE tokens organized by Figma variable collection
    │   ├── components.js         # Component registry (slug, label, description, storybookUrl)
    │   ├── componentSpecs.js     # Detailed per-component specs (variants, sizes, tokens, anatomy)
    │   └── icons.js              # Heroicons (324) + custom Medicare icons (12) as SVG path data
    ├── components/
    │   ├── layout/
    │   │   ├── AppLayout.vue     # Sidebar + topbar shell
    │   │   └── AppSidebar.vue    # Collapsible nav sections with active state
    │   └── ui/
    │       ├── PageHeader.vue    # Title + description + divider
    │       ├── TabGroup.vue      # Tab switcher (Design / Storybook)
    │       ├── ColorSwatch.vue   # Color square + token name + hex
    │       └── TokenRow.vue      # Generic token display row
    └── views/
        ├── introduction/
        │   ├── OverviewView.vue
        │   └── GettingStartedView.vue
        ├── foundations/
        │   ├── ColorsView.vue    # Primitive color grid + semantic token groups
        │   ├── TypographyView.vue
        │   ├── SpacingView.vue
        │   ├── ShadowsView.vue
        │   └── IconsView.vue     # Heroicons + Medicare icons with search & copy
        └── components/
            └── ComponentView.vue # Dynamic page driven by :slug param
```

---

## Site Sections

### Introduction
- **Overview** — Design system mission and principles
- **Getting Started** — Installation and usage guidelines

### Foundations
- **Colors** — Primitive palette + semantic token mapping (background, text, border, icon, shadow). Sourced from Figma variable collections `_root colors` and `theme`.
- **Typography** — Font families, size scale, weight scale, line height, letter spacing. Sourced from `_root font` and `global` collections.
- **Spacing & Layout** — Space scale, layout padding/gap/radius/size/border tokens. Sourced from `_root global` and `global` collections.
- **Shadows** — Shadow color tokens and position/blur numeric tokens.
- **Icons** — 336 total icons in two collections:
  - **Heroicons** (324) — outline and solid variants with toggle
  - **Medicare** (12) — custom brand icons exported from Figma
  - Search by name, click any icon to copy its name

### Components
Each component page is driven by the `:slug` route param and displays:
- **Design tab** — variants/states grid, sizes, token usage table, anatomy, do/don't guidelines
- **Storybook tab** — iframe embed when `storybookUrl` is set, placeholder otherwise

Currently documented: **Button**, **Input**, **Badge**, **Card**, **Modal**

---

## Token Data

Tokens are organized by Figma variable collection in `src/data/tokens.js`:

| Export | Figma Collection | Contents |
|--------|-----------------|----------|
| `rootColors` | `_root colors` | Primitive palette (brand, gray, green, red, orange, blue, base, charts) |
| `rootFont` | `_root font` | Font family, size, weight, line-height, letter-spacing |
| `global` | `global` | Layout (padding, gap, radius, border, size), shadow position/blur, font families |
| `theme` | `theme` | Semantic tokens (background, text, link, icon, shadow, border, charts) |
| `rootGlobal` | `_root global` | Space scale, opacity, gutter, border-width, size, radius |

---

## Adding a New Component

1. Add an entry to `src/data/components.js`:
```js
{ slug: 'tooltip', label: 'Tooltip', description: '...', storybookUrl: null }
```

2. Add detailed specs to `src/data/componentSpecs.js`:
```js
tooltip: {
  figmaNodeId: '...',
  description: '...',
  properties: [...],
  sizes: [...],
  variants: [...],   // or statuses: [...] for form components
  anatomy: [...],
  doList: [...],
  dontList: [...],
}
```

3. The component page renders automatically at `/components/tooltip`.

---

## Adding a Storybook URL

In `src/data/components.js`, set `storybookUrl` for the component:
```js
{ slug: 'button', label: 'Button', storybookUrl: 'https://your-storybook.com/?path=/docs/button--docs' }
```

The Storybook tab will render an iframe automatically.

---

## Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

Dev server runs at `http://localhost:5173`.

---

## Deployment

The site is deployed to GitHub Pages from the `gh-pages` branch (built files only, no source).

```bash
# Build
npm run build

# Copy dist and push to gh-pages
cp -r dist /tmp/pulse-pages
touch /tmp/pulse-pages/.nojekyll
cd /tmp/pulse-pages
git init && git checkout -b gh-pages
git add -A && git commit -m "Deploy"
git push --force https://github.com/typocollector-kindof/medicare-pulse-documentation.git gh-pages
```

- **Source** (`main` branch): full Vue project
- **Pages** (`gh-pages` branch): built `dist` only
- **Base path**: `/medicare-pulse-documentation/` (set in `vite.config.js` and Vue Router)
- **SPA routing**: `public/404.html` redirect handles direct URL access on GitHub Pages
