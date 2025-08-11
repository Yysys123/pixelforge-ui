import React, { forwardRef } from 'react';
import { clsx } from 'clsx';
import { Typography } from '../typography/Typography';
import styles from './Checkbox.module.css';
import '../styles/utilities.css';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  /**
   * Label text for the checkbox
   */
  label?: string;
  
  /**
   * Size variant
   */
  size?: 'sm' | 'md' | 'lg';
  
  /**
   * Visual variant
   */
  variant?: 'default' | 'primary' | 'secondary' | 'accent';
  
  /**
   * Whether the checkbox is in an indeterminate state
   */
  indeterminate?: boolean;
  
  /**
   * Error message to display
   */
  error?: string;
  
  /**
   * Helper text to display below the checkbox
   */
  helperText?: string;
  
  /**
   * Whether the checkbox is required
   */
  required?: boolean;
  
  /**
   * Custom className for the wrapper
   */
  wrapperClassName?: string;
  
  /**
   * Custom icon to show when checked
   */
  checkedIcon?: React.ReactNode;
  
  /**
   * Custom icon to show when indeterminate
   */
  indeterminateIcon?: React.ReactNode;
}

/**
 * Checkbox component with brutalist design elements and comprehensive accessibility.
 * Features bold styling, customizable variants, and proper form integration.
 */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      label,
      size = 'md',
      variant = 'default',
      indeterminate = false,
      error,
      helperText,
      required = false,
      wrapperClassName,
      checkedIcon,
      indeterminateIcon,
      className,
      id,
      disabled,
      ...props
    },
    ref
  ) => {
    const checkboxId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;
    const errorId = error ? `${checkboxId}-error` : undefined;
    const helperId = helperText ? `${checkboxId}-helper` : undefined;
    
    const describedBy = [errorId, helperId].filter(Boolean).join(' ') || undefined;

    const wrapperClasses = clsx(
      styles.wrapper,
      styles[`size-${size}`],
      styles[`variant-${variant}`],
      {
        [styles.disabled]: disabled,
        [styles.error]: error,
        [styles.required]: required,
      },
      wrapperClassName
    );

    const checkboxClasses = clsx(
      styles.checkbox,
      {
        [styles.indeterminate]: indeterminate,
      },
      className
    );

    const labelClasses = clsx(
      styles.label,
      {
        [styles.disabled]: disabled,
        [styles.required]: required,
      }
    );

    // Handle indeterminate state
    React.useEffect(() => {
      if (ref && typeof ref === 'object' && ref.current) {
        ref.current.indeterminate = indeterminate;
      }
    }, [indeterminate, ref]);

    return (
      <div className={wrapperClasses}>
        <label className={styles['checkbox-container']} htmlFor={checkboxId}>
          <input
            ref={ref}
            type="checkbox"
            id={checkboxId}
            className={checkboxClasses}
            disabled={disabled}
            required={required}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={describedBy}
            {...props}
          />
          
          <span className={styles['checkbox-mark']}>
            {indeterminate && indeterminateIcon ? (
              indeterminateIcon
            ) : props.checked && checkedIcon ? (
              checkedIcon
            ) : null}
          </span>
          
          {label && (
            <Typography
              variant={size === 'lg' ? 'body1' : size === 'sm' ? 'caption' : 'body2'}
              weight="medium"
              className={labelClasses}
            >
              {label}
              {required && <span className={styles['required-mark']} aria-label="required">*</span>}
            </Typography>
          )}
        </label>
        
        {error && (
          <Typography
            variant="caption"
            color="danger"
            role="alert"
            id={errorId}
            className={styles['error-message']}
          >
            {error}
          </Typography>
        )}
        
        {helperText && !error && (
          <Typography
            variant="caption"
            color="muted"
            id={helperId}
            className={styles['helper-text']}
          >
            {helperText}
          </Typography>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';