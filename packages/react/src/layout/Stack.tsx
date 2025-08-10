import React, { forwardRef } from 'react';
import { clsx } from 'clsx';
import styles from './Stack.module.css';

export type StackSpacing =
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 8
  | 10
  | 12
  | 16
  | 20
  | 24;

export interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Direction of the stack
   */
  direction?: 'column' | 'row' | 'column-reverse' | 'row-reverse';

  /**
   * Spacing between children
   */
  spacing?: StackSpacing;

  /**
   * How to align children along the cross axis
   */
  align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline';

  /**
   * How to distribute children along the main axis
   */
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';

  /**
   * Whether children should wrap
   */
  wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';

  /**
   * HTML element to render as
   */
  as?: keyof JSX.IntrinsicElements;

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
 * Flexible layout component for stacking elements with consistent spacing.
 * Supports both vertical and horizontal layouts with various alignment options.
 */
export const Stack = forwardRef<HTMLDivElement, StackProps>(
  (
    {
      direction = 'column',
      spacing = 4,
      align = 'stretch',
      justify = 'start',
      wrap = 'nowrap',
      as: Element = 'div',
      className,
      children,
      ...props
    },
    ref
  ) => {
    const classes = clsx(
      styles.stack,
      styles[`direction-${direction}`],
      styles[`spacing-${spacing}`],
      styles[`align-${align}`],
      styles[`justify-${justify}`],
      styles[`wrap-${wrap}`],
      className
    );

    return (
      <Element ref={ref} className={classes} {...props}>
        {children}
      </Element>
    );
  }
);

Stack.displayName = 'Stack';
