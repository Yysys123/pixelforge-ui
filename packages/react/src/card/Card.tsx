import React, { forwardRef } from 'react';
import { clsx } from 'clsx';
import styles from './Card.module.css';
import '../styles/utilities.css';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Title displayed in the header area
   */
  title?: string;

  /**
   * Tag/badge displayed in the header
   */
  tag?: string;

  /**
   * Description/content text
   */
  description?: string;

  /**
   * Array of feature items to display
   */
  features?: Array<{
    icon: React.ReactNode;
    text: string;
  }>;

  /**
   * Price information
   */
  price?: {
    amount: number;
    currency?: string;
    period?: string;
  };

  /**
   * Action button text
   */
  actionText?: string;

  /**
   * Action button click handler
   */
  onAction?: () => void;

  /**
   * Stamp text (e.g., "Approved", "Featured")
   */
  stamp?: string;

  /**
   * Card variant affecting color scheme
   */
  variant?: 'default' | 'primary' | 'secondary' | 'accent';

  /**
   * Whether to show decorative patterns
   */
  showPatterns?: boolean;

  /**
   * Whether the card is interactive (hover effects)
   */
  interactive?: boolean;
}

/**
 * Brutalist-style card component with bold borders, dramatic shadows, and decorative elements.
 * Perfect for showcasing products, services, or content with high visual impact.
 */
export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      title,
      tag,
      description,
      features = [],
      price,
      actionText,
      onAction,
      stamp,
      variant = 'default',
      showPatterns = true,
      interactive = true,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const cardClasses = clsx(
      styles.card,
      styles[`variant-${variant}`],
      {
        [styles.interactive]: interactive,
      },
      className
    );

    return (
      <div ref={ref} className={cardClasses} {...props}>
        {/* Decorative patterns */}
        {showPatterns && (
          <>
            <div className={styles['pattern-grid']} />
            <div className={styles['pattern-dots']} />
            <div className={styles['bold-pattern']}>
              <svg viewBox="0 0 100 100">
                <path
                  strokeDasharray="15 10"
                  strokeWidth={10}
                  stroke="currentColor"
                  fill="none"
                  d="M0,0 L100,0 L100,100 L0,100 Z"
                />
              </svg>
            </div>
          </>
        )}

        {/* Header area */}
        {(title || tag) && (
          <div className={styles['title-area']}>
            {title && <span className={styles.title}>{title}</span>}
            {tag && <span className={styles.tag}>{tag}</span>}
          </div>
        )}

        {/* Body content */}
        <div className={styles.body}>
          {description && (
            <div className={styles.description}>{description}</div>
          )}

          {/* Features grid */}
          {features.length > 0 && (
            <div className={styles['feature-grid']}>
              {features.map((feature, index) => (
                <div key={index} className={styles['feature-item']}>
                  <div className={styles['feature-icon']}>{feature.icon}</div>
                  <span className={styles['feature-text']}>{feature.text}</span>
                </div>
              ))}
            </div>
          )}

          {/* Custom children content */}
          {children}

          {/* Actions area */}
          {(price || actionText) && (
            <div className={styles.actions}>
              {price && (
                <div className={styles.price}>
                  <span className={styles['price-currency']}>
                    {price.currency || '$'}
                  </span>
                  {price.amount}
                  {price.period && (
                    <span className={styles['price-period']}>
                      {price.period}
                    </span>
                  )}
                </div>
              )}

              {actionText && (
                <button
                  className={styles['action-button']}
                  onClick={onAction}
                  type="button"
                >
                  {actionText}
                </button>
              )}
            </div>
          )}
        </div>

        {/* Decorative elements */}
        {showPatterns && (
          <>
            <div className={styles['dots-pattern']}>
              <svg viewBox="0 0 80 40">
                <circle fill="currentColor" r={3} cy={10} cx={10} />
                <circle fill="currentColor" r={3} cy={10} cx={30} />
                <circle fill="currentColor" r={3} cy={10} cx={50} />
                <circle fill="currentColor" r={3} cy={10} cx={70} />
                <circle fill="currentColor" r={3} cy={20} cx={20} />
                <circle fill="currentColor" r={3} cy={20} cx={40} />
                <circle fill="currentColor" r={3} cy={20} cx={60} />
                <circle fill="currentColor" r={3} cy={30} cx={10} />
                <circle fill="currentColor" r={3} cy={30} cx={30} />
                <circle fill="currentColor" r={3} cy={30} cx={50} />
                <circle fill="currentColor" r={3} cy={30} cx={70} />
              </svg>
            </div>
            <div className={styles['accent-shape']} />
            <div className={styles['corner-slice']} />
          </>
        )}

        {/* Stamp */}
        {stamp && (
          <div className={styles.stamp}>
            <span className={styles['stamp-text']}>{stamp}</span>
          </div>
        )}
      </div>
    );
  }
);

Card.displayName = 'Card';
