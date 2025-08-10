# @pixelforge-ui/react

Modern React component library with design tokens, accessibility-first approach, and comprehensive theming support.

## Installation

```bash
npm install @pixelforge-ui/react
```

## Features

- 🎨 **Design System** - Built on comprehensive design tokens
- ♿ **Accessibility First** - WCAG compliant with ARIA patterns
- 🌙 **Dark Mode** - Built-in light/dark theme switching
- 📱 **Responsive** - Mobile-first responsive design
- 🎯 **TypeScript** - Full type safety and excellent DX
- 🔧 **Customizable** - Override styles and tokens easily
- 🌳 **Tree Shakeable** - Import only what you need
- ⚡ **Small Bundle** - ~5KB core + CSS

## Quick Start

```tsx
import { Button, Input, Typography, ThemeProvider } from '@pixelforge-ui/react';

function App() {
  return (
    <ThemeProvider defaultMode="system">
      <Typography variant="h1">Welcome to PixelForge UI</Typography>
      
      <Input 
        label="Email"
        type="email"
        placeholder="Enter your email"
        required
      />
      
      <Button variant="primary" size="lg">
        Get Started
      </Button>
    </ThemeProvider>
  );
}
```

## Components

### Button
Flexible button component with multiple variants and states.

```tsx
import { Button } from '@pixelforge-ui/react';

// Variants
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="danger">Danger</Button>

// Sizes
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>

// States
<Button loading>Loading...</Button>
<Button disabled>Disabled</Button>

// With icons
<Button startIcon={<Icon />}>With Icon</Button>
<Button endIcon={<Icon />}>With Icon</Button>
```

### Input
Accessible input component with validation states and helper text.

```tsx
import { Input } from '@pixelforge-ui/react';

// Basic usage
<Input label="Username" placeholder="Enter username" />

// With validation
<Input 
  label="Email"
  type="email"
  error="Please enter a valid email"
  required
/>

// With helper text
<Input 
  label="Password"
  type="password"
  helperText="Must be at least 8 characters"
  state="success"
/>

// With icons
<Input 
  label="Search"
  startIcon={<SearchIcon />}
  endIcon={<ClearIcon />}
/>
```

### Typography
Flexible typography component with semantic variants.

```tsx
import { Typography } from '@pixelforge-ui/react';

// Semantic variants
<Typography variant="h1">Heading 1</Typography>
<Typography variant="h2">Heading 2</Typography>
<Typography variant="subtitle1">Subtitle</Typography>
<Typography variant="body1">Body text</Typography>
<Typography variant="caption">Caption text</Typography>

// Custom styling
<Typography 
  size="xl"
  weight="bold"
  color="primary"
  align="center"
>
  Custom typography
</Typography>

// Custom element
<Typography as="span" variant="body2">
  Inline text
</Typography>
```

### Layout Components

```tsx
import { Container, Stack, Grid } from '@pixelforge-ui/react';

// Container with max width
<Container size="md">
  <h1>Centered content</h1>
</Container>

// Flexible spacing
<Stack spacing="lg" direction="column">
  <div>Item 1</div>
  <div>Item 2</div>
</Stack>

// Responsive grid
<Grid 
  columns={{ base: 1, md: 2, lg: 3 }}
  gap="md"
>
  <div>Grid item</div>
  <div>Grid item</div>
  <div>Grid item</div>
</Grid>
```

## Theming

### Theme Provider
Wrap your app with ThemeProvider for theme context.

```tsx
import { ThemeProvider } from '@pixelforge-ui/react';

<ThemeProvider defaultMode="light">
  <App />
</ThemeProvider>

// System preference detection
<ThemeProvider defaultMode="system">
  <App />
</ThemeProvider>
```

### Custom Themes
Override default design tokens.

```tsx
import { ThemeProvider, defaultTokens } from '@pixelforge-ui/react';

const customTheme = {
  ...defaultTokens,
  colors: {
    ...defaultTokens.colors,
    primary: {
      ...defaultTokens.colors.primary,
      500: '#8b5cf6', // Custom purple
    },
  },
};

<ThemeProvider tokens={customTheme}>
  <App />
</ThemeProvider>
```

### CSS Variables
All components use CSS variables for runtime theming.

```css
/* Override component styles */
.my-button {
  --pf-color-primary-500: #ff6b6b;
  --pf-spacing-3: 1rem;
  --pf-radius-md: 8px;
}
```

## Accessibility

All components follow WCAG 2.1 AA guidelines:

- ✅ **Keyboard Navigation** - Full keyboard support
- ✅ **Screen Readers** - Proper ARIA labels and roles  
- ✅ **Focus Management** - Visible focus indicators
- ✅ **Color Contrast** - Meets contrast requirements
- ✅ **Semantic HTML** - Proper heading hierarchy and landmarks

## TypeScript

Full TypeScript support with comprehensive type definitions:

```tsx
import type { ButtonProps, InputProps } from '@pixelforge-ui/react';

const MyButton: React.FC<ButtonProps> = (props) => {
  return <Button {...props} />;
};
```

## Bundle Size

- **Core Components**: ~5KB gzipped
- **CSS Styles**: ~17KB (includes all component styles)
- **Tree Shakeable**: Import only components you use

```tsx
// Import specific components to minimize bundle
import { Button } from '@pixelforge-ui/react/button';
import { Input } from '@pixelforge-ui/react/input';
```

## Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+  
- ✅ Safari 14+
- ✅ Edge 90+

## Package Info

- **Dependencies**: React 18+, @pixelforge-ui/core, clsx
- **License**: MIT
- **Bundle**: ESM + CJS + TypeScript declarations

## Related Packages

- [`@pixelforge-ui/core`](https://www.npmjs.com/package/@pixelforge-ui/core) - Design tokens and theming utilities

---

Built with ❤️ by the PixelForge team