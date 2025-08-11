import type { Meta, StoryObj } from '@storybook/react';
import {
  Header,
  NavItem,
  NavList,
  Button,
  Typography,
} from '../packages/react/src';

const meta: Meta<typeof Header> = {
  title: 'Layout Components/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Header component with brutalist design elements. Provides navigation, branding, and action areas with responsive behavior.',
      },
    },
  },
  argTypes: {
    brand: {
      control: 'text',
      description: 'Header brand/logo content',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Size variant for the header',
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'primary', 'transparent', 'bordered'],
      description: 'Visual variant for the header',
    },
    sticky: {
      control: 'boolean',
      description: 'Whether the header should be sticky',
    },
    showPatterns: {
      control: 'boolean',
      description: 'Whether to show decorative patterns',
    },
    shadow: {
      control: 'boolean',
      description: 'Whether the header has a shadow',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Header>;

const defaultNavigation = (
  <NavList>
    <NavItem href="/" active>
      Home
    </NavItem>
    <NavItem href="/components">Components</NavItem>
    <NavItem href="/docs">Documentation</NavItem>
    <NavItem href="/examples">Examples</NavItem>
  </NavList>
);

const defaultActions = (
  <>
    <Button variant="outline" size="sm">
      Login
    </Button>
    <Button size="sm">Sign Up</Button>
  </>
);

export const Default: Story = {
  args: {
    brand: 'PixelForge UI',
    size: 'md',
    variant: 'default',
    sticky: false,
    showPatterns: false,
    shadow: true,
  },
  render: args => (
    <Header {...args} navigation={defaultNavigation} actions={defaultActions} />
  ),
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Header
        brand="Default Header"
        variant="default"
        navigation={defaultNavigation}
        actions={defaultActions}
      />

      <Header
        brand="Primary Header"
        variant="primary"
        navigation={defaultNavigation}
        actions={defaultActions}
      />

      <Header
        brand="Transparent Header"
        variant="transparent"
        navigation={defaultNavigation}
        actions={defaultActions}
      />

      <Header
        brand="Bordered Header"
        variant="bordered"
        navigation={defaultNavigation}
        actions={defaultActions}
      />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Header
        brand="Small Header"
        size="sm"
        navigation={defaultNavigation}
        actions={defaultActions}
      />

      <Header
        brand="Medium Header"
        size="md"
        navigation={defaultNavigation}
        actions={defaultActions}
      />

      <Header
        brand="Large Header"
        size="lg"
        navigation={defaultNavigation}
        actions={defaultActions}
      />
    </div>
  ),
};

export const WithPatterns: Story = {
  args: {
    brand: 'PixelForge UI',
    showPatterns: true,
    variant: 'primary',
  },
  render: args => (
    <Header {...args} navigation={defaultNavigation} actions={defaultActions} />
  ),
};

export const StickyHeader: Story = {
  render: () => (
    <div style={{ height: '200vh', backgroundColor: '#f5f5f5' }}>
      <Header
        brand="Sticky Header"
        sticky={true}
        shadow={true}
        navigation={defaultNavigation}
        actions={defaultActions}
      />

      <div style={{ padding: '2rem' }}>
        <Typography variant="h2" weight="bold" style={{ marginBottom: '1rem' }}>
          Scroll down to see the sticky header
        </Typography>
        <Typography variant="body1" color="muted">
          The header will remain at the top of the viewport as you scroll.
        </Typography>

        {Array.from({ length: 20 }, (_, i) => (
          <Typography key={i} variant="body1" style={{ marginBottom: '1rem' }}>
            This is paragraph {i + 1}. Lorem ipsum dolor sit amet, consectetur
            adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua.
          </Typography>
        ))}
      </div>
    </div>
  ),
};

export const CustomBrand: Story = {
  render: () => (
    <Header
      brand={
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div
            style={{
              width: '32px',
              height: '32px',
              backgroundColor: '#3b82f6',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 'bold',
            }}
          >
            PF
          </div>
          <Typography variant="h4" weight="bold">
            PixelForge UI
          </Typography>
        </div>
      }
      navigation={defaultNavigation}
      actions={defaultActions}
    />
  ),
};

export const NavigationVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <Typography variant="h4" weight="bold" style={{ marginBottom: '1rem' }}>
          Default Navigation
        </Typography>
        <Header
          brand="Brand"
          navigation={
            <NavList>
              <NavItem href="/" active>
                Home
              </NavItem>
              <NavItem href="/about">About</NavItem>
              <NavItem href="/contact">Contact</NavItem>
            </NavList>
          }
        />
      </div>

      <div>
        <Typography variant="h4" weight="bold" style={{ marginBottom: '1rem' }}>
          Bold Navigation
        </Typography>
        <Header
          brand="Brand"
          navigation={
            <NavList>
              <NavItem href="/" variant="bold" active>
                Home
              </NavItem>
              <NavItem href="/about" variant="bold">
                About
              </NavItem>
              <NavItem href="/contact" variant="bold">
                Contact
              </NavItem>
            </NavList>
          }
        />
      </div>

      <div>
        <Typography variant="h4" weight="bold" style={{ marginBottom: '1rem' }}>
          Underline Navigation
        </Typography>
        <Header
          brand="Brand"
          navigation={
            <NavList>
              <NavItem href="/" variant="underline" active>
                Home
              </NavItem>
              <NavItem href="/about" variant="underline">
                About
              </NavItem>
              <NavItem href="/contact" variant="underline">
                Contact
              </NavItem>
            </NavList>
          }
        />
      </div>

      <div>
        <Typography variant="h4" weight="bold" style={{ marginBottom: '1rem' }}>
          Mixed Navigation with Disabled Item
        </Typography>
        <Header
          brand="Brand"
          navigation={
            <NavList>
              <NavItem href="/" active>
                Home
              </NavItem>
              <NavItem href="/about">About</NavItem>
              <NavItem href="/premium" variant="bold">
                Premium
              </NavItem>
              <NavItem href="/admin" disabled>
                Admin
              </NavItem>
            </NavList>
          }
        />
      </div>
    </div>
  ),
};

export const ActionsVariations: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <Typography variant="h4" weight="bold" style={{ marginBottom: '1rem' }}>
          Button Actions
        </Typography>
        <Header
          brand="Brand"
          navigation={defaultNavigation}
          actions={
            <>
              <Button variant="outline" size="sm">
                Login
              </Button>
              <Button size="sm">Sign Up</Button>
            </>
          }
        />
      </div>

      <div>
        <Typography variant="h4" weight="bold" style={{ marginBottom: '1rem' }}>
          Single Action
        </Typography>
        <Header
          brand="Brand"
          navigation={defaultNavigation}
          actions={<Button>Get Started</Button>}
        />
      </div>

      <div>
        <Typography variant="h4" weight="bold" style={{ marginBottom: '1rem' }}>
          Multiple Actions
        </Typography>
        <Header
          brand="Brand"
          navigation={defaultNavigation}
          actions={
            <>
              <Button variant="outline" size="sm">
                Docs
              </Button>
              <Button variant="secondary" size="sm">
                Support
              </Button>
              <Button size="sm">Dashboard</Button>
            </>
          }
        />
      </div>

      <div>
        <Typography variant="h4" weight="bold" style={{ marginBottom: '1rem' }}>
          Text and Button Actions
        </Typography>
        <Header
          brand="Brand"
          navigation={defaultNavigation}
          actions={
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <Typography variant="body2" color="muted">
                Welcome back, John!
              </Typography>
              <Button size="sm">Profile</Button>
            </div>
          }
        />
      </div>
    </div>
  ),
};

export const ResponsiveExample: Story = {
  render: () => (
    <div>
      <Header
        brand="Responsive Header"
        navigation={
          <NavList>
            <NavItem href="/" active>
              Home
            </NavItem>
            <NavItem href="/products">Products</NavItem>
            <NavItem href="/solutions">Solutions</NavItem>
            <NavItem href="/pricing">Pricing</NavItem>
            <NavItem href="/docs">Documentation</NavItem>
            <NavItem href="/support">Support</NavItem>
          </NavList>
        }
        actions={
          <>
            <Button variant="outline" size="sm">
              Login
            </Button>
            <Button size="sm">Start Free Trial</Button>
          </>
        }
      />

      <div style={{ padding: '2rem' }}>
        <Typography variant="h3" weight="bold" style={{ marginBottom: '1rem' }}>
          Resize the viewport to see responsive behavior
        </Typography>
        <Typography variant="body1" color="muted">
          On mobile devices, the navigation will stack vertically and the layout
          will adapt.
        </Typography>
      </div>
    </div>
  ),
};
