# PixelForge UI

Modern React component library with design tokens, accessibility-first approach, and comprehensive theming support.

## Packages

### [@pixelforge/core](./packages/core)
Design tokens and theming utilities
```bash
npm install @pixelforge/core
```

### [@pixelforge/react](./packages/react)  
React components built with PixelForge design tokens
```bash
npm install @pixelforge/react
```

## Quick Start

```tsx
import { Button, Input, Typography, ThemeProvider } from '@pixelforge/react';

function App() {
  return (
    <ThemeProvider defaultMode="system">
      <Typography variant="h1">Welcome to PixelForge UI</Typography>
      <Input label="Email" type="email" placeholder="Enter your email" />
      <Button variant="primary">Get Started</Button>
    </ThemeProvider>
  );
}
```

## Features

- 🎨 **Design System** - Comprehensive design tokens
- ♿ **Accessibility** - WCAG 2.1 AA compliant
- 🌙 **Dark Mode** - Built-in theme switching  
- 📱 **Responsive** - Mobile-first design
- 🎯 **TypeScript** - Full type safety
- 🌳 **Tree Shakeable** - Optimized bundles
- ⚡ **Fast** - Small bundle sizes

## Development

```bash
# Install dependencies
pnpm install

# Run tests
pnpm test

# Build packages  
pnpm build

# Component development
pnpm --filter @pixelforge/react dev
```

## License

MIT