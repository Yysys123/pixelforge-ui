import React, { forwardRef } from 'react';
import { clsx } from 'clsx';
import { Typography } from '../typography/Typography';
import styles from './Footer.module.css';
import '../styles/utilities.css';

export interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Footer brand/logo content
   */
  brand?: React.ReactNode;

  /**
   * Copyright text
   */
  copyright?: string;

  /**
   * Footer links sections
   */
  links?: FooterSection[];

  /**
   * Social media links
   */
  social?: SocialLink[];

  /**
   * Size variant for the footer
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Visual variant for the footer
   */
  variant?: 'default' | 'primary' | 'minimal' | 'bordered';

  /**
   * Whether to show decorative patterns
   */
  showPatterns?: boolean;

  /**
   * Layout variant
   */
  layout?: 'stacked' | 'columns' | 'inline';
}

export interface FooterSection {
  /**
   * Section title
   */
  title: string;

  /**
   * Section links
   */
  links: FooterLinkType[];
}

export interface FooterLinkType {
  /**
   * Link text
   */
  label: string;

  /**
   * Link URL
   */
  href: string;

  /**
   * Whether link opens in new tab
   */
  external?: boolean;
}

export interface SocialLink {
  /**
   * Platform name
   */
  platform: string;

  /**
   * Link URL
   */
  href: string;

  /**
   * Icon for the platform
   */
  icon?: React.ReactNode;

  /**
   * Accessible label
   */
  label?: string;
}

/**
 * Footer component with brutalist design elements.
 * Provides branding, links, and social media sections with responsive behavior.
 */
export const Footer = forwardRef<HTMLElement, FooterProps>(
  (
    {
      brand,
      copyright,
      links = [],
      social = [],
      size = 'md',
      variant = 'default',
      showPatterns = false,
      layout = 'columns',
      className,
      children,
      ...props
    },
    ref
  ) => {
    const footerId =
      props.id || `footer-${Math.random().toString(36).substr(2, 9)}`;
    const currentYear = new Date().getFullYear();

    const footerClasses = clsx(
      styles.footer,
      styles[`size-${size}`],
      styles[`variant-${variant}`],
      styles[`layout-${layout}`],
      {
        [styles['with-patterns']]: showPatterns,
      },
      className
    );

    const renderLinks = () => {
      if (links.length === 0) return null;

      return (
        <div className={styles['footer-links']}>
          {links.map((section, index) => (
            <div key={index} className={styles['link-section']}>
              <Typography
                variant="h3"
                weight="bold"
                className={styles['section-title']}
              >
                {section.title}
              </Typography>
              <ul className={styles['link-list']}>
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href={link.href}
                      className={styles['footer-link']}
                      target={link.external ? '_blank' : undefined}
                      rel={link.external ? 'noopener noreferrer' : undefined}
                    >
                      {link.label}
                      {link.external && (
                        <span
                          className={styles['external-icon']}
                          aria-hidden="true"
                        >
                          ↗
                        </span>
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      );
    };

    const renderSocial = () => {
      if (social.length === 0) return null;

      return (
        <div className={styles['footer-social']}>
          <Typography
            variant="h3"
            weight="bold"
            className={styles['social-title']}
          >
            Follow Us
          </Typography>
          <div className={styles['social-links']}>
            {social.map((socialLink, index) => (
              <a
                key={index}
                href={socialLink.href}
                className={styles['social-link']}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={
                  socialLink.label || `Follow us on ${socialLink.platform}`
                }
                title={socialLink.label || socialLink.platform}
              >
                {socialLink.icon ? (
                  socialLink.icon
                ) : (
                  <span className={styles['social-text']}>
                    {socialLink.platform}
                  </span>
                )}
              </a>
            ))}
          </div>
        </div>
      );
    };

    return (
      <footer ref={ref} id={footerId} className={footerClasses} {...props}>
        {showPatterns && (
          <div className={styles['footer-patterns']}>
            <div className={styles['pattern-grid']} />
            <div className={styles['pattern-diamonds']} />
          </div>
        )}

        <div className={styles['footer-container']}>
          <div className={styles['footer-main']}>
            {brand && (
              <div className={styles['footer-brand']}>
                {typeof brand === 'string' ? (
                  <Typography
                    variant="h2"
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

            {renderLinks()}
            {renderSocial()}

            {children && (
              <div className={styles['footer-content']}>{children}</div>
            )}
          </div>

          {copyright && (
            <div className={styles['footer-bottom']}>
              <Typography
                variant="body2"
                color="muted"
                className={styles['copyright-text']}
              >
                {copyright.replace('{year}', currentYear.toString())}
              </Typography>
            </div>
          )}
        </div>
      </footer>
    );
  }
);

Footer.displayName = 'Footer';

export interface FooterLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /**
   * Whether the link is external
   */
  external?: boolean;

  /**
   * Visual variant for the link
   */
  variant?: 'default' | 'bold' | 'muted';
}

/**
 * Footer link component with consistent styling.
 */
export const FooterLink = forwardRef<HTMLAnchorElement, FooterLinkProps>(
  (
    { external = false, variant = 'default', className, children, ...props },
    ref
  ) => {
    const linkClasses = clsx(
      styles['footer-link'],
      styles[`link-variant-${variant}`],
      className
    );

    return (
      <a
        ref={ref}
        className={linkClasses}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        {...props}
      >
        {children}
        {external && (
          <span className={styles['external-icon']} aria-hidden="true">
            ↗
          </span>
        )}
      </a>
    );
  }
);

FooterLink.displayName = 'FooterLink';
