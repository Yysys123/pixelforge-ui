import React, { forwardRef } from 'react';
import { clsx } from 'clsx';
import { Typography } from '../typography/Typography';
import styles from './Radio.module.css';
import '../styles/utilities.css';

export interface RadioProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  /**
   * Label text for the radio button
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
   * Error message to display
   */
  error?: string;

  /**
   * Helper text to display below the radio button
   */
  helperText?: string;

  /**
   * Whether the radio button is required
   */
  required?: boolean;

  /**
   * Custom className for the wrapper
   */
  wrapperClassName?: string;

  /**
   * Custom icon to show when selected
   */
  selectedIcon?: React.ReactNode;
}

/**
 * Radio button component with brutalist design elements and comprehensive accessibility.
 * Features bold styling, customizable variants, and proper form integration.
 */
export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  (
    {
      label,
      size = 'md',
      variant = 'default',
      error,
      helperText,
      required = false,
      wrapperClassName,
      selectedIcon,
      className,
      id,
      disabled,
      ...props
    },
    ref
  ) => {
    const radioId = id || `radio-${Math.random().toString(36).substr(2, 9)}`;
    const errorId = error ? `${radioId}-error` : undefined;
    const helperId = helperText ? `${radioId}-helper` : undefined;

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

    const radioClasses = clsx(styles.radio, className);

    const labelClasses = clsx(styles.label, {
      [styles.disabled]: disabled,
      [styles.required]: required,
    });

    return (
      <div className={wrapperClasses}>
        <label className={styles['radio-container']} htmlFor={radioId}>
          <input
            ref={ref}
            type="radio"
            id={radioId}
            className={radioClasses}
            disabled={disabled}
            required={required}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={describedBy}
            {...props}
          />

          <span className={styles['radio-mark']}>
            {props.checked && selectedIcon && selectedIcon}
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

Radio.displayName = 'Radio';

export interface RadioGroupProps {
  /**
   * Radio group name
   */
  name: string;

  /**
   * Currently selected value
   */
  value?: string;

  /**
   * Default selected value
   */
  defaultValue?: string;

  /**
   * Callback when selection changes
   */
  onChange?: (value: string) => void;

  /**
   * Radio options
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
   * Size variant for all radios
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Visual variant for all radios
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
 * Radio group component that manages a collection of radio buttons.
 * Provides proper group semantics and keyboard navigation.
 */
export const RadioGroup: React.FC<RadioGroupProps> = ({
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
  const [internalValue, setInternalValue] = React.useState(defaultValue || '');
  const value = controlledValue !== undefined ? controlledValue : internalValue;

  const groupId = `radio-group-${Math.random().toString(36).substr(2, 9)}`;
  const errorId = error ? `${groupId}-error` : undefined;
  const helperId = helperText ? `${groupId}-helper` : undefined;

  const describedBy =
    [errorId, helperId].filter(Boolean).join(' ') || undefined;

  const handleChange = (optionValue: string) => {
    if (controlledValue === undefined) {
      setInternalValue(optionValue);
    }
    onChange?.(optionValue);
  };

  const groupClasses = clsx(
    styles['radio-group'],
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

      <div className={styles['radio-list']}>
        {options.map(option => (
          <Radio
            key={option.value}
            name={name}
            value={option.value}
            label={option.label}
            checked={value === option.value}
            disabled={option.disabled}
            helperText={option.helperText}
            size={size}
            variant={variant}
            required={required}
            onChange={() => handleChange(option.value)}
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
