// PixelForge UI Icons
// Icon components for PixelForge UI

import React from 'react';

export interface IconProps extends React.SVGAttributes<SVGElement> {
  size?: number | string;
  color?: string;
}

// Base Icon component with clean, bold stroke design
export const Icon: React.FC<IconProps & { children: React.ReactNode }> = ({
  size = 24,
  color = 'currentColor',
  children,
  ...props
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    {children}
  </svg>
);

// Clean, bold stroke-based icon designs
export const ChevronDown: React.FC<IconProps> = props => (
  <Icon {...props}>
    <polyline points="6,9 12,15 18,9" />
  </Icon>
);

export const X: React.FC<IconProps> = props => (
  <Icon {...props}>
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </Icon>
);

export const Check: React.FC<IconProps> = props => (
  <Icon {...props}>
    <polyline points="20,6 9,17 4,12" />
  </Icon>
);

export const AlertCircle: React.FC<IconProps> = props => (
  <Icon {...props}>
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </Icon>
);

export const Info: React.FC<IconProps> = props => (
  <Icon {...props}>
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12.01" y2="8" />
  </Icon>
);

export const Star: React.FC<IconProps> = props => (
  <Icon {...props}>
    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
  </Icon>
);

// Additional clean stroke-based icons
export const Arrow: React.FC<IconProps> = props => (
  <Icon {...props}>
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12,5 19,12 12,19" />
  </Icon>
);

export const Plus: React.FC<IconProps> = props => (
  <Icon {...props}>
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </Icon>
);

export const Minus: React.FC<IconProps> = props => (
  <Icon {...props}>
    <line x1="5" y1="12" x2="19" y2="12" />
  </Icon>
);

export const Menu: React.FC<IconProps> = props => (
  <Icon {...props}>
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </Icon>
);

export const Settings: React.FC<IconProps> = props => (
  <Icon {...props}>
    <circle cx="12" cy="12" r="3" />
    <line x1="12" y1="1" x2="12" y2="6" />
    <line x1="12" y1="18" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="7.76" y2="7.76" />
    <line x1="16.24" y1="16.24" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="6" y2="12" />
    <line x1="18" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="7.76" y2="16.24" />
    <line x1="16.24" y1="7.76" x2="19.78" y2="4.22" />
  </Icon>
);

export const Search: React.FC<IconProps> = props => (
  <Icon {...props}>
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </Icon>
);

export const Heart: React.FC<IconProps> = props => (
  <Icon {...props}>
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z" />
  </Icon>
);

export const Shield: React.FC<IconProps> = props => (
  <Icon {...props}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </Icon>
);

// Re-export common icons for convenience
export const CloseIcon = X;
export const SuccessIcon = Check;
export const WarningIcon = AlertCircle;
export const InfoIcon = Info;
export const AddIcon = Plus;
export const RemoveIcon = Minus;
export const HamburgerIcon = Menu;
export const ArrowIcon = Arrow;
