import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Badge } from '../packages/react/src/badge/Badge';

const meta = {
  title: 'Components/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Versatile badge component with multiple variants, shapes, and positioning options. Perfect for status indicators, notifications, and labels with brutalist design elements.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'default',
        'primary',
        'secondary',
        'success',
        'warning',
        'danger',
        'info',
      ],
      description: 'Visual style variant of the badge',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the badge',
    },
    shape: {
      control: 'select',
      options: ['rounded', 'square', 'circle'],
      description: 'Shape of the badge',
    },
    dot: {
      control: 'boolean',
      description: 'Whether to display as a dot indicator',
    },
    count: {
      control: 'number',
      description: 'Numeric count to display',
    },
    max: {
      control: 'number',
      description: 'Maximum count before showing "+max"',
    },
    showZero: {
      control: 'boolean',
      description: 'Whether to show the badge when count is 0',
    },
    overlay: {
      control: 'boolean',
      description: 'Whether to position as an overlay on another element',
    },
    position: {
      control: 'select',
      options: ['top-right', 'top-left', 'bottom-right', 'bottom-left'],
      description: 'Position when used as overlay',
    },
    inline: {
      control: 'boolean',
      description: 'Whether to display inline with content',
    },
    interactive: {
      control: 'boolean',
      description: 'Whether the badge is clickable',
    },
  },
  args: {
    onClick: fn(),
    children: 'Badge',
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Default',
  },
};

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary',
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
    children: 'Success',
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    children: 'Warning',
  },
};

export const Danger: Story = {
  args: {
    variant: 'danger',
    children: 'Error',
  },
};

export const Info: Story = {
  args: {
    variant: 'info',
    children: 'Info',
  },
};

export const Count: Story = {
  args: {
    count: 5,
    variant: 'primary',
  },
};

export const HighCount: Story = {
  args: {
    count: 999,
    max: 99,
    variant: 'danger',
  },
};

export const Dot: Story = {
  args: {
    dot: true,
    variant: 'success',
  },
};

export const SmallSize: Story = {
  args: {
    size: 'sm',
    children: 'Small',
  },
};

export const LargeSize: Story = {
  args: {
    size: 'lg',
    children: 'Large',
  },
};

export const SquareShape: Story = {
  args: {
    shape: 'square',
    children: 'Square',
  },
};

export const CircleShape: Story = {
  args: {
    shape: 'circle',
    children: '5',
  },
};

export const WithIcon: Story = {
  args: {
    icon: '⭐',
    children: 'Featured',
    variant: 'warning',
  },
};

export const Interactive: Story = {
  args: {
    interactive: true,
    children: 'Click me',
    variant: 'primary',
  },
};

export const Overlay: Story = {
  render: () => (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <div
        style={{
          width: '60px',
          height: '60px',
          background: '#f0f0f0',
          border: '2px solid #ddd',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '24px',
        }}
      >
        📧
      </div>
      <Badge count={3} variant="danger" overlay position="top-right" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Badge positioned as an overlay on another element (like a notification count).',
      },
    },
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
      <Badge variant="default">Default</Badge>
      <Badge variant="primary">Primary</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="danger">Danger</Badge>
      <Badge variant="info">Info</Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All badge variants displayed together for comparison.',
      },
    },
  },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Badge size="sm" variant="primary">
        Small
      </Badge>
      <Badge size="md" variant="primary">
        Medium
      </Badge>
      <Badge size="lg" variant="primary">
        Large
      </Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All badge sizes displayed together for comparison.',
      },
    },
  },
};

export const AllShapes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Badge shape="rounded" variant="primary">
        Rounded
      </Badge>
      <Badge shape="square" variant="primary">
        Square
      </Badge>
      <Badge shape="circle" variant="primary">
        C
      </Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All badge shapes displayed together for comparison.',
      },
    },
  },
};

export const StatusIndicators: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        alignItems: 'flex-start',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <span>Server Status</span>
        <Badge variant="success" size="sm">
          Online
        </Badge>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <span>Build Status</span>
        <Badge variant="warning" size="sm">
          Building
        </Badge>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <span>Connection</span>
        <Badge variant="danger" size="sm">
          Offline
        </Badge>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <span>Updates</span>
        <Badge variant="info" size="sm">
          Available
        </Badge>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Example of using badges as status indicators.',
      },
    },
  },
};

export const NotificationBadges: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
      <div style={{ position: 'relative', display: 'inline-block' }}>
        <div
          style={{
            padding: '0.5rem',
            background: '#f0f0f0',
            borderRadius: '4px',
          }}
        >
          🔔 Notifications
        </div>
        <Badge count={12} variant="danger" overlay />
      </div>

      <div style={{ position: 'relative', display: 'inline-block' }}>
        <div
          style={{
            padding: '0.5rem',
            background: '#f0f0f0',
            borderRadius: '4px',
          }}
        >
          💬 Messages
        </div>
        <Badge count={5} variant="primary" overlay />
      </div>

      <div style={{ position: 'relative', display: 'inline-block' }}>
        <div
          style={{
            padding: '0.5rem',
            background: '#f0f0f0',
            borderRadius: '4px',
          }}
        >
          📋 Tasks
        </div>
        <Badge dot variant="warning" overlay />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Example of using badges for notification counts and indicators.',
      },
    },
  },
};

export const ProductLabels: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1rem',
        maxWidth: '600px',
      }}
    >
      <div
        style={{
          padding: '1rem',
          border: '2px solid #ddd',
          borderRadius: '8px',
          position: 'relative',
        }}
      >
        <Badge
          variant="success"
          size="sm"
          style={{ position: 'absolute', top: '0.5rem', right: '0.5rem' }}
        >
          New
        </Badge>
        <h4 style={{ margin: '0 0 0.5rem 0' }}>Premium Plan</h4>
        <p style={{ margin: 0, fontSize: '0.9rem', color: '#666' }}>
          Advanced features for growing teams
        </p>
      </div>

      <div
        style={{
          padding: '1rem',
          border: '2px solid #ddd',
          borderRadius: '8px',
          position: 'relative',
        }}
      >
        <Badge
          variant="warning"
          size="sm"
          style={{ position: 'absolute', top: '0.5rem', right: '0.5rem' }}
        >
          Popular
        </Badge>
        <h4 style={{ margin: '0 0 0.5rem 0' }}>Pro Plan</h4>
        <p style={{ margin: 0, fontSize: '0.9rem', color: '#666' }}>
          Perfect for most businesses
        </p>
      </div>

      <div
        style={{
          padding: '1rem',
          border: '2px solid #ddd',
          borderRadius: '8px',
          position: 'relative',
        }}
      >
        <Badge
          variant="danger"
          size="sm"
          style={{ position: 'absolute', top: '0.5rem', right: '0.5rem' }}
        >
          Limited
        </Badge>
        <h4 style={{ margin: '0 0 0.5rem 0' }}>Enterprise</h4>
        <p style={{ margin: 0, fontSize: '0.9rem', color: '#666' }}>
          Custom solutions for large orgs
        </p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Example of using badges as product labels and promotional tags.',
      },
    },
  },
};
