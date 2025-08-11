import React, { forwardRef, useId } from 'react';
import { clsx } from 'clsx';
import { Typography } from '../typography/Typography';
import styles from './Input.module.css';
import '../styles/utilities.css';

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /**
   * Size of the input
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Validation state of the input
   */
  state?: 'default' | 'error' | 'success';

  /**
   * Whether the input should take up the full width of its container
   */
  fullWidth?: boolean;

  /**
   * Label for the input
   */
  label?: string;

  /**
   * Helper text displayed below the input
   */
  helperText?: string;

  /**
   * Error message (sets state to error automatically)
   */
  error?: string;

  /**
   * Icon to display at the start of the input
   */
  startIcon?: React.ReactNode;

  /**
   * Icon to display at the end of the input
   */
  endIcon?: React.ReactNode;

  /**
   * Additional CSS class names for the wrapper
   */
  wrapperClassName?: string;

  /**
   * Additional CSS class names for the input
   */
  className?: string;
}

/**
 * Flexible input component with validation states, icons, and accessibility features.
 * Supports labels, helper text, and various visual states.
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      size = 'md',
      state = 'default',
      fullWidth = false,
      label,
      helperText,
      error,
      startIcon,
      endIcon,
      disabled,
      required,
      wrapperClassName,
      className,
      id: providedId,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const id = providedId || generatedId;
    const helperTextId = `${id}-helper`;

    // If error is provided, override state
    const finalState = error ? 'error' : state;
    const finalHelperText = error || helperText;

    const wrapperClasses = clsx(
      styles['input-wrapper'],
      {
        [styles['full-width']]: fullWidth,
      },
      wrapperClassName
    );

    const inputClasses = clsx(
      styles.input,
      styles[`size-${size}`],
      {
        [styles.error]: finalState === 'error',
        [styles.success]: finalState === 'success',
        [styles.disabled]: disabled,
      },
      className
    );

    const labelClasses = clsx(styles.label, {
      [styles.required]: required,
      [styles.disabled]: disabled,
    });

    const helperTextClasses = clsx(styles['helper-text'], {
      [styles.error]: finalState === 'error',
      [styles.success]: finalState === 'success',
    });

    return (
      <div className={wrapperClasses}>
        {label && (
          <Typography
            as="label"
            htmlFor={id}
            className={labelClasses}
            variant="caption"
            weight="bold"
          >
            {label}
          </Typography>
        )}

        <div className={inputClasses}>
          {startIcon && (
            <span className={styles['start-icon']} aria-hidden="true">
              {startIcon}
            </span>
          )}

          <input
            ref={ref}
            id={id}
            className={styles['input-field']}
            disabled={disabled}
            required={required}
            aria-required={required}
            aria-invalid={finalState === 'error'}
            aria-describedby={finalHelperText ? helperTextId : undefined}
            {...props}
          />

          {endIcon && (
            <span className={styles['end-icon']} aria-hidden="true">
              {endIcon}
            </span>
          )}
        </div>

        {finalHelperText && (
          <div
            id={helperTextId}
            className={helperTextClasses}
            role={finalState === 'error' ? 'alert' : undefined}
          >
            {finalHelperText}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
