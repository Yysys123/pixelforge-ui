import React, { forwardRef } from 'react';
import { clsx } from 'clsx';
import { Typography } from '../typography/Typography';
import styles from './Header.module.css';
import '../styles/utilities.css';

export interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Header brand/logo content
   */
  brand?: React.ReactNode;

  /**
   * Navigation items
   */
  navigation?: React.ReactNode;

  /**
   * Action items (buttons, etc.)
   */
  actions?: React.ReactNode;

  /**
   * Size variant for the header
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Visual variant for the header
   */
  variant?: 'default' | 'primary' | 'transparent' | 'bordered';

  /**
   * Whether the header should be sticky
   */
  sticky?: boolean;

  /**
   * Whether to show decorative patterns
   */
  showPatterns?: boolean;

  /**
   * Whether the header has a shadow
   */
  shadow?: boolean;
}

/**
 * Header component with brutalist design elements.
 * Provides navigation, branding, and action areas with responsive behavior.
 */
export const Header = forwardRef<HTMLElement, HeaderProps>(
  (
    {
      brand,
      navigation,
      actions,
      size = 'md',
      variant = 'default',
      sticky = false,
      showPatterns = false,
      shadow = true,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const headerId =
      props.id || `header-${Math.random().toString(36).substr(2, 9)}`;

    const headerClasses = clsx(
      styles.header,
      styles[`size-${size}`],
      styles[`variant-${variant}`],
      {
        [styles.sticky]: sticky,
        [styles.shadow]: shadow,
        [styles['with-patterns']]: showPatterns,
      },
      className
    );

    return (
      <header ref={ref} id={headerId} className={headerClasses} {...props}>
        {showPatterns && (
          <div className={styles['header-patterns']}>
            <div className={styles['pattern-stripes']} />
            <div className={styles['pattern-dots']} />
          </div>
        )}

        <div className={styles['header-container']}>
          {brand && (
            <div className={styles['header-brand']}>
              {typeof brand === 'string' ? (
                <Typography
                  variant={size === 'lg' ? 'h2' : size === 'sm' ? 'h4' : 'h3'}
                  weight="bold"
                  className={styles['brand-text']}
                >
                  {brand}
                </Typography>
              ) : (
                brand
              )}
            </div>
          )}

          {navigation && (
            <nav className={styles['header-nav']} aria-label="Main navigation">
              {navigation}
            </nav>
          )}

          {actions && <div className={styles['header-actions']}>{actions}</div>}

          {children && (
            <div className={styles['header-content']}>{children}</div>
          )}
        </div>
      </header>
    );
  }
);

Header.displayName = 'Header';

export interface NavItemProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /**
   * Whether the nav item is active/current
   */
  active?: boolean;

  /**
   * Visual variant for the nav item
   */
  variant?: 'default' | 'bold' | 'underline';

  /**
   * Whether the nav item is disabled
   */
  disabled?: boolean;
}

/**
 * Navigation item component for use within Header navigation.
 */
export const NavItem = forwardRef<HTMLAnchorElement, NavItemProps>(
  (
    {
      active = false,
      variant = 'default',
      disabled = false,
      className,
      children,
      onClick,
      ...props
    },
    ref
  ) => {
    const navItemClasses = clsx(
      styles['nav-item'],
      styles[`nav-variant-${variant}`],
      {
        [styles.active]: active,
        [styles.disabled]: disabled,
      },
      className
    );

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (disabled) {
        e.preventDefault();
        return;
      }
      onClick?.(e);
    };

    return (
      <a
        ref={ref}
        className={navItemClasses}
        aria-current={active ? 'page' : undefined}
        aria-disabled={disabled}
        onClick={handleClick}
        {...props}
      >
        {children}
      </a>
    );
  }
);

NavItem.displayName = 'NavItem';

export interface NavListProps extends React.HTMLAttributes<HTMLUListElement> {
  /**
   * Direction of the navigation list
   */
  direction?: 'horizontal' | 'vertical';

  /**
   * Gap between navigation items
   */
  gap?: 'sm' | 'md' | 'lg';
}

/**
 * Navigation list component for organizing multiple nav items.
 */
export const NavList = forwardRef<HTMLUListElement, NavListProps>(
  (
    { direction = 'horizontal', gap = 'md', className, children, ...props },
    ref
  ) => {
    const navListClasses = clsx(
      styles['nav-list'],
      styles[`direction-${direction}`],
      styles[`gap-${gap}`],
      className
    );

    return (
      <ul ref={ref} className={navListClasses} {...props}>
        {React.Children.map(children, (child, index) => (
          <li key={index} className={styles['nav-list-item']}>
            {child}
          </li>
        ))}
      </ul>
    );
  }
);

NavList.displayName = 'NavList';
