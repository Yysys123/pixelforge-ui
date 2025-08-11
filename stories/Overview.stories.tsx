import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../packages/react/src/button/Button';
import { Input } from '../packages/react/src/input/Input';
import { Card } from '../packages/react/src/card/Card';
import { Typography } from '../packages/react/src/typography/Typography';
import { Alert } from '../packages/react/src/alert/Alert';
import { Badge } from '../packages/react/src/badge/Badge';
import { Container } from '../packages/react/src/layout/Container';
import { Stack } from '../packages/react/src/layout/Stack';
import { Grid } from '../packages/react/src/layout/Grid';

const meta = {
  title: 'Overview/PixelForge UI',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'PixelForge UI - A modern React component library with brutalist design language, comprehensive accessibility features, and robust theming system.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Introduction: Story = {
  render: () => (
    <Container size="lg" style={{ padding: '2rem 0' }}>
      <Stack spacing={8} align="center">
        {/* Hero Section */}
        <Stack spacing={4} align="center">
          <Typography variant="h1" align="center" weight="black">
            PixelForge UI
          </Typography>
          <Typography variant="subtitle1" color="muted" align="center" style={{ maxWidth: '600px' }}>
            A modern React component library with brutalist design language, 
            built for developers who appreciate bold aesthetics and robust functionality.
          </Typography>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <Badge variant="success">MIT Licensed</Badge>
            <Badge variant="primary">TypeScript</Badge>
            <Badge variant="warning">Accessible</Badge>
            <Badge variant="info">Tree Shakeable</Badge>
          </div>
        </Stack>

        {/* Features Grid */}
        <Grid cols={3} gap={6} style={{ width: '100%', maxWidth: '900px' }}>
          <Card
            title="🎨 Brutalist Design"
            description="Bold borders, dramatic shadows, and unapologetic aesthetics that make your interface stand out."
            showPatterns={false}
          />
          <Card
            title="♿ Accessibility First"
            description="WCAG compliant components with comprehensive ARIA patterns and keyboard navigation."
            showPatterns={false}
          />
          <Card
            title="🌙 Dark Mode Ready"
            description="Built-in theming system with light/dark modes and custom token overrides."
            showPatterns={false}
          />
          <Card
            title="📦 Tree Shakeable"
            description="Import only what you need. Each component is optimized for minimal bundle impact."
            showPatterns={false}
          />
          <Card
            title="🛡️ TypeScript Native"
            description="Comprehensive type definitions for excellent developer experience and type safety."
            showPatterns={false}
          />
          <Card
            title="⚡ Performance"
            description="Optimized components with minimal runtime overhead and CSS variables for theming."
            showPatterns={false}
          />
        </Grid>

        {/* Component Showcase */}
        <Stack spacing={4} style={{ width: '100%', maxWidth: '800px' }}>
          <Typography variant="h2" align="center">Component Showcase</Typography>
          
          {/* Buttons */}
          <Stack spacing={2}>
            <Typography variant="h3">Buttons</Typography>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="danger">Danger</Button>
              <Button loading>Loading</Button>
            </div>
          </Stack>

          {/* Alerts */}
          <Stack spacing={2}>
            <Typography variant="h3">Alerts</Typography>
            <Alert variant="success" title="Success" dismissible>
              Operation completed successfully!
            </Alert>
            <Alert variant="warning" title="Warning">
              Please review your input before proceeding.
            </Alert>
          </Stack>

          {/* Form Example */}
          <Stack spacing={2}>
            <Typography variant="h3">Form Components</Typography>
            <Grid cols={2} gap={4}>
              <Input 
                label="First Name" 
                placeholder="Enter your first name"
                required
              />
              <Input 
                label="Last Name" 
                placeholder="Enter your last name"
                required
              />
              <Input 
                label="Email" 
                type="email"
                placeholder="Enter your email"
                helperText="We'll never share your email"
                state="success"
                fullWidth
                style={{ gridColumn: 'span 2' }}
              />
            </Grid>
          </Stack>

          {/* Cards */}
          <Stack spacing={2}>
            <Typography variant="h3">Cards</Typography>
            <Grid cols={2} gap={4}>
              <Card
                title="Starter Plan"
                tag="Free"
                description="Perfect for individuals and small projects."
                price={{ currency: '$', amount: 0, period: 'forever' }}
                features={[
                  { icon: '📝', text: '5 Projects' },
                  { icon: '👤', text: '1 User' },
                  { icon: '💾', text: '1GB Storage' },
                ]}
                actionText="Get Started"
              />
              <Card
                title="Pro Plan"
                tag="Popular"
                description="Great for growing teams and businesses."
                price={{ currency: '$', amount: 29, period: 'per month' }}
                features={[
                  { icon: '📝', text: 'Unlimited Projects' },
                  { icon: '👥', text: '10 Users' },
                  { icon: '💾', text: '100GB Storage' },
                  { icon: '🔧', text: 'Advanced Tools' },
                ]}
                actionText="Subscribe"
                stamp="Recommended"
              />
            </Grid>
          </Stack>
        </Stack>

        {/* Installation */}
        <Stack spacing={4} align="center" style={{ width: '100%', maxWidth: '600px' }}>
          <Typography variant="h2" align="center">Quick Start</Typography>
          <div style={{ 
            background: '#f8f9fa', 
            padding: '1.5rem', 
            borderRadius: '8px', 
            border: '2px solid #dee2e6',
            width: '100%',
            fontFamily: 'monospace'
          }}>
            <Typography family="mono" size="sm">
              npm install @pixelforge-ui/react
            </Typography>
          </div>
          <div style={{ 
            background: '#f8f9fa', 
            padding: '1.5rem', 
            borderRadius: '8px', 
            border: '2px solid #dee2e6',
            width: '100%'
          }}>
            <Typography family="mono" size="sm">
              {`import { Button, Input, Card } from '@pixelforge-ui/react';

function App() {
  return (
    <Card title="Welcome">
      <Input label="Name" placeholder="Enter your name" />
      <Button variant="primary">Submit</Button>
    </Card>
  );
}`}
            </Typography>
          </div>
          <Button variant="primary" size="lg">
            Explore Components
          </Button>
        </Stack>
      </Stack>
    </Container>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Complete overview of PixelForge UI showcasing the design system, features, and component examples.',
      },
    },
  },
};

export const DesignTokens: Story = {
  render: () => (
    <Container size="lg" style={{ padding: '2rem 0' }}>
      <Stack spacing={6}>
        <Typography variant="h1" align="center">Design Tokens</Typography>
        <Typography variant="subtitle1" color="muted" align="center">
          Consistent design language through a comprehensive token system
        </Typography>

        <Grid cols={2} gap={6}>
          {/* Colors */}
          <Stack spacing={3}>
            <Typography variant="h3">Colors</Typography>
            <div style={{ display: 'grid', gap: '0.5rem' }}>
              {['primary', 'secondary', 'success', 'warning', 'danger', 'muted'].map(color => (
                <div key={color} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Badge variant={color as any} size="sm">{color}</Badge>
                  <Typography color={color as any} size="sm" weight="medium">
                    {color} color variant
                  </Typography>
                </div>
              ))}
            </div>
          </Stack>

          {/* Typography */}
          <Stack spacing={3}>
            <Typography variant="h3">Typography</Typography>
            <Stack spacing={1}>
              <Typography variant="h1" size="lg">Heading 1</Typography>
              <Typography variant="h2" size="md">Heading 2</Typography>
              <Typography variant="h3" size="sm">Heading 3</Typography>
              <Typography variant="body1">Body 1 - Regular text</Typography>
              <Typography variant="body2">Body 2 - Secondary text</Typography>
              <Typography variant="caption">Caption - Small text</Typography>
            </Stack>
          </Stack>
        </Grid>

        {/* Spacing */}
        <Stack spacing={3}>
          <Typography variant="h3">Spacing Scale</Typography>
          <Typography variant="body2" color="muted">
            Consistent spacing using a geometric scale for visual harmony
          </Typography>
          <div style={{ display: 'flex', alignItems: 'end', gap: '0.5rem' }}>
            {[1, 2, 3, 4, 6, 8, 12, 16, 24].map(size => (
              <div key={size} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{
                  width: '2rem',
                  height: `${size * 0.25}rem`,
                  background: 'var(--pf-color-primary-500, #3b82f6)',
                  borderRadius: '2px'
                }} />
                <Typography variant="caption" size="xs">{size}</Typography>
              </div>
            ))}
          </div>
        </Stack>
      </Stack>
    </Container>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Overview of the design token system including colors, typography, and spacing.',
      },
    },
  },
};