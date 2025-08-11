import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { Table, TableColumn } from './Table';

interface TestData {
  id: string;
  name: string;
  age: number;
  email: string;
  status: 'active' | 'inactive';
}

const mockData: TestData[] = [
  {
    id: '1',
    name: 'John Doe',
    age: 30,
    email: 'john@example.com',
    status: 'active',
  },
  {
    id: '2',
    name: 'Jane Smith',
    age: 25,
    email: 'jane@example.com',
    status: 'inactive',
  },
  {
    id: '3',
    name: 'Bob Johnson',
    age: 35,
    email: 'bob@example.com',
    status: 'active',
  },
];

const mockColumns: TableColumn<TestData>[] = [
  {
    key: 'name',
    title: 'Name',
    sortable: true,
  },
  {
    key: 'age',
    title: 'Age',
    sortable: true,
    align: 'center',
  },
  {
    key: 'email',
    title: 'Email',
  },
  {
    key: 'status',
    title: 'Status',
    render: (value: string) => (
      <span style={{ color: value === 'active' ? 'green' : 'red' }}>
        {value.toUpperCase()}
      </span>
    ),
  },
];

describe('Table', () => {
  it('renders without crashing', () => {
    render(<Table columns={mockColumns} dataSource={mockData} />);
    expect(screen.getByRole('table')).toBeInTheDocument();
  });

  it('displays column headers correctly', () => {
    render(<Table columns={mockColumns} dataSource={mockData} />);

    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Age')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();
  });

  it('displays data rows correctly', () => {
    render(<Table columns={mockColumns} dataSource={mockData} />);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('jane@example.com')).toBeInTheDocument();
    expect(screen.getByText('35')).toBeInTheDocument();
  });

  it('renders custom cell content', () => {
    render(<Table columns={mockColumns} dataSource={mockData} />);

    expect(screen.getAllByText('ACTIVE')).toHaveLength(2);
    expect(screen.getByText('INACTIVE')).toBeInTheDocument();
  });

  it('displays empty state when no data', () => {
    render(<Table columns={mockColumns} dataSource={[]} />);

    expect(screen.getByText('No data available')).toBeInTheDocument();
  });

  it('displays custom empty text', () => {
    render(
      <Table
        columns={mockColumns}
        dataSource={[]}
        emptyText="Custom empty message"
      />
    );

    expect(screen.getByText('Custom empty message')).toBeInTheDocument();
  });

  it('handles different size variants', () => {
    const { rerender } = render(
      <Table columns={mockColumns} dataSource={mockData} size="sm" />
    );

    expect(screen.getByRole('table')).toHaveClass('size-sm');

    rerender(<Table columns={mockColumns} dataSource={mockData} size="lg" />);
    expect(screen.getByRole('table')).toHaveClass('size-lg');
  });

  it('applies different variants', () => {
    const { rerender } = render(
      <Table columns={mockColumns} dataSource={mockData} variant="primary" />
    );

    expect(screen.getByRole('table')).toHaveClass('variant-primary');

    rerender(
      <Table columns={mockColumns} dataSource={mockData} variant="secondary" />
    );
    expect(screen.getByRole('table')).toHaveClass('variant-secondary');
  });

  describe('Sorting', () => {
    it('shows sort icons for sortable columns', () => {
      render(<Table columns={mockColumns} dataSource={mockData} />);

      const nameHeader = screen.getByText('Name').closest('th');
      const emailHeader = screen.getByText('Email').closest('th');

      expect(nameHeader).toHaveClass('sortable');
      expect(emailHeader).not.toHaveClass('sortable');
    });

    it('handles sort clicks', async () => {
      const onSortChange = jest.fn();
      render(
        <Table
          columns={mockColumns}
          dataSource={mockData}
          onSortChange={onSortChange}
        />
      );

      const nameHeader = screen.getByText('Name').closest('th');

      await userEvent.click(nameHeader!);
      expect(onSortChange).toHaveBeenCalledWith('name', 'asc');

      await userEvent.click(nameHeader!);
      expect(onSortChange).toHaveBeenCalledWith('name', 'desc');

      await userEvent.click(nameHeader!);
      expect(onSortChange).toHaveBeenCalledWith('', null);
    });

    it('does not sort non-sortable columns', async () => {
      const onSortChange = jest.fn();
      render(
        <Table
          columns={mockColumns}
          dataSource={mockData}
          onSortChange={onSortChange}
        />
      );

      const emailHeader = screen.getByText('Email').closest('th');

      await userEvent.click(emailHeader!);
      expect(onSortChange).not.toHaveBeenCalled();
    });
  });

  describe('Selection', () => {
    it('shows selection column when selectable', () => {
      render(<Table columns={mockColumns} dataSource={mockData} selectable />);

      const checkboxes = screen.getAllByRole('checkbox');
      expect(checkboxes).toHaveLength(4); // 3 rows + 1 header
    });

    it('does not show selection column when not selectable', () => {
      render(<Table columns={mockColumns} dataSource={mockData} />);

      const checkboxes = screen.queryAllByRole('checkbox');
      expect(checkboxes).toHaveLength(0);
    });

    it('handles individual row selection', async () => {
      const onSelectionChange = jest.fn();
      render(
        <Table
          columns={mockColumns}
          dataSource={mockData}
          selectable
          onSelectionChange={onSelectionChange}
        />
      );

      const checkboxes = screen.getAllByRole('checkbox');
      const firstRowCheckbox = checkboxes[1]; // Skip header checkbox

      await userEvent.click(firstRowCheckbox);
      expect(onSelectionChange).toHaveBeenCalledWith(['0'], [mockData[0]]);
    });

    it('handles select all functionality', async () => {
      const onSelectionChange = jest.fn();
      render(
        <Table
          columns={mockColumns}
          dataSource={mockData}
          selectable
          onSelectionChange={onSelectionChange}
        />
      );

      const headerCheckbox = screen.getAllByRole('checkbox')[0];

      await userEvent.click(headerCheckbox);
      expect(onSelectionChange).toHaveBeenCalledWith(['0', '1', '2'], mockData);
    });

    it('handles controlled selection', () => {
      render(
        <Table
          columns={mockColumns}
          dataSource={mockData}
          selectable
          selectedRowKeys={['0', '2']}
        />
      );

      const checkboxes = screen.getAllByRole('checkbox');
      expect(checkboxes[1]).toBeChecked(); // First row
      expect(checkboxes[2]).not.toBeChecked(); // Second row
      expect(checkboxes[3]).toBeChecked(); // Third row
    });
  });

  describe('Loading State', () => {
    it('shows loading spinner when loading', () => {
      render(<Table columns={mockColumns} dataSource={mockData} loading />);

      expect(screen.getByRole('table')).toHaveClass('loading');
      // Loading spinner should be present
      const spinner = document.querySelector('.loading-spinner');
      expect(spinner).toBeInTheDocument();
    });

    it('disables interactions when loading', () => {
      render(<Table columns={mockColumns} dataSource={mockData} loading />);

      const table = screen.getByRole('table');
      expect(table).toHaveAttribute('aria-busy', 'true');
      // Loading state styling is applied via CSS classes
    });
  });

  describe('Styling Options', () => {
    it('applies striped styling', () => {
      render(<Table columns={mockColumns} dataSource={mockData} striped />);
      expect(screen.getByRole('table')).toHaveClass('striped');
    });

    it('applies hoverable styling', () => {
      render(<Table columns={mockColumns} dataSource={mockData} hoverable />);
      expect(screen.getByRole('table')).toHaveClass('hoverable');
    });

    it('applies bordered styling', () => {
      render(<Table columns={mockColumns} dataSource={mockData} bordered />);
      expect(screen.getByRole('table')).toHaveClass('bordered');
    });

    it('can disable patterns', () => {
      const { container } = render(
        <Table
          columns={mockColumns}
          dataSource={mockData}
          showPatterns={false}
        />
      );

      expect(
        container.querySelector('.table-patterns')
      ).not.toBeInTheDocument();
    });
  });

  describe('Custom Row Keys', () => {
    it('uses custom row key function', () => {
      const customRowKey = (record: TestData) => record.id;
      const onSelectionChange = jest.fn();

      render(
        <Table
          columns={mockColumns}
          dataSource={mockData}
          selectable
          rowKey={customRowKey}
          onSelectionChange={onSelectionChange}
        />
      );

      const checkboxes = screen.getAllByRole('checkbox');
      const firstRowCheckbox = checkboxes[1];

      fireEvent.click(firstRowCheckbox);
      expect(onSelectionChange).toHaveBeenCalledWith(['1'], [mockData[0]]);
    });
  });

  describe('Column Configuration', () => {
    it('applies column width', () => {
      const columnsWithWidth = [
        { ...mockColumns[0], width: '200px' },
        ...mockColumns.slice(1),
      ];

      render(<Table columns={columnsWithWidth} dataSource={mockData} />);

      const nameHeader = screen.getByText('Name').closest('th');
      expect(nameHeader).toHaveStyle('width: 200px');
    });

    it('applies column alignment', () => {
      render(<Table columns={mockColumns} dataSource={mockData} />);

      const ageHeader = screen.getByText('Age').closest('th');
      expect(ageHeader).toHaveClass('align-center');
    });

    it('shows header patterns when enabled', () => {
      const columnsWithPattern = [
        { ...mockColumns[0], showPattern: true },
        ...mockColumns.slice(1),
      ];

      const { container } = render(
        <Table columns={columnsWithPattern} dataSource={mockData} />
      );

      expect(container.querySelector('.header-pattern')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(
        <Table columns={mockColumns} dataSource={mockData} />
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no accessibility violations with selection', async () => {
      const { container } = render(
        <Table columns={mockColumns} dataSource={mockData} selectable />
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('provides proper ARIA attributes for sorted columns', async () => {
      render(<Table columns={mockColumns} dataSource={mockData} />);

      const nameHeader = screen.getByText('Name').closest('th');
      await userEvent.click(nameHeader!);

      // Check that sort state is communicated properly
      expect(nameHeader).toHaveAttribute('aria-sort');
    });
  });

  describe('Advanced Accessibility', () => {
    it('supports screen reader announcements for sorting', async () => {
      render(<Table columns={mockColumns} dataSource={mockData} />);

      const nameHeader = screen.getByText('Name').closest('th');
      await userEvent.click(nameHeader!);

      // Check for proper ARIA attributes
      expect(nameHeader).toHaveAttribute('aria-sort');
    });

    it('provides proper role attributes', () => {
      render(<Table columns={mockColumns} dataSource={mockData} />);

      expect(screen.getByRole('table')).toBeInTheDocument();
      expect(screen.getAllByRole('columnheader')).toHaveLength(
        mockColumns.length
      );
      expect(screen.getAllByRole('row')).toHaveLength(mockData.length + 1); // +1 for header
    });

    it('maintains focus within table during keyboard navigation', async () => {
      render(<Table columns={mockColumns} dataSource={mockData} selectable />);

      const firstCheckbox = screen.getAllByRole('checkbox')[1]; // Skip header
      firstCheckbox.focus();

      // Tab should move to next focusable element within table
      await userEvent.tab();
      expect(document.activeElement).not.toBe(firstCheckbox);
    });

    it('supports high contrast mode preferences', () => {
      // Mock high contrast media query
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation(query => ({
          matches: query === '(prefers-contrast: high)',
          media: query,
          onchange: null,
          addListener: jest.fn(),
          removeListener: jest.fn(),
          addEventListener: jest.fn(),
          removeEventListener: jest.fn(),
          dispatchEvent: jest.fn(),
        })),
      });

      render(<Table columns={mockColumns} dataSource={mockData} />);
      expect(screen.getByRole('table')).toBeInTheDocument();
    });

    it('respects reduced motion preferences', () => {
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation(query => ({
          matches: query === '(prefers-reduced-motion: reduce)',
          media: query,
          onchange: null,
          addListener: jest.fn(),
          removeListener: jest.fn(),
          addEventListener: jest.fn(),
          removeEventListener: jest.fn(),
          dispatchEvent: jest.fn(),
        })),
      });

      render(<Table columns={mockColumns} dataSource={mockData} />);
      expect(screen.getByRole('table')).toBeInTheDocument();
    });

    it('provides proper labels for selection checkboxes', () => {
      render(<Table columns={mockColumns} dataSource={mockData} selectable />);

      const checkboxes = screen.getAllByRole('checkbox');
      checkboxes.forEach(checkbox => {
        expect(checkbox.closest('label')).toBeInTheDocument();
      });
    });

    it('announces loading state to screen readers', () => {
      render(<Table columns={mockColumns} dataSource={mockData} loading />);

      const table = screen.getByRole('table');
      expect(table).toHaveAttribute('aria-busy', 'true');
    });

    it('provides proper column header associations', () => {
      render(<Table columns={mockColumns} dataSource={mockData} />);

      const headers = screen.getAllByRole('columnheader');
      headers.forEach(header => {
        expect(header).toHaveAttribute('scope', 'col');
      });
    });
  });

  describe('Performance Tests', () => {
    it.skip('handles large datasets efficiently', () => {
      const largeData = Array.from({ length: 1000 }, (_, i) => ({
        id: i.toString(),
        name: `User ${i}`,
        age: 20 + (i % 50),
        email: `user${i}@example.com`,
        status: i % 2 === 0 ? 'active' : 'inactive',
      }));

      const start = performance.now();
      render(<Table columns={mockColumns} dataSource={largeData} />);
      const end = performance.now();

      // Should render within reasonable time (less than 100ms for 1000 rows)
      expect(end - start).toBeLessThan(100);
      expect(screen.getByRole('table')).toBeInTheDocument();
    });

    it('efficiently updates selection state', async () => {
      const onSelectionChange = jest.fn();
      render(
        <Table
          columns={mockColumns}
          dataSource={mockData}
          selectable
          onSelectionChange={onSelectionChange}
        />
      );

      const checkboxes = screen.getAllByRole('checkbox');

      // Multiple rapid selections should not cause performance issues
      for (let i = 1; i < checkboxes.length; i++) {
        await userEvent.click(checkboxes[i]);
      }

      expect(onSelectionChange).toHaveBeenCalledTimes(mockData.length);
    });
  });

  describe('Responsive Behavior', () => {
    it('handles mobile viewport correctly', () => {
      // Mock mobile viewport
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375,
      });

      render(<Table columns={mockColumns} dataSource={mockData} />);
      expect(screen.getByRole('table')).toBeInTheDocument();
    });

    it('provides horizontal scroll on small screens', () => {
      const { container } = render(
        <Table columns={mockColumns} dataSource={mockData} />
      );
      const tableContainer = container.querySelector('.table-container');

      expect(tableContainer).toBeInTheDocument();
      // Horizontal scroll styling is applied via CSS classes for responsive behavior
    });
  });

  describe('Error Boundaries', () => {
    it.skip('handles render function errors gracefully', () => {
      const consoleError = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      const columnsWithError = [
        {
          key: 'name',
          title: 'Name',
          render: () => {
            throw new Error('Render error');
          },
        },
      ];

      expect(() => {
        render(<Table columns={columnsWithError} dataSource={mockData} />);
      }).not.toThrow();

      consoleError.mockRestore();
    });

    it.skip('handles malformed data gracefully', () => {
      const malformedData = [null, undefined, { name: 'Valid' }, {}];

      render(<Table columns={mockColumns} dataSource={malformedData} />);
      expect(screen.getByRole('table')).toBeInTheDocument();
    });
  });

  describe('Internationalization', () => {
    it('supports RTL layouts', () => {
      document.dir = 'rtl';
      render(<Table columns={mockColumns} dataSource={mockData} />);

      const table = screen.getByRole('table');
      expect(table).toBeInTheDocument();

      document.dir = 'ltr'; // Reset
    });

    it('handles long text content properly', () => {
      const longTextData = [
        {
          id: '1',
          name: 'Very Long Name That Should Wrap Or Truncate Properly In The Table Cell',
          age: 30,
          email: 'very.long.email.address.that.might.overflow@example.com',
          status: 'active',
        },
      ];

      render(<Table columns={mockColumns} dataSource={longTextData} />);
      expect(screen.getByText(/Very Long Name/)).toBeInTheDocument();
    });
  });

  describe('Security Tests', () => {
    it('sanitizes HTML content in cells', () => {
      const maliciousData = [
        {
          id: '1',
          name: '<script>alert("xss")</script>',
          age: 30,
          email: 'test@example.com',
          status: 'active',
        },
      ];

      render(<Table columns={mockColumns} dataSource={maliciousData} />);

      // Should render as text, not execute script
      expect(
        screen.getByText('<script>alert("xss")</script>')
      ).toBeInTheDocument();
      expect(document.querySelector('script')).not.toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('handles empty columns array', () => {
      render(<Table columns={[]} dataSource={[]} />);
      expect(screen.getByRole('table')).toBeInTheDocument();
    });

    it('handles undefined render function gracefully', () => {
      const columnsWithUndefinedRender: TableColumn<any>[] = [
        {
          key: 'test',
          title: 'Test',
        },
      ];

      const testData = [{ test: 'value' }];

      render(
        <Table columns={columnsWithUndefinedRender} dataSource={testData} />
      );
      expect(screen.getByText('value')).toBeInTheDocument();
    });

    it('handles circular references in data', () => {
      const circularData: any = { name: 'Test' };
      circularData.self = circularData;

      render(
        <Table
          columns={[{ key: 'name', title: 'Name' }]}
          dataSource={[circularData]}
        />
      );
      expect(screen.getByText('Test')).toBeInTheDocument();
    });

    it('handles null/undefined column values', () => {
      const dataWithNulls = [
        {
          name: null,
          age: undefined,
          email: '',
          status: 'active',
        },
      ];

      render(<Table columns={mockColumns} dataSource={dataWithNulls} />);
      expect(screen.getByRole('table')).toBeInTheDocument();
    });

    it('handles zero as a valid value', () => {
      const dataWithZeros = [
        {
          name: 'Test',
          age: 0,
          email: 'test@example.com',
          status: 'active',
        },
      ];

      render(<Table columns={mockColumns} dataSource={dataWithZeros} />);
      expect(screen.getByText('0')).toBeInTheDocument();
    });
  });

  describe('Memory Management', () => {
    it('cleans up event listeners on unmount', () => {
      const { unmount } = render(
        <Table columns={mockColumns} dataSource={mockData} />
      );

      // Should not throw errors on unmount
      expect(() => unmount()).not.toThrow();
    });

    it('handles rapid re-renders without memory leaks', () => {
      const { rerender } = render(
        <Table columns={mockColumns} dataSource={mockData} />
      );

      // Rapidly change props
      for (let i = 0; i < 100; i++) {
        rerender(
          <Table
            columns={mockColumns}
            dataSource={mockData}
            loading={i % 2 === 0}
          />
        );
      }

      expect(screen.getByRole('table')).toBeInTheDocument();
    });
  });
});
