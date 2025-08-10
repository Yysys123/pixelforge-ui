// PixelForge UI Icons
// Icon components for PixelForge UI

import React from 'react';

export interface IconProps extends React.SVGAttributes<SVGElement> {
  size?: number | string;
  color?: string;
}

// Base Icon component
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
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    {children}
  </svg>
);

// Common icons used in the component library
export const ChevronDown: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <polyline points="6,9 12,15 18,9" />
  </Icon>
);

export const X: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </Icon>
);

export const Check: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <polyline points="20,6 9,17 4,12" />
  </Icon>
);

export const AlertCircle: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </Icon>
);

export const Info: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12.01" y2="8" />
  </Icon>
);

export const Star: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
  </Icon>
);

// Re-export common icons for convenience
export const CloseIcon = X;
export const SuccessIcon = Check;
export const WarningIcon = AlertCircle;
export const InfoIcon = Info;
