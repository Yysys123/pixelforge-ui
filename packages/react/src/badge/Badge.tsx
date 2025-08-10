import React, { forwardRef } from 'react';
import clsx from 'clsx';
import styles from './Badge.module.css';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Badge content */
  children?: React.ReactNode;
  /** Badge variant */
  variant?:
    | 'default'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'danger'
    | 'info';
  /** Badge size */
  size?: 'sm' | 'md' | 'lg';
  /** Badge shape */
  shape?: 'rounded' | 'pill' | 'square';
  /** Whether badge has dot style (minimal content) */
  dot?: boolean;
  /** Custom numeric value to display */
  count?: number;
  /** Maximum count to display before showing "99+" */
  max?: number;
  /** Whether to show zero count */
  showZero?: boolean;
  /** Position for overlay badge */
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  /** Whether badge is an overlay on another element */
  overlay?: boolean;
  /** Whether badge is inline with text */
  inline?: boolean;
  /** Custom icon */
  icon?: React.ReactNode;
  /** Whether badge is interactive (clickable) */
  interactive?: boolean;
  /** Custom rotation angle for brutalist effect */
  rotation?: number;
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      children,
      variant = 'default',
      size = 'md',
      shape = 'rounded',
      dot = false,
      count,
      max = 99,
      showZero = false,
      position = 'top-right',
      overlay = false,
      inline = false,
      icon,
      interactive = false,
      rotation,
      className,
      style,
      ...props
    },
    ref
  ) => {
    // Determine content to display
    const getContent = () => {
      if (dot) return null;
      if (count !== undefined) {
        if (count === 0 && !showZero) return null;
        if (count > max) return `${max}+`;
        return count.toString();
      }
      return children;
    };

    const content = getContent();
    const isEmpty = content === null || content === undefined || content === '';

    // Don't render if empty and not a dot
    if (isEmpty && !dot) return null;

    const badgeClasses = clsx(
      styles.badge,
      styles[`variant-${variant}`],
      styles[`size-${size}`],
      styles[`shape-${shape}`],
      {
        [styles.dot]: dot,
        [styles.overlay]: overlay,
        [styles.inline]: inline,
        [styles.interactive]: interactive,
        [styles.empty]: isEmpty,
        [styles[`position-${position}`]]: overlay,
      },
      className
    );

    const badgeStyle = {
      ...style,
      ...(rotation && { transform: `rotate(${rotation}deg)` }),
    };

    return (
      <span
        ref={ref}
        className={badgeClasses}
        style={badgeStyle}
        role={interactive ? 'button' : undefined}
        tabIndex={interactive ? 0 : undefined}
        {...props}
      >
        {/* Decorative pattern overlay */}
        <div className={styles['pattern-overlay']} />

        {/* Accent shapes */}
        <div className={styles['accent-shapes']}>
          <div className={styles['accent-dot']} />
          <div className={styles['accent-line']} />
        </div>

        {/* Content */}
        <span className={styles.content}>
          {icon && <span className={styles.icon}>{icon}</span>}
          {content}
        </span>

        {/* Corner cut effect */}
        <div className={styles['corner-cut']} />
      </span>
    );
  }
);

Badge.displayName = 'Badge';
