import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Tabs, TabPane, TabItem } from '../packages/react/src/tabs/Tabs';
import { Button } from '../packages/react/src/button/Button';
import { Badge } from '../packages/react/src/badge/Badge';
import { Card } from '../packages/react/src/card/Card';
import { Typography } from '../packages/react/src/typography/Typography';

// Sample content components
const DashboardContent = () => (
  <div>
    <Typography variant="h3" weight="bold" style={{ marginBottom: '16px' }}>
      Dashboard Overview
    </Typography>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
      <Card title="Total Users" description="1,234 active users" variant="primary" />
      <Card title="Revenue" description="$45,678 this month" variant="accent" />
      <Card title="Orders" description="567 orders pending" variant="secondary" />
    </div>
  </div>
);

const AnalyticsContent = () => (
  <div>
    <Typography variant="h3" weight="bold" style={{ marginBottom: '16px' }}>
      Analytics Report
    </Typography>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ padding: '20px', background: 'var(--pf-surface)', border: '2px solid var(--pf-text)', borderRadius: '8px' }}>
        <Typography variant="body1">
          📊 <strong>Page Views:</strong> 12,345 (+15% from last month)
        </Typography>
      </div>
      <div style={{ padding: '20px', background: 'var(--pf-surface)', border: '2px solid var(--pf-text)', borderRadius: '8px' }}>
        <Typography variant="body1">
          👥 <strong>Unique Visitors:</strong> 8,901 (+8% from last month)
        </Typography>
      </div>
      <div style={{ padding: '20px', background: 'var(--pf-surface)', border: '2px solid var(--pf-text)', borderRadius: '8px' }}>
        <Typography variant="body1">
          ⏱️ <strong>Avg. Session Duration:</strong> 4m 32s (+12% from last month)
        </Typography>
      </div>
    </div>
  </div>
);

const SettingsContent = () => (
  <div>
    <Typography variant="h3" weight="bold" style={{ marginBottom: '16px' }}>
      Account Settings
    </Typography>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '400px' }}>
      <div>
        <Typography variant="body2" weight="bold" style={{ marginBottom: '8px' }}>
          Notification Preferences
        </Typography>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input type="checkbox" defaultChecked />
            Email notifications
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input type="checkbox" />
            SMS notifications
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input type="checkbox" defaultChecked />
            Push notifications
          </label>
        </div>
      </div>
      <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
        <Button variant="primary" size="sm">Save Changes</Button>
        <Button variant="outline" size="sm">Reset</Button>
      </div>
    </div>
  </div>
);

// Tab items data
const basicTabItems: TabItem[] = [
  {
    key: 'tab1',
    label: 'Dashboard',
    content: <DashboardContent />,
    icon: '📊',
  },
  {
    key: 'tab2',
    label: 'Analytics',
    content: <AnalyticsContent />,
    icon: '📈',
  },
  {
    key: 'tab3',
    label: 'Settings',
    content: <SettingsContent />,
    icon: '⚙️',
  },
];

const tabsWithBadges: TabItem[] = [
  {
    key: 'messages',
    label: 'Messages',
    content: (
      <div>
        <Typography variant="h3" weight="bold" style={{ marginBottom: '16px' }}>
          Messages
        </Typography>
        <Typography variant="body1">You have 3 new messages.</Typography>
      </div>
    ),
    icon: '💬',
    badge: <Badge variant="danger" size="sm">3</Badge>,
  },
  {
    key: 'notifications',
    label: 'Notifications',
    content: (
      <div>
        <Typography variant="h3" weight="bold" style={{ marginBottom: '16px' }}>
          Notifications
        </Typography>
        <Typography variant="body1">12 unread notifications.</Typography>
      </div>
    ),
    icon: '🔔',
    badge: <Badge variant="warning" size="sm">12</Badge>,
  },
  {
    key: 'updates',
    label: 'Updates',
    content: (
      <div>
        <Typography variant="h3" weight="bold" style={{ marginBottom: '16px' }}>
          System Updates
        </Typography>
        <Typography variant="body1">System is up to date.</Typography>
      </div>
    ),
    icon: '🔄',
    badge: <Badge variant="success" size="sm">✓</Badge>,
  },
  {
    key: 'archive',
    label: 'Archive',
    content: (
      <div>
        <Typography variant="h3" weight="bold" style={{ marginBottom: '16px' }}>
          Archived Items
        </Typography>
        <Typography variant="body1">View your archived content.</Typography>
      </div>
    ),
    icon: '📦',
    disabled: true,
  },
];

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
A flexible tabs component with brutalist design elements and geometric indicators.

## Features

- **Multiple Layouts**: Top, bottom, left, right positioning
- **Interactive Elements**: Icons, badges, patterns
- **Keyboard Navigation**: Full accessibility support
- **Multiple Types**: Line, card, and brutalist styles
- **Responsive Design**: Mobile-friendly layouts
- **Customizable**: Size variants, color themes, patterns

## Design Language

The Tabs component embodies PixelForge UI's brutalist aesthetic:
- Bold borders and dramatic shadows
- Geometric indicators and patterns
- High contrast color schemes
- Interactive hover effects
- Strong typography hierarchy

## Usage

Tabs can be used with either the \`items\` prop or with \`TabPane\` children components.
        `,
      },
    },
  },
  argTypes: {
    position: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
      description: 'Position of the tab bar',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size variant for tabs',
    },
    variant: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'accent'],
      description: 'Color variant for the tabs',
    },
    type: {
      control: 'select',
      options: ['line', 'card', 'brutalist'],
      description: 'Visual style type',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Whether tabs take full width',
    },
    centered: {
      control: 'boolean',
      description: 'Whether tabs are centered',
    },
    showPatterns: {
      control: 'boolean',
      description: 'Show decorative patterns',
    },
    showIndicator: {
      control: 'boolean',
      description: 'Show geometric indicators',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tabs>;

// Basic Examples
export const Default: Story = {
  args: {
    items: basicTabItems,
    showPatterns: true,
    showIndicator: true,
  },
};

export const WithChildren: Story = {
  render: () => (
    <Tabs>
      <TabPane key="overview" tab="Overview" icon="🏠">
        <Typography variant="h3" weight="bold" style={{ marginBottom: '16px' }}>
          Welcome to PixelForge UI
        </Typography>
        <Typography variant="body1">
          This is an example of using TabPane children instead of the items prop.
          This approach gives you more flexibility in defining tab content.
        </Typography>
      </TabPane>
      <TabPane key="features" tab="Features" icon="⭐" badge={<Badge variant="accent" size="sm">New</Badge>}>
        <Typography variant="h3" weight="bold" style={{ marginBottom: '16px' }}>
          Key Features
        </Typography>
        <ul>
          <li>Brutalist design language</li>
          <li>Fully accessible components</li>
          <li>TypeScript support</li>
          <li>Responsive layouts</li>
        </ul>
      </TabPane>
      <TabPane key="docs" tab="Documentation" icon="📚">
        <Typography variant="h3" weight="bold" style={{ marginBottom: '16px' }}>
          Documentation
        </Typography>
        <Typography variant="body1">
          Comprehensive documentation and examples for all components.
        </Typography>
      </TabPane>
    </Tabs>
  ),
};

// Position Variants
export const BottomPosition: Story = {
  args: {
    items: basicTabItems,
    position: 'bottom',
  },
};

export const LeftPosition: Story = {
  args: {
    items: basicTabItems,
    position: 'left',
  },
};

export const RightPosition: Story = {
  args: {
    items: basicTabItems,
    position: 'right',
  },
};

// Size Variants
export const SmallSize: Story = {
  args: {
    items: basicTabItems,
    size: 'sm',
  },
};

export const LargeSize: Story = {
  args: {
    items: basicTabItems,
    size: 'lg',
  },
};

// Type Variants
export const LineType: Story = {
  args: {
    items: basicTabItems,
    type: 'line',
    showIndicator: false,
  },
};

export const CardType: Story = {
  args: {
    items: basicTabItems,
    type: 'card',
    showIndicator: false,
  },
};

export const BrutalistType: Story = {
  args: {
    items: basicTabItems,
    type: 'brutalist',
    showIndicator: true,
  },
};

// Color Variants
export const PrimaryVariant: Story = {
  args: {
    items: basicTabItems,
    variant: 'primary',
  },
};

export const SecondaryVariant: Story = {
  args: {
    items: basicTabItems,
    variant: 'secondary',
  },
};

export const AccentVariant: Story = {
  args: {
    items: basicTabItems,
    variant: 'accent',
  },
};

// Layout Options
export const FullWidth: Story = {
  args: {
    items: basicTabItems,
    fullWidth: true,
  },
};

export const Centered: Story = {
  args: {
    items: basicTabItems,
    centered: true,
  },
};

export const NoPatterns: Story = {
  args: {
    items: basicTabItems,
    showPatterns: false,
  },
};

// Advanced Examples
export const WithBadgesAndDisabled: Story = {
  args: {
    items: tabsWithBadges,
    defaultActiveKey: 'messages',
  },
};

export const WithExtraContent: Story = {
  args: {
    items: basicTabItems,
    tabBarExtraContent: (
      <div style={{ display: 'flex', gap: '8px' }}>
        <Button size="sm" variant="outline">Export</Button>
        <Button size="sm" variant="primary">Add New</Button>
      </div>
    ),
  },
};

// Interactive Examples
export const ControlledTabs: Story = {
  render: () => {
    const [activeKey, setActiveKey] = useState('dashboard');
    
    const controlledItems: TabItem[] = [
      {
        key: 'dashboard',
        label: 'Dashboard',
        content: (
          <div>
            <Typography variant="h3" weight="bold" style={{ marginBottom: '16px' }}>
              Controlled Dashboard
            </Typography>
            <Typography variant="body1" style={{ marginBottom: '16px' }}>
              This tab is controlled by external state. Current active key: <strong>{activeKey}</strong>
            </Typography>
            <div style={{ display: 'flex', gap: '8px' }}>
              <Button size="sm" onClick={() => setActiveKey('reports')}>
                Go to Reports
              </Button>
              <Button size="sm" variant="outline" onClick={() => setActiveKey('profile')}>
                Go to Profile
              </Button>
            </div>
          </div>
        ),
        icon: '📊',
      },
      {
        key: 'reports',
        label: 'Reports',
        content: (
          <div>
            <Typography variant="h3" weight="bold" style={{ marginBottom: '16px' }}>
              Reports Section
            </Typography>
            <Typography variant="body1">
              Generate and view various reports here.
            </Typography>
          </div>
        ),
        icon: '📈',
      },
      {
        key: 'profile',
        label: 'Profile',
        content: (
          <div>
            <Typography variant="h3" weight="bold" style={{ marginBottom: '16px' }}>
              User Profile
            </Typography>
            <Typography variant="body1">
              Manage your profile settings and preferences.
            </Typography>
          </div>
        ),
        icon: '👤',
      },
    ];
    
    return (
      <div>
        <div style={{ marginBottom: '16px', padding: '16px', background: 'var(--pf-surface)', border: '2px solid var(--pf-text)', borderRadius: '8px' }}>
          <Typography variant="body2" weight="bold" style={{ marginBottom: '8px' }}>
            External Controls
          </Typography>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {controlledItems.map((item) => (
              <Button
                key={item.key}
                size="sm"
                variant={activeKey === item.key ? 'primary' : 'outline'}
                onClick={() => setActiveKey(item.key)}
              >
                {item.icon} {item.label}
              </Button>
            ))}
          </div>
        </div>
        
        <Tabs
          items={controlledItems}
          activeKey={activeKey}
          onChange={setActiveKey}
          variant="primary"
        />
      </div>
    );
  },
};

export const DynamicTabs: Story = {
  render: () => {
    const [tabs, setTabs] = useState([
      { key: 'tab1', label: 'Tab 1', content: 'Content for Tab 1' },
      { key: 'tab2', label: 'Tab 2', content: 'Content for Tab 2' },
    ]);
    const [activeKey, setActiveKey] = useState('tab1');
    const [counter, setCounter] = useState(3);
    
    const addTab = () => {
      const newTab = {
        key: `tab${counter}`,
        label: `Tab ${counter}`,
        content: `Dynamic content for Tab ${counter}`,
      };
      setTabs([...tabs, newTab]);
      setActiveKey(newTab.key);
      setCounter(counter + 1);
    };
    
    const removeTab = (targetKey: string) => {
      const targetIndex = tabs.findIndex(tab => tab.key === targetKey);
      const newTabs = tabs.filter(tab => tab.key !== targetKey);
      
      if (newTabs.length && targetKey === activeKey) {
        const nextIndex = targetIndex === newTabs.length ? targetIndex - 1 : targetIndex;
        setActiveKey(newTabs[nextIndex].key);
      }
      
      setTabs(newTabs);
    };
    
    const tabItems: TabItem[] = tabs.map(tab => ({
      ...tab,
      content: (
        <div>
          <Typography variant="h3" weight="bold" style={{ marginBottom: '16px' }}>
            {tab.label}
          </Typography>
          <Typography variant="body1" style={{ marginBottom: '16px' }}>
            {tab.content}
          </Typography>
          {tabs.length > 1 && (
            <Button
              size="sm"
              variant="danger"
              onClick={() => removeTab(tab.key)}
            >
              Remove This Tab
            </Button>
          )}
        </div>
      ),
    }));
    
    return (
      <div>
        <div style={{ marginBottom: '16px' }}>
          <Button onClick={addTab} variant="primary">
            Add New Tab
          </Button>
        </div>
        
        <Tabs
          items={tabItems}
          activeKey={activeKey}
          onChange={setActiveKey}
          tabBarExtraContent={
            <Badge variant="secondary" size="sm">
              {tabs.length} tabs
            </Badge>
          }
        />
      </div>
    );
  },
};

// Complex Content Example
export const ComplexContent: Story = {
  render: () => {
    const complexItems: TabItem[] = [
      {
        key: 'overview',
        label: 'Overview',
        content: (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
            <Card
              title="Performance"
              description="System performance metrics and monitoring data"
              features={[
                { icon: '🚀', text: 'Fast Response' },
                { icon: '📊', text: 'Real-time Data' },
              ]}
              actionText="View Details"
              variant="primary"
            />
            <Card
              title="Security"
              description="Security alerts and system protection status"
              features={[
                { icon: '🔒', text: 'Encrypted' },
                { icon: '🛡️', text: 'Protected' },
              ]}
              actionText="Security Center"
              variant="secondary"
            />
          </div>
        ),
        icon: '🏠',
        showPattern: true,
      },
      {
        key: 'data',
        label: 'Data',
        content: (
          <div>
            <Typography variant="h3" weight="bold" style={{ marginBottom: '20px' }}>
              Data Management
            </Typography>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center', padding: '16px', background: 'var(--pf-surface)', borderRadius: '8px', border: '2px solid var(--pf-text)' }}>
                <span style={{ fontSize: '24px' }}>📁</span>
                <div>
                  <Typography variant="body1" weight="bold">Documents</Typography>
                  <Typography variant="caption" color="muted">1,234 files • 45.6 GB</Typography>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center', padding: '16px', background: 'var(--pf-surface)', borderRadius: '8px', border: '2px solid var(--pf-text)' }}>
                <span style={{ fontSize: '24px' }}>🖼️</span>
                <div>
                  <Typography variant="body1" weight="bold">Images</Typography>
                  <Typography variant="caption" color="muted">567 files • 12.3 GB</Typography>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center', padding: '16px', background: 'var(--pf-surface)', borderRadius: '8px', border: '2px solid var(--pf-text)' }}>
                <span style={{ fontSize: '24px' }}>🎵</span>
                <div>
                  <Typography variant="body1" weight="bold">Media</Typography>
                  <Typography variant="caption" color="muted">89 files • 3.2 GB</Typography>
                </div>
              </div>
            </div>
          </div>
        ),
        icon: '💾',
        badge: <Badge variant="warning" size="sm">Sync</Badge>,
      },
      {
        key: 'logs',
        label: 'Activity Logs',
        content: (
          <div>
            <Typography variant="h3" weight="bold" style={{ marginBottom: '20px' }}>
              Recent Activity
            </Typography>
            <div style={{ fontFamily: 'monospace', background: '#000', color: '#00ff00', padding: '16px', borderRadius: '8px', border: '2px solid var(--pf-text)' }}>
              <div>[2024-01-10 14:23:45] User login successful</div>
              <div>[2024-01-10 14:22:10] System backup completed</div>
              <div>[2024-01-10 14:20:33] Database optimization started</div>
              <div>[2024-01-10 14:18:22] File upload completed: document.pdf</div>
              <div>[2024-01-10 14:15:11] Security scan initiated</div>
              <div>[2024-01-10 14:12:44] Cache cleared successfully</div>
            </div>
          </div>
        ),
        icon: '📜',
      },
    ];
    
    return (
      <Tabs
        items={complexItems}
        size="lg"
        variant="accent"
        type="brutalist"
        showPatterns={true}
        showIndicator={true}
        tabBarExtraContent={
          <div style={{ display: 'flex', gap: '8px' }}>
            <Button size="sm" variant="outline">Refresh</Button>
            <Button size="sm" variant="primary">Export</Button>
          </div>
        }
      />
    );
  },
};