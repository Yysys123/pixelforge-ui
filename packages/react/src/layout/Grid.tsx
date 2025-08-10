import React, { forwardRef } from 'react';
import { clsx } from 'clsx';
import styles from './Grid.module.css';

export type GridCols = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
export type GridRows = 1 | 2 | 3 | 4 | 5 | 6;
export type GridGap = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16 | 20 | 24;

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Number of columns
   */
  cols?: GridCols;

  /**
   * Number of rows
   */
  rows?: GridRows;

  /**
   * Gap between grid items
   */
  gap?: GridGap;

  /**
   * Column gap between grid items
   */
  gapX?: GridGap;

  /**
   * Row gap between grid items
   */
  gapY?: GridGap;

  /**
   * Responsive columns for small screens
   */
  smCols?: GridCols;

  /**
   * Responsive columns for medium screens
   */
  mdCols?: GridCols;

  /**
   * Responsive columns for large screens
   */
  lgCols?: GridCols;

  /**
   * HTML element to render as
   */
  as?: 'div' | 'section' | 'main' | 'article' | 'aside';

  /**
   * Additional CSS class names
   */
  className?: string;

  /**
   * Children content
   */
  children?: React.ReactNode;
}

/**
 * CSS Grid layout component for creating responsive grid layouts.
 * Supports responsive breakpoints and flexible spacing options.
 */
export const Grid = forwardRef<HTMLDivElement, GridProps>(
  (
    {
      cols,
      rows,
      gap,
      gapX,
      gapY,
      smCols,
      mdCols,
      lgCols,
      as = 'div',
      className,
      children,
      ...props
    },
    ref
  ) => {
    const classes = clsx(
      styles.grid,
      {
        [styles[`cols-${cols}`]]: cols,
        [styles[`rows-${rows}`]]: rows,
        [styles[`gap-${gap}`]]: gap,
        [styles[`gap-x-${gapX}`]]: gapX,
        [styles[`gap-y-${gapY}`]]: gapY,
        [styles[`sm:cols-${smCols}`]]: smCols,
        [styles[`md:cols-${mdCols}`]]: mdCols,
        [styles[`lg:cols-${lgCols}`]]: lgCols,
      },
      className
    );

    const Component = as as React.ElementType;

    return (
      <Component ref={ref} className={classes} {...props}>
        {children}
      </Component>
    );
  }
);

Grid.displayName = 'Grid';
