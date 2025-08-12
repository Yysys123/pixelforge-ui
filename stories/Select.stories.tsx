import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Select, SelectOption } from '../packages/react/src';

const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A brutalist-styled select component with support for single/multiple selection, search, and custom rendering.',
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
    multiple: {
      control: { type: 'boolean' },
    },
    searchable: {
      control: { type: 'boolean' },
    },
    clearable: {
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
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

const basicOptions: SelectOption[] = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
  { value: 'date', label: 'Date' },
  { value: 'elderberry', label: 'Elderberry' },
];

const categoryOptions: SelectOption[] = [
  { value: 'fruits', label: 'Fruits' },
  { value: 'vegetables', label: 'Vegetables' },
  { value: 'grains', label: 'Grains' },
  { value: 'proteins', label: 'Proteins' },
  { value: 'dairy', label: 'Dairy Products' },
  { value: 'beverages', label: 'Beverages' },
  { value: 'snacks', label: 'Snacks', disabled: true },
  { value: 'condiments', label: 'Condiments' },
];

export const Default: Story = {
  args: {
    options: basicOptions,
    placeholder: 'Select a fruit...',
  },
};

export const WithSearch: Story = {
  args: {
    options: categoryOptions,
    placeholder: 'Search and select...',
    searchable: true,
    clearable: true,
  },
};

export const Multiple: Story = {
  args: {
    options: basicOptions,
    placeholder: 'Select multiple fruits...',
    multiple: true,
    clearable: true,
  },
};

export const MultipleWithSearch: Story = {
  args: {
    options: categoryOptions,
    placeholder: 'Search and select multiple...',
    multiple: true,
    searchable: true,
    clearable: true,
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', minWidth: '300px' }}>
      <Select
        options={basicOptions}
        placeholder="Small select..."
        size="sm"
      />
      <Select
        options={basicOptions}
        placeholder="Medium select..."
        size="md"
      />
      <Select
        options={basicOptions}
        placeholder="Large select..."
        size="lg"
      />
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', minWidth: '300px' }}>
      <Select
        options={basicOptions}
        placeholder="Default variant..."
        variant="default"
      />
      <Select
        options={basicOptions}
        placeholder="Primary variant..."
        variant="primary"
      />
      <Select
        options={basicOptions}
        placeholder="Secondary variant..."
        variant="secondary"
      />
      <Select
        options={basicOptions}
        placeholder="Accent variant..."
        variant="accent"
      />
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', minWidth: '300px' }}>
      <Select
        options={basicOptions}
        placeholder="Loading state..."
        loading={true}
      />
      <Select
        options={basicOptions}
        placeholder="Error state..."
        error={true}
      />
      <Select
        options={basicOptions}
        placeholder="Disabled state..."
        disabled={true}
      />
    </div>
  ),
};

export const WithCustomRender: Story = {
  args: {
    options: categoryOptions,
    placeholder: 'Select with custom rendering...',
    renderOption: (option) => (
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <span style={{ fontSize: '1.2em' }}>
          {option.value === 'fruits' && '🍎'}
          {option.value === 'vegetables' && '🥕'}
          {option.value === 'grains' && '🌾'}
          {option.value === 'proteins' && '🥩'}
          {option.value === 'dairy' && '🥛'}
          {option.value === 'beverages' && '🥤'}
          {option.value === 'snacks' && '🍿'}
          {option.value === 'condiments' && '🧂'}
        </span>
        <span>{option.label}</span>
      </div>
    ),
    renderValue: (value) => {
      if (Array.isArray(value)) {
        return `${value.length} categories selected`;
      }
      const option = categoryOptions.find(opt => opt.value === value);
      return option ? option.label : value;
    },
  },
};