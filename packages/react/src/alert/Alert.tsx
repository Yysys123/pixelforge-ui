import React, { forwardRef, useEffect, useState } from 'react';
import clsx from 'clsx';
import styles from './Alert.module.css';

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Alert content */
  children?: React.ReactNode;
  /** Alert variant/severity */
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info';
  /** Alert size */
  size?: 'sm' | 'md' | 'lg';
  /** Alert title */
  title?: string;
  /** Whether alert can be dismissed */
  dismissible?: boolean;
  /** Callback when alert is dismissed */
  onDismiss?: () => void;
  /** Custom icon */
  icon?: React.ReactNode;
  /** Whether to show default variant icon */
  showIcon?: boolean;
  /** Custom action buttons */
  actions?: React.ReactNode;
  /** Auto-dismiss duration in milliseconds */
  autoHideDuration?: number;
  /** Whether to show brutalist decorative elements */
  showDecorations?: boolean;
  /** Custom rotation angle for brutalist effect */
  rotation?: number;
  /** Whether alert appears as a toast (floating) */
  toast?: boolean;
  /** Toast position when toast prop is true */
  position?:
    | 'top-left'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-right'
    | 'top-center'
    | 'bottom-center';
}

// Default icons for each variant
const DefaultIcons = {
  default: (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M10 6V10L12 12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  success: (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16.25 6.25L8.125 14.375L3.75 10"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  warning: (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 7V11M10 15H10.01M18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  danger: (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 8L8 12M8 8L12 12M18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  info: (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 14V10M10 6H10.01M18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
};

export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      children,
      variant = 'default',
      size = 'md',
      title,
      dismissible = false,
      onDismiss,
      icon,
      showIcon = true,
      actions,
      autoHideDuration,
      showDecorations = true,
      rotation,
      toast = false,
      position = 'top-right',
      className,
      style,
      role = 'alert',
      ...props
    },
    ref
  ) => {
    const [visible, setVisible] = useState(true);

    // Auto-hide functionality
    useEffect(() => {
      if (autoHideDuration && autoHideDuration > 0) {
        const timer = setTimeout(() => {
          handleDismiss();
        }, autoHideDuration);

        return () => clearTimeout(timer);
      }
    }, [autoHideDuration]);

    const handleDismiss = () => {
      setVisible(false);
      onDismiss?.();
    };

    if (!visible) return null;

    const displayIcon = icon || (showIcon ? DefaultIcons[variant] : null);

    const alertClasses = clsx(
      styles.alert,
      styles[`variant-${variant}`],
      styles[`size-${size}`],
      {
        [styles.dismissible]: dismissible,
        [styles.toast]: toast,
        [styles[`position-${position}`]]: toast,
        [styles['with-icon']]: displayIcon,
        [styles['with-title']]: title,
        [styles['with-decorations']]: showDecorations,
      },
      className
    );

    const alertStyle = {
      ...style,
      ...(rotation && { transform: `rotate(${rotation}deg)` }),
    };

    return (
      <div
        ref={ref}
        className={alertClasses}
        style={alertStyle}
        role={role}
        {...props}
      >
        {/* Decorative patterns */}
        {showDecorations && (
          <>
            <div className={styles['pattern-grid']} />
            <div className={styles['pattern-stripes']} />
            <div className={styles['accent-shapes']}>
              <div className={styles['accent-triangle']} />
              <div className={styles['accent-circle']} />
            </div>
          </>
        )}

        {/* Main content area */}
        <div className={styles['content-wrapper']}>
          {/* Icon */}
          {displayIcon && (
            <div className={styles['icon-container']}>{displayIcon}</div>
          )}

          {/* Text content */}
          <div className={styles['text-content']}>
            {title && <div className={styles.title}>{title}</div>}
            {children && <div className={styles.message}>{children}</div>}
          </div>

          {/* Actions */}
          {actions && <div className={styles.actions}>{actions}</div>}

          {/* Dismiss button */}
          {dismissible && (
            <button
              type="button"
              className={styles['dismiss-button']}
              onClick={handleDismiss}
              aria-label="Dismiss alert"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 4L4 12M4 4L12 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )}
        </div>

        {/* Brutalist corner cut */}
        {showDecorations && <div className={styles['corner-cut']} />}
      </div>
    );
  }
);

Alert.displayName = 'Alert';
