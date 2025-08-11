import type { Meta, StoryObj } from '@storybook/react';
import { 
  Icon, 
  Check, 
  X, 
  ChevronDown, 
  AlertCircle, 
  Info, 
  Star,
  CloseIcon,
  SuccessIcon,
  WarningIcon,
  InfoIcon
} from '../packages/icons/src/index';

const meta = {
  title: 'Components/Icons',
  component: Icon,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Icon components for PixelForge UI. Includes common icons and a base Icon component for creating custom icons.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'number',
      description: 'Size of the icon in pixels',
    },
    color: {
      control: 'color',
      description: 'Color of the icon',
    },
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BasicIcon: Story = {
  args: {
    size: 24,
    color: 'currentColor',
    children: (
      <circle cx="12" cy="12" r="10" />
    ),
  },
};

export const CheckIcon: Story = {
  render: () => <Check size={24} />,
};

export const CloseIcon_: Story = {
  render: () => <X size={24} />,
  name: 'X (Close) Icon',
};

export const ChevronDownIcon: Story = {
  render: () => <ChevronDown size={24} />,
};

export const AlertIcon: Story = {
  render: () => <AlertCircle size={24} />,
};

export const InfoIcon_: Story = {
  render: () => <Info size={24} />,
  name: 'Info Icon',
};

export const StarIcon: Story = {
  render: () => <Star size={24} />,
};

export const AllIcons: Story = {
  render: () => (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', 
      gap: '2rem',
      padding: '1rem'
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
        <Check size={32} />
        <span style={{ fontSize: '0.875rem', textAlign: 'center' }}>Check</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
        <X size={32} />
        <span style={{ fontSize: '0.875rem', textAlign: 'center' }}>X (Close)</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
        <ChevronDown size={32} />
        <span style={{ fontSize: '0.875rem', textAlign: 'center' }}>Chevron Down</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
        <AlertCircle size={32} />
        <span style={{ fontSize: '0.875rem', textAlign: 'center' }}>Alert Circle</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
        <Info size={32} />
        <span style={{ fontSize: '0.875rem', textAlign: 'center' }}>Info</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
        <Star size={32} />
        <span style={{ fontSize: '0.875rem', textAlign: 'center' }}>Star</span>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All available icons in the PixelForge UI icon set.',
      },
    },
  },
};

export const IconSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
        <Check size={16} />
        <span style={{ fontSize: '0.75rem' }}>16px</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
        <Check size={20} />
        <span style={{ fontSize: '0.75rem' }}>20px</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
        <Check size={24} />
        <span style={{ fontSize: '0.75rem' }}>24px</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
        <Check size={32} />
        <span style={{ fontSize: '0.75rem' }}>32px</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
        <Check size={48} />
        <span style={{ fontSize: '0.75rem' }}>48px</span>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different icon sizes from 16px to 48px.',
      },
    },
  },
};

export const IconColors: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
        <Star size={32} color="#3b82f6" />
        <span style={{ fontSize: '0.75rem' }}>Blue</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
        <Star size={32} color="#22c55e" />
        <span style={{ fontSize: '0.75rem' }}>Green</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
        <Star size={32} color="#f59e0b" />
        <span style={{ fontSize: '0.75rem' }}>Yellow</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
        <Star size={32} color="#ef4444" />
        <span style={{ fontSize: '0.75rem' }}>Red</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
        <Star size={32} color="#8b5cf6" />
        <span style={{ fontSize: '0.75rem' }}>Purple</span>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Icons with different colors applied.',
      },
    },
  },
};

export const ConvenienceAliases: Story = {
  render: () => (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', 
      gap: '2rem',
      padding: '1rem'
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
        <CloseIcon size={32} />
        <span style={{ fontSize: '0.875rem', textAlign: 'center' }}>CloseIcon</span>
        <span style={{ fontSize: '0.75rem', color: '#666', textAlign: 'center' }}>Alias for X</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
        <SuccessIcon size={32} />
        <span style={{ fontSize: '0.875rem', textAlign: 'center' }}>SuccessIcon</span>
        <span style={{ fontSize: '0.75rem', color: '#666', textAlign: 'center' }}>Alias for Check</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
        <WarningIcon size={32} />
        <span style={{ fontSize: '0.875rem', textAlign: 'center' }}>WarningIcon</span>
        <span style={{ fontSize: '0.75rem', color: '#666', textAlign: 'center' }}>Alias for AlertCircle</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
        <InfoIcon size={32} />
        <span style={{ fontSize: '0.875rem', textAlign: 'center' }}>InfoIcon</span>
        <span style={{ fontSize: '0.75rem', color: '#666', textAlign: 'center' }}>Alias for Info</span>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Convenience aliases for common icon use cases.',
      },
    },
  },
};

export const CustomIcon: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
      <Icon size={48} color="#8b5cf6">
        <rect x="2" y="2" width="20" height="20" rx="4" fill="none" />
        <path d="M8 12h8M12 8v8" strokeWidth="2" />
      </Icon>
      <span style={{ fontSize: '0.875rem', textAlign: 'center' }}>Custom Icon</span>
      <code style={{ fontSize: '0.75rem', background: '#f5f5f5', padding: '0.5rem', borderRadius: '4px' }}>
        {`<Icon size={48} color="#8b5cf6">
  <rect x="2" y="2" width="20" height="20" rx="4" fill="none" />
  <path d="M8 12h8M12 8v8" strokeWidth="2" />
</Icon>`}
      </code>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Example of creating a custom icon using the base Icon component.',
      },
    },
  },
};