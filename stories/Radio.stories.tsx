import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Radio, RadioGroup } from '../packages/react/src/radio/Radio';
import { Typography } from '../packages/react/src/typography/Typography';

const meta = {
  title: 'Forms/Radio',
  component: Radio,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Brutalist radio button component with bold circular styling, dramatic shadows, and comprehensive accessibility features. Includes both individual Radio components and RadioGroup for managing collections.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the radio button',
    },
    variant: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'accent'],
      description: 'Visual variant of the radio button',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the radio button is disabled',
    },
    required: {
      control: 'boolean',
      description: 'Whether the radio button is required',
    },
    label: {
      control: 'text',
      description: 'Label text for the radio button',
    },
    helperText: {
      control: 'text',
      description: 'Helper text shown below the radio button',
    },
    error: {
      control: 'text',
      description: 'Error message (overrides helperText)',
    },
  },
  args: {
    onChange: fn(),
  },
} satisfies Meta<typeof Radio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Select this option',
    name: 'example',
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Premium plan',
    name: 'plan',
    helperText: 'Includes all features and priority support',
  },
};

export const Required: Story = {
  args: {
    label: 'I agree to the terms',
    name: 'agreement',
    required: true,
  },
};

export const Checked: Story = {
  args: {
    label: 'This option is selected',
    name: 'example',
    checked: true,
    size: 'lg',
  },
};

export const Error: Story = {
  args: {
    label: 'Required selection',
    name: 'required',
    error: 'You must select an option to continue',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled option',
    name: 'disabled',
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    label: 'Disabled and selected',
    name: 'disabled',
    disabled: true,
    checked: true,
  },
};

export const Small: Story = {
  args: {
    label: 'Small radio button',
    name: 'size',
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    label: 'Large radio button',
    name: 'size',
    size: 'lg',
  },
};

export const Primary: Story = {
  args: {
    label: 'Primary variant',
    name: 'variant',
    variant: 'primary',
    checked: true,
  },
};

export const Secondary: Story = {
  args: {
    label: 'Secondary variant',
    name: 'variant',
    variant: 'secondary',
    checked: true,
  },
};

export const Accent: Story = {
  args: {
    label: 'Accent variant',
    name: 'variant',
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
      <Radio label="Small radio button" name="sizes" size="sm" />
      <Radio label="Medium radio button" name="sizes" size="md" />
      <Radio label="Large radio button" name="sizes" size="lg" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All radio button sizes displayed together for comparison.',
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
      <Radio
        label="Default variant (Blue)"
        name="variants-demo1"
        variant="default"
        checked
      />
      <Radio 
        label="Primary variant (Purple)" 
        name="variants-demo2" 
        variant="primary" 
        checked
      />
      <Radio 
        label="Secondary variant (Green)" 
        name="variants-demo3" 
        variant="secondary" 
        checked
      />
      <Radio 
        label="Accent variant (Orange)" 
        name="variants-demo4" 
        variant="accent" 
        checked
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All radio button variants with filled appearance showing distinct colors for each variant.',
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
      <Radio label="Unselected" name="states" />
      <Radio label="Selected" name="states" checked />
      <Radio
        label="With helper text"
        name="states"
        helperText="Additional information"
      />
      <Radio label="With error" name="states" error="This field is required" />
      <Radio label="Required" name="states" required />
      <Radio label="Disabled" name="states" disabled />
      <Radio label="Disabled selected" name="states" disabled checked />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All radio button states displayed together for comparison.',
      },
    },
  },
};

export const CustomIcon: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
        alignItems: 'flex-start',
      }}
    >
      <Radio
        label="Custom selected icon"
        name="custom"
        checked
        selectedIcon={
          <span style={{ color: 'white', fontSize: '10px' }}>★</span>
        }
      />
      <Radio
        label="Another custom icon"
        name="custom"
        selectedIcon={
          <span style={{ color: 'white', fontSize: '8px' }}>●</span>
        }
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Radio buttons with custom icons for the selected state.',
      },
    },
  },
};

export const FilledVariants: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
        alignItems: 'flex-start',
      }}
    >
      <Radio
        label="Default variant (Blue)"
        name="variants-filled"
        variant="default"
        checked
        size="lg"
      />
      <Radio
        label="Primary variant (Purple)"
        name="variants-filled"
        variant="primary"
        checked
        size="lg"
      />
      <Radio
        label="Secondary variant (Green)"
        name="variants-filled"
        variant="secondary"
        checked
        size="lg"
      />
      <Radio
        label="Accent variant (Orange)"
        name="variants-filled"
        variant="accent"
        checked
        size="lg"
      />
      <Radio
        label="Error state with red styling"
        name="variants-filled"
        variant="default"
        checked
        error="This demonstrates error styling with filled radio"
        size="lg"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Radio buttons showing all variants with filled appearance and brutalist design language including shadows and press effects.',
      },
    },
  },
};

// RadioGroup Stories
const RadioGroupMeta = {
  title: 'Forms/RadioGroup',
  component: RadioGroup,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'RadioGroup component that manages a collection of radio buttons with proper group semantics, keyboard navigation, and accessibility features.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of all radio buttons in the group',
    },
    variant: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'accent'],
      description: 'Visual variant for all radio buttons in the group',
    },
    direction: {
      control: 'select',
      options: ['vertical', 'horizontal'],
      description: 'Layout direction of the radio buttons',
    },
    required: {
      control: 'boolean',
      description: 'Whether the group selection is required',
    },
    label: {
      control: 'text',
      description: 'Label for the radio group',
    },
    helperText: {
      control: 'text',
      description: 'Helper text shown below the group',
    },
    error: {
      control: 'text',
      description: 'Error message for the group',
    },
  },
  args: {
    onChange: fn(),
  },
} satisfies Meta<typeof RadioGroup>;

export const BasicGroup: StoryObj<typeof RadioGroupMeta> = {
  args: {
    name: 'plan',
    label: 'Choose your plan',
    options: [
      { value: 'free', label: 'Free Plan' },
      { value: 'pro', label: 'Pro Plan' },
      { value: 'enterprise', label: 'Enterprise Plan' },
    ],
  },
};

export const HorizontalGroup: StoryObj<typeof RadioGroupMeta> = {
  args: {
    name: 'rating',
    label: 'How would you rate our service?',
    direction: 'horizontal',
    options: [
      { value: '1', label: 'Poor' },
      { value: '2', label: 'Fair' },
      { value: '3', label: 'Good' },
      { value: '4', label: 'Great' },
      { value: '5', label: 'Excellent' },
    ],
  },
};

export const WithHelperTexts: StoryObj<typeof RadioGroupMeta> = {
  args: {
    name: 'subscription',
    label: 'Select subscription type',
    helperText: 'You can change this later in your account settings',
    options: [
      {
        value: 'monthly',
        label: 'Monthly',
        helperText: '$19/month - Cancel anytime',
      },
      {
        value: 'yearly',
        label: 'Yearly',
        helperText: '$190/year - Save 2 months!',
      },
      {
        value: 'lifetime',
        label: 'Lifetime',
        helperText: '$500 one-time - Never pay again',
      },
    ],
  },
};

export const WithDisabledOptions: StoryObj<typeof RadioGroupMeta> = {
  args: {
    name: 'shipping',
    label: 'Shipping method',

    options: [
      { value: 'standard', label: 'Standard Shipping (5-7 days)' },
      { value: 'express', label: 'Express Shipping (2-3 days)' },
      {
        value: 'overnight',
        label: 'Overnight Shipping',
        disabled: true,
        helperText: 'Not available for your location',
      },
    ],

    variant: 'secondary',
  },
};

export const RequiredGroup: StoryObj<typeof RadioGroupMeta> = {
  args: {
    name: 'consent',
    label: 'Data processing consent',
    required: true,
    options: [
      { value: 'accept', label: 'I accept data processing' },
      { value: 'decline', label: 'I decline data processing' },
    ],
  },
};

export const WithError: StoryObj<typeof RadioGroupMeta> = {
  args: {
    name: 'payment',
    label: 'Payment method',
    error: 'Please select a payment method to continue',
    options: [
      { value: 'card', label: 'Credit Card' },
      { value: 'paypal', label: 'PayPal' },
      { value: 'bank', label: 'Bank Transfer' },
    ],
  },
};

export const BrutalistSurvey: StoryObj<typeof RadioGroupMeta> = {
  render: () => (
    <div
      style={{
        maxWidth: '600px',
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
        CUSTOMER FEEDBACK SURVEY
      </Typography>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
        <RadioGroup
          name="satisfaction"
          label="Overall satisfaction"
          size="lg"
          variant="primary"
          direction="horizontal"
          value="good"
          options={[
            { value: 'poor', label: 'Poor' },
            { value: 'fair', label: 'Fair' },
            { value: 'good', label: 'Good' },
            { value: 'excellent', label: 'Excellent' },
          ]}
        />

        <RadioGroup
          name="recommendation"
          label="How likely are you to recommend us?"
          size="lg"
          required
          helperText="Scale from 1 (not likely) to 5 (very likely)"
          options={[
            {
              value: '1',
              label: '1 - Not likely',
              helperText: 'Would not recommend',
            },
            {
              value: '2',
              label: '2 - Unlikely',
              helperText: 'Probably would not recommend',
            },
            { value: '3', label: '3 - Neutral', helperText: 'Might recommend' },
            {
              value: '4',
              label: '4 - Likely',
              helperText: 'Would probably recommend',
            },
            {
              value: '5',
              label: '5 - Very likely',
              helperText: 'Would definitely recommend',
            },
          ]}
        />

        <RadioGroup
          name="contact"
          label="Preferred contact method"
          size="lg"
          error="Please select how you'd like us to follow up"
          options={[
            { value: 'email', label: 'Email' },
            { value: 'phone', label: 'Phone call' },
            { value: 'sms', label: 'Text message' },
            { value: 'none', label: 'No follow-up needed', disabled: true },
          ]}
        />

        <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
          <button
            style={{
              flex: 1,
              padding: '0.8em 1.5em',
              background: '#7c3aed',
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
            SUBMIT FEEDBACK
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
            CLEAR FORM
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
          'Complete brutalist survey form showcasing RadioGroup components in a real-world feedback form. Demonstrates horizontal and vertical layouts, different variants, error states, required fields, and individual option helper texts.',
      },
    },
  },
};
