import React, { forwardRef, useState, Children, isValidElement, cloneElement } from 'react';
import { clsx } from 'clsx';
import { Typography } from '../typography/Typography';
import styles from './Tabs.module.css';
import '../styles/utilities.css';

export interface TabItem {
  /**
   * Unique key for the tab
   */
  key: string;
  
  /**
   * Tab label text
   */
  label: string;
  
  /**
   * Tab content
   */
  content: React.ReactNode;
  
  /**
   * Whether the tab is disabled
   */
  disabled?: boolean;
  
  /**
   * Icon to display in the tab
   */
  icon?: React.ReactNode;
  
  /**
   * Badge content to show on the tab
   */
  badge?: React.ReactNode;
  
  /**
   * Whether to show decorative pattern
   */
  showPattern?: boolean;
}

export interface TabsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /**
   * Tab items configuration
   */
  items?: TabItem[];
  
  /**
   * Active tab key
   */
  activeKey?: string;
  
  /**
   * Default active tab key
   */
  defaultActiveKey?: string;
  
  /**
   * Callback when active tab changes
   */
  onChange?: (key: string) => void;
  
  /**
   * Tab bar position
   */
  position?: 'top' | 'bottom' | 'left' | 'right';
  
  /**
   * Size variant
   */
  size?: 'sm' | 'md' | 'lg';
  
  /**
   * Visual variant
   */
  variant?: 'default' | 'primary' | 'secondary' | 'accent';
  
  /**
   * Whether tabs should take full width
   */
  fullWidth?: boolean;
  
  /**
   * Whether to show decorative patterns
   */
  showPatterns?: boolean;
  
  /**
   * Whether tabs are centered
   */
  centered?: boolean;
  
  /**
   * Tab style type
   */
  type?: 'line' | 'card' | 'brutalist';
  
  /**
   * Whether to show tab indicators
   */
  showIndicator?: boolean;
  
  /**
   * Custom tab bar extra content
   */
  tabBarExtraContent?: React.ReactNode;
  
  /**
   * Children (alternative to items prop)
   */
  children?: React.ReactNode;
}

export interface TabPaneProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Tab pane key
   */
  key: string;
  
  /**
   * Tab title
   */
  tab: React.ReactNode;
  
  /**
   * Whether the tab is disabled
   */
  disabled?: boolean;
  
  /**
   * Whether to force render the content
   */
  forceRender?: boolean;
  
  /**
   * Icon for the tab
   */
  icon?: React.ReactNode;
  
  /**
   * Badge for the tab
   */
  badge?: React.ReactNode;
  
  /**
   * Children content
   */
  children?: React.ReactNode;
}

/**
 * Individual tab pane component
 */
export const TabPane = forwardRef<HTMLDivElement, TabPaneProps>(
  ({ children, forceRender, ...props }, ref) => {
    return (
      <div ref={ref} {...props}>
        {children}
      </div>
    );
  }
);

TabPane.displayName = 'TabPane';

/**
 * Tabs component with brutalist design elements and geometric indicators.
 * Supports multiple layouts, sizes, and interactive features.
 */
export const Tabs = forwardRef<HTMLDivElement, TabsProps>(
  (
    {
      items,
      activeKey: controlledActiveKey,
      defaultActiveKey,
      onChange,
      position = 'top',
      size = 'md',
      variant = 'default',
      fullWidth = false,
      showPatterns = true,
      centered = false,
      type = 'brutalist',
      showIndicator = true,
      tabBarExtraContent,
      children,
      className,
      ...props
    },
    ref
  ) => {
    // Process children to extract tab items if items prop is not provided
    const processedItems = items || Children.map(children, (child, index) => {
      if (isValidElement<TabPaneProps>(child) && child.type === TabPane) {
        return {
          key: child.key?.toString() || index.toString(),
          label: child.props.tab as string,
          content: child.props.children,
          disabled: child.props.disabled,
          icon: child.props.icon,
          badge: child.props.badge,
        };
      }
      return null;
    })?.filter(Boolean) || [];

    const [internalActiveKey, setInternalActiveKey] = useState(
      defaultActiveKey || processedItems[0]?.key || ''
    );

    const activeKey = controlledActiveKey !== undefined ? controlledActiveKey : internalActiveKey;

    const handleTabClick = (key: string, disabled?: boolean) => {
      if (disabled) return;
      
      if (controlledActiveKey === undefined) {
        setInternalActiveKey(key);
      }
      onChange?.(key);
    };

    const handleKeyDown = (event: React.KeyboardEvent, tabKey: string, tabIndex: number) => {
      const { key } = event;
      const enabledTabs = processedItems.filter(item => !item.disabled);
      const currentIndex = enabledTabs.findIndex(tab => tab.key === tabKey);
      
      let targetIndex = currentIndex;
      
      switch (key) {
        case 'ArrowRight':
        case 'ArrowDown':
          event.preventDefault();
          targetIndex = (currentIndex + 1) % enabledTabs.length;
          break;
        case 'ArrowLeft':
        case 'ArrowUp':
          event.preventDefault();
          targetIndex = currentIndex === 0 ? enabledTabs.length - 1 : currentIndex - 1;
          break;
        case 'Home':
          event.preventDefault();
          targetIndex = 0;
          break;
        case 'End':
          event.preventDefault();
          targetIndex = enabledTabs.length - 1;
          break;
        default:
          return;
      }
      
      const targetTab = enabledTabs[targetIndex];
      if (targetTab) {
        const tabElement = document.querySelector(`[data-tab-key="${targetTab.key}"]`) as HTMLElement;
        tabElement?.focus();
      }
    };

    const activeItem = processedItems.find(item => item.key === activeKey);

    const containerClasses = clsx(
      styles.tabs,
      styles[`position-${position}`],
      styles[`size-${size}`],
      styles[`variant-${variant}`],
      styles[`type-${type}`],
      {
        [styles['full-width']]: fullWidth,
        [styles.centered]: centered,
        [styles['with-patterns']]: showPatterns,
      },
      className
    );

    const tabBarClasses = clsx(
      styles['tab-bar'],
      {
        [styles['full-width']]: fullWidth,
        [styles.centered]: centered,
      }
    );

    const tabListClasses = clsx(
      styles['tab-list'],
      {
        [styles['full-width']]: fullWidth,
      }
    );

    const GeometricIndicator = ({ isActive }: { isActive: boolean }) => (
      <div className={clsx(styles.indicator, { [styles.active]: isActive })}>
        <svg viewBox="0 0 20 4" fill="none">
          <rect
            x="0"
            y="0"
            width="20"
            height="4"
            fill="currentColor"
            className={styles['indicator-shape']}
          />
          <polygon
            points="0,0 4,0 2,4"
            fill="currentColor"
            className={styles['indicator-arrow']}
          />
          <polygon
            points="16,0 20,0 18,4"
            fill="currentColor"
            className={styles['indicator-arrow']}
          />
        </svg>
      </div>
    );

    const TabContent = () => (
      <div 
        className={styles['tab-content']}
        role="tabpanel"
        id={`tabpanel-${activeKey}`}
        aria-labelledby={`tab-${activeKey}`}
        tabIndex={0}
      >
        {showPatterns && (
          <div className={styles['content-patterns']}>
            <div className={styles['pattern-grid']} />
            <div className={styles['pattern-dots']} />
          </div>
        )}
        <div className={styles['content-inner']}>
          {activeItem?.content}
        </div>
      </div>
    );

    const TabBar = () => (
      <div className={tabBarClasses}>
        {showPatterns && type === 'brutalist' && (
          <div className={styles['tab-bar-patterns']}>
            <div className={styles['pattern-border']} />
          </div>
        )}
        
        <div className={styles['tab-bar-inner']}>
          <div className={tabListClasses} role="tablist">
            {processedItems.map((item) => {
              const isActive = item.key === activeKey;
              const tabClasses = clsx(
                styles.tab,
                {
                  [styles.active]: isActive,
                  [styles.disabled]: item.disabled,
                  [styles['with-icon']]: item.icon,
                  [styles['with-badge']]: item.badge,
                  [styles['with-pattern']]: item.showPattern,
                }
              );

              return (
                <button
                  key={item.key}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-disabled={item.disabled}
                  aria-controls={`tabpanel-${item.key}`}
                  id={`tab-${item.key}`}
                  tabIndex={isActive ? 0 : -1}
                  data-tab-key={item.key}
                  className={tabClasses}
                  onClick={() => handleTabClick(item.key, item.disabled)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleTabClick(item.key, item.disabled);
                    } else {
                      handleKeyDown(e, item.key, processedItems.findIndex(tab => tab.key === item.key));
                    }
                  }}
                >
                  <div className={styles['tab-inner']}>
                    {item.icon && (
                      <span className={styles['tab-icon']}>{item.icon}</span>
                    )}
                    
                    <Typography
                      variant={size === 'lg' ? 'body1' : size === 'sm' ? 'caption' : 'body2'}
                      weight="bold"
                      className={styles['tab-label']}
                    >
                      {item.label}
                    </Typography>
                    
                    {item.badge && (
                      <span className={styles['tab-badge']}>{item.badge}</span>
                    )}
                  </div>
                  
                  {showIndicator && type === 'brutalist' && (
                    <GeometricIndicator isActive={isActive} />
                  )}
                  
                  {item.showPattern && (
                    <div className={styles['tab-pattern']}>
                      <svg viewBox="0 0 40 8" fill="none">
                        <circle cx="4" cy="4" r="1" fill="currentColor" opacity="0.5" />
                        <circle cx="12" cy="4" r="1" fill="currentColor" opacity="0.5" />
                        <circle cx="20" cy="4" r="1" fill="currentColor" opacity="0.5" />
                        <circle cx="28" cy="4" r="1" fill="currentColor" opacity="0.5" />
                        <circle cx="36" cy="4" r="1" fill="currentColor" opacity="0.5" />
                      </svg>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
          
          {tabBarExtraContent && (
            <div className={styles['tab-bar-extra']}>
              {tabBarExtraContent}
            </div>
          )}
        </div>
      </div>
    );

    return (
      <div ref={ref} className={containerClasses} {...props}>
        {position === 'top' && <TabBar />}
        {position === 'left' && <TabBar />}
        
        <TabContent />
        
        {position === 'bottom' && <TabBar />}
        {position === 'right' && <TabBar />}
      </div>
    );
  }
);

Tabs.displayName = 'Tabs';