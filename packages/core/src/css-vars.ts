import { DesignTokens } from './tokens';

export type CSSVariables = Record<string, string>;

/**
 * Converts design tokens to CSS variables with the --pf prefix
 */
export function tokensToCSS(tokens: DesignTokens): CSSVariables {
  const cssVars: CSSVariables = {};

  // Colors
  Object.entries(tokens.colors).forEach(([colorKey, colorValue]) => {
    if (typeof colorValue === 'string') {
      cssVars[`--pf-color-${colorKey}`] = colorValue;
    } else if (typeof colorValue === 'object') {
      if ('primary' in colorValue) {
        // Handle text/border objects
        Object.entries(colorValue).forEach(([subKey, subValue]) => {
          cssVars[`--pf-color-${colorKey}-${subKey}`] = subValue;
        });
      } else {
        // Handle color scales
        Object.entries(colorValue).forEach(([shade, value]) => {
          cssVars[`--pf-color-${colorKey}-${shade}`] = value;
        });
      }
    }
  });

  // Spacing
  Object.entries(tokens.spacing).forEach(([key, value]) => {
    cssVars[`--pf-spacing-${key}`] = value;
  });

  // Typography
  Object.entries(tokens.typography.fontFamily).forEach(([key, value]) => {
    cssVars[`--pf-font-family-${key}`] = value;
  });

  Object.entries(tokens.typography.fontSize).forEach(([key, value]) => {
    cssVars[`--pf-font-size-${key}`] = value;
  });

  Object.entries(tokens.typography.fontWeight).forEach(([key, value]) => {
    cssVars[`--pf-font-weight-${key}`] = value.toString();
  });

  Object.entries(tokens.typography.lineHeight).forEach(([key, value]) => {
    cssVars[`--pf-line-height-${key}`] = value.toString();
  });

  Object.entries(tokens.typography.letterSpacing).forEach(([key, value]) => {
    cssVars[`--pf-letter-spacing-${key}`] = value;
  });

  // Border radius
  Object.entries(tokens.borderRadius).forEach(([key, value]) => {
    cssVars[`--pf-radius-${key}`] = value;
  });

  // Shadows
  Object.entries(tokens.shadows).forEach(([key, value]) => {
    cssVars[`--pf-shadow-${key}`] = value;
  });

  // Motion
  Object.entries(tokens.motion.duration).forEach(([key, value]) => {
    cssVars[`--pf-duration-${key}`] = value;
  });

  Object.entries(tokens.motion.easing).forEach(([key, value]) => {
    cssVars[`--pf-easing-${key}`] = value;
  });

  // Z-index
  Object.entries(tokens.zIndex).forEach(([key, value]) => {
    cssVars[`--pf-z-index-${key}`] = value.toString();
  });

  return cssVars;
}

/**
 * Generates CSS string from CSS variables
 */
export function generateCSSString(cssVars: CSSVariables, selector = ':root'): string {
  const declarations = Object.entries(cssVars)
    .map(([property, value]) => `  ${property}: ${value};`)
    .join('\n');

  return `${selector} {\n${declarations}\n}`;
}

/**
 * Merges two sets of design tokens, with the second taking precedence
 */
export function mergeTokens(base: DesignTokens, override: Partial<DesignTokens>): DesignTokens {
  return {
    colors: { ...base.colors, ...override.colors },
    spacing: { ...base.spacing, ...override.spacing },
    typography: {
      fontFamily: { ...base.typography.fontFamily, ...override.typography?.fontFamily },
      fontSize: { ...base.typography.fontSize, ...override.typography?.fontSize },
      fontWeight: { ...base.typography.fontWeight, ...override.typography?.fontWeight },
      lineHeight: { ...base.typography.lineHeight, ...override.typography?.lineHeight },
      letterSpacing: { ...base.typography.letterSpacing, ...override.typography?.letterSpacing },
    },
    borderRadius: { ...base.borderRadius, ...override.borderRadius },
    shadows: { ...base.shadows, ...override.shadows },
    motion: {
      duration: { ...base.motion.duration, ...override.motion?.duration },
      easing: { ...base.motion.easing, ...override.motion?.easing },
    },
    zIndex: { ...base.zIndex, ...override.zIndex },
  };
}