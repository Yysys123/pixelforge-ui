import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Button } from '../packages/react/src/button/Button';

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Brutalist button component with bold shadows, dramatic hover effects, and aggressive typography. Built for interfaces that demand attention and make a statement.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost', 'danger'],
      description: 'Visual style variant of the button',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the button',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled',
    },
    loading: {
      control: 'boolean',
      description: 'Whether the button is in loading state',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Whether the button takes full width',
    },
    children: {
      control: 'text',
      description: 'Button content',
    },
  },
  args: {
    onClick: fn(),
    children: 'Button',
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Button',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Button',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Outline Button',
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'Ghost Button',
  },
};

export const Danger: Story = {
  args: {
    variant: 'danger',
    children: 'Danger Button',
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    children: 'Small Button',
  },
};

export const Medium: Story = {
  args: {
    size: 'md',
    children: 'Medium Button',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    children: 'Large Button',
  },
};

export const Loading: Story = {
  args: {
    loading: true,
    children: 'Loading...',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Disabled Button',
  },
};

export const FullWidth: Story = {
  args: {
    fullWidth: true,
    children: 'Full Width Button',
  },
  parameters: {
    layout: 'padded',
  },
};

export const WithStartIcon: Story = {
  args: {
    startIcon: '🚀',
    children: 'Start Icon',
  },
};

export const WithEndIcon: Story = {
  args: {
    endIcon: '→',
    children: 'End Icon',
  },
};

export const IconOnly: Story = {
  args: {
    startIcon: '❤️',
    'aria-label': 'Like',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: '1rem',
        flexWrap: 'wrap',
        alignItems: 'center',
      }}
    >
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="danger">Danger</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All button variants displayed together for comparison.',
      },
    },
  },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All button sizes displayed together for comparison.',
      },
    },
  },
};

export const BrutalistDesign: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '2rem',
        padding: '2rem',
        background: '#f5f5f5',
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <h4 style={{ marginBottom: '1rem' }}>Primary Actions</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Button variant="primary">GET STARTED</Button>
          <Button variant="primary" size="lg">
            SUBSCRIBE NOW
          </Button>
          <Button variant="danger">DELETE ACCOUNT</Button>
        </div>
      </div>

      <div style={{ textAlign: 'center' }}>
        <h4 style={{ marginBottom: '1rem' }}>Secondary Actions</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Button variant="secondary">VIEW DETAILS</Button>
          <Button variant="outline">LEARN MORE</Button>
          <Button variant="ghost">CANCEL</Button>
        </div>
      </div>

      <div style={{ textAlign: 'center' }}>
        <h4 style={{ marginBottom: '1rem' }}>Interactive Demo</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Button variant="primary" loading>
            PROCESSING...
          </Button>
          <Button variant="secondary" disabled>
            DISABLED
          </Button>
          <Button variant="outline" fullWidth>
            FULL WIDTH
          </Button>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Showcase of the brutalist design language with bold shadows, dramatic hover effects, and aggressive typography. Try hovering over the buttons to see the shadow animations.',
      },
    },
  },
};
