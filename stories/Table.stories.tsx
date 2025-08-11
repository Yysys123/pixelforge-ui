import type { Meta, StoryObj } from '@storybook/react';
import React, { useState, useMemo } from 'react';
import { Table, TableColumn } from '../packages/react/src/table/Table';
import { Button } from '../packages/react/src/button/Button';
import { Badge } from '../packages/react/src/badge/Badge';

// Sample data types
interface User {
  id: string;
  name: string;
  email: string;
  age: number;
  status: 'active' | 'inactive' | 'pending';
  role: 'admin' | 'user' | 'moderator';
  joinDate: string;
  lastLogin: string;
  avatar: string;
}

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  rating: number;
  featured: boolean;
}

// Sample data
const userData: User[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    email: 'alice@example.com',
    age: 28,
    status: 'active',
    role: 'admin',
    joinDate: '2023-01-15',
    lastLogin: '2024-01-10',
    avatar: 'https://i.pravatar.cc/40?img=1',
  },
  {
    id: '2',
    name: 'Bob Smith',
    email: 'bob@example.com',
    age: 34,
    status: 'inactive',
    role: 'user',
    joinDate: '2023-03-22',
    lastLogin: '2023-12-05',
    avatar: 'https://i.pravatar.cc/40?img=2',
  },
  {
    id: '3',
    name: 'Carol Williams',
    email: 'carol@example.com',
    age: 31,
    status: 'active',
    role: 'moderator',
    joinDate: '2023-06-10',
    lastLogin: '2024-01-09',
    avatar: 'https://i.pravatar.cc/40?img=3',
  },
  {
    id: '4',
    name: 'David Brown',
    email: 'david@example.com',
    age: 26,
    status: 'pending',
    role: 'user',
    joinDate: '2024-01-05',
    lastLogin: 'Never',
    avatar: 'https://i.pravatar.cc/40?img=4',
  },
  {
    id: '5',
    name: 'Eva Martinez',
    email: 'eva@example.com',
    age: 29,
    status: 'active',
    role: 'user',
    joinDate: '2023-09-18',
    lastLogin: '2024-01-08',
    avatar: 'https://i.pravatar.cc/40?img=5',
  },
];

const productData: Product[] = [
  {
    id: 'p1',
    name: 'Wireless Headphones',
    category: 'Electronics',
    price: 199.99,
    stock: 45,
    rating: 4.5,
    featured: true,
  },
  {
    id: 'p2',
    name: 'Coffee Mug',
    category: 'Kitchen',
    price: 12.99,
    stock: 120,
    rating: 4.2,
    featured: false,
  },
  {
    id: 'p3',
    name: 'Running Shoes',
    category: 'Sports',
    price: 89.99,
    stock: 23,
    rating: 4.7,
    featured: true,
  },
  {
    id: 'p4',
    name: 'Desk Lamp',
    category: 'Furniture',
    price: 45.50,
    stock: 0,
    rating: 4.0,
    featured: false,
  },
];

// Column definitions
const userColumns: TableColumn<User>[] = [
  {
    key: 'name',
    title: 'User',
    sortable: true,
    showPattern: true,
    render: (_, record) => (
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <img
          src={record.avatar}
          alt={record.name}
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            border: '2px solid var(--pf-text)',
          }}
        />
        <div>
          <div style={{ fontWeight: 'bold' }}>{record.name}</div>
          <div style={{ fontSize: '0.875em', opacity: 0.7 }}>{record.email}</div>
        </div>
      </div>
    ),
  },
  {
    key: 'age',
    title: 'Age',
    sortable: true,
    align: 'center',
    width: 80,
  },
  {
    key: 'status',
    title: 'Status',
    sortable: true,
    align: 'center',
    render: (status: User['status']) => {
      const variants = {
        active: 'success' as const,
        inactive: 'secondary' as const,
        pending: 'warning' as const,
      };
      return <Badge variant={variants[status]}>{status.toUpperCase()}</Badge>;
    },
  },
  {
    key: 'role',
    title: 'Role',
    sortable: true,
    align: 'center',
    render: (role: User['role']) => {
      const colors = {
        admin: { background: '#ff3e00', color: 'white' },
        moderator: { background: '#4d61ff', color: 'white' },
        user: { background: '#e0e0e0', color: 'black' },
      };
      return (
        <span
          style={{
            padding: '4px 8px',
            borderRadius: '4px',
            fontSize: '0.75em',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            ...colors[role],
          }}
        >
          {role}
        </span>
      );
    },
  },
  {
    key: 'joinDate',
    title: 'Joined',
    sortable: true,
    render: (date: string) => new Date(date).toLocaleDateString(),
  },
  {
    key: 'actions',
    title: 'Actions',
    align: 'center',
    render: (_, record) => (
      <div style={{ display: 'flex', gap: '4px', justifyContent: 'center' }}>
        <Button size="sm" variant="outline">
          Edit
        </Button>
        <Button size="sm" variant="danger">
          Delete
        </Button>
      </div>
    ),
  },
];

const productColumns: TableColumn<Product>[] = [
  {
    key: 'name',
    title: 'Product',
    sortable: true,
    showPattern: true,
    render: (name, record) => (
      <div>
        <div style={{ fontWeight: 'bold' }}>{name}</div>
        {record.featured && (
          <Badge variant="accent" size="sm">
            ⭐ Featured
          </Badge>
        )}
      </div>
    ),
  },
  {
    key: 'category',
    title: 'Category',
    sortable: true,
  },
  {
    key: 'price',
    title: 'Price',
    sortable: true,
    align: 'right',
    render: (price: number) => `$${price.toFixed(2)}`,
  },
  {
    key: 'stock',
    title: 'Stock',
    sortable: true,
    align: 'center',
    render: (stock: number) => (
      <span
        style={{
          color: stock > 0 ? 'var(--pf-success)' : 'var(--pf-danger)',
          fontWeight: 'bold',
        }}
      >
        {stock > 0 ? stock : 'Out of Stock'}
      </span>
    ),
  },
  {
    key: 'rating',
    title: 'Rating',
    sortable: true,
    align: 'center',
    render: (rating: number) => (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
        <span>{'⭐'.repeat(Math.floor(rating))}</span>
        <span style={{ fontSize: '0.875em' }}>({rating})</span>
      </div>
    ),
  },
];

const simpleColumns: TableColumn[] = [
  { key: 'name', title: 'Name', sortable: true },
  { key: 'email', title: 'Email' },
  { key: 'age', title: 'Age', sortable: true, align: 'center' },
];

const meta: Meta<typeof Table> = {
  title: 'Components/Table',
  component: Table,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
A powerful and flexible table component with sorting, selection, and brutalist design elements.

## Features

- **Sorting**: Click column headers to sort data
- **Selection**: Row selection with checkboxes
- **Custom Rendering**: Flexible cell content with render functions
- **Responsive**: Mobile-friendly with horizontal scroll
- **Accessibility**: Full keyboard navigation and screen reader support
- **Loading States**: Built-in loading spinner
- **Empty States**: Customizable empty state messages
- **Variants**: Multiple color schemes and sizes
- **Patterns**: Optional decorative design elements

## Design Language

The Table component follows PixelForge UI's brutalist design principles:
- Bold borders and dramatic shadows
- High contrast styling
- Geometric patterns and shapes
- Interactive hover effects
- Strong typography hierarchy
        `,
      },
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size variant for table elements',
    },
    variant: {
      control: 'select',
      options: ['default', 'primary', 'secondary'],
      description: 'Color variant for the table',
    },
    striped: {
      control: 'boolean',
      description: 'Enable striped row styling',
    },
    hoverable: {
      control: 'boolean',
      description: 'Enable hover effects on rows',
    },
    bordered: {
      control: 'boolean',
      description: 'Show borders between cells',
    },
    selectable: {
      control: 'boolean',
      description: 'Enable row selection with checkboxes',
    },
    loading: {
      control: 'boolean',
      description: 'Show loading state',
    },
    showPatterns: {
      control: 'boolean',
      description: 'Show decorative patterns',
    },
    emptyText: {
      control: 'text',
      description: 'Text to show when table is empty',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Table>;

// Basic Examples
export const Default: Story = {
  args: {
    columns: simpleColumns,
    dataSource: userData.slice(0, 3),
    striped: true,
    hoverable: true,
    bordered: true,
    showPatterns: true,
  },
};

export const WithSelection: Story = {
  args: {
    columns: simpleColumns,
    dataSource: userData.slice(0, 3),
    selectable: true,
    striped: true,
    hoverable: true,
    bordered: true,
  },
};

export const WithSorting: Story = {
  render: () => {
    const [sortKey, setSortKey] = useState<string>('');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc' | null>(null);
    
    const sortedData = useMemo(() => {
      if (!sortKey || !sortDirection) return userData.slice(0, 4);
      
      return [...userData.slice(0, 4)].sort((a, b) => {
        const aVal = a[sortKey as keyof User];
        const bVal = b[sortKey as keyof User];
        
        if (typeof aVal === 'string' && typeof bVal === 'string') {
          return sortDirection === 'asc' 
            ? aVal.localeCompare(bVal)
            : bVal.localeCompare(aVal);
        }
        
        if (typeof aVal === 'number' && typeof bVal === 'number') {
          return sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
        }
        
        return 0;
      });
    }, [sortKey, sortDirection]);
    
    return (
      <Table
        columns={simpleColumns}
        dataSource={sortedData}
        onSortChange={(key, direction) => {
          setSortKey(key);
          setSortDirection(direction);
        }}
      />
    );
  },
};

// Size Variants
export const SmallSize: Story = {
  args: {
    columns: simpleColumns,
    dataSource: userData.slice(0, 3),
    size: 'sm',
  },
};

export const LargeSize: Story = {
  args: {
    columns: simpleColumns,
    dataSource: userData.slice(0, 3),
    size: 'lg',
  },
};

// Color Variants
export const PrimaryVariant: Story = {
  args: {
    columns: simpleColumns,
    dataSource: userData.slice(0, 3),
    variant: 'primary',
  },
};

export const SecondaryVariant: Story = {
  args: {
    columns: simpleColumns,
    dataSource: userData.slice(0, 3),
    variant: 'secondary',
  },
};

// Advanced Examples
export const UserManagement: Story = {
  render: () => {
    const [selectedRows, setSelectedRows] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    
    const handleSelectionChange = (keys: string[], rows: User[]) => {
      setSelectedRows(keys);
      console.log('Selected:', keys, rows);
    };
    
    const handleRefresh = () => {
      setLoading(true);
      setTimeout(() => setLoading(false), 2000);
    };
    
    return (
      <div>
        <div style={{ marginBottom: '16px', display: 'flex', gap: '8px', alignItems: 'center' }}>
          <Button onClick={handleRefresh}>Refresh Data</Button>
          {selectedRows.length > 0 && (
            <Badge variant="primary">
              {selectedRows.length} selected
            </Badge>
          )}
        </div>
        <Table
          columns={userColumns}
          dataSource={userData}
          selectable
          selectedRowKeys={selectedRows}
          onSelectionChange={handleSelectionChange}
          loading={loading}
          rowKey={(record) => record.id}
        />
      </div>
    );
  },
};

export const ProductCatalog: Story = {
  args: {
    columns: productColumns,
    dataSource: productData,
    rowKey: (record: Product) => record.id,
    variant: 'secondary',
  },
};

// State Examples
export const LoadingState: Story = {
  args: {
    columns: simpleColumns,
    dataSource: userData.slice(0, 3),
    loading: true,
  },
};

export const EmptyState: Story = {
  args: {
    columns: simpleColumns,
    dataSource: [],
    emptyText: 'No users found. Try adjusting your filters.',
  },
};

export const NoPatterns: Story = {
  args: {
    columns: simpleColumns,
    dataSource: userData.slice(0, 3),
    showPatterns: false,
  },
};

// Interactive Example with Full Features
export const FullFeatured: Story = {
  render: () => {
    const [data, setData] = useState(userData);
    const [selectedRows, setSelectedRows] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    
    const handleDelete = (id: string) => {
      setData(prev => prev.filter(user => user.id !== id));
      setSelectedRows(prev => prev.filter(key => key !== id));
    };
    
    const handleBulkDelete = () => {
      setData(prev => prev.filter(user => !selectedRows.includes(user.id)));
      setSelectedRows([]);
    };
    
    const columnsWithActions: TableColumn<User>[] = [
      ...userColumns.slice(0, -1), // Remove the original actions column
      {
        key: 'actions',
        title: 'Actions',
        align: 'center',
        render: (_, record) => (
          <div style={{ display: 'flex', gap: '4px', justifyContent: 'center' }}>
            <Button size="sm" variant="outline">
              Edit
            </Button>
            <Button 
              size="sm" 
              variant="danger"
              onClick={() => handleDelete(record.id)}
            >
              Delete
            </Button>
          </div>
        ),
      },
    ];
    
    return (
      <div>
        <div style={{ 
          marginBottom: '16px', 
          display: 'flex', 
          gap: '8px', 
          alignItems: 'center',
          flexWrap: 'wrap'
        }}>
          <Button 
            onClick={() => setLoading(!loading)}
            variant={loading ? 'danger' : 'secondary'}
          >
            {loading ? 'Stop Loading' : 'Start Loading'}
          </Button>
          
          {selectedRows.length > 0 && (
            <>
              <Badge variant="primary">
                {selectedRows.length} selected
              </Badge>
              <Button 
                variant="danger" 
                size="sm"
                onClick={handleBulkDelete}
              >
                Delete Selected
              </Button>
            </>
          )}
          
          <div style={{ marginLeft: 'auto', fontSize: '0.875em', opacity: 0.7 }}>
            Total: {data.length} users
          </div>
        </div>
        
        <Table
          columns={columnsWithActions}
          dataSource={data}
          selectable
          selectedRowKeys={selectedRows}
          onSelectionChange={(keys) => setSelectedRows(keys)}
          loading={loading}
          rowKey={(record) => record.id}
          size="md"
          variant="default"
          emptyText="No users found. All users have been deleted!"
        />
      </div>
    );
  },
};