import React, { forwardRef } from 'react';
import { clsx } from 'clsx';
import styles from './Container.module.css';

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Maximum width of the container
   */
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';

  /**
   * HTML element to render as
   */
  as?: 'div' | 'main' | 'section' | 'article' | 'aside' | 'header' | 'footer';

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
 * Container component for consistent content width and spacing.
 * Provides responsive padding and max-width constraints.
 */
export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  (
    { size = 'xl', as = 'div', className, children, ...props },
    ref
  ) => {
    const classes = clsx(styles.container, styles[`size-${size}`], className);
    const Component = as as React.ElementType;

    return (
      <Component ref={ref} className={classes} {...props}>
        {children}
      </Component>
    );
  }
);

Container.displayName = 'Container';
