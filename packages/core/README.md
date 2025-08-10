# @pixelforge-ui/core

Design tokens and theming utilities for PixelForge UI component library.

## Installation

```bash
npm install @pixelforge-ui/core
```

## Features

- 🎨 **Design Tokens** - Comprehensive color scales, typography, spacing, and more
- 🌙 **Theme System** - Light/dark mode with system preference detection
- ⚡ **CSS Variables** - Runtime theming with CSS custom properties
- 🎯 **TypeScript** - Full type safety for all tokens and utilities
- 🔧 **Framework Agnostic** - Use with any CSS-in-JS solution or plain CSS

## Quick Start

### Basic Usage

```tsx
import { defaultTokens, ThemeProvider, useTheme } from '@pixelforge-ui/core';

// Use design tokens directly
console.log(defaultTokens.colors.primary[500]); // '#3b82f6'
console.log(defaultTokens.spacing[4]); // '16px'

// React theme provider
function App() {
  return (
    <ThemeProvider defaultMode="system">
      <YourApp />
    </ThemeProvider>
  );
}

// Use theme in components
function MyComponent() {
  const { mode, setMode, tokens } = useTheme();
  
  return (
    <div style={{ color: tokens.colors.text.primary }}>
      <button onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}>
        Toggle theme
      </button>
    </div>
  );
}
```

### CSS Variables

```tsx
import { tokensToCSS } from '@pixelforge-ui/core';

// Generate CSS variables
const cssVars = tokensToCSS(defaultTokens);
// Results in: { '--pf-color-primary-500': '#3b82f6', ... }

// Use in your CSS
const styles = `
  .button {
    background: var(--pf-color-primary-500);
    padding: var(--pf-spacing-3) var(--pf-spacing-4);
    border-radius: var(--pf-radius-md);
  }
`;
```

## Design Tokens

### Colors
- **Primary, Secondary, Accent** - Full 50-950 color scales
- **Gray, Success, Warning, Danger** - Semantic color scales  
- **Text & Border** - Contextual colors for UI elements

### Typography
- **Font Families** - Sans, serif, mono stacks
- **Font Sizes** - xs to 6xl responsive scale
- **Font Weights** - Thin to black (100-900)
- **Line Heights & Letter Spacing** - Optimized for readability

### Spacing & Layout
- **Spacing Scale** - 0 to 64px in consistent increments
- **Border Radius** - None to full rounded corners
- **Shadows** - Subtle to dramatic elevation
- **Z-Index** - Layered component stacking

### Motion
- **Duration** - Instant to slower timing
- **Easing** - Linear, ease-in/out, bounce, elastic

## TypeScript Support

All tokens are fully typed for excellent developer experience:

```tsx
import type { DesignTokens, Colors } from '@pixelforge-ui/core';

// Autocomplete and type safety
const colors: Colors = defaultTokens.colors;
const primaryBlue: string = colors.primary[500]; // ✅ Type-safe
```

## Theme Customization

```tsx
import { defaultTokens, type DesignTokens } from '@pixelforge-ui/core';

// Override specific tokens
const customTokens: DesignTokens = {
  ...defaultTokens,
  colors: {
    ...defaultTokens.colors,
    primary: {
      ...defaultTokens.colors.primary,
      500: '#8b5cf6', // Custom purple
    },
  },
};

// Use with ThemeProvider
<ThemeProvider tokens={customTokens}>
  <App />
</ThemeProvider>
```

## Package Info

- **Bundle Size**: ~13KB (CJS) / ~12KB (ESM)
- **Dependencies**: React (peer dependency)
- **License**: MIT
- **TypeScript**: Full support with declarations

## Related Packages

- [`@pixelforge-ui/react`](https://www.npmjs.com/package/@pixelforge-ui/react) - React components built with these tokens

---

Built with ❤️ by the PixelForge team