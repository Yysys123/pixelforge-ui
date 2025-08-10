import React, { forwardRef } from 'react';
import { clsx } from 'clsx';
import styles from './Typography.module.css';

export type TypographyElement =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'p'
  | 'span'
  | 'div'
  | 'label'
  | 'legend'
  | 'strong'
  | 'em'
  | 'small'
  | 'code'
  | 'pre';

export type TypographyVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'subtitle1'
  | 'subtitle2'
  | 'body1'
  | 'body2'
  | 'caption'
  | 'overline';

export type TypographySize =
  | 'xs'
  | 'sm'
  | 'base'
  | 'lg'
  | 'xl'
  | '2xl'
  | '3xl'
  | '4xl'
  | '5xl'
  | '6xl';

export type TypographyWeight =
  | 'thin'
  | 'light'
  | 'normal'
  | 'medium'
  | 'semibold'
  | 'bold'
  | 'extrabold'
  | 'black';

export type TypographyColor =
  | 'primary'
  | 'secondary'
  | 'muted'
  | 'inverse'
  | 'brand-primary'
  | 'brand-secondary'
  | 'success'
  | 'warning'
  | 'danger';

export type TypographyAlign = 'left' | 'center' | 'right' | 'justify';

export type TypographyTransform =
  | 'none'
  | 'uppercase'
  | 'lowercase'
  | 'capitalize';

export type TypographyDecoration = 'none' | 'underline' | 'line-through';

export type TypographyFamily = 'sans' | 'serif' | 'mono';

export interface TypographyProps {
  /**
   * The HTML element to render
   */
  as?: TypographyElement;

  /**
   * Semantic variant that applies predefined styles
   */
  variant?: TypographyVariant;

  /**
   * Font size
   */
  size?: TypographySize;

  /**
   * Font weight
   */
  weight?: TypographyWeight;

  /**
   * Text color
   */
  color?: TypographyColor;

  /**
   * Text alignment
   */
  align?: TypographyAlign;

  /**
   * Text transformation
   */
  transform?: TypographyTransform;

  /**
   * Text decoration
   */
  decoration?: TypographyDecoration;

  /**
   * Font family
   */
  family?: TypographyFamily;

  /**
   * Truncate text with ellipsis
   */
  truncate?: boolean;

  /**
   * Clamp text to specified number of lines
   */
  lineClamp?: 1 | 2 | 3;

  /**
   * Additional CSS class names
   */
  className?: string;

  /**
   * Children content
   */
  children?: React.ReactNode;

  /**
   * Additional HTML attributes
   */
  [key: string]: any;
}

/**
 * Flexible typography component for consistent text styling throughout the application.
 * Supports semantic variants, custom styling options, and accessibility features.
 */
export const Typography = forwardRef<HTMLElement, TypographyProps>(
  (
    {
      as,
      variant,
      size,
      weight,
      color = 'primary',
      align,
      transform,
      decoration,
      family = 'sans',
      truncate = false,
      lineClamp,
      className,
      children,
      ...props
    },
    ref
  ) => {
    // Determine the element to render
    const defaultElementMap: Record<TypographyVariant, TypographyElement> = {
      h1: 'h1',
      h2: 'h2',
      h3: 'h3',
      h4: 'h4',
      h5: 'h5',
      h6: 'h6',
      subtitle1: 'p',
      subtitle2: 'p',
      body1: 'p',
      body2: 'p',
      caption: 'span',
      overline: 'span',
    };

    const Element = as || (variant ? defaultElementMap[variant] : 'p');

    const classes = clsx(
      styles.typography,
      styles[`font-${family}`],
      styles[`color-${color}`],
      {
        // Variant styles take precedence
        [styles[`variant-${variant}`]]: variant,

        // Individual style overrides
        [styles[`size-${size}`]]: size && !variant,
        [styles[`weight-${weight}`]]: weight && !variant,
        [styles[`align-${align}`]]: align,
        [styles[`transform-${transform}`]]: transform,
        [styles[`decoration-${decoration}`]]: decoration,

        // Truncation
        [styles.truncate]: truncate,
        [styles[`line-clamp-${lineClamp}`]]: lineClamp,
      },
      className
    );

    return (
      <Element ref={ref} className={classes} {...props}>
        {children}
      </Element>
    );
  }
);

Typography.displayName = 'Typography';
