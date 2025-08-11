import React, { forwardRef } from 'react';
import { clsx } from 'clsx';
import styles from './Layout.module.css';
import '../styles/utilities.css';

export interface PageProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Size variant for the page layout
   */
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';

  /**
   * Visual variant for the page
   */
  variant?: 'default' | 'contained' | 'padded' | 'bordered';

  /**
   * Whether to show decorative patterns
   */
  showPatterns?: boolean;

  /**
   * Custom className for the page wrapper
   */
  wrapperClassName?: string;
}

/**
 * Main page layout component with consistent spacing and structure.
 * Provides a semantic wrapper for page content with brutalist design elements.
 */
export const Page = forwardRef<HTMLDivElement, PageProps>(
  (
    {
      size = 'lg',
      variant = 'default',
      showPatterns = false,
      wrapperClassName,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const wrapperClasses = clsx(styles['page-wrapper'], wrapperClassName);

    const pageClasses = clsx(
      styles.page,
      styles[`size-${size}`],
      styles[`variant-${variant}`],
      className
    );

    return (
      <div className={wrapperClasses}>
        {showPatterns && (
          <div className={styles['page-patterns']}>
            <div className={styles['pattern-grid']} />
            <div className={styles['pattern-dots']} />
          </div>
        )}

        <div ref={ref} className={pageClasses} {...props}>
          {children}
        </div>
      </div>
    );
  }
);

Page.displayName = 'Page';

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Container size variant
   */
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';

  /**
   * Whether to center the container content
   */
  centered?: boolean;

  /**
   * Padding variant
   */
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

/**
 * Container component for consistent content width and centering.
 */
export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  (
    {
      size = 'lg',
      centered = true,
      padding = 'md',
      className,
      children,
      ...props
    },
    ref
  ) => {
    const containerClasses = clsx(
      styles.container,
      styles[`container-${size}`],
      styles[`padding-${padding}`],
      {
        [styles.centered]: centered,
      },
      className
    );

    return (
      <div ref={ref} className={containerClasses} {...props}>
        {children}
      </div>
    );
  }
);

Container.displayName = 'Container';

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Semantic element type
   */
  as?: 'section' | 'article' | 'aside' | 'main' | 'div';

  /**
   * Visual variant for the section
   */
  variant?: 'default' | 'primary' | 'secondary' | 'accent' | 'muted';

  /**
   * Spacing variant
   */
  spacing?: 'none' | 'sm' | 'md' | 'lg' | 'xl';

  /**
   * Whether to show border
   */
  bordered?: boolean;

  /**
   * Whether to show decorative patterns
   */
  showPatterns?: boolean;
}

/**
 * Section component for organizing page content into semantic blocks.
 */
export const Section = forwardRef<HTMLDivElement, SectionProps>(
  (
    {
      as: Component = 'section',
      variant = 'default',
      spacing = 'md',
      bordered = false,
      showPatterns = false,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const sectionClasses = clsx(
      styles.section,
      styles[`variant-${variant}`],
      styles[`spacing-${spacing}`],
      {
        [styles.bordered]: bordered,
        [styles['with-patterns']]: showPatterns,
      },
      className
    );

    return (
      <Component ref={ref} className={sectionClasses} {...props}>
        {showPatterns && (
          <div className={styles['section-patterns']}>
            <div className={styles['pattern-lines']} />
          </div>
        )}
        {children}
      </Component>
    );
  }
);

Section.displayName = 'Section';

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Number of columns (1-12)
   */
  cols?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

  /**
   * Gap between grid items
   */
  gap?: 'none' | 'sm' | 'md' | 'lg' | 'xl';

  /**
   * Responsive breakpoint behavior
   */
  responsive?: {
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
}

/**
 * Grid layout component for organizing content in a responsive grid.
 */
export const Grid = forwardRef<HTMLDivElement, GridProps>(
  (
    { cols = 1, gap = 'md', responsive, className, children, style, ...props },
    ref
  ) => {
    const gridClasses = clsx(styles.grid, styles[`gap-${gap}`], className);

    const gridStyle = {
      '--grid-cols': cols,
      '--grid-cols-sm': responsive?.sm || cols,
      '--grid-cols-md': responsive?.md || cols,
      '--grid-cols-lg': responsive?.lg || cols,
      '--grid-cols-xl': responsive?.xl || cols,
      ...style,
    } as React.CSSProperties;

    return (
      <div ref={ref} className={gridClasses} style={gridStyle} {...props}>
        {children}
      </div>
    );
  }
);

Grid.displayName = 'Grid';

export interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Stack direction
   */
  direction?: 'vertical' | 'horizontal';

  /**
   * Gap between stack items
   */
  gap?: 'none' | 'sm' | 'md' | 'lg' | 'xl';

  /**
   * Alignment of items
   */
  align?: 'start' | 'center' | 'end' | 'stretch';

  /**
   * Justification of items
   */
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';

  /**
   * Whether items should wrap
   */
  wrap?: boolean;
}

/**
 * Stack component for linear layouts with consistent spacing.
 */
export const Stack = forwardRef<HTMLDivElement, StackProps>(
  (
    {
      direction = 'vertical',
      gap = 'md',
      align = 'start',
      justify = 'start',
      wrap = false,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const stackClasses = clsx(
      styles.stack,
      styles[`direction-${direction}`],
      styles[`gap-${gap}`],
      styles[`align-${align}`],
      styles[`justify-${justify}`],
      {
        [styles.wrap]: wrap,
      },
      className
    );

    return (
      <div ref={ref} className={stackClasses} {...props}>
        {children}
      </div>
    );
  }
);

Stack.displayName = 'Stack';
