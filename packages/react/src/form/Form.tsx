import React, { forwardRef } from 'react';
import { clsx } from 'clsx';
import { Typography } from '../typography/Typography';
import styles from './Form.module.css';
import '../styles/utilities.css';

export interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  /**
   * Form title
   */
  title?: string;
  
  /**
   * Form description
   */
  description?: string;
  
  /**
   * Size variant for the form
   */
  size?: 'sm' | 'md' | 'lg';
  
  /**
   * Visual variant for the form
   */
  variant?: 'default' | 'primary' | 'secondary' | 'accent';
  
  /**
   * Whether to show decorative patterns
   */
  showPatterns?: boolean;
  
  /**
   * Loading state
   */
  loading?: boolean;
  
  /**
   * Error message for the entire form
   */
  error?: string;
  
  /**
   * Success message for the form
   */
  success?: string;
  
  /**
   * Custom className for the form wrapper
   */
  wrapperClassName?: string;
}

/**
 * Comprehensive form component with brutalist design elements.
 * Provides proper form semantics and styling for all form elements.
 */
export const Form = forwardRef<HTMLFormElement, FormProps>(
  (
    {
      title,
      description,
      size = 'md',
      variant = 'default',
      showPatterns = true,
      loading = false,
      error,
      success,
      wrapperClassName,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const formId = props.id || `form-${Math.random().toString(36).substr(2, 9)}`;
    const errorId = error ? `${formId}-error` : undefined;
    const successId = success ? `${formId}-success` : undefined;
    
    const describedBy = [errorId, successId].filter(Boolean).join(' ') || undefined;

    const wrapperClasses = clsx(
      styles['form-container'],
      styles[`size-${size}`],
      styles[`variant-${variant}`],
      {
        [styles.loading]: loading,
      },
      wrapperClassName
    );

    const formClasses = clsx(
      styles.form,
      className
    );

    return (
      <div className={wrapperClasses}>
        {showPatterns && (
          <div className={styles['form-patterns']}>
            <div className={styles['pattern-grid']} />
            <div className={styles['pattern-dots']} />
          </div>
        )}
        
        {(title || description) && (
          <header className={styles['form-header']}>
            {title && (
              <Typography
                variant={size === 'lg' ? 'h1' : size === 'sm' ? 'h3' : 'h2'}
                weight="bold"
                className={styles['form-title']}
              >
                {title}
              </Typography>
            )}
            {description && (
              <Typography
                variant={size === 'lg' ? 'body1' : 'body2'}
                color="muted"
                className={styles['form-description']}
              >
                {description}
              </Typography>
            )}
          </header>
        )}
        
        <form
          ref={ref}
          id={formId}
          className={formClasses}
          aria-describedby={describedBy}
          {...props}
        >
          <div className={styles['form-content']}>
            {children}
          </div>
          
          {error && (
            <div className={styles['form-message']} role="alert" id={errorId}>
              <Typography
                variant="body2"
                color="danger"
                weight="bold"
                className={styles['error-message']}
              >
                {error}
              </Typography>
            </div>
          )}
          
          {success && (
            <div className={styles['form-message']} role="status" id={successId}>
              <Typography
                variant="body2"
                color="success"
                weight="bold"
                className={styles['success-message']}
              >
                {success}
              </Typography>
            </div>
          )}
        </form>
        
        {loading && (
          <div className={styles['loading-overlay']}>
            <div className={styles['loading-spinner']}>
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path
                  d="M16 4A12 12 0 1 0 28 16"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <Typography variant="body2" weight="bold" className={styles['loading-text']}>
              Processing...
            </Typography>
          </div>
        )}
      </div>
    );
  }
);

Form.displayName = 'Form';

export interface FormFieldProps {
  /**
   * Field label
   */
  label?: string;
  
  /**
   * Whether the field is required
   */
  required?: boolean;
  
  /**
   * Helper text for the field
   */
  helperText?: string;
  
  /**
   * Error message for the field
   */
  error?: string;
  
  /**
   * Custom className for the field wrapper
   */
  className?: string;
  
  /**
   * Form field content
   */
  children: React.ReactNode;
}

/**
 * Form field wrapper component that provides consistent spacing and layout.
 */
export const FormField: React.FC<FormFieldProps> = ({
  label,
  required,
  helperText,
  error,
  className,
  children,
}) => {
  const fieldClasses = clsx(
    styles['form-field'],
    {
      [styles.error]: error,
      [styles.required]: required,
    },
    className
  );

  return (
    <div className={fieldClasses}>
      {label && (
        <Typography
          variant="body2"
          weight="bold"
          className={styles['field-label']}
        >
          {label}
          {required && <span className={styles['required-mark']} aria-label="required">*</span>}
        </Typography>
      )}
      
      <div className={styles['field-content']}>
        {children}
      </div>
      
      {error && (
        <Typography
          variant="caption"
          color="danger"
          role="alert"
          className={styles['field-error']}
        >
          {error}
        </Typography>
      )}
      
      {helperText && !error && (
        <Typography
          variant="caption"
          color="muted"
          className={styles['field-helper']}
        >
          {helperText}
        </Typography>
      )}
    </div>
  );
};

export interface FormActionsProps {
  /**
   * Layout direction for actions
   */
  direction?: 'horizontal' | 'vertical';
  
  /**
   * Alignment of actions
   */
  align?: 'left' | 'center' | 'right';
  
  /**
   * Custom className
   */
  className?: string;
  
  /**
   * Form actions content
   */
  children: React.ReactNode;
}

/**
 * Form actions wrapper for buttons and other action elements.
 */
export const FormActions: React.FC<FormActionsProps> = ({
  direction = 'horizontal',
  align = 'right',
  className,
  children,
}) => {
  const actionsClasses = clsx(
    styles['form-actions'],
    styles[`direction-${direction}`],
    styles[`align-${align}`],
    className
  );

  return (
    <div className={actionsClasses}>
      {children}
    </div>
  );
};