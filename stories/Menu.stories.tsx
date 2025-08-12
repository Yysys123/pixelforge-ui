import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Menu, MenuItem } from '../packages/react/src';
import { ChevronDown, ChevronUp, ChevronRight, ChevronLeft } from '../packages/icons/src';

const meta: Meta<typeof Menu> = {
  title: 'Components/Menu',
  component: Menu,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A brutalist-styled menu/dropdown component for context menus and navigation dropdowns with hierarchical support.',
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
    placement: {
      control: { type: 'select' },
      options: ['bottom-start', 'bottom-end', 'top-start', 'top-end', 'right-start', 'left-start'],
    },
    closeOnClick: {
      control: { type: 'boolean' },
    },
    dividerIcon: {
      control: { type: 'text' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Menu>;

const basicItems: MenuItem[] = [
  { id: '1', label: 'Profile', icon: <span>👤</span> },
  { id: '2', label: 'Settings', icon: <span>⚙️</span> },
  { id: '3', label: 'Divider', divider: true },
  { id: '4', label: 'Help', icon: <span>❓</span> },
  { id: '5', label: 'Logout', icon: <span>🚪</span> },
];

const menuWithSubmenu: MenuItem[] = [
  { id: '1', label: 'New', icon: <span>➕</span>, submenu: [
    { id: '1-1', label: 'Document' },
    { id: '1-2', label: 'Folder' },
    { id: '1-3', label: 'Project' },
  ]},
  { id: '2', label: 'Edit', icon: <span>✏️</span>, submenu: [
    { id: '2-1', label: 'Cut' },
    { id: '2-2', label: 'Copy' },
    { id: '2-3', label: 'Paste' },
    { id: '2-4', label: 'Divider', divider: true },
    { id: '2-5', label: 'Select All' },
  ]},
  { id: '3', label: 'View', icon: <span>👁️</span>, submenu: [
    { id: '3-1', label: 'Zoom In' },
    { id: '3-2', label: 'Zoom Out' },
    { id: '3-3', label: 'Actual Size' },
  ]},
  { id: 'divider', label: 'Divider', divider: true },
  { id: '4', label: 'Quit', icon: <span>❌</span> },
];

const contextMenuItems: MenuItem[] = [
  { id: '1', label: 'Open', icon: <span>📂</span> },
  { id: '2', label: 'Open with...', icon: <span>🔧</span>, submenu: [
    { id: '2-1', label: 'Text Editor' },
    { id: '2-2', label: 'Code Editor' },
    { id: '2-3', label: 'Browser' },
  ]},
  { id: 'div1', label: 'Divider', divider: true },
  { id: '3', label: 'Cut', icon: <span>✂️</span> },
  { id: '4', label: 'Copy', icon: <span>📋</span> },
  { id: '5', label: 'Paste', icon: <span>📄</span>, disabled: true },
  { id: 'div2', label: 'Divider', divider: true },
  { id: '6', label: 'Delete', icon: <span>🗑️</span> },
  { id: '7', label: 'Properties', icon: <span>ℹ️</span> },
];

export const Default: Story = {
  args: {
    items: basicItems,
    trigger: <span style={{ padding: '0.5rem 1rem', border: '2px solid #000', background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>User Menu <ChevronDown size={16} /></span>,
  },
};

export const WithSubmenu: Story = {
  args: {
    items: menuWithSubmenu,
    trigger: <span style={{ padding: '0.5rem 1rem', border: '2px solid #000', background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>File Menu <ChevronDown size={16} /></span>,
  },
};

export const ContextMenu: Story = {
  args: {
    items: contextMenuItems,
    trigger: <div style={{ 
      padding: '2rem', 
      border: '2px dashed #ccc', 
      background: '#f9f9f9', 
      cursor: 'pointer',
      textAlign: 'center',
      fontFamily: 'var(--pf-font-base)',
      textTransform: 'uppercase',
      letterSpacing: '0.05em'
    }}>
      Right-click me
    </div>,
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
      <Menu
        items={basicItems}
        size="sm"
        trigger={<span style={{ padding: '0.25rem 0.5rem', border: '2px solid #000', background: '#fff', cursor: 'pointer', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>Small <ChevronDown size={12} /></span>}
      />
      <Menu
        items={basicItems}
        size="md"
        trigger={<span style={{ padding: '0.5rem 1rem', border: '2px solid #000', background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>Medium <ChevronDown size={16} /></span>}
      />
      <Menu
        items={basicItems}
        size="lg"
        trigger={<span style={{ padding: '0.75rem 1.5rem', border: '2px solid #000', background: '#fff', cursor: 'pointer', fontSize: '1.125rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>Large <ChevronDown size={18} /></span>}
      />
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
      <Menu
        items={basicItems}
        variant="default"
        trigger={<span style={{ padding: '0.5rem 1rem', border: '2px solid #000', background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>Default <ChevronDown size={16} /></span>}
      />
      <Menu
        items={basicItems}
        variant="primary"
        trigger={<span style={{ padding: '0.5rem 1rem', border: '2px solid #3b82f6', background: '#3b82f6', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>Primary <ChevronDown size={16} /></span>}
      />
      <Menu
        items={basicItems}
        variant="secondary"
        trigger={<span style={{ padding: '0.5rem 1rem', border: '2px solid #8b5cf6', background: '#8b5cf6', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>Secondary <ChevronDown size={16} /></span>}
      />
      <Menu
        items={basicItems}
        variant="accent"
        trigger={<span style={{ padding: '0.5rem 1rem', border: '2px solid #f59e0b', background: '#f59e0b', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>Accent <ChevronDown size={16} /></span>}
      />
    </div>
  ),
};

export const Placements: Story = {
  render: () => (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(3, 1fr)', 
      gap: '3rem',
      padding: '3rem',
      minHeight: '400px',
      alignItems: 'center',
      justifyItems: 'center'
    }}>
      <Menu
        items={basicItems}
        placement="top-start"
        trigger={<span style={{ padding: '0.5rem 1rem', border: '2px solid #000', background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>Top Start <ChevronUp size={16} /></span>}
      />
      <Menu
        items={basicItems}
        placement="top-end"
        trigger={<span style={{ padding: '0.5rem 1rem', border: '2px solid #000', background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>Top End <ChevronUp size={16} /></span>}
      />
      <Menu
        items={basicItems}
        placement="right-start"
        trigger={<span style={{ padding: '0.5rem 1rem', border: '2px solid #000', background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>Right <ChevronRight size={16} /></span>}
      />
      <Menu
        items={basicItems}
        placement="bottom-start"
        trigger={<span style={{ padding: '0.5rem 1rem', border: '2px solid #000', background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>Bottom Start <ChevronDown size={16} /></span>}
      />
      <Menu
        items={basicItems}
        placement="bottom-end"
        trigger={<span style={{ padding: '0.5rem 1rem', border: '2px solid #000', background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>Bottom End <ChevronDown size={16} /></span>}
      />
      <Menu
        items={basicItems}
        placement="left-start"
        trigger={<span style={{ padding: '0.5rem 1rem', border: '2px solid #000', background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><ChevronLeft size={16} /> Left</span>}
      />
    </div>
  ),
};

export const CustomDivider: Story = {
  args: {
    items: [
      { id: '1', label: 'Item 1' },
      { id: 'div1', label: 'Divider', divider: true },
      { id: '2', label: 'Item 2' },
      { id: 'div2', label: 'Divider', divider: true },
      { id: '3', label: 'Item 3' },
    ],
    dividerIcon: '◆',
    trigger: <span style={{ padding: '0.5rem 1rem', border: '2px solid #000', background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>Custom Divider <ChevronDown size={16} /></span>,
  },
};

export const Interactive: Story = {
  render: () => {
    const [selectedItem, setSelectedItem] = React.useState<string>('');
    const [lastAction, setLastAction] = React.useState<string>('');

    const handleMenuClick = (item: MenuItem) => {
      setSelectedItem(item.label);
      setLastAction(`Clicked: ${item.label}`);
    };

    const actionItems: MenuItem[] = [
      { id: '1', label: 'New File', icon: <span>📄</span>, onClick: handleMenuClick },
      { id: '2', label: 'New Folder', icon: <span>📁</span>, onClick: handleMenuClick },
      { id: 'div1', label: 'Divider', divider: true },
      { id: '3', label: 'Import', icon: <span>📥</span>, onClick: handleMenuClick, submenu: [
        { id: '3-1', label: 'From File', onClick: handleMenuClick },
        { id: '3-2', label: 'From URL', onClick: handleMenuClick },
        { id: '3-3', label: 'From Cloud', onClick: handleMenuClick },
      ]},
      { id: '4', label: 'Export', icon: <span>📤</span>, onClick: handleMenuClick, submenu: [
        { id: '4-1', label: 'As PDF', onClick: handleMenuClick },
        { id: '4-2', label: 'As Image', onClick: handleMenuClick },
        { id: '4-3', label: 'As JSON', onClick: handleMenuClick },
      ]},
      { id: 'div2', label: 'Divider', divider: true },
      { id: '5', label: 'Settings', icon: <span>⚙️</span>, onClick: handleMenuClick },
      { id: '6', label: 'Disabled Item', icon: <span>🚫</span>, disabled: true },
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', alignItems: 'center' }}>
        <Menu
          items={actionItems}
          trigger={
            <button style={{ 
              padding: '1rem 2rem', 
              border: '3px solid #000', 
              background: '#3b82f6',
              color: '#fff',
              cursor: 'pointer',
              fontFamily: 'var(--pf-font-base)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              fontWeight: 'bold',
              borderRadius: '0.5rem',
              boxShadow: '3px 3px 0 rgba(0,0,0,0.2)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>Actions Menu <ChevronDown size={16} /></div>
            </button>
          }
          variant="primary"
          closeOnClick={true}
        />

        {lastAction && (
          <div style={{
            padding: '1rem',
            border: '2px solid #22c55e',
            background: '#dcfce7',
            borderRadius: '0.5rem',
            fontFamily: 'var(--pf-font-base)',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            color: '#166534'
          }}>
            {lastAction}
          </div>
        )}
      </div>
    );
  },
};