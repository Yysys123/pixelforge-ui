import type { Meta, StoryObj } from '@storybook/react';
import { Page, Container, Section, Grid, Stack, Typography, Button, Card } from '../packages/react/src';

const meta: Meta<typeof Page> = {
  title: 'Layout Components/Layout',
  component: Page,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Layout components for organizing page content with consistent spacing and structure. Includes Page, Container, Section, Grid, and Stack components.',
      },
    },
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl', 'full'],
      description: 'Size variant for the page layout',
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'contained', 'padded', 'bordered'],
      description: 'Visual variant for the page',
    },
    showPatterns: {
      control: 'boolean',
      description: 'Whether to show decorative patterns',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Page>;

export const PageDefault: Story = {
  args: {
    size: 'lg',
    variant: 'default',
    showPatterns: false,
  },
  render: (args) => (
    <Page {...args}>
      <Container>
        <Typography variant="h1" weight="bold" style={{ marginBottom: '1rem' }}>
          Page Layout Example
        </Typography>
        <Typography variant="body1" color="muted">
          This is an example of the Page component with default settings.
        </Typography>
      </Container>
    </Page>
  ),
};

export const PageVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', minHeight: '100vh' }}>
      <Page variant="default" size="md">
        <Container>
          <Typography variant="h3" weight="bold">Default Page</Typography>
          <Typography variant="body1" color="muted">
            Basic page layout with no special styling.
          </Typography>
        </Container>
      </Page>
      
      <Page variant="contained" size="md">
        <Container>
          <Typography variant="h3" weight="bold">Contained Page</Typography>
          <Typography variant="body1" color="muted">
            Page with border, shadow, and background styling.
          </Typography>
        </Container>
      </Page>
      
      <Page variant="padded" size="md">
        <Container>
          <Typography variant="h3" weight="bold">Padded Page</Typography>
          <Typography variant="body1" color="muted">
            Page with extra padding and background.
          </Typography>
        </Container>
      </Page>
      
      <Page variant="bordered" size="md">
        <Container>
          <Typography variant="h3" weight="bold">Bordered Page</Typography>
          <Typography variant="body1" color="muted">
            Page with left and right borders in accent color.
          </Typography>
        </Container>
      </Page>
    </div>
  ),
};

export const ContainerSizes: Story = {
  render: () => (
    <Page>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <Container size="sm" style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)', padding: '1rem', borderRadius: '8px' }}>
          <Typography variant="h4" weight="bold">Small Container (640px)</Typography>
          <Typography variant="body2" color="muted">
            Perfect for focused content and forms.
          </Typography>
        </Container>
        
        <Container size="md" style={{ backgroundColor: 'rgba(34, 197, 94, 0.1)', padding: '1rem', borderRadius: '8px' }}>
          <Typography variant="h4" weight="bold">Medium Container (768px)</Typography>
          <Typography variant="body2" color="muted">
            Good for articles and documentation.
          </Typography>
        </Container>
        
        <Container size="lg" style={{ backgroundColor: 'rgba(245, 158, 11, 0.1)', padding: '1rem', borderRadius: '8px' }}>
          <Typography variant="h4" weight="bold">Large Container (1024px)</Typography>
          <Typography variant="body2" color="muted">
            Great for dashboard layouts and complex content.
          </Typography>
        </Container>
        
        <Container size="xl" style={{ backgroundColor: 'rgba(139, 92, 246, 0.1)', padding: '1rem', borderRadius: '8px' }}>
          <Typography variant="h4" weight="bold">Extra Large Container (1280px)</Typography>
          <Typography variant="body2" color="muted">
            For wide layouts and data tables.
          </Typography>
        </Container>
        
        <Container size="full" style={{ backgroundColor: 'rgba(236, 72, 153, 0.1)', padding: '1rem', borderRadius: '8px' }}>
          <Typography variant="h4" weight="bold">Full Width Container</Typography>
          <Typography variant="body2" color="muted">
            Uses the full width of the viewport.
          </Typography>
        </Container>
      </div>
    </Page>
  ),
};

export const SectionVariants: Story = {
  render: () => (
    <Page>
      <Container>
        <Section variant="default" spacing="md">
          <Typography variant="h3" weight="bold">Default Section</Typography>
          <Typography variant="body1">
            This is a default section with standard spacing and no special styling.
          </Typography>
        </Section>
        
        <Section variant="primary" spacing="md">
          <Typography variant="h3" weight="bold">Primary Section</Typography>
          <Typography variant="body1">
            Section with primary color accent and background tint.
          </Typography>
        </Section>
        
        <Section variant="secondary" spacing="md">
          <Typography variant="h3" weight="bold">Secondary Section</Typography>
          <Typography variant="body1">
            Section with secondary color accent and background tint.
          </Typography>
        </Section>
        
        <Section variant="accent" spacing="md">
          <Typography variant="h3" weight="bold">Accent Section</Typography>
          <Typography variant="body1">
            Section with accent color accent and background tint.
          </Typography>
        </Section>
        
        <Section variant="muted" spacing="md" bordered>
          <Typography variant="h3" weight="bold">Muted Section (Bordered)</Typography>
          <Typography variant="body1">
            Section with muted styling and border decoration.
          </Typography>
        </Section>
      </Container>
    </Page>
  ),
};

export const GridLayouts: Story = {
  render: () => (
    <Page>
      <Container>
        <Section spacing="lg">
          <Typography variant="h2" weight="bold" style={{ marginBottom: '2rem' }}>
            Grid Layouts
          </Typography>
          
          <Typography variant="h4" weight="bold" style={{ marginBottom: '1rem' }}>
            2 Column Grid
          </Typography>
          <Grid cols={2} gap="md" style={{ marginBottom: '2rem' }}>
            {Array.from({ length: 4 }, (_, i) => (
              <div key={i} style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)', padding: '1rem', borderRadius: '8px' }}>
                <Typography variant="body1" weight="bold">Grid Item {i + 1}</Typography>
              </div>
            ))}
          </Grid>
          
          <Typography variant="h4" weight="bold" style={{ marginBottom: '1rem' }}>
            3 Column Grid
          </Typography>
          <Grid cols={3} gap="md" style={{ marginBottom: '2rem' }}>
            {Array.from({ length: 6 }, (_, i) => (
              <div key={i} style={{ backgroundColor: 'rgba(34, 197, 94, 0.1)', padding: '1rem', borderRadius: '8px' }}>
                <Typography variant="body1" weight="bold">Item {i + 1}</Typography>
              </div>
            ))}
          </Grid>
          
          <Typography variant="h4" weight="bold" style={{ marginBottom: '1rem' }}>
            Responsive Grid
          </Typography>
          <Grid 
            cols={1} 
            responsive={{ sm: 2, md: 3, lg: 4 }} 
            gap="md"
          >
            {Array.from({ length: 8 }, (_, i) => (
              <div key={i} style={{ backgroundColor: 'rgba(245, 158, 11, 0.1)', padding: '1rem', borderRadius: '8px' }}>
                <Typography variant="body1" weight="bold">Responsive {i + 1}</Typography>
              </div>
            ))}
          </Grid>
        </Section>
      </Container>
    </Page>
  ),
};

export const StackLayouts: Story = {
  render: () => (
    <Page>
      <Container>
        <Section spacing="lg">
          <Typography variant="h2" weight="bold" style={{ marginBottom: '2rem' }}>
            Stack Layouts
          </Typography>
          
          <Grid cols={2} gap="xl">
            <div>
              <Typography variant="h4" weight="bold" style={{ marginBottom: '1rem' }}>
                Vertical Stack
              </Typography>
              <Stack direction="vertical" gap="md" align="stretch">
                <Button>First Button</Button>
                <Button variant="outline">Second Button</Button>
                <Button variant="secondary">Third Button</Button>
              </Stack>
            </div>
            
            <div>
              <Typography variant="h4" weight="bold" style={{ marginBottom: '1rem' }}>
                Horizontal Stack
              </Typography>
              <Stack direction="horizontal" gap="md" justify="center" wrap>
                <Button size="sm">Small</Button>
                <Button>Medium</Button>
                <Button size="lg">Large</Button>
              </Stack>
            </div>
            
            <div>
              <Typography variant="h4" weight="bold" style={{ marginBottom: '1rem' }}>
                Centered Stack
              </Typography>
              <Stack direction="vertical" gap="sm" align="center">
                <Typography variant="h5" weight="bold">Centered Content</Typography>
                <Typography variant="body2" color="muted">
                  All items are centered
                </Typography>
                <Button>Action Button</Button>
              </Stack>
            </div>
            
            <div>
              <Typography variant="h4" weight="bold" style={{ marginBottom: '1rem' }}>
                Space Between
              </Typography>
              <Stack direction="horizontal" justify="between" align="center">
                <Typography variant="body1" weight="bold">Title</Typography>
                <Button size="sm">Action</Button>
              </Stack>
            </div>
          </Grid>
        </Section>
      </Container>
    </Page>
  ),
};

export const CompleteLayout: Story = {
  render: () => (
    <Page variant="default" showPatterns={true}>
      <Container size="xl">
        {/* Header Section */}
        <Section variant="primary" spacing="lg">
          <Stack direction="horizontal" justify="between" align="center">
            <div>
              <Typography variant="h1" weight="bold" style={{ marginBottom: '0.5rem' }}>
                PixelForge UI
              </Typography>
              <Typography variant="h4" color="muted">
                Brutalist React Component Library
              </Typography>
            </div>
            <Stack direction="horizontal" gap="md">
              <Button variant="outline">Documentation</Button>
              <Button>Get Started</Button>
            </Stack>
          </Stack>
        </Section>

        {/* Features Grid */}
        <Section spacing="xl">
          <Typography variant="h2" weight="bold" style={{ marginBottom: '2rem', textAlign: 'center' }}>
            Features
          </Typography>
          
          <Grid cols={1} responsive={{ md: 2, lg: 3 }} gap="lg">
            <Card>
              <Typography variant="h4" weight="bold" style={{ marginBottom: '1rem' }}>
                🎨 Brutalist Design
              </Typography>
              <Typography variant="body1" color="muted">
                Bold, geometric components with strong visual hierarchy and impactful styling.
              </Typography>
            </Card>
            
            <Card>
              <Typography variant="h4" weight="bold" style={{ marginBottom: '1rem' }}>
                ♿ Accessible
              </Typography>
              <Typography variant="body1" color="muted">
                Built with accessibility in mind, following WAI-ARIA guidelines and best practices.
              </Typography>
            </Card>
            
            <Card>
              <Typography variant="h4" weight="bold" style={{ marginBottom: '1rem' }}>
                📱 Responsive
              </Typography>
              <Typography variant="body1" color="muted">
                Mobile-first design that works beautifully across all device sizes.
              </Typography>
            </Card>
          </Grid>
        </Section>

        {/* CTA Section */}
        <Section variant="accent" spacing="xl" bordered>
          <Stack direction="vertical" align="center" gap="lg">
            <Typography variant="h2" weight="bold" style={{ textAlign: 'center' }}>
              Ready to Build Something Bold?
            </Typography>
            <Typography variant="h5" color="muted" style={{ textAlign: 'center', maxWidth: '600px' }}>
              Join thousands of developers who are creating impactful user interfaces with PixelForge UI.
            </Typography>
            <Stack direction="horizontal" gap="md">
              <Button size="lg">Start Building</Button>
              <Button variant="outline" size="lg">View Examples</Button>
            </Stack>
          </Stack>
        </Section>
      </Container>
    </Page>
  ),
};