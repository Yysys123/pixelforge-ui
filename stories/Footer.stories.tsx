import type { Meta, StoryObj } from '@storybook/react';
import { Footer, FooterLink, Typography, Page, Container } from '../packages/react/src';
import type { FooterSection, SocialLink } from '../packages/react/src';

const meta: Meta<typeof Footer> = {
  title: 'Layout Components/Footer',
  component: Footer,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Footer component with brutalist design elements. Provides branding, links, and social media sections with responsive behavior.',
      },
    },
  },
  argTypes: {
    brand: {
      control: 'text',
      description: 'Footer brand/logo content',
    },
    copyright: {
      control: 'text',
      description: 'Copyright text (use {year} for current year)',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Size variant for the footer',
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'primary', 'minimal', 'bordered'],
      description: 'Visual variant for the footer',
    },
    layout: {
      control: { type: 'select' },
      options: ['stacked', 'columns', 'inline'],
      description: 'Layout variant',
    },
    showPatterns: {
      control: 'boolean',
      description: 'Whether to show decorative patterns',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Footer>;

const defaultLinks: FooterSection[] = [
  {
    title: 'Products',
    links: [
      { label: 'Components', href: '/components' },
      { label: 'Templates', href: '/templates' },
      { label: 'Themes', href: '/themes' },
      { label: 'Icons', href: '/icons' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Documentation', href: '/docs' },
      { label: 'Tutorials', href: '/tutorials' },
      { label: 'Blog', href: '/blog' },
      { label: 'Changelog', href: '/changelog' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Help Center', href: '/help' },
      { label: 'Contact Us', href: '/contact' },
      { label: 'Discord', href: 'https://discord.gg/pixelforge', external: true },
      { label: 'GitHub Issues', href: 'https://github.com/pixelforge/issues', external: true },
    ],
  },
];

const defaultSocial: SocialLink[] = [
  {
    platform: 'Twitter',
    href: 'https://twitter.com/pixelforge',
    icon: <span style={{ fontSize: '1.2em' }}>🐦</span>,
    label: 'Follow us on Twitter',
  },
  {
    platform: 'GitHub',
    href: 'https://github.com/pixelforge',
    icon: <span style={{ fontSize: '1.2em' }}>🐙</span>,
    label: 'Star us on GitHub',
  },
  {
    platform: 'Discord',
    href: 'https://discord.gg/pixelforge',
    icon: <span style={{ fontSize: '1.2em' }}>💬</span>,
    label: 'Join our Discord',
  },
  {
    platform: 'LinkedIn',
    href: 'https://linkedin.com/company/pixelforge',
    icon: <span style={{ fontSize: '1.2em' }}>💼</span>,
    label: 'Connect on LinkedIn',
  },
];

export const Default: Story = {
  args: {
    brand: 'PixelForge UI',
    copyright: '© {year} PixelForge UI. All rights reserved.',
    size: 'md',
    variant: 'default',
    layout: 'columns',
    showPatterns: false,
  },
  render: (args) => (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Page>
        <Container>
          <div style={{ flex: 1, padding: '2rem 0' }}>
            <Typography variant="h2" weight="bold" style={{ marginBottom: '1rem' }}>
              Page Content
            </Typography>
            <Typography variant="body1" color="muted">
              This is the main page content. The footer appears below.
            </Typography>
          </div>
        </Container>
      </Page>
      
      <Footer
        {...args}
        links={defaultLinks}
        social={defaultSocial}
      />
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <Footer
        brand="Default Footer"
        variant="default"
        copyright="© {year} Company Name"
        links={defaultLinks.slice(0, 2)}
      />
      
      <Footer
        brand="Primary Footer"
        variant="primary"
        copyright="© {year} Company Name"
        links={defaultLinks.slice(0, 2)}
      />
      
      <Footer
        brand="Minimal Footer"
        variant="minimal"
        copyright="© {year} Company Name"
        links={defaultLinks.slice(0, 1)}
      />
      
      <Footer
        brand="Bordered Footer"
        variant="bordered"
        copyright="© {year} Company Name"
        links={defaultLinks.slice(0, 2)}
      />
    </div>
  ),
};

export const Layouts: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <Typography variant="h4" weight="bold" style={{ marginBottom: '1rem' }}>
          Columns Layout
        </Typography>
        <Footer
          brand="Brand"
          layout="columns"
          copyright="© {year} Company"
          links={defaultLinks}
          social={defaultSocial}
        />
      </div>
      
      <div>
        <Typography variant="h4" weight="bold" style={{ marginBottom: '1rem' }}>
          Stacked Layout
        </Typography>
        <Footer
          brand="Brand"
          layout="stacked"
          copyright="© {year} Company"
          links={defaultLinks.slice(0, 2)}
          social={defaultSocial.slice(0, 3)}
        />
      </div>
      
      <div>
        <Typography variant="h4" weight="bold" style={{ marginBottom: '1rem' }}>
          Inline Layout
        </Typography>
        <Footer
          brand="Brand"
          layout="inline"
          copyright="© {year} Company"
          links={defaultLinks.slice(0, 2)}
          social={defaultSocial.slice(0, 2)}
        />
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <Footer
        brand="Small Footer"
        size="sm"
        copyright="© {year} Company"
        links={defaultLinks.slice(0, 2)}
      />
      
      <Footer
        brand="Medium Footer"
        size="md"
        copyright="© {year} Company"
        links={defaultLinks.slice(0, 2)}
      />
      
      <Footer
        brand="Large Footer"
        size="lg"
        copyright="© {year} Company"
        links={defaultLinks.slice(0, 2)}
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
  render: (args) => (
    <Footer
      {...args}
      copyright="© {year} PixelForge UI. All rights reserved."
      links={defaultLinks}
      social={defaultSocial}
    />
  ),
};

export const MinimalFooter: Story = {
  render: () => (
    <Footer
      brand="Simple Brand"
      variant="minimal"
      layout="inline"
      copyright="© {year} Simple Company. All rights reserved."
    />
  ),
};

export const SocialOnly: Story = {
  render: () => (
    <Footer
      brand="Social Brand"
      layout="stacked"
      copyright="© {year} Social Company"
      social={defaultSocial}
    />
  ),
};

export const LinksOnly: Story = {
  render: () => (
    <Footer
      brand="Links Brand"
      layout="columns"
      copyright="© {year} Links Company"
      links={defaultLinks}
    />
  ),
};

export const CustomBrand: Story = {
  render: () => (
    <Footer
      brand={
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ 
            width: '40px', 
            height: '40px', 
            backgroundColor: '#3b82f6', 
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 'bold'
          }}>
            PF
          </div>
          <div>
            <Typography variant="h4" weight="bold">
              PixelForge UI
            </Typography>
            <Typography variant="caption" color="muted">
              Brutalist React Components
            </Typography>
          </div>
        </div>
      }
      copyright="© {year} PixelForge UI. Building bold interfaces."
      links={defaultLinks}
      social={defaultSocial}
    />
  ),
};

export const WithCustomContent: Story = {
  render: () => (
    <Footer
      brand="Custom Footer"
      copyright="© {year} Custom Company"
      links={defaultLinks.slice(0, 2)}
    >
      <div style={{ 
        background: 'rgba(59, 130, 246, 0.1)', 
        padding: '1rem', 
        borderRadius: '8px',
        border: '2px solid rgba(59, 130, 246, 0.2)'
      }}>
        <Typography variant="h5" weight="bold" style={{ marginBottom: '0.5rem' }}>
          Newsletter Signup
        </Typography>
        <Typography variant="body2" color="muted" style={{ marginBottom: '1rem' }}>
          Stay updated with our latest features and releases.
        </Typography>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <input 
            type="email" 
            placeholder="Enter your email"
            style={{ 
              flex: 1,
              padding: '0.5rem',
              border: '2px solid #ccc',
              borderRadius: '4px'
            }}
          />
          <button style={{ 
            padding: '0.5rem 1rem',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontWeight: 'bold'
          }}>
            Subscribe
          </button>
        </div>
      </div>
    </Footer>
  ),
};

export const CompleteExample: Story = {
  render: () => (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Main content */}
      <Page>
        <Container>
          <div style={{ padding: '4rem 0', textAlign: 'center' }}>
            <Typography variant="h1" weight="bold" style={{ marginBottom: '1rem' }}>
              Welcome to PixelForge UI
            </Typography>
            <Typography variant="h4" color="muted" style={{ marginBottom: '2rem' }}>
              The complete brutalist React component library
            </Typography>
            <Typography variant="body1" style={{ maxWidth: '600px', margin: '0 auto' }}>
              Build bold, accessible, and impactful user interfaces with our comprehensive
              collection of brutalist-designed React components.
            </Typography>
          </div>
        </Container>
      </Page>
      
      {/* Footer */}
      <Footer
        brand="PixelForge UI"
        variant="primary"
        showPatterns={true}
        copyright="© {year} PixelForge UI. Made with ❤️ for bold interfaces."
        links={[
          {
            title: 'Products',
            links: [
              { label: 'React Components', href: '/react' },
              { label: 'Vue Components', href: '/vue' },
              { label: 'Design Tokens', href: '/tokens' },
              { label: 'Figma Kit', href: '/figma', external: true },
            ],
          },
          {
            title: 'Learn',
            links: [
              { label: 'Documentation', href: '/docs' },
              { label: 'Tutorials', href: '/tutorials' },
              { label: 'Examples', href: '/examples' },
              { label: 'Best Practices', href: '/best-practices' },
            ],
          },
          {
            title: 'Community',
            links: [
              { label: 'GitHub', href: 'https://github.com/pixelforge', external: true },
              { label: 'Discord', href: 'https://discord.gg/pixelforge', external: true },
              { label: 'Twitter', href: 'https://twitter.com/pixelforge', external: true },
              { label: 'Blog', href: '/blog' },
            ],
          },
          {
            title: 'Company',
            links: [
              { label: 'About Us', href: '/about' },
              { label: 'Careers', href: '/careers' },
              { label: 'Privacy Policy', href: '/privacy' },
              { label: 'Terms of Service', href: '/terms' },
            ],
          },
        ]}
        social={[
          {
            platform: 'GitHub',
            href: 'https://github.com/pixelforge',
            icon: <span>⭐</span>,
            label: 'Star us on GitHub',
          },
          {
            platform: 'Twitter',
            href: 'https://twitter.com/pixelforge',
            icon: <span>🐦</span>,
            label: 'Follow us on Twitter',
          },
          {
            platform: 'Discord',
            href: 'https://discord.gg/pixelforge',
            icon: <span>💬</span>,
            label: 'Join our Discord',
          },
          {
            platform: 'LinkedIn',
            href: 'https://linkedin.com/company/pixelforge',
            icon: <span>💼</span>,
            label: 'Connect on LinkedIn',
          },
          {
            platform: 'YouTube',
            href: 'https://youtube.com/pixelforge',
            icon: <span>📺</span>,
            label: 'Subscribe on YouTube',
          },
        ]}
      />
    </div>
  ),
};