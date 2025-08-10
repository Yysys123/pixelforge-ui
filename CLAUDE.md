PixelForge UI — Full plan

1 — High-level decisions (guiding principles)
	•	License: MIT.
	•	Language: TypeScript (strict).
	•	Styling: CSS variables + utility-first integration (Tailwind-compatible tokens). Default internal styles use CSS variables so consumers can override. Offer optional Tailwind plugin to map tokens.
	•	Architecture: Monorepo (pnpm workspaces) with separate packages: core (tokens & utils), react (components), icons, docs, storybook. This keeps bundles small and tree-shakeable.
	•	Build tool: tsup for library builds (fast, produces ESM/CJS/types). Optionally rollup if you need fine control.
	•	Bundling target: ESM + CJS + type declarations. Side-exports to enable tree-shaking.
	•	Performance: small, focused components; no heavy runtime CSS-in-JS. Use CSS variables + minimal runtime. Avoid large runtime libs.
	•	Accessibility: follow WAI-ARIA patterns, aria attributes, keyboard navigation. Use automated + manual audits.
	•	Testing: Unit tests (React Testing Library + Jest), E2E & visual (Playwright or Cypress + Percy/Playwright snapshots), accessibility (axe/jest-axe + cypress-axe).
	•	Docs: Storybook (MDX) with live examples, API docs, theming docs, and interactive playgrounds. Host docs on GitHub Pages / Vercel.
	•	Publishing: public npm package pixelforge-ui or scoped @pixelforge/ui depending on preference. CI-driven publish on GitHub release (semantic-release or manual).

SAMPLE CARD REACT CODE:
```tsx
import React from 'react';
import styled from 'styled-components';

const Card = () => {
  return (
    <StyledWrapper>
      <div className="card">
        <div className="card-pattern-grid" />
        <div className="card-overlay-dots" />
        <div className="bold-pattern">
          <svg viewBox="0 0 100 100">
            <path strokeDasharray="15 10" strokeWidth={10} stroke="#000" fill="none" d="M0,0 L100,0 L100,100 L0,100 Z" />
          </svg>
        </div>
        <div className="card-title-area">
          <span>Creative Studio</span>
          <span className="card-tag">Premium</span>
        </div>
        <div className="card-body">
          <div className="card-description">
            Award-winning design studio crafting bold brands and cutting-edge digital
            experiences for forward-thinking companies.
          </div>
          <div className="feature-grid">
            <div className="feature-item">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24">
                  <path d="M20,4C21.1,4 22,4.9 22,6V18C22,19.1 21.1,20 20,20H4C2.9,20 2,19.1 2,18V6C2,4.9 2.9,4 4,4H20M4,6V18H20V6H4M6,9H18V11H6V9M6,13H16V15H6V13Z" />
                </svg>
              </div>
              <span className="feature-text">UI/UX Design</span>
            </div>
            <div className="feature-item">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24">
                  <path d="M12,17.56L16.07,16.43L16.62,10.33H9.38L9.2,8.3H16.8L17,6.31H7L7.56,12.32H14.45L14.22,14.9L12,15.5L9.78,14.9L9.64,13.24H7.64L7.93,16.43L12,17.56M4.07,3H19.93L18.5,19.2L12,21L5.5,19.2L4.07,3Z" />
                </svg>
              </div>
              <span className="feature-text">Development</span>
            </div>
            <div className="feature-item">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24">
                  <path d="M18.5,4L19.66,8.35L18.7,8.61C18.25,7.74 17.79,6.87 17.26,6.43C16.73,6 16.11,6 15.5,6H13V16.5C13,17 13,17.5 13.33,17.75C13.67,18 14.33,18 15,18V19H9V18C9.67,18 10.33,18 10.67,17.75C11,17.5 11,17 11,16.5V6H8.5C7.89,6 7.27,6 6.74,6.43C6.21,6.87 5.75,7.74 5.3,8.61L4.34,8.35L5.5,4H18.5Z" />
                </svg>
              </div>
              <span className="feature-text">Brand Identity</span>
            </div>
            <div className="feature-item">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24">
                  <path d="M9.19,6.35C8.41,7.13 7.75,8.05 7.25,9H5V11H7.12C7.05,11.32 7,11.66 7,12C7,12.34 7.05,12.68 7.12,13H5V15H7.25C7.75,15.95 8.41,16.87 9.19,17.65L7.77,19.07L9.88,21.18L11.3,19.77C11.85,20.03 12.41,20.2 13,20.31V23H15V20.31C15.59,20.2 16.15,20.03 16.7,19.77L18.12,21.18L20.23,19.07L18.81,17.65C19.59,16.87 20.25,15.95 20.75,15H23V13H20.88C20.95,12.68 21,12.34 21,12C21,11.66 20.95,11.32 20.88,11H23V9H20.75C20.25,8.05 19.59,7.13 18.81,6.35L20.23,4.93L18.12,2.82L16.7,4.23C16.15,3.97 15.59,3.8 15,3.69V1H13V3.69C12.41,3.8 11.85,3.97 11.3,4.23L9.88,2.82L7.77,4.93L9.19,6.35M13,17A5,5 0 0,1 8,12A5,5 0 0,1 13,7A5,5 0 0,1 18,12A5,5 0 0,1 13,17Z" />
                </svg>
              </div>
              <span className="feature-text">Marketing</span>
            </div>
          </div>
          <div className="card-actions">
            <div className="price">
              <span className="price-currency">$</span>899
              <span className="price-period">per project</span>
            </div>
            <button className="card-button">Get Started</button>
          </div>
        </div>
        <div className="dots-pattern">
          <svg viewBox="0 0 80 40">
            <circle fill="#000" r={3} cy={10} cx={10} />
            <circle fill="#000" r={3} cy={10} cx={30} />
            <circle fill="#000" r={3} cy={10} cx={50} />
            <circle fill="#000" r={3} cy={10} cx={70} />
            <circle fill="#000" r={3} cy={20} cx={20} />
            <circle fill="#000" r={3} cy={20} cx={40} />
            <circle fill="#000" r={3} cy={20} cx={60} />
            <circle fill="#000" r={3} cy={30} cx={10} />
            <circle fill="#000" r={3} cy={30} cx={30} />
            <circle fill="#000" r={3} cy={30} cx={50} />
            <circle fill="#000" r={3} cy={30} cx={70} />
          </svg>
        </div>
        <div className="accent-shape" />
        <div className="corner-slice" />
        <div className="stamp">
          <span className="stamp-text">Approved</span>
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .card {
    --primary: #ff3e00;
    --primary-hover: #ff6d43;
    --secondary: #4d61ff;
    --secondary-hover: #5e70ff;
    --accent: #00e0b0;
    --text: #050505;
    --bg: #ffffff;
    --shadow-color: #000000;
    --pattern-color: #cfcfcf;

    position: relative;
    width: 20em;
    background: var(--bg);
    border: 0.35em solid var(--text);
    border-radius: 0.6em;
    box-shadow:
      0.7em 0.7em 0 var(--shadow-color),
      inset 0 0 0 0.15em rgba(0, 0, 0, 0.05);
    transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
    overflow: hidden;
    font-family: ui-sans-serif, system-ui, sans-serif;
    transform-origin: center;
  }

  .card:hover {
    transform: translate(-0.4em, -0.4em) scale(1.02);
    box-shadow: 1em 1em 0 var(--shadow-color);
  }

  .card:hover .card-pattern-grid,
  .card:hover .card-overlay-dots {
    opacity: 1;
  }

  .card:active {
    transform: translate(0.1em, 0.1em) scale(0.98);
    box-shadow: 0.5em 0.5em 0 var(--shadow-color);
  }

  .card::before {
    content: "";
    position: absolute;
    top: -1em;
    right: -1em;
    width: 4em;
    height: 4em;
    background: var(--accent);
    transform: rotate(45deg);
    z-index: 1;
  }

  .card::after {
    content: "★";
    position: absolute;
    top: 0.4em;
    right: 0.4em;
    color: var(--text);
    font-size: 1.2em;
    font-weight: bold;
    z-index: 2;
  }

  .card-pattern-grid {
    position: absolute;
    inset: 0;
    background-image: linear-gradient(
        to right,
        rgba(0, 0, 0, 0.05) 1px,
        transparent 1px
      ),
      linear-gradient(to bottom, rgba(0, 0, 0, 0.05) 1px, transparent 1px);
    background-size: 0.5em 0.5em;
    pointer-events: none;
    opacity: 0.5;
    transition: opacity 0.4s ease;
    z-index: 1;
  }

  .card-overlay-dots {
    position: absolute;
    inset: 0;
    background-image: radial-gradient(var(--pattern-color) 1px, transparent 1px);
    background-size: 1em 1em;
    background-position: -0.5em -0.5em;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.4s ease;
    z-index: 1;
  }

  .bold-pattern {
    position: absolute;
    top: 0;
    right: 0;
    width: 6em;
    height: 6em;
    opacity: 0.15;
    pointer-events: none;
    z-index: 1;
  }

  .card-title-area {
    position: relative;
    padding: 1.4em;
    background: var(--primary);
    color: var(--bg);
    font-weight: 800;
    font-size: 1.2em;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 0.35em solid var(--text);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    z-index: 2;
    overflow: hidden;
  }

  .card-title-area::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: repeating-linear-gradient(
      45deg,
      rgba(0, 0, 0, 0.1),
      rgba(0, 0, 0, 0.1) 0.5em,
      transparent 0.5em,
      transparent 1em
    );
    pointer-events: none;
    opacity: 0.3;
  }

  .card-tag {
    background: var(--bg);
    color: var(--text);
    font-size: 0.6em;
    font-weight: 800;
    padding: 0.4em 0.8em;
    border: 0.15em solid var(--text);
    border-radius: 0.3em;
    box-shadow: 0.2em 0.2em 0 var(--shadow-color);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    transform: rotate(3deg);
    transition: all 0.3s ease;
  }

  .card:hover .card-tag {
    transform: rotate(-2deg) scale(1.1);
    box-shadow: 0.25em 0.25em 0 var(--shadow-color);
  }

  .card-body {
    position: relative;
    padding: 1.5em;
    z-index: 2;
  }

  .card-description {
    margin-bottom: 1.5em;
    color: var(--text);
    font-size: 0.95em;
    line-height: 1.4;
    font-weight: 500;
  }

  .feature-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1em;
    margin-bottom: 1.5em;
  }

  .feature-item {
    display: flex;
    align-items: center;
    gap: 0.6em;
    transition: transform 0.2s ease;
  }

  .feature-item:hover {
    transform: translateX(0.3em);
  }

  .feature-icon {
    width: 1.4em;
    height: 1.4em;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--secondary);
    border: 0.12em solid var(--text);
    border-radius: 0.3em;
    box-shadow: 0.2em 0.2em 0 rgba(0, 0, 0, 0.2);
    transition: all 0.2s ease;
  }

  .feature-item:hover .feature-icon {
    background: var(--secondary-hover);
    transform: rotate(-5deg);
  }

  .feature-icon svg {
    width: 0.9em;
    height: 0.9em;
    fill: var(--bg);
  }

  .feature-text {
    font-size: 0.85em;
    font-weight: 600;
    color: var(--text);
  }

  .card-actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 1.5em;
    padding-top: 1.2em;
    border-top: 0.15em dashed rgba(0, 0, 0, 0.15);
    position: relative;
  }

  .card-actions::before {
    content: "✂";
    position: absolute;
    top: -0.8em;
    left: 50%;
    transform: translateX(-50%) rotate(90deg);
    background: var(--bg);
    padding: 0 0.5em;
    font-size: 1em;
    color: rgba(0, 0, 0, 0.4);
  }

  .price {
    position: relative;
    font-size: 1.8em;
    font-weight: 800;
    color: var(--text);
    background: var(--bg);
  }

  .price::before {
    content: "";
    position: absolute;
    bottom: 0.15em;
    left: 0;
    width: 100%;
    height: 0.2em;
    background: var(--accent);
    z-index: -1;
    opacity: 0.5;
  }

  .price-currency {
    font-size: 0.6em;
    font-weight: 700;
    vertical-align: top;
    margin-right: 0.1em;
  }

  .price-period {
    display: block;
    font-size: 0.4em;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.6);
    margin-top: 0.2em;
  }

  .card-button {
    position: relative;
    background: var(--secondary);
    color: var(--bg);
    font-size: 0.9em;
    font-weight: 700;
    padding: 0.7em 1.2em;
    border: 0.2em solid var(--text);
    border-radius: 0.4em;
    box-shadow: 0.3em 0.3em 0 var(--shadow-color);
    cursor: pointer;
    transition: all 0.2s ease;
    overflow: hidden;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .card-button::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(255, 255, 255, 0.2) 50%,
      transparent 100%
    );
    transition: left 0.6s ease;
  }

  .card-button:hover {
    background: var(--secondary-hover);
    transform: translate(-0.1em, -0.1em);
    box-shadow: 0.4em 0.4em 0 var(--shadow-color);
  }

  .card-button:hover::before {
    left: 100%;
  }

  .card-button:active {
    transform: translate(0.1em, 0.1em);
    box-shadow: 0.15em 0.15em 0 var(--shadow-color);
  }

  .dots-pattern {
    position: absolute;
    bottom: 2em;
    left: -2em;
    width: 8em;
    height: 4em;
    opacity: 0.3;
    transform: rotate(-10deg);
    pointer-events: none;
    z-index: 1;
  }

  .accent-shape {
    position: absolute;
    width: 2.5em;
    height: 2.5em;
    background: var(--secondary);
    border: 0.15em solid var(--text);
    border-radius: 0.3em;
    transform: rotate(45deg);
    bottom: -1.2em;
    right: 2em;
    z-index: 0;
    transition: transform 0.3s ease;
  }

  .card:hover .accent-shape {
    transform: rotate(55deg) scale(1.1);
  }

  .stamp {
    position: absolute;
    bottom: 1.5em;
    left: 1.5em;
    width: 4em;
    height: 4em;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 0.15em solid rgba(0, 0, 0, 0.3);
    border-radius: 50%;
    transform: rotate(-15deg);
    opacity: 0.2;
    z-index: 1;
  }

  .stamp-text {
    font-size: 0.6em;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .corner-slice {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 1.5em;
    height: 1.5em;
    background: var(--bg);
    border-right: 0.25em solid var(--text);
    border-top: 0.25em solid var(--text);
    border-radius: 0 0.5em 0 0;
    z-index: 1;
  }`;

export default Card;

```

2 — Repo & package structure (monorepo)

⸻

```txt
pixelforge-ui/
├─ package.json (workspaces: packages/*)
├─ pnpm-workspace.yaml
├─ .github/
│  ├─ workflows/ci.yml
│  └─ workflows/publish.yml
├─ packages/
│  ├─ core/                # tokens, types, utilities
│  │  ├─ src/
│  │  └─ package.json
│  ├─ react/               # actual React components (PixelForge UI)
│  │  ├─ src/
│  │  ├─ stories/
│  │  └─ package.json
│  ├─ icons/               # svg icon set
│  ├─ docs/                # next.js or VitePress site (optional)
│  └─ storybook/           # storybook config if separate
├─ .eslintrc
├─ tsconfig.base.json
└─ README.md
```

3 — Tech stack & key packages

Core: TypeScript, pnpm workspaces
	•	React: react, react-dom, @types/react
	•	Build: tsup (or rollup), typescript
	•	Styling: CSS variables + utility CSS; optional tailwindcss plugin for mapping design tokens
	•	Testing: jest, @testing-library/react, @testing-library/jest-dom, jest-environment-jsdom
	•	E2E/Visual: playwright (or cypress) + @playwright/test (or Cypress + percy/plugin)
	•	Accessibility: axe-core, jest-axe, cypress-axe
	•	Storybook: @storybook/react, @storybook/addon-essentials, @storybook/addon-a11y, @storybook/addon-interactions
	•	Docsite: VitePress or Docusaurus or Next.js (pick VitePress for speed)
	•	CI/CD: GitHub Actions
	•	Publish helpers: semantic-release (optional), np or npm cli, changesets for changelog management
	•	Linting/format: eslint, prettier, stylelint (if writing raw CSS)

⸻

4 — Tokens & theming system (spec)

Design tokens drive everything. Provide:
	•	Colors: primary, accent, background, surface, text, muted, success, warning, danger (with shades and semantic tokens).
	•	Spacing scale: s, m, l, xl (CSS variables).
	•	Typography: font-family, sizes, weights, line-heights.
	•	Radii, shadows, z-index scale.
	•	Motion: durations, easing.

Implementation:
	•	core exports a default token set (JS/TS) and CSS variables generator. Example tokens in :root:

```css
:root {
  --pf-color-primary: #4ac7ff;
  --pf-color-accent: #ff66ff;
  --pf-bg: #f1f1f1;
  --pf-text: #202a5e;
  --pf-radius-sm: 6px;
  --pf-radius-md: 12px;
  --pf-spacing-1: 4px;
  --pf-font-base: 'Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial';
}
[data-theme="dark"] {
  --pf-bg: #0b0b0b;
  --pf-text: #f1f1f1;
}
```

	•	Provide ThemeProvider + useTheme() for runtime switching and token overrides.
	•	Allow partial theme overrides: e.g. const theme = merge(defaultTheme, { colors: { primary: '#800081' }}).
	•	Export JSON token file so consumers can plug them into Tailwind or Figma tokens.

Tailwind integration:
	•	Provide tailwind-pixelforge plugin that maps --pf- vars to Tailwind utilities so consumers can use bg-pf-primary etc.

Dark/light mode:
	•	ThemeProvider toggles data-theme="dark" on <html> or wrapper. Also provide prefers-color-scheme auto-detect fallback.


⸻

5 — Component API design (examples)

All components are theme-aware and accept style overrides + polymorphic as prop.

Button (TypeScript):

```tsx
type ButtonProps = {
  variant?: 'primary' | 'ghost' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: React.FC<ButtonProps> = ({ variant='primary', size='md', ...props }) => (
  <button className={`pf-btn pf-btn--${variant} pf-btn--${size}`} {...props} />
);
```

Header
	•	Props: brand, navigation, actions, sticky?: boolean.
	•	Accessible: skip link, landmarks.

Footer
	•	Layout slots, social links, accessible headings.

Layout
	•	<Container>, <Grid>, <Stack> primitives; responsive props (sm, md, lg).

Modal (Modal / Dialog)
	•	Follow WAI-ARIA role="dialog", focus trap, ESC to close, aria-labelledby, aria-describedby. Provide ModalProvider for accessibility.

Inputs
	•	Input, Textarea, Select, Checkbox, Radio, Switch — support states, labels, helper text, icons, and validation states.

Forms
	•	Provide integration helpers for react-hook-form + examples.

Icons
	•	Tree-shakeable Icon component: import { IconStar } from '@pixelforge/icons' or Icon with name prop, but prefer per-icon exports to enable tree shaking.

Styling overrides
	•	Each component accepts className, style, css (if using utility). Also a sx-like prop for CSS-in-JS users (optional).

Accessibility rules baked in:
	•	All interactive components must have keyboard behavior, focus-visible styles, aria attributes; inputs must be associated to labels.


⸻

6 — Storybook & Docs
	•	Storybook for every component, with:
	•	MDX stories for each component (usage, API table, variants).
	•	Controls for props.
	•	@storybook/addon-a11y to show axe results.
	•	@storybook/addon-storysource for code preview.
	•	Chromatic or Playwright snapshots for visual regression.
	•	Docs site: VitePress or Docusaurus to present:
	•	Getting started (install, theming).
	•	Tokens & design guidelines.
	•	Migration guide / contribution guide.
	•	Publishing & changelog.
	•	Host docs on Vercel or GitHub Pages with GitHub Actions to deploy on merge to main or docs branch.

⸻
7 — Testing plan (functionality, accessibility, visual)

Unit & integration:
	•	Jest + React Testing Library.
	•	Coverage target 90% for critical components.
	•	Tests include:
	•	Render & prop permutations.
	•	Interaction (click, keyboard).
	•	Snapshot of minimal markup (small snapshots).

Accessibility:
	•	jest-axe rules in unit tests:

```tsx
import { axe } from 'jest-axe';
expect(await axe(container)).toHaveNoViolations();
```

	•	Storybook addon-a11y to catch issues while developing.
	•	E2E cypress-axe or playwright-axe run against Storybook stories.

Visual regression:
	•	Use Playwright snapshots or Chromatic/Percy connected to Storybook.
	•	Baseline stories and run PR checks; fail if diffs exceed threshold.

Performance & bundle
	•	bundlesize or size-limit checks in CI to prevent regressions.
	•	Lighthouse CI runs on docs site (optional).

Manual audits:
	•	Keyboard navigation walkthroughs for each interactive component.
	•	Screen reader checks (NVDA/VoiceOver) on critical flows (modal, form, nav).

Testing checklist for each component:
	•	Unit tests for props & rendering
	•	Interaction tests (keyboard + mouse)
	•	Accessibility tests (axe)
	•	Storybook story with controls
	•	Visual snapshot

⸻

8 — Build & bundling
	•	Use tsup to emit:
	•	dist/index.esm.js (ESM)
	•	dist/index.cjs.js (CJS)
	•	dist/index.d.ts
	•	Keep CSS in separate files (or export CSS string): dist/styles.css with compiled CSS variables and classes. Consumers can import pixelforge-ui/dist/styles.css.
	•	Ensure package.json exports map:


```json
"main": "dist/index.cjs.js",
"module": "dist/index.esm.js",
"types": "dist/index.d.ts",
"exports": {
  ".": {
    "import": "./dist/index.esm.js",
    "require": "./dist/index.cjs.js"
  },
  "./*": "./dist/*"
}
```

	•	Minimize dependencies. Use peerDependencies for react & react-dom.

Tree-shaking:
	•	Keep components as named exports in separate files to allow bundlers to tree-shake unused components.

⸻

9 — CI/CD + publishing (GitHub Actions)

Secrets to add to repo:
	•	NPM_TOKEN (for npm publish)
	•	GH_PAGES_TOKEN (if deploying docs to gh-pages)
	•	CHROMATIC_TOKEN or Percy credentials (optional)

Workflows:
	•	ci.yml (on PR): install, lint, test, storybook build, run accessibility checks, run size budgets.
	•	publish.yml (on release or main with tag): build packages, run tests, publish to npm.

Minimal publish.yml sketch:

```yaml
on:
  release:
    types: [published]

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
        with:
          version: 8
      - run: pnpm install --frozen-lockfile
      - run: pnpm -w build
      - run: pnpm -w test
      - name: Publish packages
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
        run: |
          cd packages/react
          npm publish --access public
```

For multi-package publish use changesets + @changesets/action or semantic-release to manage versions and changelogs automatically.

NPM settings:
	•	If you want scoped packages (recommended for future org): @pixelforge/ui — set access public on publish: npm publish --access public.
	•	If single package: pixelforge-ui.

GitHub repo:
	•	Set repo name: pixelforge-ui or pixelforge/pixelforge-ui.
	•	Create branch protection for main.
	•	Use PR templates, CODEOWNERS, CONTRIBUTING.md.

Publishing checklist:
	1.	Create npm account & add NPM_TOKEN to GitHub secrets.
	2.	Ensure package.json fields set: name, version, license: MIT, repository, homepage (docs).
	3.	Run pnpm build locally and smoke test npm pack: npm pack.
	4.	Create a GitHub release (release notes automated by changesets/semantic-release) to trigger publish.yml.

⸻

10 — Developer DX: linters, types, docs
	•	ESLint with TypeScript plugin and react plugin.
	•	Prettier for formatting.
	•	Husky + lint-staged to run formatting & lint on commit.
	•	Provide dev script to start Storybook, build to build packages, test to run tests.

Example scripts (root package.json):

```json
"scripts": {
  "dev": "pnpm -w storybook",
  "build": "pnpm -w build",
  "test": "pnpm -w test",
  "lint": "pnpm -w lint",
  "prepare": "husky install"
}
```



⸻

11 — Roadmap & milestones (sprintable)

Phase 0 — Setup (1 week)
	•	Initialize monorepo, add pnpm, TypeScript, eslint, prettier.
	•	Create core tokens & theme provider.
	•	Basic CI and repo docs.

Phase 1 — Core components (2–3 weeks)
	•	Button, Icon, Input, Typography, Container, Grid, Stack.
	•	Storybook stories + MDX docs for each.
	•	Unit tests + jest-axe.

Phase 2 — Layout & navigation (1 week)
	•	Header, Footer, Modal/Dialog, Dropdown, Tooltip.

Phase 3 — Forms, accessibility polishing (1 week)
	•	Select, Switch, Checkbox, Radio, validation hooks & react-hook-form examples.

Phase 4 — Visual tests & docs site (1 week)
	•	Playwright/Cypress visual snapshots, Storybook deployment, docs site.

Phase 5 — Release
	•	Prepare changelog, set versioning, publish to npm, announce.

⸻

12 — Example tasks to give Claude Code (actionable)
	1.	Create repository pixelforge-ui with pnpm workspace. Add core, react, icons, docs.
	2.	Add default design tokens, generate CSS variables file and ThemeProvider + useTheme hook in core.
	3.	Build Button with variants, sizes, accessible markup, tests, stories (MDX).
	4.	Setup Storybook with @storybook/addon-a11y and @storybook/addon-controls. Add example stories for Button, Input, Modal.
	5.	Add Jest + RTL + jest-axe tests for Button and Input.
	6.	Add tsup build for react package and package.json exports map.
	7.	Setup GitHub Actions: CI (test/lint/build) and publish (npm) on release.
	8.	Create docs site with tokens docs and component usage; deploy to Vercel.
	9.	Add CHANGELOG.md or integrate changesets for automated releases.
	10.	Publish to npm (npm publish --access public) and test consumer install.

⸻

13 — Example minimal package.json for packages/react


```json
{
  "name": "pixelforge-ui",
  "version": "0.1.0",
  "description": "PixelForge UI - themeable React component library",
  "main": "dist/index.cjs.js",
  "module": "dist/index.esm.js",
  "types": "dist/index.d.ts",
  "files": ["dist"],
  "license": "MIT",
  "peerDependencies": {
    "react": ">=18",
    "react-dom": ">=18"
  },
  "scripts": {
    "build": "tsup src/index.tsx --format cjs,esm --dts",
    "test": "jest --coverage",
    "lint": "eslint 'src/**/*.{ts,tsx}'"
  },
  "publishConfig": {
    "access": "public"
  }
}
```


⸻

14 — Security & maintenance
	•	Keep react as peerDependency to avoid duplicate React instances.
	•	Run npm audit in CI and dependabot for dependency updates.
	•	Add CONTRIBUTING.md with security disclosure process.

⸻

15 — Quick checklist (ready to execute)
   	•	Crete comprehensive HOW to implement docs and a README.md file also document each component
	•	Create GitHub org/repo pixelforge-ui
	•	Setup pnpm workspace + TypeScript baseline
	•	Implement tokens & ThemeProvider in core
	•	Implement react components: Button, Input, Header, Footer, Modal, Layout
	•	Add Storybook + MDX docs
	•	Add unit tests + jest-axe
	•	Add Playwright/Cypress visual tests & accessibility checks
	•	Setup GitHub Actions (CI + publish)
	•	Create NPM_TOKEN in GitHub secrets and verify npm publish on release
	•	Publish v0.1.0 to npm (public)
	•	Deploy docs to Vercel / GH Pages

⸻
