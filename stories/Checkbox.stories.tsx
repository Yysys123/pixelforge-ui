import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Checkbox } from '../packages/react/src/checkbox/Checkbox';
import { Typography } from '../packages/react/src/typography/Typography';

const meta = {
  title: 'Forms/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Brutalist checkbox component with bold geometric styling, dramatic shadows, and comprehensive accessibility features. Perfect for forms that demand attention and ensure proper user interaction.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the checkbox',
    },
    variant: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'accent'],
      description: 'Visual variant of the checkbox',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the checkbox is disabled',
    },
    required: {
      control: 'boolean',
      description: 'Whether the checkbox is required',
    },
    indeterminate: {
      control: 'boolean',
      description: 'Whether the checkbox is in an indeterminate state',
    },
    label: {
      control: 'text',
      description: 'Label text for the checkbox',
    },
    helperText: {
      control: 'text',
      description: 'Helper text shown below the checkbox',
    },
    error: {
      control: 'text',
      description: 'Error message (overrides helperText)',
    },
  },
  args: {
    onChange: fn(),
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Accept terms and conditions',
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Subscribe to newsletter',
    helperText: 'Get weekly updates about new features and products',
  },
};

export const Required: Story = {
  args: {
    label: 'I agree to the privacy policy',
    required: true,
  },
};

export const Checked: Story = {
  args: {
    label: 'This option is pre-selected',
    checked: true,
  },
};

export const Indeterminate: Story = {
  args: {
    label: 'Select all items',
    indeterminate: true,
  },
};

export const Error: Story = {
  args: {
    label: 'Required checkbox',
    error: 'You must accept the terms to continue',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled option',
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    label: 'Disabled and checked',
    disabled: true,
    checked: true,
  },
};

export const Small: Story = {
  args: {
    label: 'Small checkbox',
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    label: 'Large checkbox',
    size: 'lg',
  },
};

export const Primary: Story = {
  args: {
    label: 'Primary variant',
    variant: 'primary',
    checked: true,
  },
};

export const Secondary: Story = {
  args: {
    label: 'Secondary variant',
    variant: 'secondary',
    checked: true,
  },
};

export const Accent: Story = {
  args: {
    label: 'Accent variant',
    variant: 'accent',
    checked: true,
  },
};

export const AllSizes: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
        alignItems: 'flex-start',
      }}
    >
      <Checkbox label="Small checkbox" size="sm" />
      <Checkbox label="Medium checkbox" size="md" />
      <Checkbox label="Large checkbox" size="lg" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All checkbox sizes displayed together for comparison.',
      },
    },
  },
};

export const AllVariants: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
        alignItems: 'flex-start',
      }}
    >
      <Checkbox label="Default variant" variant="default" checked />
      <Checkbox label="Primary variant" variant="primary" checked />
      <Checkbox label="Secondary variant" variant="secondary" checked />
      <Checkbox label="Accent variant" variant="accent" checked />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All checkbox variants displayed together for comparison.',
      },
    },
  },
};

export const AllStates: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
        alignItems: 'flex-start',
      }}
    >
      <Checkbox label="Unchecked" />
      <Checkbox label="Checked" checked />
      <Checkbox label="Indeterminate" indeterminate />
      <Checkbox label="With helper text" helperText="Additional information" />
      <Checkbox label="With error" error="This field is required" />
      <Checkbox label="Required" required />
      <Checkbox label="Disabled" disabled />
      <Checkbox label="Disabled checked" disabled checked />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All checkbox states displayed together for comparison.',
      },
    },
  },
};

export const CustomIcons: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
        alignItems: 'flex-start',
      }}
    >
      <Checkbox
        label="Custom check icon"
        checked
        checkedIcon={<span style={{ color: 'white', fontSize: '12px' }}>★</span>}
      />
      <Checkbox
        label="Custom indeterminate icon"
        indeterminate
        indeterminateIcon={<span style={{ color: 'white', fontSize: '12px' }}>◉</span>}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Checkboxes with custom icons for checked and indeterminate states.',
      },
    },
  },
};

export const BrutalistForm: Story = {
  render: () => (
    <div
      style={{
        maxWidth: '500px',
        padding: '2.5rem',
        margin: '1rem auto',
        background: '#f8f9fa',
        border: '0.2em solid #000',
        borderRadius: '0.5em',
        boxShadow: '0.3em 0.3em 0 #000',
      }}
    >
      <Typography
        variant="h2"
        style={{
          margin: '0 0 2rem 0',
          borderBottom: '0.2em solid #000',
          paddingBottom: '0.5rem',
        }}
      >
        USER PREFERENCES
      </Typography>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <Checkbox
          label="Email notifications"
          size="lg"
          checked
          helperText="Receive important updates via email"
        />

        <Checkbox
          label="SMS notifications"
          size="lg"
          helperText="Get text messages for urgent updates"
        />

        <Checkbox
          label="Marketing communications"
          size="lg"
          error="You must opt-in to receive promotional content"
        />

        <Checkbox
          label="Data processing consent"
          size="lg"
          required
          helperText="Required for account creation"
        />

        <Checkbox
          label="Analytics cookies"
          size="lg"
          indeterminate
          helperText="Some analytics features are enabled"
        />

        <Checkbox
          label="Beta features"
          size="lg"
          disabled
          helperText="Currently unavailable in your region"
        />

        <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
          <button
            style={{
              flex: 1,
              padding: '0.8em 1.5em',
              background: '#059669',
              color: '#fff',
              border: '0.15em solid #000',
              borderRadius: '0.3em',
              boxShadow: '0.2em 0.2em 0 #000',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onMouseOver={e => {
              e.currentTarget.style.transform = 'translate(-0.1em, -0.1em)';
              e.currentTarget.style.boxShadow = '0.3em 0.3em 0 #000';
            }}
            onMouseOut={e => {
              e.currentTarget.style.transform = 'none';
              e.currentTarget.style.boxShadow = '0.2em 0.2em 0 #000';
            }}
          >
            SAVE PREFERENCES
          </button>

          <button
            style={{
              flex: 1,
              padding: '0.8em 1.5em',
              background: 'transparent',
              color: '#000',
              border: '0.15em solid #000',
              borderRadius: '0.3em',
              boxShadow: '0.2em 0.2em 0 #000',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onMouseOver={e => {
              e.currentTarget.style.transform = 'translate(-0.1em, -0.1em)';
              e.currentTarget.style.boxShadow = '0.3em 0.3em 0 #000';
              e.currentTarget.style.background = '#f0f0f0';
            }}
            onMouseOut={e => {
              e.currentTarget.style.transform = 'none';
              e.currentTarget.style.boxShadow = '0.2em 0.2em 0 #000';
              e.currentTarget.style.background = 'transparent';
            }}
          >
            RESET
          </button>
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        story:
          'Complete brutalist form example showcasing checkbox components in a real-world user preferences form. Demonstrates various states including checked, indeterminate, error, required, and disabled states.',
      },
    },
  },
};