import React, { forwardRef, useMemo } from 'react';
import { clsx } from 'clsx';
import { ChevronLeft, ChevronRight, MoreHorizontal } from '@pixelforge-ui/icons';
import styles from './Pagination.module.css';
import '../styles/utilities.css';

export interface PaginationProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Current page number (1-based)
   */
  currentPage: number;

  /**
   * Total number of pages
   */
  totalPages: number;

  /**
   * Number of page buttons to show around current page
   */
  siblingCount?: number;

  /**
   * Size variant
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Visual variant
   */
  variant?: 'default' | 'primary' | 'secondary' | 'accent';

  /**
   * Whether to show first/last page buttons
   */
  showFirstLast?: boolean;

  /**
   * Whether to show previous/next buttons
   */
  showPrevNext?: boolean;

  /**
   * Whether to show page info text
   */
  showPageInfo?: boolean;

  /**
   * Custom labels for navigation
   */
  labels?: {
    first?: string;
    previous?: string;
    next?: string;
    last?: string;
    page?: string;
    of?: string;
  };

  /**
   * Loading state
   */
  loading?: boolean;

  /**
   * Disabled state
   */
  disabled?: boolean;

  /**
   * Callback when page changes
   */
  onPageChange?: (page: number) => void;

  /**
   * Custom render function for page button
   */
  renderPageButton?: (page: number, isCurrent: boolean) => React.ReactNode;

  /**
   * Custom render function for ellipsis
   */
  renderEllipsis?: () => React.ReactNode;
}

/**
 * Pagination component with brutalist design elements.
 * Provides navigation through large datasets with customizable appearance.
 */
export const Pagination = forwardRef<HTMLElement, PaginationProps>(
  (
    {
      currentPage,
      totalPages,
      siblingCount = 1,
      size = 'md',
      variant = 'default',
      showFirstLast = true,
      showPrevNext = true,
      showPageInfo = false,
      labels = {
        first: 'FIRST',
        previous: 'PREV',
        next: 'NEXT',
        last: 'LAST',
        page: 'PAGE',
        of: 'OF',
      },
      loading = false,
      disabled = false,
      onPageChange,
      renderPageButton,
      renderEllipsis,
      className,
      ...props
    },
    ref
  ) => {
    const paginationClasses = clsx(
      styles.pagination,
      styles[`size-${size}`],
      styles[`variant-${variant}`],
      {
        [styles.loading]: loading,
        [styles.disabled]: disabled,
        [styles['with-info']]: showPageInfo,
      },
      className
    );

    // Generate page numbers to display
    const pageNumbers = useMemo(() => {
      const delta = siblingCount;
      const range = [];
      const rangeWithDots = [];

      // Calculate range
      for (
        let i = Math.max(2, currentPage - delta);
        i <= Math.min(totalPages - 1, currentPage + delta);
        i++
      ) {
        range.push(i);
      }

      if (currentPage - delta > 2) {
        rangeWithDots.push(1, 'DOTS');
      } else {
        rangeWithDots.push(1);
      }

      rangeWithDots.push(...range);

      if (currentPage + delta < totalPages - 1) {
        rangeWithDots.push('DOTS', totalPages);
      } else {
        rangeWithDots.push(totalPages);
      }

      // Remove duplicates and handle edge cases
      const filtered = rangeWithDots.filter((item, index, arr) => {
        if (item === 'DOTS') {
          const prev = arr[index - 1];
          const next = arr[index + 1];
          return typeof prev === 'number' && typeof next === 'number' && prev !== next - 1;
        }
        return arr.indexOf(item) === index;
      });

      // Remove dots if they're adjacent to first/last
      return filtered.filter((item, index, arr) => {
        if (item === 'DOTS') {
          const prev = arr[index - 1];
          const next = arr[index + 1];
          return typeof prev === 'number' && typeof next === 'number' && (next as number) - (prev as number) > 1;
        }
        return true;
      });
    }, [currentPage, totalPages, siblingCount]);

    const handlePageChange = (page: number) => {
      if (disabled || loading || page === currentPage || page < 1 || page > totalPages) {
        return;
      }
      onPageChange?.(page);
    };

    const canGoPrevious = currentPage > 1;
    const canGoNext = currentPage < totalPages;

    const defaultRenderPageButton = (page: number) => (
      <span className={styles['page-text']}>{page}</span>
    );

    const defaultRenderEllipsis = () => (
      <span className={styles.ellipsis}>
        <MoreHorizontal size={16} />
      </span>
    );

    const renderPageItem = (item: number | string, index: number) => {
      if (item === 'DOTS') {
        return (
          <li key={`dots-${index}`} className={styles['page-item']}>
            <span className={styles['page-button-dots']}>
              {renderEllipsis ? renderEllipsis() : defaultRenderEllipsis()}
            </span>
          </li>
        );
      }

      const page = item as number;
      const isCurrent = page === currentPage;

      return (
        <li key={page} className={styles['page-item']}>
          <button
            type="button"
            className={clsx(styles['page-button'], {
              [styles.current]: isCurrent,
            })}
            onClick={() => handlePageChange(page)}
            disabled={disabled || loading}
            aria-label={`Go to page ${page}`}
            aria-current={isCurrent ? 'page' : undefined}
          >
            {renderPageButton ? renderPageButton(page, isCurrent) : defaultRenderPageButton(page)}
          </button>
        </li>
      );
    };

    if (totalPages <= 1) {
      return null;
    }

    return (
      <nav
        ref={ref}
        className={paginationClasses}
        role="navigation"
        aria-label="Pagination navigation"
        {...props}
      >
        {showPageInfo && (
          <div className={styles['page-info']}>
            {labels.page} {currentPage} {labels.of} {totalPages}
          </div>
        )}

        <ul className={styles['pagination-list']}>
          {/* First page button */}
          {showFirstLast && (
            <li className={styles['nav-item']}>
              <button
                type="button"
                className={clsx(styles['nav-button'], styles.first)}
                onClick={() => handlePageChange(1)}
                disabled={!canGoPrevious || disabled || loading}
                aria-label="Go to first page"
              >
                {loading ? (
                  <span className={styles.spinner}>⟳</span>
                ) : (
                  <span className={styles['button-content']}>
                    <ChevronLeft size={14} />
                    <ChevronLeft size={14} />
                    <span>{labels.first}</span>
                  </span>
                )}
              </button>
            </li>
          )}

          {/* Previous page button */}
          {showPrevNext && (
            <li className={styles['nav-item']}>
              <button
                type="button"
                className={clsx(styles['nav-button'], styles.previous)}
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={!canGoPrevious || disabled || loading}
                aria-label="Go to previous page"
              >
                <span className={styles['button-content']}>
                  <ChevronLeft size={16} />
                  <span>{labels.previous}</span>
                </span>
              </button>
            </li>
          )}

          {/* Page numbers */}
          {pageNumbers.map((item, index) => renderPageItem(item, index))}

          {/* Next page button */}
          {showPrevNext && (
            <li className={styles['nav-item']}>
              <button
                type="button"
                className={clsx(styles['nav-button'], styles.next)}
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={!canGoNext || disabled || loading}
                aria-label="Go to next page"
              >
                <span className={styles['button-content']}>
                  <span>{labels.next}</span>
                  <ChevronRight size={16} />
                </span>
              </button>
            </li>
          )}

          {/* Last page button */}
          {showFirstLast && (
            <li className={styles['nav-item']}>
              <button
                type="button"
                className={clsx(styles['nav-button'], styles.last)}
                onClick={() => handlePageChange(totalPages)}
                disabled={!canGoNext || disabled || loading}
                aria-label="Go to last page"
              >
                <span className={styles['button-content']}>
                  <span>{labels.last}</span>
                  <ChevronRight size={14} />
                  <ChevronRight size={14} />
                </span>
              </button>
            </li>
          )}
        </ul>
      </nav>
    );
  }
);

Pagination.displayName = 'Pagination';