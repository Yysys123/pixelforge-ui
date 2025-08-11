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

// Navigation & Interface Icons
export const Home: React.FC<IconProps> = props => (
  <Icon {...props}>
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9,22 9,12 15,12 15,22" />
  </Icon>
);

export const User: React.FC<IconProps> = props => (
  <Icon {...props}>
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </Icon>
);

export const Users: React.FC<IconProps> = props => (
  <Icon {...props}>
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </Icon>
);

export const Bell: React.FC<IconProps> = props => (
  <Icon {...props}>
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </Icon>
);

export const Mail: React.FC<IconProps> = props => (
  <Icon {...props}>
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </Icon>
);

export const Calendar: React.FC<IconProps> = props => (
  <Icon {...props}>
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </Icon>
);

export const Clock: React.FC<IconProps> = props => (
  <Icon {...props}>
    <circle cx="12" cy="12" r="10" />
    <polyline points="12,6 12,12 16,14" />
  </Icon>
);

// Media & Content Icons
export const Image: React.FC<IconProps> = props => (
  <Icon {...props}>
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    <circle cx="8.5" cy="8.5" r="1.5" />
    <polyline points="21,15 16,10 5,21" />
  </Icon>
);

export const Video: React.FC<IconProps> = props => (
  <Icon {...props}>
    <polygon points="23,7 16,12 23,17" />
    <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
  </Icon>
);

export const Music: React.FC<IconProps> = props => (
  <Icon {...props}>
    <path d="M9 18V5l12-2v13" />
    <circle cx="6" cy="18" r="3" />
    <circle cx="18" cy="16" r="3" />
  </Icon>
);

export const Download: React.FC<IconProps> = props => (
  <Icon {...props}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7,10 12,15 17,10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </Icon>
);

export const Upload: React.FC<IconProps> = props => (
  <Icon {...props}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17,8 12,3 7,8" />
    <line x1="12" y1="3" x2="12" y2="15" />
  </Icon>
);

// File & Document Icons
export const File: React.FC<IconProps> = props => (
  <Icon {...props}>
    <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
    <polyline points="13,2 13,9 20,9" />
  </Icon>
);

export const Folder: React.FC<IconProps> = props => (
  <Icon {...props}>
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
  </Icon>
);

export const FileText: React.FC<IconProps> = props => (
  <Icon {...props}>
    <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
    <polyline points="13,2 13,9 20,9" />
    <line x1="8" y1="13" x2="16" y2="13" />
    <line x1="8" y1="17" x2="16" y2="17" />
    <polyline points="10,9 9,9 8,9" />
  </Icon>
);

export const Archive: React.FC<IconProps> = props => (
  <Icon {...props}>
    <polyline points="21,8 21,21 3,21 3,8" />
    <rect x="1" y="3" width="22" height="5" />
    <line x1="10" y1="12" x2="14" y2="12" />
  </Icon>
);

// Communication Icons
export const Phone: React.FC<IconProps> = props => (
  <Icon {...props}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </Icon>
);

export const MessageCircle: React.FC<IconProps> = props => (
  <Icon {...props}>
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </Icon>
);

export const Send: React.FC<IconProps> = props => (
  <Icon {...props}>
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22,2 15,22 11,13 2,9" />
  </Icon>
);

// Shopping & E-commerce Icons
export const ShoppingCart: React.FC<IconProps> = props => (
  <Icon {...props}>
    <circle cx="9" cy="21" r="1" />
    <circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
  </Icon>
);

export const CreditCard: React.FC<IconProps> = props => (
  <Icon {...props}>
    <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
    <line x1="1" y1="10" x2="23" y2="10" />
  </Icon>
);

export const DollarSign: React.FC<IconProps> = props => (
  <Icon {...props}>
    <line x1="12" y1="1" x2="12" y2="23" />
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </Icon>
);

export const Gift: React.FC<IconProps> = props => (
  <Icon {...props}>
    <polyline points="20,12 20,22 4,22 4,12" />
    <rect x="2" y="7" width="20" height="5" />
    <line x1="12" y1="22" x2="12" y2="7" />
    <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
    <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
  </Icon>
);

// Social & Sharing Icons
export const Share: React.FC<IconProps> = props => (
  <Icon {...props}>
    <circle cx="18" cy="5" r="3" />
    <circle cx="6" cy="12" r="3" />
    <circle cx="18" cy="19" r="3" />
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
  </Icon>
);

export const ExternalLink: React.FC<IconProps> = props => (
  <Icon {...props}>
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15,3 21,3 21,9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </Icon>
);

export const Link: React.FC<IconProps> = props => (
  <Icon {...props}>
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
  </Icon>
);

export const Copy: React.FC<IconProps> = props => (
  <Icon {...props}>
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </Icon>
);

// System & Tool Icons
export const Database: React.FC<IconProps> = props => (
  <Icon {...props}>
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
  </Icon>
);

export const Server: React.FC<IconProps> = props => (
  <Icon {...props}>
    <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
    <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
    <line x1="6" y1="6" x2="6.01" y2="6" />
    <line x1="6" y1="18" x2="6.01" y2="18" />
  </Icon>
);

export const Wifi: React.FC<IconProps> = props => (
  <Icon {...props}>
    <path d="M5 12.55a11 11 0 0 1 14.08 0" />
    <path d="M1.42 9a16 16 0 0 1 21.16 0" />
    <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
    <line x1="12" y1="20" x2="12.01" y2="20" />
  </Icon>
);

export const Monitor: React.FC<IconProps> = props => (
  <Icon {...props}>
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
    <line x1="8" y1="21" x2="16" y2="21" />
    <line x1="12" y1="17" x2="12" y2="21" />
  </Icon>
);

export const Smartphone: React.FC<IconProps> = props => (
  <Icon {...props}>
    <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
    <line x1="12" y1="18" x2="12.01" y2="18" />
  </Icon>
);

export const Tablet: React.FC<IconProps> = props => (
  <Icon {...props}>
    <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
    <line x1="12" y1="18" x2="12.01" y2="18" />
  </Icon>
);

// Weather Icons
export const Sun: React.FC<IconProps> = props => (
  <Icon {...props}>
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" />
    <line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" />
    <line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </Icon>
);

export const Moon: React.FC<IconProps> = props => (
  <Icon {...props}>
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </Icon>
);

export const Cloud: React.FC<IconProps> = props => (
  <Icon {...props}>
    <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
  </Icon>
);

// Direction & Movement Icons
export const ArrowUp: React.FC<IconProps> = props => (
  <Icon {...props}>
    <line x1="12" y1="19" x2="12" y2="5" />
    <polyline points="5,12 12,5 19,12" />
  </Icon>
);

export const ArrowDown: React.FC<IconProps> = props => (
  <Icon {...props}>
    <line x1="12" y1="5" x2="12" y2="19" />
    <polyline points="19,12 12,19 5,12" />
  </Icon>
);

export const ArrowLeft: React.FC<IconProps> = props => (
  <Icon {...props}>
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12,19 5,12 12,5" />
  </Icon>
);

export const ArrowRight: React.FC<IconProps> = props => (
  <Icon {...props}>
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12,5 19,12 12,19" />
  </Icon>
);

export const ChevronUp: React.FC<IconProps> = props => (
  <Icon {...props}>
    <polyline points="18,15 12,9 6,15" />
  </Icon>
);

export const ChevronLeft: React.FC<IconProps> = props => (
  <Icon {...props}>
    <polyline points="15,18 9,12 15,6" />
  </Icon>
);

export const ChevronRight: React.FC<IconProps> = props => (
  <Icon {...props}>
    <polyline points="9,18 15,12 9,6" />
  </Icon>
);

// Status & State Icons
export const CheckCircle: React.FC<IconProps> = props => (
  <Icon {...props}>
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22,4 12,14.01 9,11.01" />
  </Icon>
);

export const XCircle: React.FC<IconProps> = props => (
  <Icon {...props}>
    <circle cx="12" cy="12" r="10" />
    <line x1="15" y1="9" x2="9" y2="15" />
    <line x1="9" y1="9" x2="15" y2="15" />
  </Icon>
);

export const AlertTriangle: React.FC<IconProps> = props => (
  <Icon {...props}>
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </Icon>
);

export const HelpCircle: React.FC<IconProps> = props => (
  <Icon {...props}>
    <circle cx="12" cy="12" r="10" />
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </Icon>
);

export const Loader: React.FC<IconProps> = props => (
  <Icon {...props}>
    <line x1="12" y1="2" x2="12" y2="6" />
    <line x1="12" y1="18" x2="12" y2="22" />
    <line x1="4.93" y1="4.93" x2="7.76" y2="7.76" />
    <line x1="16.24" y1="16.24" x2="19.07" y2="19.07" />
    <line x1="2" y1="12" x2="6" y2="12" />
    <line x1="18" y1="12" x2="22" y2="12" />
    <line x1="4.93" y1="19.07" x2="7.76" y2="16.24" />
    <line x1="16.24" y1="7.76" x2="19.07" y2="4.93" />
  </Icon>
);

// Layout & Design Icons
export const Grid: React.FC<IconProps> = props => (
  <Icon {...props}>
    <rect x="3" y="3" width="7" height="7" />
    <rect x="14" y="3" width="7" height="7" />
    <rect x="14" y="14" width="7" height="7" />
    <rect x="3" y="14" width="7" height="7" />
  </Icon>
);

export const Layout: React.FC<IconProps> = props => (
  <Icon {...props}>
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    <line x1="3" y1="9" x2="21" y2="9" />
    <line x1="9" y1="21" x2="9" y2="9" />
  </Icon>
);

export const Columns: React.FC<IconProps> = props => (
  <Icon {...props}>
    <path d="M12 3h7a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-7m0-18H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7m0-18v18" />
  </Icon>
);

export const Sidebar: React.FC<IconProps> = props => (
  <Icon {...props}>
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    <line x1="9" y1="3" x2="9" y2="21" />
  </Icon>
);

// Toggle & Controls
export const ToggleLeft: React.FC<IconProps> = props => (
  <Icon {...props}>
    <rect x="1" y="5" width="22" height="14" rx="7" ry="7" />
    <circle cx="8" cy="12" r="3" />
  </Icon>
);

export const ToggleRight: React.FC<IconProps> = props => (
  <Icon {...props}>
    <rect x="1" y="5" width="22" height="14" rx="7" ry="7" />
    <circle cx="16" cy="12" r="3" />
  </Icon>
);

export const Sliders: React.FC<IconProps> = props => (
  <Icon {...props}>
    <line x1="4" y1="21" x2="4" y2="14" />
    <line x1="4" y1="10" x2="4" y2="3" />
    <line x1="12" y1="21" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12" y2="3" />
    <line x1="20" y1="21" x2="20" y2="16" />
    <line x1="20" y1="12" x2="20" y2="3" />
    <line x1="1" y1="14" x2="7" y2="14" />
    <line x1="9" y1="8" x2="15" y2="8" />
    <line x1="17" y1="16" x2="23" y2="16" />
  </Icon>
);

// Media Control Icons
export const Play: React.FC<IconProps> = props => (
  <Icon {...props}>
    <polygon points="5,3 19,12 5,21" />
  </Icon>
);

export const Pause: React.FC<IconProps> = props => (
  <Icon {...props}>
    <rect x="6" y="4" width="4" height="16" />
    <rect x="14" y="4" width="4" height="16" />
  </Icon>
);

export const Stop: React.FC<IconProps> = props => (
  <Icon {...props}>
    <rect x="6" y="6" width="12" height="12" />
  </Icon>
);

export const SkipBack: React.FC<IconProps> = props => (
  <Icon {...props}>
    <polygon points="19,20 9,12 19,4" />
    <line x1="5" y1="19" x2="5" y2="5" />
  </Icon>
);

export const SkipForward: React.FC<IconProps> = props => (
  <Icon {...props}>
    <polygon points="5,4 15,12 5,20" />
    <line x1="19" y1="5" x2="19" y2="19" />
  </Icon>
);

export const Volume2: React.FC<IconProps> = props => (
  <Icon {...props}>
    <polygon points="11,5 6,9 2,9 2,15 6,15 11,19" />
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
  </Icon>
);

export const VolumeX: React.FC<IconProps> = props => (
  <Icon {...props}>
    <polygon points="11,5 6,9 2,9 2,15 6,15 11,19" />
    <line x1="23" y1="9" x2="17" y2="15" />
    <line x1="17" y1="9" x2="23" y2="15" />
  </Icon>
);

// Additional popular icons
export const Trash2: React.FC<IconProps> = props => (
  <Icon {...props}>
    <polyline points="3,6 5,6 21,6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    <line x1="10" y1="11" x2="10" y2="17" />
    <line x1="14" y1="11" x2="14" y2="17" />
  </Icon>
);

export const Edit: React.FC<IconProps> = props => (
  <Icon {...props}>
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </Icon>
);

export const Lock: React.FC<IconProps> = props => (
  <Icon {...props}>
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <circle cx="12" cy="16" r="1" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </Icon>
);

export const Unlock: React.FC<IconProps> = props => (
  <Icon {...props}>
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <circle cx="12" cy="16" r="1" />
    <path d="M7 11V7a5 5 0 0 1 9.9-1" />
  </Icon>
);

export const Eye: React.FC<IconProps> = props => (
  <Icon {...props}>
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </Icon>
);

export const EyeOff: React.FC<IconProps> = props => (
  <Icon {...props}>
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </Icon>
);

export const Maximize: React.FC<IconProps> = props => (
  <Icon {...props}>
    <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
  </Icon>
);

export const Minimize: React.FC<IconProps> = props => (
  <Icon {...props}>
    <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />
  </Icon>
);

export const MoreHorizontal: React.FC<IconProps> = props => (
  <Icon {...props}>
    <circle cx="12" cy="12" r="1" />
    <circle cx="19" cy="12" r="1" />
    <circle cx="5" cy="12" r="1" />
  </Icon>
);

export const MoreVertical: React.FC<IconProps> = props => (
  <Icon {...props}>
    <circle cx="12" cy="12" r="1" />
    <circle cx="12" cy="5" r="1" />
    <circle cx="12" cy="19" r="1" />
  </Icon>
);

// Re-export common icons for convenience (expanded)
export const CloseIcon = X;
export const SuccessIcon = Check;
export const WarningIcon = AlertCircle;
export const InfoIcon = Info;
export const AddIcon = Plus;
export const RemoveIcon = Minus;
export const HamburgerIcon = Menu;
export const ArrowIcon = Arrow;
export const DeleteIcon = Trash2;
export const EditIcon = Edit;
export const ViewIcon = Eye;
export const HideIcon = EyeOff;
export const SecureIcon = Lock;
export const UnlockedIcon = Unlock;
export const HomeIcon = Home;
export const UserIcon = User;
export const NotificationIcon = Bell;
export const EmailIcon = Mail;
export const PhoneIcon = Phone;
export const ChatIcon = MessageCircle;
export const CartIcon = ShoppingCart;
export const PaymentIcon = CreditCard;
export const ShareIcon = Share;
export const LinkIcon = Link;
export const DocumentIcon = File;
export const FolderIcon = Folder;
export const DownloadIcon = Download;
export const UploadIcon = Upload;
export const SearchIcon = Search;
export const SettingsIcon = Settings;
export const LoadingIcon = Loader;
export const GridIcon = Grid;
export const ColumnsIcon = Columns;
export const PlayIcon = Play;
export const PauseIcon = Pause;
export const VolumeIcon = Volume2;
export const MuteIcon = VolumeX;
