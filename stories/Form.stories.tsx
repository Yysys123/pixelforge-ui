import type { Meta, StoryObj } from '@storybook/react';
import {
  Form,
  FormField,
  FormActions,
  Button,
  Input,
  Checkbox,
  CheckboxGroup,
  Radio,
} from '../packages/react/src';

const meta: Meta<typeof Form> = {
  title: 'Form Components/Form',
  component: Form,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A comprehensive form component with brutalist design elements. Provides proper form semantics and styling for all form elements.',
      },
    },
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'Form title',
    },
    description: {
      control: 'text',
      description: 'Form description',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Size variant for the form',
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'primary', 'secondary', 'accent'],
      description: 'Visual variant for the form',
    },
    showPatterns: {
      control: 'boolean',
      description: 'Whether to show decorative patterns',
    },
    loading: {
      control: 'boolean',
      description: 'Loading state',
    },
    error: {
      control: 'text',
      description: 'Error message for the entire form',
    },
    success: {
      control: 'text',
      description: 'Success message for the form',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Form>;

export const Default: Story = {
  args: {
    title: 'Contact Form',
    description: 'Fill out this form to get in touch with us.',
    size: 'md',
    variant: 'default',
    showPatterns: false,
    loading: false,
  },
  render: args => (
    <Form {...args}>
      <FormField label="Full Name" required>
        <Input type="text" placeholder="Enter your full name" required />
      </FormField>

      <FormField
        label="Email Address"
        required
        helperText="We'll never share your email"
      >
        <Input type="email" placeholder="Enter your email" required />
      </FormField>

      <FormField label="Message" required>
        <Input
          as="textarea"
          placeholder="Enter your message"
          rows={4}
          required
        />
      </FormField>

      <FormActions>
        <Button variant="outline">Cancel</Button>
        <Button type="submit">Send Message</Button>
      </FormActions>
    </Form>
  ),
};

export const WithPatterns: Story = {
  args: {
    ...Default.args,
    showPatterns: true,
    variant: 'primary',
  },
  render: Default.render,
};

export const Loading: Story = {
  args: {
    ...Default.args,
    loading: true,
  },
  render: Default.render,
};

export const WithError: Story = {
  args: {
    ...Default.args,
    error: 'Please correct the errors below and try again.',
  },
  render: args => (
    <Form {...args}>
      <FormField
        label="Email Address"
        required
        error="Please enter a valid email address"
      >
        <Input type="email" placeholder="Enter your email" required />
      </FormField>

      <FormField
        label="Password"
        required
        error="Password must be at least 8 characters"
      >
        <Input type="password" placeholder="Enter your password" required />
      </FormField>

      <FormActions>
        <Button type="submit">Submit</Button>
      </FormActions>
    </Form>
  ),
};

export const WithSuccess: Story = {
  args: {
    ...Default.args,
    success: "Form submitted successfully! We'll get back to you soon.",
  },
  render: Default.render,
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <Form title="Small Form" size="sm">
        <FormField label="Name">
          <Input type="text" placeholder="Small input" />
        </FormField>
        <FormActions>
          <Button size="sm">Submit</Button>
        </FormActions>
      </Form>

      <Form title="Medium Form" size="md">
        <FormField label="Name">
          <Input type="text" placeholder="Medium input" />
        </FormField>
        <FormActions>
          <Button>Submit</Button>
        </FormActions>
      </Form>

      <Form title="Large Form" size="lg">
        <FormField label="Name">
          <Input type="text" placeholder="Large input" />
        </FormField>
        <FormActions>
          <Button size="lg">Submit</Button>
        </FormActions>
      </Form>
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2rem',
      }}
    >
      <Form title="Default Form" variant="default">
        <FormField label="Name">
          <Input type="text" placeholder="Enter name" />
        </FormField>
        <FormActions>
          <Button>Submit</Button>
        </FormActions>
      </Form>

      <Form title="Primary Form" variant="primary">
        <FormField label="Name">
          <Input type="text" placeholder="Enter name" />
        </FormField>
        <FormActions>
          <Button>Submit</Button>
        </FormActions>
      </Form>

      <Form title="Secondary Form" variant="secondary">
        <FormField label="Name">
          <Input type="text" placeholder="Enter name" />
        </FormField>
        <FormActions>
          <Button>Submit</Button>
        </FormActions>
      </Form>

      <Form title="Accent Form" variant="accent">
        <FormField label="Name">
          <Input type="text" placeholder="Enter name" />
        </FormField>
        <FormActions>
          <Button>Submit</Button>
        </FormActions>
      </Form>
    </div>
  ),
};

export const CompleteExample: Story = {
  render: () => (
    <Form
      title="User Registration"
      description="Create your account to get started with PixelForge UI"
      variant="primary"
      showPatterns={true}
    >
      <FormField label="Personal Information" />

      <div
        style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}
      >
        <FormField label="First Name" required>
          <Input type="text" placeholder="John" required />
        </FormField>

        <FormField label="Last Name" required>
          <Input type="text" placeholder="Doe" required />
        </FormField>
      </div>

      <FormField
        label="Email Address"
        required
        helperText="We'll use this for account verification"
      >
        <Input type="email" placeholder="john@example.com" required />
      </FormField>

      <FormField
        label="Password"
        required
        helperText="Must be at least 8 characters"
      >
        <Input
          type="password"
          placeholder="Create a strong password"
          required
        />
      </FormField>

      <CheckboxGroup
        label="Interests"
        helperText="Select all that apply"
        options={[
          { value: 'design', label: 'Design Systems' },
          { value: 'frontend', label: 'Frontend Development' },
          { value: 'accessibility', label: 'Accessibility' },
          { value: 'testing', label: 'Testing' },
        ]}
      />

      <FormField label="Account Type" required>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Radio name="accountType" value="personal" label="Personal" />
          <Radio name="accountType" value="business" label="Business" />
          <Radio name="accountType" value="enterprise" label="Enterprise" />
        </div>
      </FormField>

      <FormField>
        <Checkbox
          label="I agree to the Terms of Service and Privacy Policy"
          required
        />
      </FormField>

      <FormField>
        <Checkbox label="Send me updates about new features and releases" />
      </FormField>

      <FormActions>
        <Button variant="outline">Cancel</Button>
        <Button type="submit">Create Account</Button>
      </FormActions>
    </Form>
  ),
};

export const FormActionsLayout: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <Form title="Horizontal Actions (Right Aligned)">
        <FormField label="Name">
          <Input type="text" placeholder="Enter name" />
        </FormField>
        <FormActions direction="horizontal" align="right">
          <Button variant="outline">Cancel</Button>
          <Button>Submit</Button>
        </FormActions>
      </Form>

      <Form title="Horizontal Actions (Center Aligned)">
        <FormField label="Name">
          <Input type="text" placeholder="Enter name" />
        </FormField>
        <FormActions direction="horizontal" align="center">
          <Button variant="outline">Cancel</Button>
          <Button>Submit</Button>
        </FormActions>
      </Form>

      <Form title="Vertical Actions">
        <FormField label="Name">
          <Input type="text" placeholder="Enter name" />
        </FormField>
        <FormActions direction="vertical" align="stretch">
          <Button>Submit</Button>
          <Button variant="outline">Cancel</Button>
        </FormActions>
      </Form>
    </div>
  ),
};
