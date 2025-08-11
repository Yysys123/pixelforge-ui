import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Card } from '../packages/react/src/card/Card';

const meta = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Brutalist design card component with decorative patterns, pricing display, and interactive features. Perfect for showcasing products, services, or content.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'featured', 'minimal'],
      description: 'Visual style variant of the card',
    },
    interactive: {
      control: 'boolean',
      description: 'Whether the card has hover interactions',
    },
    showPatterns: {
      control: 'boolean',
      description: 'Whether to show decorative background patterns',
    },
    title: {
      control: 'text',
      description: 'Main title of the card',
    },
    tag: {
      control: 'text',
      description: 'Tag or badge text',
    },
    description: {
      control: 'text',
      description: 'Description text',
    },
    actionText: {
      control: 'text',
      description: 'Action button text',
    },
    stamp: {
      control: 'text',
      description: 'Stamp text (decorative)',
    },
  },
  args: {
    onAction: fn(),
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Creative Studio',
    tag: 'Premium',
    description:
      'Award-winning design studio crafting bold brands and cutting-edge digital experiences.',
    actionText: 'Get Started',
  },
};

export const WithFeatures: Story = {
  args: {
    title: 'Pro Plan',
    tag: 'Popular',
    description: 'Everything you need to build amazing digital products.',
    features: [
      { icon: '🎨', text: 'UI/UX Design' },
      { icon: '💻', text: 'Development' },
      { icon: '🚀', text: 'Deployment' },
      { icon: '📊', text: 'Analytics' },
    ],
    actionText: 'Subscribe',
  },
};

export const WithPricing: Story = {
  args: {
    title: 'Enterprise',
    tag: 'Best Value',
    description: 'Complete solution for large teams and organizations.',
    price: {
      currency: '$',
      amount: 99,
      period: 'per month',
    },
    features: [
      { icon: '👥', text: 'Unlimited Users' },
      { icon: '🔒', text: 'Advanced Security' },
      { icon: '📞', text: '24/7 Support' },
      { icon: '📈', text: 'Priority Updates' },
    ],
    actionText: 'Contact Sales',
    stamp: 'Recommended',
  },
};

export const Minimal: Story = {
  args: {
    variant: 'minimal',
    title: 'Simple Card',
    description: 'Clean and minimal card design without decorative elements.',
    showPatterns: false,
    actionText: 'Learn More',
  },
};

export const Featured: Story = {
  args: {
    variant: 'featured',
    title: 'Featured Product',
    tag: 'New',
    description: 'Our latest and greatest offering with enhanced features.',
    price: {
      currency: '$',
      amount: 149,
      period: 'one-time',
    },
    actionText: 'Buy Now',
    stamp: 'Hot',
  },
};

export const NonInteractive: Story = {
  args: {
    title: 'Information Card',
    description: 'This card is purely informational and not interactive.',
    interactive: false,
    actionText: 'Read More',
  },
};

export const WithoutPatterns: Story = {
  args: {
    title: 'Clean Design',
    description:
      'Card without decorative background patterns for a cleaner look.',
    showPatterns: false,
    actionText: 'Explore',
  },
};

export const CustomContent: Story = {
  render: () => (
    <Card
      title="Custom Content"
      tag="Special"
      description="You can add any custom content inside the card."
      actionText="Try It"
    >
      <div
        style={{
          margin: '1rem 0',
          padding: '1rem',
          background: '#f0f0f0',
          borderRadius: '8px',
        }}
      >
        <h4 style={{ margin: '0 0 0.5rem 0' }}>Custom Section</h4>
        <p style={{ margin: 0, fontSize: '0.9rem' }}>
          This is custom content that can include any React elements.
        </p>
      </div>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Card with custom children content in addition to the standard props.',
      },
    },
  },
};

export const CardGrid: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2rem',
        maxWidth: '1200px',
      }}
    >
      <Card
        title="Starter"
        tag="Free"
        description="Perfect for individuals just getting started."
        price={{ currency: '$', amount: 0, period: 'forever' }}
        features={[
          { icon: '📝', text: '5 Projects' },
          { icon: '👤', text: '1 User' },
          { icon: '💾', text: '1GB Storage' },
        ]}
        actionText="Get Started"
      />
      <Card
        title="Pro"
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
      <Card
        title="Enterprise"
        tag="Custom"
        description="Tailored solutions for large organizations."
        features={[
          { icon: '🏢', text: 'Custom Setup' },
          { icon: '👥', text: 'Unlimited Users' },
          { icon: '💾', text: 'Unlimited Storage' },
          { icon: '📞', text: '24/7 Support' },
        ]}
        actionText="Contact Us"
      />
    </div>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story:
          'Multiple cards in a responsive grid layout showing different pricing tiers.',
      },
    },
  },
};
