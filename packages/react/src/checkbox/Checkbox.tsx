import React, { forwardRef } from 'react';
import { clsx } from 'clsx';
import { Typography } from '../typography/Typography';
import styles from './Checkbox.module.css';
import '../styles/utilities.css';

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
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
    const checkboxId =
      id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;
    const errorId = error ? `${checkboxId}-error` : undefined;
    const helperId = helperText ? `${checkboxId}-helper` : undefined;

    const describedBy =
      [errorId, helperId].filter(Boolean).join(' ') || undefined;

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

    const labelClasses = clsx(styles.label, {
      [styles.disabled]: disabled,
      [styles.required]: required,
    });

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
            {indeterminate && indeterminateIcon
              ? indeterminateIcon
              : props.checked && checkedIcon
                ? checkedIcon
                : null}
          </span>

          {label && (
            <Typography
              variant={
                size === 'lg' ? 'body1' : size === 'sm' ? 'caption' : 'body2'
              }
              weight="medium"
              className={labelClasses}
            >
              {label}
              {required && (
                <span className={styles['required-mark']} aria-label="required">
                  *
                </span>
              )}
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

export interface CheckboxGroupProps {
  /**
   * Checkbox group name
   */
  name: string;

  /**
   * Currently selected values
   */
  value?: string[];

  /**
   * Default selected values
   */
  defaultValue?: string[];

  /**
   * Callback when selection changes
   */
  onChange?: (value: string[]) => void;

  /**
   * Checkbox options
   */
  options: Array<{
    value: string;
    label: string;
    disabled?: boolean;
    helperText?: string;
  }>;

  /**
   * Group label
   */
  label?: string;

  /**
   * Size variant for all checkboxes
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Visual variant for all checkboxes
   */
  variant?: 'default' | 'primary' | 'secondary' | 'accent';

  /**
   * Layout direction
   */
  direction?: 'vertical' | 'horizontal';

  /**
   * Whether the group is required
   */
  required?: boolean;

  /**
   * Error message for the group
   */
  error?: string;

  /**
   * Helper text for the group
   */
  helperText?: string;

  /**
   * Custom className for the group wrapper
   */
  className?: string;
}

/**
 * Checkbox group component that manages a collection of checkboxes.
 * Provides proper group semantics and allows multiple selections.
 */
export const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  name,
  value: controlledValue,
  defaultValue,
  onChange,
  options,
  label,
  size = 'md',
  variant = 'default',
  direction = 'vertical',
  required = false,
  error,
  helperText,
  className,
}) => {
  const [internalValue, setInternalValue] = React.useState<string[]>(
    defaultValue || []
  );
  const value = controlledValue !== undefined ? controlledValue : internalValue;

  const groupId = `checkbox-group-${Math.random().toString(36).substr(2, 9)}`;
  const errorId = error ? `${groupId}-error` : undefined;
  const helperId = helperText ? `${groupId}-helper` : undefined;

  const describedBy =
    [errorId, helperId].filter(Boolean).join(' ') || undefined;

  const handleChange = (optionValue: string, checked: boolean) => {
    const newValue = checked
      ? [...value, optionValue]
      : value.filter(v => v !== optionValue);

    if (controlledValue === undefined) {
      setInternalValue(newValue);
    }
    onChange?.(newValue);
  };

  const groupClasses = clsx(
    styles['checkbox-group'],
    styles[`direction-${direction}`],
    {
      [styles.error]: error,
    },
    className
  );

  return (
    <fieldset className={groupClasses} aria-describedby={describedBy}>
      {label && (
        <legend className={styles['group-legend']}>
          <Typography variant="body2" weight="bold">
            {label}
            {required && (
              <span className={styles['required-mark']} aria-label="required">
                *
              </span>
            )}
          </Typography>
        </legend>
      )}

      <div className={styles['checkbox-list']}>
        {options.map(option => (
          <Checkbox
            key={option.value}
            name={name}
            value={option.value}
            label={option.label}
            checked={value.includes(option.value)}
            disabled={option.disabled}
            {...(option.helperText && { helperText: option.helperText })}
            size={size}
            variant={variant}
            required={required}
            onChange={e => handleChange(option.value, e.target.checked)}
          />
        ))}
      </div>

      {error && (
        <Typography
          variant="caption"
          color="danger"
          role="alert"
          id={errorId}
          className={styles['group-error-message']}
        >
          {error}
        </Typography>
      )}

      {helperText && !error && (
        <Typography
          variant="caption"
          color="muted"
          id={helperId}
          className={styles['group-helper-text']}
        >
          {helperText}
        </Typography>
      )}
    </fieldset>
  );
};
