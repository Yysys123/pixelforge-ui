import React, { forwardRef, useState, useMemo } from 'react';
import { clsx } from 'clsx';
import { Typography } from '../typography/Typography';
import styles from './Table.module.css';
import '../styles/utilities.css';

export interface TableColumn<T = any> {
  /**
   * Unique identifier for the column
   */
  key: string;

  /**
   * Display title for the column header
   */
  title: string;

  /**
   * Render function for custom cell content
   */
  render?: (value: any, record: T, index: number) => React.ReactNode;

  /**
   * Whether this column is sortable
   */
  sortable?: boolean;

  /**
   * Fixed width for the column
   */
  width?: string | number;

  /**
   * Alignment for cell content
   */
  align?: 'left' | 'center' | 'right';

  /**
   * Whether to show decorative pattern in header
   */
  showPattern?: boolean;
}

export interface TableProps<T = any>
  extends Omit<React.TableHTMLAttributes<HTMLTableElement>, 'children'> {
  /**
   * Column definitions
   */
  columns: TableColumn<T>[];

  /**
   * Data source for table rows
   */
  dataSource: T[];

  /**
   * Row key function to generate unique keys
   */
  rowKey?: (record: T, index: number) => string;

  /**
   * Whether to show striped rows
   */
  striped?: boolean;

  /**
   * Whether to show hover effects on rows
   */
  hoverable?: boolean;

  /**
   * Whether to show borders
   */
  bordered?: boolean;

  /**
   * Size variant for the table
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Whether to enable row selection
   */
  selectable?: boolean;

  /**
   * Selected row keys
   */
  selectedRowKeys?: string[];

  /**
   * Callback when row selection changes
   */
  onSelectionChange?: (selectedKeys: string[], selectedRows: T[]) => void;

  /**
   * Callback when sort changes
   */
  onSortChange?: (key: string, direction: 'asc' | 'desc' | null) => void;

  /**
   * Loading state
   */
  loading?: boolean;

  /**
   * Empty state message
   */
  emptyText?: string;

  /**
   * Whether to show decorative patterns
   */
  showPatterns?: boolean;

  /**
   * Table variant
   */
  variant?: 'default' | 'primary' | 'secondary';
}

type SortState = {
  key: string | null;
  direction: 'asc' | 'desc' | null;
};

/**
 * Powerful table component with sorting, selection, and brutalist design elements.
 * Features bold borders, dramatic shadows, and optional decorative patterns.
 */
export const Table = forwardRef<HTMLTableElement, TableProps>(
  (
    {
      columns,
      dataSource,
      rowKey = (_, index) => index.toString(),
      striped = true,
      hoverable = true,
      bordered = true,
      size = 'md',
      selectable = false,
      selectedRowKeys = [],
      onSelectionChange,
      onSortChange,
      loading = false,
      emptyText = 'No data available',
      showPatterns = true,
      variant = 'default',
      className,
      ...props
    },
    ref
  ) => {
    const [sortState, setSortState] = useState<SortState>({
      key: null,
      direction: null,
    });
    const [internalSelection, setInternalSelection] =
      useState<string[]>(selectedRowKeys);

    // Use controlled or internal selection state
    const actualSelectedKeys =
      selectedRowKeys.length > 0 ? selectedRowKeys : internalSelection;

    // Sort data based on current sort state
    const sortedData = useMemo(() => {
      if (!sortState.key || !sortState.direction) {
        return dataSource;
      }

      const column = columns.find(col => col.key === sortState.key);
      if (!column) return dataSource;

      return [...dataSource].sort((a, b) => {
        const aValue = a[sortState.key!];
        const bValue = b[sortState.key!];

        // Handle null/undefined values
        if (aValue === null || aValue === undefined) return 1;
        if (bValue === null || bValue === undefined) return -1;

        let comparison = 0;

        // Compare different types
        if (typeof aValue === 'string' && typeof bValue === 'string') {
          comparison = aValue.toLowerCase().localeCompare(bValue.toLowerCase());
        } else if (typeof aValue === 'number' && typeof bValue === 'number') {
          comparison = aValue - bValue;
        } else if (aValue instanceof Date && bValue instanceof Date) {
          comparison = aValue.getTime() - bValue.getTime();
        } else {
          // Fallback to string comparison
          comparison = (aValue?.toString() || '')
            .toLowerCase()
            .localeCompare((bValue?.toString() || '').toLowerCase());
        }

        return sortState.direction === 'asc' ? comparison : -comparison;
      });
    }, [dataSource, sortState, columns]);

    const tableClasses = clsx(
      styles.table,
      styles[`size-${size}`],
      styles[`variant-${variant}`],
      {
        [styles.striped]: striped,
        [styles.hoverable]: hoverable,
        [styles.bordered]: bordered,
        [styles.loading]: loading,
      },
      className
    );

    const handleSort = (columnKey: string) => {
      const column = columns.find(col => col.key === columnKey);
      if (!column?.sortable) return;

      let newDirection: 'asc' | 'desc' | null = 'asc';

      if (sortState.key === columnKey) {
        if (sortState.direction === 'asc') {
          newDirection = 'desc';
        } else if (sortState.direction === 'desc') {
          newDirection = null;
        }
      }

      const newSortState = {
        key: newDirection ? columnKey : null,
        direction: newDirection,
      };
      setSortState(newSortState);
      onSortChange?.(newSortState.key || '', newSortState.direction);
    };

    const handleRowSelection = (selectedRowKey: string, selected: boolean) => {
      const newSelection = selected
        ? [...actualSelectedKeys, selectedRowKey]
        : actualSelectedKeys.filter(key => key !== selectedRowKey);

      setInternalSelection(newSelection);

      const selectedRows = sortedData.filter((record, index) =>
        newSelection.includes(rowKey(record, index))
      );

      onSelectionChange?.(newSelection, selectedRows);
    };

    const handleSelectAll = (selected: boolean) => {
      const allKeys = sortedData.map((record, index) => rowKey(record, index));
      const newSelection = selected ? allKeys : [];

      setInternalSelection(newSelection);

      const selectedRows = selected ? sortedData : [];
      onSelectionChange?.(newSelection, selectedRows);
    };

    const isAllSelected =
      actualSelectedKeys.length === sortedData.length && sortedData.length > 0;
    const isSomeSelected =
      actualSelectedKeys.length > 0 &&
      actualSelectedKeys.length < sortedData.length;

    const SortIcon = ({ columnKey }: { columnKey: string }) => {
      const isActive = sortState.key === columnKey;
      const direction = isActive ? sortState.direction : null;

      return (
        <span className={styles['sort-icon']}>
          <svg width="14" height="16" viewBox="0 0 14 16" fill="none">
            <path
              d="M7 1L10 6H4L7 1Z"
              fill={
                direction === 'asc' ? 'currentColor' : 'rgba(255,255,255,0.4)'
              }
              stroke="currentColor"
              strokeWidth="1"
            />
            <path
              d="M7 15L4 10H10L7 15Z"
              fill={
                direction === 'desc' ? 'currentColor' : 'rgba(255,255,255,0.4)'
              }
              stroke="currentColor"
              strokeWidth="1"
            />
          </svg>
        </span>
      );
    };

    const LoadingSpinner = () => (
      <div className={styles['loading-overlay']}>
        <div className={styles['loading-spinner']}>
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path
              d="M16 4A12 12 0 1 0 28 16"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>
    );

    return (
      <div className={styles['table-container']}>
        {showPatterns && (
          <div className={styles['table-patterns']}>
            <div className={styles['pattern-grid']} />
            <div className={styles['pattern-dots']} />
          </div>
        )}

        <table
          ref={ref}
          className={tableClasses}
          aria-busy={loading}
          {...props}
        >
          <thead className={styles.thead}>
            <tr>
              {selectable && (
                <th
                  className={clsx(styles.th, styles['selection-column'])}
                  scope="col"
                >
                  <label className={styles.checkbox}>
                    <input
                      type="checkbox"
                      checked={isAllSelected}
                      ref={input => {
                        if (input) input.indeterminate = isSomeSelected;
                      }}
                      onChange={e => handleSelectAll(e.target.checked)}
                    />
                    <span className={styles['checkbox-mark']} />
                  </label>
                </th>
              )}

              {columns.map(column => (
                <th
                  key={column.key}
                  className={clsx(
                    styles.th,
                    styles[`align-${column.align || 'left'}`],
                    {
                      [styles.sortable]: column.sortable,
                      [styles['with-pattern']]: column.showPattern,
                    }
                  )}
                  style={{ width: column.width }}
                  onClick={() => column.sortable && handleSort(column.key)}
                  scope="col"
                  aria-sort={
                    sortState.key === column.key
                      ? sortState.direction === 'asc'
                        ? 'ascending'
                        : sortState.direction === 'desc'
                          ? 'descending'
                          : 'none'
                      : column.sortable
                        ? 'none'
                        : undefined
                  }
                >
                  <div className={styles['th-content']}>
                    <Typography variant="body2" weight="bold">
                      {column.title}
                    </Typography>
                    {column.sortable && <SortIcon columnKey={column.key} />}
                  </div>

                  {column.showPattern && (
                    <div className={styles['header-pattern']}>
                      <svg viewBox="0 0 20 4" fill="none">
                        <circle
                          cx="2"
                          cy="2"
                          r="1"
                          fill="currentColor"
                          opacity="0.3"
                        />
                        <circle
                          cx="6"
                          cy="2"
                          r="1"
                          fill="currentColor"
                          opacity="0.3"
                        />
                        <circle
                          cx="10"
                          cy="2"
                          r="1"
                          fill="currentColor"
                          opacity="0.3"
                        />
                        <circle
                          cx="14"
                          cy="2"
                          r="1"
                          fill="currentColor"
                          opacity="0.3"
                        />
                        <circle
                          cx="18"
                          cy="2"
                          r="1"
                          fill="currentColor"
                          opacity="0.3"
                        />
                      </svg>
                    </div>
                  )}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className={styles.tbody}>
            {sortedData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (selectable ? 1 : 0)}
                  className={styles['empty-cell']}
                >
                  <div className={styles['empty-state']}>
                    <Typography variant="body1" color="muted">
                      {emptyText}
                    </Typography>
                  </div>
                </td>
              </tr>
            ) : (
              sortedData.map((record, index) => {
                const recordKey = rowKey(record, index);
                const isSelected = actualSelectedKeys.includes(recordKey);

                return (
                  <tr
                    key={recordKey}
                    className={clsx(styles.tr, {
                      [styles.selected]: isSelected,
                    })}
                  >
                    {selectable && (
                      <td
                        className={clsx(styles.td, styles['selection-column'])}
                      >
                        <label className={styles.checkbox}>
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={e =>
                              handleRowSelection(recordKey, e.target.checked)
                            }
                          />
                          <span className={styles['checkbox-mark']} />
                        </label>
                      </td>
                    )}

                    {columns.map(column => (
                      <td
                        key={column.key}
                        className={clsx(
                          styles.td,
                          styles[`align-${column.align || 'left'}`]
                        )}
                      >
                        {column.render
                          ? column.render(record[column.key], record, index)
                          : record[column.key]}
                      </td>
                    ))}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>

        {loading && <LoadingSpinner />}
      </div>
    );
  }
);

Table.displayName = 'Table';
