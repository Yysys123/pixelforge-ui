import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Input } from '../packages/react/src/input/Input';
import { Typography } from '../packages/react/src/typography/Typography';

const meta = {
  title: 'Forms/Input',
  component: Input,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Brutalist input component with bold borders, dramatic shadows, and aggressive validation states. Built for forms that command attention and ensure data integrity.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the input',
    },
    state: {
      control: 'select',
      options: ['default', 'success', 'error'],
      description: 'Validation state of the input',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the input is disabled',
    },
    required: {
      control: 'boolean',
      description: 'Whether the input is required',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Whether the input takes full width',
    },
    label: {
      control: 'text',
      description: 'Label text for the input',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    helperText: {
      control: 'text',
      description: 'Helper text shown below the input',
    },
    error: {
      control: 'text',
      description: 'Error message (overrides helperText)',
    },
  },
  args: {
    onChange: fn(),
    onFocus: fn(),
    onBlur: fn(),
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Email',
    placeholder: 'Enter your email',
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Password',
    type: 'password',
    placeholder: 'Enter your password',
    helperText: 'Must be at least 8 characters long',
  },
};

export const Required: Story = {
  args: {
    label: 'Username',
    placeholder: 'Enter username',
    required: true,
  },
};

export const Success: Story = {
  args: {
    label: 'Email',
    value: 'user@example.com',
    state: 'success',
    helperText: 'Email is valid',
  },
};

export const Error: Story = {
  args: {
    label: 'Email',
    value: 'invalid-email',
    error: 'Please enter a valid email address',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Input',
    placeholder: 'Cannot interact',
    disabled: true,
  },
};

export const Small: Story = {
  args: {
    label: 'Small Input',
    size: 'sm',
    placeholder: 'Small size',
  },
};

export const Large: Story = {
  args: {
    label: 'Large Input',
    size: 'lg',
    placeholder: 'Large size',
  },
};

export const FullWidth: Story = {
  args: {
    label: 'Full Width Input',
    placeholder: 'Takes full container width',
    fullWidth: true,
  },
  parameters: {
    layout: 'padded',
  },
};

export const WithStartIcon: Story = {
  args: {
    label: 'Search',
    placeholder: 'Search...',
    startIcon: '🔍',
  },
};

export const WithEndIcon: Story = {
  args: {
    label: 'Password',
    type: 'password',
    placeholder: 'Enter password',
    endIcon: '👁️',
  },
};

export const AllSizes: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        width: '300px',
      }}
    >
      <Input label="Small" size="sm" placeholder="Small input" />
      <Input label="Medium" size="md" placeholder="Medium input" />
      <Input label="Large" size="lg" placeholder="Large input" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All input sizes displayed together for comparison.',
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
        gap: '1rem',
        width: '300px',
      }}
    >
      <Input label="Default" placeholder="Default state" />
      <Input
        label="Success"
        value="Valid input"
        state="success"
        helperText="Looks good!"
      />
      <Input
        label="Error"
        value="Invalid input"
        error="This field is required"
      />
      <Input label="Disabled" placeholder="Disabled state" disabled />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All input states displayed together for comparison.',
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
        BRUTALIST CONTACT FORM
      </Typography>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <Input
          label="Full Name"
          placeholder="Enter your full name"
          required
          size="lg"
        />

        <Input
          label="Email Address"
          type="email"
          placeholder="your.email@domain.com"
          required
          size="lg"
          value="user@example.com"
          state="success"
          helperText="✓ Email format is valid"
        />

        <Input
          label="Phone Number"
          type="tel"
          placeholder="+1 (555) 123-4567"
          size="lg"
          value="123-invalid"
          error="Please enter a valid phone number"
        />

        <Input
          label="Company"
          placeholder="Your company name"
          size="lg"
          helperText="Optional - helps us understand your needs"
        />

        <Input
          label="Budget Range"
          placeholder="Select your budget"
          size="lg"
          disabled
          helperText="This field is currently unavailable"
        />

        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
          <button
            style={{
              flex: 1,
              padding: '0.8em 1.5em',
              background: '#6b21a8',
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
            SUBMIT
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
            CANCEL
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
          'Complete brutalist form example showcasing bold borders, dramatic shadows, uppercase labels, and aggressive validation states. Demonstrates the full form experience with various input states.',
      },
    },
  },
};
