import React, { forwardRef } from 'react';
import { clsx } from 'clsx';
import styles from './Button.module.css';
import '../styles/utilities.css';

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'size'> {
  /**
   * Visual style variant of the button
   */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';

  /**
   * Size of the button
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Whether the button should take up the full width of its container
   */
  fullWidth?: boolean;

  /**
   * Loading state - shows spinner and disables interaction
   */
  loading?: boolean;

  /**
   * Icon to display at the start of the button
   */
  startIcon?: React.ReactNode;

  /**
   * Icon to display at the end of the button
   */
  endIcon?: React.ReactNode;

  /**
   * Additional CSS class names
   */
  className?: string;

  /**
   * Button content
   */
  children?: React.ReactNode;
}

/**
 * Versatile button component with multiple variants, sizes, and states.
 * Follows WAI-ARIA guidelines for accessibility.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      loading = false,
      startIcon,
      endIcon,
      disabled,
      className,
      children,
      type = 'button',
      ...props
    },
    ref
  ) => {
    const isIconOnly = !children && (startIcon || endIcon);
    const isDisabled = disabled || loading;

    const buttonClasses = clsx(
      styles.button,
      styles[`variant-${variant}`],
      styles[`size-${size}`],
      {
        [styles['full-width']]: fullWidth,
        [styles['icon-only']]: isIconOnly,
        [styles.loading]: loading,
      },
      className
    );

    const LoadingSpinner = () => (
      <svg
        className={styles['loading-spinner']}
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M8 1.5A6.5 6.5 0 1 0 14.5 8"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    );

    return (
      <button
        ref={ref}
        type={type}
        disabled={isDisabled}
        className={buttonClasses}
        aria-disabled={isDisabled}
        {...(loading && { 'aria-describedby': 'loading-description' })}
        {...props}
      >
        {loading ? (
          <>
            <LoadingSpinner />
            <span className="sr-only" id="loading-description">
              Loading...
            </span>
          </>
        ) : (
          startIcon
        )}

        {children && <span>{children}</span>}

        {!loading && endIcon}
      </button>
    );
  }
);

Button.displayName = 'Button';
