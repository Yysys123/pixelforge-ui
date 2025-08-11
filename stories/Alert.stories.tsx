import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Alert } from '../packages/react/src/alert/Alert';
import { Button } from '../packages/react/src/button/Button';

const meta = {
  title: 'Components/Alert',
  component: Alert,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Accessible alert component with multiple variants, auto-hide functionality, and brutalist design elements. Perfect for notifications, status messages, and user feedback.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'success', 'warning', 'danger', 'info'],
      description: 'Visual style variant of the alert',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the alert',
    },
    dismissible: {
      control: 'boolean',
      description: 'Whether the alert can be dismissed',
    },
    showIcon: {
      control: 'boolean',
      description: 'Whether to show the variant icon',
    },
    showDecorations: {
      control: 'boolean',
      description: 'Whether to show decorative elements',
    },
    toast: {
      control: 'boolean',
      description: 'Whether to display as a toast notification',
    },
    title: {
      control: 'text',
      description: 'Alert title',
    },
    autoHideDuration: {
      control: 'number',
      description: 'Auto-hide duration in milliseconds',
    },
  },
  args: {
    onDismiss: fn(),
    children: 'This is an alert message.',
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'This is a default alert message.',
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
    title: 'Success!',
    children: 'Your changes have been saved successfully.',
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    title: 'Warning',
    children: 'Please review your input before proceeding.',
  },
};

export const Danger: Story = {
  args: {
    variant: 'danger',
    title: 'Error',
    children: 'Something went wrong. Please try again.',
  },
};

export const Info: Story = {
  args: {
    variant: 'info',
    title: 'Information',
    children: 'Here\'s some helpful information for you.',
  },
};

export const Dismissible: Story = {
  args: {
    variant: 'info',
    title: 'Dismissible Alert',
    children: 'You can close this alert by clicking the X button.',
    dismissible: true,
  },
};

export const WithoutIcon: Story = {
  args: {
    variant: 'success',
    title: 'No Icon',
    children: 'This alert doesn\'t show an icon.',
    showIcon: false,
  },
};

export const WithoutDecorations: Story = {
  args: {
    variant: 'warning',
    title: 'Clean Design',
    children: 'This alert has no decorative elements for a cleaner look.',
    showDecorations: false,
  },
};

export const SmallSize: Story = {
  args: {
    variant: 'info',
    size: 'sm',
    children: 'Small alert message.',
  },
};

export const LargeSize: Story = {
  args: {
    variant: 'success',
    size: 'lg',
    title: 'Large Alert',
    children: 'This is a larger alert with more prominent styling.',
  },
};

export const WithActions: Story = {
  args: {
    variant: 'warning',
    title: 'Action Required',
    children: 'Your session will expire soon. Would you like to extend it?',
    actions: (
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <Button size="sm" variant="ghost">Dismiss</Button>
        <Button size="sm" variant="primary">Extend Session</Button>
      </div>
    ),
  },
};

export const Toast: Story = {
  args: {
    variant: 'success',
    title: 'Toast Notification',
    children: 'This appears as a toast notification.',
    toast: true,
    dismissible: true,
  },
  parameters: {
    layout: 'fullscreen',
  },
};

export const AutoHide: Story = {
  args: {
    variant: 'info',
    title: 'Auto-Hide',
    children: 'This alert will automatically disappear after 3 seconds.',
    autoHideDuration: 3000,
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '500px' }}>
      <Alert variant="default" title="Default">Default alert variant</Alert>
      <Alert variant="success" title="Success">Success alert variant</Alert>
      <Alert variant="warning" title="Warning">Warning alert variant</Alert>
      <Alert variant="danger" title="Error">Danger alert variant</Alert>
      <Alert variant="info" title="Info">Info alert variant</Alert>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All alert variants displayed together for comparison.',
      },
    },
  },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '500px' }}>
      <Alert variant="info" size="sm" title="Small">Small size alert</Alert>
      <Alert variant="info" size="md" title="Medium">Medium size alert (default)</Alert>
      <Alert variant="info" size="lg" title="Large">Large size alert</Alert>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All alert sizes displayed together for comparison.',
      },
    },
  },
};

export const FormValidation: Story = {
  render: () => (
    <div style={{ width: '400px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <h3 style={{ margin: '0 0 1rem 0' }}>Form Validation Example</h3>
      
      <div>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
          Email
        </label>
        <input
          type="email"
          placeholder="Enter your email"
          style={{
            width: '100%',
            padding: '0.75rem',
            border: '2px solid #ef4444',
            borderRadius: '4px',
            fontSize: '1rem',
          }}
          defaultValue="invalid-email"
        />
        <Alert 
          variant="danger" 
          size="sm" 
          style={{ marginTop: '0.5rem' }}
          showDecorations={false}
        >
          Please enter a valid email address.
        </Alert>
      </div>

      <div>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
          Password
        </label>
        <input
          type="password"
          placeholder="Enter your password"
          style={{
            width: '100%',
            padding: '0.75rem',
            border: '2px solid #22c55e',
            borderRadius: '4px',
            fontSize: '1rem',
          }}
          defaultValue="securepassword123"
        />
        <Alert 
          variant="success" 
          size="sm" 
          style={{ marginTop: '0.5rem' }}
          showDecorations={false}
        >
          Password strength: Strong
        </Alert>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Example of using alerts for form validation feedback.',
      },
    },
  },
};