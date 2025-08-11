import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { useState } from 'react';
import { Modal } from '../packages/react/src/modal/Modal';
import { Button } from '../packages/react/src/button/Button';
import { Typography } from '../packages/react/src/typography/Typography';

const meta = {
  title: 'Components/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Accessible modal dialog component with focus trapping, backdrop click handling, and keyboard navigation. Includes brutalist design elements and customizable content areas.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    open: {
      control: 'boolean',
      description: 'Whether the modal is open',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Size of the modal',
    },
    showCloseButton: {
      control: 'boolean',
      description: 'Whether to show the close button',
    },
    closeOnBackdropClick: {
      control: 'boolean',
      description: 'Whether clicking the backdrop closes the modal',
    },
    closeOnEscape: {
      control: 'boolean',
      description: 'Whether pressing ESC closes the modal',
    },
    trapFocus: {
      control: 'boolean',
      description: 'Whether to trap focus within the modal',
    },
    title: {
      control: 'text',
      description: 'Modal title',
    },
  },
  args: {
    onClose: fn(),
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

// Helper component for interactive stories
const ModalDemo = ({
  modalProps,
  buttonText = 'Open Modal',
  ...props
}: any) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <Button onClick={() => setIsOpen(true)}>{buttonText}</Button>
      <Modal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        {...modalProps}
        {...props}
      />
    </div>
  );
};

export const Basic: Story = {
  render: () => (
    <ModalDemo
      title="Basic Modal"
      modalProps={{
        children: (
          <div>
            <p>
              This is a basic modal with some content. You can put any React
              elements here.
            </p>
            <p>
              The modal includes focus trapping and keyboard navigation for
              accessibility.
            </p>
          </div>
        ),
      }}
    />
  ),
};

export const WithHeader: Story = {
  render: () => (
    <ModalDemo
      title="Modal with Custom Header"
      modalProps={{
        header: (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>🚀</span>
            <span>Custom Header Content</span>
          </div>
        ),
        children: (
          <div>
            <p>This modal has a custom header with additional content.</p>
            <p>You can put any React elements in the header area.</p>
          </div>
        ),
      }}
    />
  ),
};

export const WithFooter: Story = {
  render: () => (
    <ModalDemo
      title="Modal with Footer"
      modalProps={{
        children: (
          <div>
            <p>This modal includes a footer with action buttons.</p>
            <p>Perfect for confirmation dialogs or forms.</p>
          </div>
        ),
        footer: (
          <div
            style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}
          >
            <Button variant="ghost">Cancel</Button>
            <Button variant="primary">Confirm</Button>
          </div>
        ),
      }}
    />
  ),
};

export const SmallSize: Story = {
  render: () => (
    <ModalDemo
      title="Small Modal"
      buttonText="Open Small Modal"
      modalProps={{
        size: 'sm',
        children: (
          <div>
            <p>
              This is a small modal, perfect for simple confirmations or alerts.
            </p>
          </div>
        ),
      }}
    />
  ),
};

export const LargeSize: Story = {
  render: () => (
    <ModalDemo
      title="Large Modal"
      buttonText="Open Large Modal"
      modalProps={{
        size: 'lg',
        children: (
          <div>
            <p>This is a large modal with more space for content.</p>
            <p>Great for detailed forms, settings panels, or rich content.</p>
            <div
              style={{
                background: '#f5f5f5',
                padding: '1rem',
                margin: '1rem 0',
                borderRadius: '4px',
              }}
            >
              <h4 style={{ margin: '0 0 0.5rem 0' }}>Example Content Area</h4>
              <p style={{ margin: 0 }}>
                You can put complex layouts and multiple sections here.
              </p>
            </div>
          </div>
        ),
      }}
    />
  ),
};

export const NoCloseButton: Story = {
  render: () => (
    <ModalDemo
      title="No Close Button"
      buttonText="Open Modal (No X)"
      modalProps={{
        showCloseButton: false,
        children: (
          <div>
            <p>This modal doesn't have a close button in the header.</p>
            <p>
              You can still close it by clicking the backdrop or pressing ESC.
            </p>
            <Button onClick={() => {}} style={{ marginTop: '1rem' }}>
              Custom Close Action
            </Button>
          </div>
        ),
      }}
    />
  ),
};

export const FormModal: Story = {
  render: () => (
    <ModalDemo
      title="Contact Form"
      buttonText="Open Contact Form"
      modalProps={{
        size: 'md',
        children: (
          <form onSubmit={e => e.preventDefault()}>
            <div
              style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
            >
              <div>
                <Typography
                  as="label"
                  variant="caption"
                  weight="bold"
                  style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                  }}
                >
                  Name
                </Typography>
                <input
                  type="text"
                  placeholder="Your name"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '2px solid #ddd',
                    borderRadius: '4px',
                    fontSize: '1rem',
                  }}
                />
              </div>
              <div>
                <Typography
                  as="label"
                  variant="caption"
                  weight="bold"
                  style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                  }}
                >
                  Email
                </Typography>
                <input
                  type="email"
                  placeholder="your@email.com"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '2px solid #ddd',
                    borderRadius: '4px',
                    fontSize: '1rem',
                  }}
                />
              </div>
              <div>
                <Typography
                  as="label"
                  variant="caption"
                  weight="bold"
                  style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                  }}
                >
                  Message
                </Typography>
                <textarea
                  placeholder="Your message..."
                  rows={4}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '2px solid #ddd',
                    borderRadius: '4px',
                    fontSize: '1rem',
                    resize: 'vertical',
                  }}
                />
              </div>
            </div>
          </form>
        ),
        footer: (
          <div
            style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}
          >
            <Button variant="ghost">Cancel</Button>
            <Button variant="primary">Send Message</Button>
          </div>
        ),
      }}
    />
  ),
};

export const ConfirmationDialog: Story = {
  render: () => (
    <ModalDemo
      title="Delete Item"
      buttonText="Delete Item"
      modalProps={{
        size: 'sm',
        children: (
          <div>
            <p>
              Are you sure you want to delete this item? This action cannot be
              undone.
            </p>
          </div>
        ),
        footer: (
          <div
            style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}
          >
            <Button variant="ghost">Cancel</Button>
            <Button variant="danger">Delete</Button>
          </div>
        ),
      }}
    />
  ),
};

export const ScrollableContent: Story = {
  render: () => (
    <ModalDemo
      title="Terms of Service"
      buttonText="View Terms"
      modalProps={{
        size: 'lg',
        children: (
          <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
            {Array.from({ length: 20 }, (_, i) => (
              <p key={i} style={{ marginBottom: '1rem' }}>
                Section {i + 1}: Lorem ipsum dolor sit amet, consectetur
                adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris.
              </p>
            ))}
          </div>
        ),
        footer: (
          <div
            style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}
          >
            <Button variant="ghost">Decline</Button>
            <Button variant="primary">Accept</Button>
          </div>
        ),
      }}
    />
  ),
};
