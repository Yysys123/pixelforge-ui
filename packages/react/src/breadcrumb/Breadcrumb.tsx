import React, { forwardRef } from 'react';
import { clsx } from 'clsx';
import styles from './Breadcrumb.module.css';
import '../styles/utilities.css';

export interface BreadcrumbItem {
  /**
   * Display text
   */
  label: string;
  
  /**
   * URL or path
   */
  href?: string;
  
  /**
   * Whether this item is disabled
   */
  disabled?: boolean;
  
  /**
   * Custom icon for this item
   */
  icon?: React.ReactNode;
  
  /**
   * Click handler
   */
  onClick?: (item: BreadcrumbItem) => void;
}

export interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Array of breadcrumb items
   */
  items: BreadcrumbItem[];

  /**
   * Size variant
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Visual variant
   */
  variant?: 'default' | 'primary' | 'secondary' | 'accent';

  /**
   * Custom separator between items
   */
  separator?: React.ReactNode;

  /**
   * Show home icon on first item
   */
  showHomeIcon?: boolean;

  /**
   * Maximum number of items to show before collapsing
   */
  maxItems?: number;

  /**
   * Whether to show tooltips on hover
   */
  showTooltips?: boolean;

  /**
   * Custom render function for items
   */
  renderItem?: (item: BreadcrumbItem, index: number, isLast: boolean) => React.ReactNode;

  /**
   * Custom render function for separator
   */
  renderSeparator?: (index: number) => React.ReactNode;
}

/**
 * Breadcrumb navigation component with brutalist design elements.
 * Shows hierarchical navigation path with customizable separators and styling.
 */
export const Breadcrumb = forwardRef<HTMLElement, BreadcrumbProps>(
  (
    {
      items,
      size = 'md',
      variant = 'default',
      separator = '/',
      showHomeIcon = false,
      maxItems,
      showTooltips = false,
      renderItem,
      renderSeparator,
      className,
      ...props
    },
    ref
  ) => {
    const breadcrumbClasses = clsx(
      styles.breadcrumb,
      styles[`size-${size}`],
      styles[`variant-${variant}`],
      {
        [styles['with-tooltips']]: showTooltips,
      },
      className
    );

    // Handle item collapsing
    const getVisibleItems = () => {
      if (!maxItems || items.length <= maxItems) {
        return items;
      }

      const firstItem = items[0];
      const lastItems = items.slice(-(maxItems - 2));
      const collapsedCount = items.length - maxItems + 1;

      return [
        firstItem,
        {
          label: `... (${collapsedCount} more)`,
          disabled: true,
          isCollapsed: true,
        } as BreadcrumbItem & { isCollapsed: boolean },
        ...lastItems,
      ];
    };

    const visibleItems = getVisibleItems();

    const handleItemClick = (item: BreadcrumbItem) => {
      if (item.disabled || !item.onClick) return;
      item.onClick(item);
    };

    const defaultRenderItem = (item: BreadcrumbItem, index: number, isLast: boolean) => {
      const isCollapsed = 'isCollapsed' in item && item.isCollapsed;
      const isFirst = index === 0;
      
      const itemClasses = clsx(styles['breadcrumb-item'], {
        [styles.disabled]: item.disabled,
        [styles.current]: isLast,
        [styles.collapsed]: isCollapsed,
        [styles.clickable]: !item.disabled && (item.href || item.onClick),
      });

      const content = (
        <>
          {isFirst && showHomeIcon && (
            <span className={styles['home-icon']}>🏠</span>
          )}
          {item.icon && (
            <span className={styles['item-icon']}>{item.icon}</span>
          )}
          <span className={styles['item-text']}>{item.label}</span>
        </>
      );

      if (item.href && !item.disabled) {
        return (
          <a
            href={item.href}
            className={itemClasses}
            onClick={(e) => {
              if (item.onClick) {
                e.preventDefault();
                handleItemClick(item);
              }
            }}
            title={showTooltips ? item.label : undefined}
          >
            {content}
          </a>
        );
      }

      if (item.onClick && !item.disabled) {
        return (
          <button
            type="button"
            className={itemClasses}
            onClick={() => handleItemClick(item)}
            title={showTooltips ? item.label : undefined}
          >
            {content}
          </button>
        );
      }

      return (
        <span
          className={itemClasses}
          title={showTooltips ? item.label : undefined}
        >
          {content}
        </span>
      );
    };

    const defaultRenderSeparator = () => (
      <span className={styles.separator} aria-hidden="true">
        {separator}
      </span>
    );

    return (
      <nav
        ref={ref}
        className={breadcrumbClasses}
        aria-label="Breadcrumb navigation"
        {...props}
      >
        <ol className={styles['breadcrumb-list']}>
          {visibleItems.map((item, index) => {
            const isLast = index === visibleItems.length - 1;
            
            return (
              <li key={index} className={styles['breadcrumb-list-item']}>
                {renderItem ? renderItem(item, index, isLast) : defaultRenderItem(item, index, isLast)}
                
                {!isLast && (
                  renderSeparator ? renderSeparator(index) : defaultRenderSeparator()
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    );
  }
);

Breadcrumb.displayName = 'Breadcrumb';