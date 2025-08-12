import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Toggle } from '../packages/react/src';

const meta: Meta<typeof Toggle> = {
  title: 'Components/Toggle',
  component: Toggle,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A brutalist-styled toggle/switch component for boolean on/off controls with various customization options.',
      },
    },
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'primary', 'secondary', 'accent'],
    },
    labelPosition: {
      control: { type: 'select' },
      options: ['left', 'right'],
    },
    showLabels: {
      control: { type: 'boolean' },
    },
    loading: {
      control: { type: 'boolean' },
    },
    error: {
      control: { type: 'boolean' },
    },
    disabled: {
      control: { type: 'boolean' },
    },
    checked: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Toggle>;

export const Default: Story = {
  args: {
    label: 'Enable notifications',
  },
};

export const WithDescription: Story = {
  args: {
    label: 'Dark mode',
    description: 'Switch between light and dark themes',
  },
};

export const WithLabels: Story = {
  args: {
    label: 'Feature toggle',
    showLabels: true,
    labels: {
      on: 'ON',
      off: 'OFF',
    },
  },
};

export const WithIcons: Story = {
  args: {
    label: 'Sync enabled',
    icons: {
      on: <span>✓</span>,
      off: <span>✗</span>,
    },
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'flex-start' }}>
      <Toggle
        label="Small toggle"
        size="sm"
        defaultChecked={true}
      />
      <Toggle
        label="Medium toggle"
        size="md"
        defaultChecked={true}
      />
      <Toggle
        label="Large toggle"
        size="lg"
        defaultChecked={true}
      />
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'flex-start' }}>
      <Toggle
        label="Default variant"
        variant="default"
        defaultChecked={true}
      />
      <Toggle
        label="Primary variant"
        variant="primary"
        defaultChecked={true}
      />
      <Toggle
        label="Secondary variant"
        variant="secondary"
        defaultChecked={true}
      />
      <Toggle
        label="Accent variant"
        variant="accent"
        defaultChecked={true}
      />
    </div>
  ),
};

export const LabelPositions: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'flex-start' }}>
      <Toggle
        label="Label on the left"
        labelPosition="left"
        description="Toggle with left-aligned label"
        defaultChecked={true}
      />
      <Toggle
        label="Label on the right"
        labelPosition="right"
        description="Toggle with right-aligned label"
        defaultChecked={true}
      />
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'flex-start' }}>
      <Toggle
        label="Loading state"
        loading={true}
      />
      <Toggle
        label="Error state"
        error={true}
        description="Something went wrong"
      />
      <Toggle
        label="Disabled state"
        disabled={true}
      />
      <Toggle
        label="Disabled checked"
        disabled={true}
        defaultChecked={true}
      />
    </div>
  ),
};

export const WithCustomLabels: Story = {
  args: {
    label: 'Power mode',
    showLabels: true,
    labels: {
      on: 'HIGH',
      off: 'LOW',
    },
    description: 'Toggle between high and low power modes',
  },
};

export const InteractiveExample: Story = {
  render: () => {
    const [settings, setSettings] = React.useState({
      notifications: true,
      darkMode: false,
      autoSave: true,
      tracking: false,
    });

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'flex-start', minWidth: '300px' }}>
        <h3 style={{ margin: 0, fontFamily: 'var(--pf-font-base)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          App Settings
        </h3>
        
        <Toggle
          label="Push Notifications"
          description="Receive push notifications for important updates"
          checked={settings.notifications}
          onChange={(e) => setSettings(prev => ({ ...prev, notifications: e.target.checked }))}
          variant="primary"
        />
        
        <Toggle
          label="Dark Mode"
          description="Switch to dark theme"
          checked={settings.darkMode}
          onChange={(e) => setSettings(prev => ({ ...prev, darkMode: e.target.checked }))}
          icons={{
            on: <span>🌙</span>,
            off: <span>☀️</span>,
          }}
        />
        
        <Toggle
          label="Auto Save"
          description="Automatically save your work"
          checked={settings.autoSave}
          onChange={(e) => setSettings(prev => ({ ...prev, autoSave: e.target.checked }))}
          showLabels={true}
          variant="accent"
        />
        
        <Toggle
          label="Analytics Tracking"
          description="Help us improve by sharing usage data"
          checked={settings.tracking}
          onChange={(e) => setSettings(prev => ({ ...prev, tracking: e.target.checked }))}
          variant="secondary"
        />
      </div>
    );
  },
};