import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Breadcrumb, BreadcrumbItem } from '../packages/react/src';

const meta: Meta<typeof Breadcrumb> = {
  title: 'Components/Breadcrumb',
  component: Breadcrumb,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A brutalist-styled breadcrumb navigation component that shows hierarchical navigation path with customizable separators and styling.',
      },
    },
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'primary', 'secondary', 'accent'],
    },
    separator: {
      control: { type: 'text' },
    },
    showHomeIcon: {
      control: { type: 'boolean' },
    },
    showTooltips: {
      control: { type: 'boolean' },
    },
    maxItems: {
      control: { type: 'number' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Breadcrumb>;

const basicItems: BreadcrumbItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'Electronics', href: '/products/electronics' },
  { label: 'Laptops', href: '/products/electronics/laptops' },
  { label: 'MacBook Pro', href: '/products/electronics/laptops/macbook-pro' },
];

const clickableItems: BreadcrumbItem[] = [
  { 
    label: 'Dashboard', 
    onClick: (item) => console.log('Clicked:', item.label)
  },
  { 
    label: 'Users', 
    onClick: (item) => console.log('Clicked:', item.label)
  },
  { 
    label: 'Settings', 
    onClick: (item) => console.log('Clicked:', item.label)
  },
  { 
    label: 'Profile',
    disabled: true
  },
];

const itemsWithIcons: BreadcrumbItem[] = [
  { label: 'Home', href: '/', icon: <span>🏠</span> },
  { label: 'Projects', href: '/projects', icon: <span>📁</span> },
  { label: 'Web App', href: '/projects/webapp', icon: <span>💻</span> },
  { label: 'Components', href: '/projects/webapp/components', icon: <span>🧩</span> },
  { label: 'Breadcrumb', icon: <span>🍞</span> },
];

export const Default: Story = {
  args: {
    items: basicItems,
  },
};

export const WithHomeIcon: Story = {
  args: {
    items: basicItems,
    showHomeIcon: true,
  },
};

export const WithCustomSeparator: Story = {
  args: {
    items: basicItems,
    separator: '→',
  },
};

export const WithTooltips: Story = {
  args: {
    items: basicItems,
    showTooltips: true,
  },
};

export const Clickable: Story = {
  args: {
    items: clickableItems,
  },
};

export const WithIcons: Story = {
  args: {
    items: itemsWithIcons,
  },
};

export const Collapsed: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Category 1', href: '/cat1' },
      { label: 'Category 2', href: '/cat1/cat2' },
      { label: 'Category 3', href: '/cat1/cat2/cat3' },
      { label: 'Category 4', href: '/cat1/cat2/cat3/cat4' },
      { label: 'Category 5', href: '/cat1/cat2/cat3/cat4/cat5' },
      { label: 'Current Page' },
    ],
    maxItems: 4,
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', minWidth: '600px' }}>
      <div>
        <h4 style={{ margin: '0 0 0.5rem 0', fontFamily: 'var(--pf-font-base)' }}>Small</h4>
        <Breadcrumb items={basicItems} size="sm" />
      </div>
      <div>
        <h4 style={{ margin: '0 0 0.5rem 0', fontFamily: 'var(--pf-font-base)' }}>Medium</h4>
        <Breadcrumb items={basicItems} size="md" />
      </div>
      <div>
        <h4 style={{ margin: '0 0 0.5rem 0', fontFamily: 'var(--pf-font-base)' }}>Large</h4>
        <Breadcrumb items={basicItems} size="lg" />
      </div>
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', minWidth: '600px' }}>
      <div>
        <h4 style={{ margin: '0 0 0.5rem 0', fontFamily: 'var(--pf-font-base)' }}>Default</h4>
        <Breadcrumb items={basicItems} variant="default" />
      </div>
      <div>
        <h4 style={{ margin: '0 0 0.5rem 0', fontFamily: 'var(--pf-font-base)' }}>Primary</h4>
        <Breadcrumb items={basicItems} variant="primary" />
      </div>
      <div>
        <h4 style={{ margin: '0 0 0.5rem 0', fontFamily: 'var(--pf-font-base)' }}>Secondary</h4>
        <Breadcrumb items={basicItems} variant="secondary" />
      </div>
      <div>
        <h4 style={{ margin: '0 0 0.5rem 0', fontFamily: 'var(--pf-font-base)' }}>Accent</h4>
        <Breadcrumb items={basicItems} variant="accent" />
      </div>
    </div>
  ),
};

export const CustomSeparators: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', minWidth: '600px' }}>
      <Breadcrumb items={basicItems} separator="/" />
      <Breadcrumb items={basicItems} separator=">" />
      <Breadcrumb items={basicItems} separator="→" />
      <Breadcrumb items={basicItems} separator="»" />
      <Breadcrumb items={basicItems} separator="•" />
    </div>
  ),
};

export const Interactive: Story = {
  render: () => {
    const [currentPath, setCurrentPath] = React.useState('/products/electronics/laptops');
    
    const pathItems = [
      { label: 'Home', href: '/', onClick: () => setCurrentPath('/') },
      { label: 'Products', href: '/products', onClick: () => setCurrentPath('/products') },
      { label: 'Electronics', href: '/products/electronics', onClick: () => setCurrentPath('/products/electronics') },
    ];
    
    if (currentPath.includes('/laptops')) {
      pathItems.push({ label: 'Laptops', href: '/products/electronics/laptops', onClick: () => setCurrentPath('/products/electronics/laptops') });
    }
    
    if (currentPath.includes('/macbook')) {
      pathItems.push({ label: 'MacBook Pro' });
    }

    return (
      <div style={{ minWidth: '600px' }}>
        <div style={{ marginBottom: '1rem', fontFamily: 'var(--pf-font-base)' }}>
          Current path: <code>{currentPath}</code>
        </div>
        <Breadcrumb 
          items={pathItems}
          showHomeIcon={true}
          variant="primary"
        />
        <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
          <button 
            onClick={() => setCurrentPath('/products/electronics/laptops/macbook-pro')}
            style={{ 
              padding: '0.5rem 1rem', 
              border: '2px solid #000', 
              background: '#fff',
              fontFamily: 'var(--pf-font-base)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              cursor: 'pointer'
            }}
          >
            Go to MacBook
          </button>
          <button 
            onClick={() => setCurrentPath('/')}
            style={{ 
              padding: '0.5rem 1rem', 
              border: '2px solid #000', 
              background: '#fff',
              fontFamily: 'var(--pf-font-base)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              cursor: 'pointer'
            }}
          >
            Go Home
          </button>
        </div>
      </div>
    );
  },
};