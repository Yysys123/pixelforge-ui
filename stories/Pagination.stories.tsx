import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Pagination } from '../packages/react/src';

const meta: Meta<typeof Pagination> = {
  title: 'Components/Pagination',
  component: Pagination,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A brutalist-styled pagination component for navigating through large datasets with customizable appearance and functionality.',
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
    showFirstLast: {
      control: { type: 'boolean' },
    },
    showPrevNext: {
      control: { type: 'boolean' },
    },
    showPageInfo: {
      control: { type: 'boolean' },
    },
    siblingCount: {
      control: { type: 'number', min: 0, max: 5 },
    },
    loading: {
      control: { type: 'boolean' },
    },
    disabled: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Pagination>;

export const Default: Story = {
  args: {
    currentPage: 5,
    totalPages: 10,
  },
};

export const WithPageInfo: Story = {
  args: {
    currentPage: 3,
    totalPages: 15,
    showPageInfo: true,
  },
};

export const Minimal: Story = {
  args: {
    currentPage: 2,
    totalPages: 8,
    showFirstLast: false,
    showPrevNext: true,
  },
};

export const SimplePrevNext: Story = {
  args: {
    currentPage: 4,
    totalPages: 20,
    showFirstLast: false,
    showPrevNext: true,
    siblingCount: 0,
  },
};

export const LargePagination: Story = {
  args: {
    currentPage: 25,
    totalPages: 50,
    siblingCount: 2,
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', alignItems: 'center' }}>
      <div>
        <h4 style={{ margin: '0 0 1rem 0', fontFamily: 'var(--pf-font-base)', textAlign: 'center' }}>Small</h4>
        <Pagination currentPage={3} totalPages={8} size="sm" />
      </div>
      <div>
        <h4 style={{ margin: '0 0 1rem 0', fontFamily: 'var(--pf-font-base)', textAlign: 'center' }}>Medium</h4>
        <Pagination currentPage={3} totalPages={8} size="md" />
      </div>
      <div>
        <h4 style={{ margin: '0 0 1rem 0', fontFamily: 'var(--pf-font-base)', textAlign: 'center' }}>Large</h4>
        <Pagination currentPage={3} totalPages={8} size="lg" />
      </div>
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', alignItems: 'center' }}>
      <div>
        <h4 style={{ margin: '0 0 1rem 0', fontFamily: 'var(--pf-font-base)', textAlign: 'center' }}>Default</h4>
        <Pagination currentPage={4} totalPages={10} variant="default" />
      </div>
      <div>
        <h4 style={{ margin: '0 0 1rem 0', fontFamily: 'var(--pf-font-base)', textAlign: 'center' }}>Primary</h4>
        <Pagination currentPage={4} totalPages={10} variant="primary" />
      </div>
      <div>
        <h4 style={{ margin: '0 0 1rem 0', fontFamily: 'var(--pf-font-base)', textAlign: 'center' }}>Secondary</h4>
        <Pagination currentPage={4} totalPages={10} variant="secondary" />
      </div>
      <div>
        <h4 style={{ margin: '0 0 1rem 0', fontFamily: 'var(--pf-font-base)', textAlign: 'center' }}>Accent</h4>
        <Pagination currentPage={4} totalPages={10} variant="accent" />
      </div>
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', alignItems: 'center' }}>
      <div>
        <h4 style={{ margin: '0 0 1rem 0', fontFamily: 'var(--pf-font-base)', textAlign: 'center' }}>Loading</h4>
        <Pagination currentPage={3} totalPages={8} loading={true} />
      </div>
      <div>
        <h4 style={{ margin: '0 0 1rem 0', fontFamily: 'var(--pf-font-base)', textAlign: 'center' }}>Disabled</h4>
        <Pagination currentPage={3} totalPages={8} disabled={true} />
      </div>
    </div>
  ),
};

export const CustomLabels: Story = {
  args: {
    currentPage: 5,
    totalPages: 12,
    showPageInfo: true,
    labels: {
      first: 'First',
      previous: 'Prev',
      next: 'Next',
      last: 'Last',
      page: 'Page',
      of: 'of',
    },
  },
};

export const Interactive: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = React.useState(1);
    const [itemsPerPage, setItemsPerPage] = React.useState(10);
    const totalItems = 237;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const handlePageChange = (page: number) => {
      setCurrentPage(page);
    };

    const startItem = (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, totalItems);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', alignItems: 'center', minWidth: '600px' }}>
        <div style={{ 
          display: 'flex', 
          gap: '1rem', 
          alignItems: 'center',
          fontFamily: 'var(--pf-font-base)',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          fontSize: '0.875rem'
        }}>
          <span>Items per page:</span>
          <select 
            value={itemsPerPage} 
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            style={{
              padding: '0.5rem',
              border: '2px solid #000',
              fontFamily: 'var(--pf-font-base)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>

        <div style={{ 
          textAlign: 'center',
          fontFamily: 'var(--pf-font-base)',
          fontSize: '0.875rem',
          color: '#666'
        }}>
          Showing {startItem}-{endItem} of {totalItems} items
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          showPageInfo={true}
          variant="primary"
        />

        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
          width: '100%',
          maxWidth: '800px'
        }}>
          {Array.from({ length: Math.min(itemsPerPage, totalItems - startItem + 1) }, (_, i) => (
            <div 
              key={startItem + i}
              style={{
                padding: '1rem',
                border: '2px solid #000',
                background: '#f9f9f9',
                fontFamily: 'var(--pf-font-base)',
                textAlign: 'center',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}
            >
              Item {startItem + i}
            </div>
          ))}
        </div>
      </div>
    );
  },
};

export const EdgeCases: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', alignItems: 'center' }}>
      <div>
        <h4 style={{ margin: '0 0 1rem 0', fontFamily: 'var(--pf-font-base)', textAlign: 'center' }}>First Page</h4>
        <Pagination currentPage={1} totalPages={10} />
      </div>
      <div>
        <h4 style={{ margin: '0 0 1rem 0', fontFamily: 'var(--pf-font-base)', textAlign: 'center' }}>Last Page</h4>
        <Pagination currentPage={10} totalPages={10} />
      </div>
      <div>
        <h4 style={{ margin: '0 0 1rem 0', fontFamily: 'var(--pf-font-base)', textAlign: 'center' }}>Single Page</h4>
        <Pagination currentPage={1} totalPages={1} />
      </div>
      <div>
        <h4 style={{ margin: '0 0 1rem 0', fontFamily: 'var(--pf-font-base)', textAlign: 'center' }}>Many Pages (with ellipsis)</h4>
        <Pagination currentPage={50} totalPages={100} siblingCount={1} />
      </div>
    </div>
  ),
};