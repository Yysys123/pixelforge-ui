import React, { forwardRef, useState, useRef, useEffect } from 'react';
import { clsx } from 'clsx';
import { ChevronDown, ChevronRight } from '@pixelforge-ui/icons';
import styles from './Menu.module.css';
import '../styles/utilities.css';

export interface MenuItem {
  /**
   * Unique identifier
   */
  id: string;
  
  /**
   * Display label
   */
  label: string;
  
  /**
   * Icon element
   */
  icon?: React.ReactNode;
  
  /**
   * Whether item is disabled
   */
  disabled?: boolean;
  
  /**
   * Whether item is a divider
   */
  divider?: boolean;
  
  /**
   * Click handler
   */
  onClick?: (item: MenuItem) => void;
  
  /**
   * Submenu items
   */
  submenu?: MenuItem[];
}

export interface MenuProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Menu items
   */
  items: MenuItem[];

  /**
   * Size variant
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Visual variant
   */
  variant?: 'default' | 'primary' | 'secondary' | 'accent';

  /**
   * Menu trigger element
   */
  trigger?: React.ReactNode;

  /**
   * Whether menu is open (controlled)
   */
  open?: boolean;

  /**
   * Callback when menu open state changes
   */
  onOpenChange?: (open: boolean) => void;

  /**
   * Menu placement relative to trigger
   */
  placement?: 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end' | 'right-start' | 'left-start';

  /**
   * Close menu on item click
   */
  closeOnClick?: boolean;

  /**
   * Custom menu width
   */
  width?: string | number;

  /**
   * Custom separator icon for dividers
   */
  dividerIcon?: string;
}

/**
 * Menu/Dropdown component with brutalist design elements.
 * Provides context menus and navigation dropdowns with hierarchical support.
 */
export const Menu = forwardRef<HTMLDivElement, MenuProps>(
  (
    {
      items,
      size = 'md',
      variant = 'default',
      trigger,
      open: controlledOpen,
      onOpenChange,
      placement = 'bottom-start',
      closeOnClick = true,
      width,
      dividerIcon = '✂',
      className,
      children,
      ...props
    },
    ref
  ) => {
    const [internalOpen, setInternalOpen] = useState(false);
    const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
    
    const menuRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLButtonElement>(null);
    
    const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen;
    
    // Close menu when clicking outside
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          menuRef.current &&
          !menuRef.current.contains(event.target as Node) &&
          triggerRef.current &&
          !triggerRef.current.contains(event.target as Node)
        ) {
          handleOpenChange(false);
        }
      };

      if (isOpen) {
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
      }
      
      return undefined;
    }, [isOpen]);

    const handleOpenChange = (newOpen: boolean) => {
      if (controlledOpen === undefined) {
        setInternalOpen(newOpen);
      }
      onOpenChange?.(newOpen);
      
      if (!newOpen) {
        setActiveSubmenu(null);
      }
    };

    const handleTriggerClick = () => {
      handleOpenChange(!isOpen);
    };

    const handleItemClick = (item: MenuItem) => {
      if (item.disabled || item.divider) return;
      
      item.onClick?.(item);
      
      if (closeOnClick && !item.submenu) {
        handleOpenChange(false);
      }
    };

    const handleSubmenuToggle = (itemId: string) => {
      setActiveSubmenu(activeSubmenu === itemId ? null : itemId);
    };

    const menuClasses = clsx(
      styles.menu,
      styles[`size-${size}`],
      styles[`variant-${variant}`],
      styles[`placement-${placement}`],
      {
        [styles.open]: isOpen,
      },
      className
    );

    const renderMenuItem = (item: MenuItem, level = 0): React.ReactNode => {
      if (item.divider) {
        return (
          <div key={item.id} className={styles.divider} role="separator" />
        );
      }

      const hasSubmenu = item.submenu && item.submenu.length > 0;
      const isSubmenuOpen = activeSubmenu === item.id;

      return (
        <div key={item.id} className={styles['menu-item-container']}>
          <button
            type="button"
            className={clsx(styles['menu-item'], {
              [styles.disabled]: item.disabled,
              [styles['has-submenu']]: hasSubmenu,
              [styles['submenu-open']]: isSubmenuOpen,
            })}
            onClick={() => {
              if (hasSubmenu) {
                handleSubmenuToggle(item.id);
              } else {
                handleItemClick(item);
              }
            }}
            disabled={item.disabled}
            aria-expanded={hasSubmenu ? isSubmenuOpen : undefined}
            aria-haspopup={hasSubmenu ? 'menu' : undefined}
          >
            {item.icon && (
              <span className={styles['item-icon']}>{item.icon}</span>
            )}
            
            <span className={styles['item-label']}>{item.label}</span>
            
            {hasSubmenu && (
              <span className={styles['submenu-arrow']}>
                {isSubmenuOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              </span>
            )}
          </button>

          {hasSubmenu && isSubmenuOpen && (
            <div className={styles.submenu}>
              {item.submenu!.map(subItem => renderMenuItem(subItem, level + 1))}
            </div>
          )}
        </div>
      );
    };

    const menuStyle = {
      width: width || undefined,
    };

    return (
      <div ref={ref} className={styles['menu-wrapper']} {...props}>
        {trigger && (
          <button
            ref={triggerRef}
            type="button"
            className={styles.trigger}
            onClick={handleTriggerClick}
            aria-expanded={isOpen}
            aria-haspopup="menu"
          >
            {trigger}
          </button>
        )}

        {children && (
          <div onClick={handleTriggerClick}>
            {children}
          </div>
        )}

        {isOpen && (
          <div
            ref={menuRef}
            className={menuClasses}
            style={{
              '--menu-divider-icon': `"${dividerIcon}"`,
              ...menuStyle
            } as React.CSSProperties}
            role="menu"
            aria-orientation="vertical"
          >
            <div className={styles['menu-content']}>
              {items.map(item => renderMenuItem(item))}
            </div>
          </div>
        )}
      </div>
    );
  }
);

Menu.displayName = 'Menu';