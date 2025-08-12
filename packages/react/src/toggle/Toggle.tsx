import React, { forwardRef, useState } from 'react';
import { clsx } from 'clsx';
import styles from './Toggle.module.css';
import '../styles/utilities.css';

export interface ToggleProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /**
   * Toggle label
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
   * Label position relative to toggle
   */
  labelPosition?: 'left' | 'right';

  /**
   * Description text
   */
  description?: string;

  /**
   * Error state
   */
  error?: boolean;

  /**
   * Loading state
   */
  loading?: boolean;

  /**
   * Icons for on/off states
   */
  icons?: {
    on?: React.ReactNode;
    off?: React.ReactNode;
  };

  /**
   * Custom text for on/off states
   */
  labels?: {
    on?: string;
    off?: string;
  };

  /**
   * Show state labels inside toggle
   */
  showLabels?: boolean;
}

/**
 * Toggle/Switch component with brutalist design elements.
 * Provides a visual on/off control with various customization options.
 */
export const Toggle = forwardRef<HTMLInputElement, ToggleProps>(
  (
    {
      label,
      size = 'md',
      variant = 'default',
      labelPosition = 'right',
      description,
      error = false,
      loading = false,
      icons,
      labels = { on: 'ON', off: 'OFF' },
      showLabels = false,
      className,
      checked,
      defaultChecked,
      disabled,
      onChange,
      ...props
    },
    ref
  ) => {
    const toggleId = props.id || `toggle-${Math.random().toString(36).substr(2, 9)}`;
    
    // Internal state for uncontrolled usage
    const [internalChecked, setInternalChecked] = useState(defaultChecked || false);
    
    // Determine if controlled or uncontrolled and current checked state
    const isControlled = checked !== undefined;
    const isChecked = isControlled ? checked : internalChecked;

    const toggleClasses = clsx(
      styles.toggle,
      styles[`size-${size}`],
      styles[`variant-${variant}`],
      {
        [styles.error]: error,
        [styles.disabled]: disabled || loading,
        [styles.checked]: isChecked,
        [styles.loading]: loading,
        [styles['with-labels']]: showLabels,
        [styles[`label-${labelPosition}`]]: label,
      },
      className
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (disabled || loading) return;
      
      // Update internal state for uncontrolled usage
      if (!isControlled) {
        setInternalChecked(e.target.checked);
      }
      
      onChange?.(e);
    };

    const renderToggleContent = () => {
      if (loading) {
        return <div className={styles.spinner}>⟳</div>;
      }

      if (icons) {
        return (
          <div className={styles['icon-container']}>
            {isChecked ? icons.on : icons.off}
          </div>
        );
      }

      if (showLabels) {
        return (
          <div className={styles['label-container']}>
            <span className={styles['label-on']}>{labels.on}</span>
            <span className={styles['label-off']}>{labels.off}</span>
          </div>
        );
      }

      return null;
    };

    const toggleElement = (
      <div className={styles['toggle-wrapper']}>
        <input
          ref={ref}
          type="checkbox"
          id={toggleId}
          className={styles['toggle-input']}
          {...(isControlled ? { checked } : { defaultChecked })}
          disabled={disabled || loading}
          onChange={handleChange}
          {...props}
        />
        
        <label htmlFor={toggleId} className={styles['toggle-track']}>
          <div className={styles['toggle-thumb']}>
            {renderToggleContent()}
          </div>
          <div className={styles['toggle-background']}>
            {showLabels && (
              <>
                <span className={styles['bg-label-on']}>{labels.on}</span>
                <span className={styles['bg-label-off']}>{labels.off}</span>
              </>
            )}
          </div>
        </label>
      </div>
    );

    if (!label && !description) {
      return <div className={toggleClasses}>{toggleElement}</div>;
    }

    return (
      <div className={toggleClasses}>
        {labelPosition === 'left' && (label || description) && (
          <div className={styles['label-content']}>
            {label && (
              <label htmlFor={toggleId} className={styles['toggle-label']}>
                {label}
              </label>
            )}
            {description && (
              <div className={styles['toggle-description']}>
                {description}
              </div>
            )}
          </div>
        )}

        {toggleElement}

        {labelPosition === 'right' && (label || description) && (
          <div className={styles['label-content']}>
            {label && (
              <label htmlFor={toggleId} className={styles['toggle-label']}>
                {label}
              </label>
            )}
            {description && (
              <div className={styles['toggle-description']}>
                {description}
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
);

Toggle.displayName = 'Toggle';