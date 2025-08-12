import React, { forwardRef, useState, useRef, useEffect } from 'react';
import { clsx } from 'clsx';
import { ChevronDown, Check, Search } from '@pixelforge-ui/icons';
import styles from './Select.module.css';
import '../styles/utilities.css';

export interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  /**
   * Select options
   */
  options: SelectOption[];

  /**
   * Placeholder text
   */
  placeholder?: string;

  /**
   * Size variant
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Visual variant
   */
  variant?: 'default' | 'primary' | 'secondary' | 'accent';

  /**
   * Error state
   */
  error?: boolean;

  /**
   * Enable search functionality
   */
  searchable?: boolean;

  /**
   * Enable multiple selection
   */
  multiple?: boolean;

  /**
   * Loading state
   */
  loading?: boolean;

  /**
   * Clear button
   */
  clearable?: boolean;

  /**
   * Custom render for selected value
   */
  renderValue?: (value: string | string[]) => React.ReactNode;

  /**
   * Custom render for option
   */
  renderOption?: (option: SelectOption) => React.ReactNode;

  /**
   * Search filter function
   */
  filterOption?: (option: SelectOption, searchTerm: string) => boolean;

  /**
   * Callback when selection changes
   */
  onSelectionChange?: (value: string | string[]) => void;
}

/**
 * Select component with brutalist design elements.
 * Supports single/multi-select, search, and custom rendering.
 */
export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      options,
      placeholder = 'SELECT AN OPTION...',
      size = 'md',
      variant = 'default',
      error = false,
      searchable = false,
      multiple = false,
      loading = false,
      clearable = false,
      renderValue,
      renderOption,
      filterOption,
      onSelectionChange,
      className,
      value,
      onChange,
      disabled,
      ...props
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedValues, setSelectedValues] = useState<string[]>(
      multiple 
        ? (Array.isArray(value) ? value.map(String) : value ? [String(value)] : [])
        : value ? [String(value)] : []
    );

    const containerRef = useRef<HTMLDivElement>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
          setIsOpen(false);
          setSearchTerm('');
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Focus search input when dropdown opens
    useEffect(() => {
      if (isOpen && searchable && searchInputRef.current) {
        searchInputRef.current.focus();
      }
    }, [isOpen, searchable]);

    const defaultFilterOption = (option: SelectOption, searchTerm: string) => {
      return option.label.toLowerCase().includes(searchTerm.toLowerCase());
    };

    const filteredOptions = searchable && searchTerm
      ? options.filter(option => (filterOption || defaultFilterOption)(option, searchTerm))
      : options;

    const getSelectedOptions = () => {
      return options.filter(option => selectedValues.includes(String(option.value)));
    };

    const getDisplayValue = () => {
      if (renderValue) {
        return renderValue(multiple ? selectedValues : selectedValues[0] || '');
      }

      const selected = getSelectedOptions();
      if (selected.length === 0) return placeholder;
      if (multiple) {
        return selected.length === 1 
          ? selected[0].label 
          : `${selected.length} selected`;
      }
      return selected[0]?.label || '';
    };

    const handleToggle = () => {
      if (disabled || loading) return;
      setIsOpen(!isOpen);
      if (!isOpen) setSearchTerm('');
    };

    const handleOptionSelect = (option: SelectOption) => {
      if (option.disabled) return;

      let newValues: string[];
      const optionValue = String(option.value);

      if (multiple) {
        if (selectedValues.includes(optionValue)) {
          newValues = selectedValues.filter(v => v !== optionValue);
        } else {
          newValues = [...selectedValues, optionValue];
        }
      } else {
        newValues = [optionValue];
        setIsOpen(false);
      }

      setSelectedValues(newValues);
      
      const finalValue = multiple ? newValues : newValues[0] || '';
      onSelectionChange?.(finalValue);
      
      // Create synthetic event for onChange
      if (onChange) {
        const syntheticEvent = {
          target: { value: finalValue },
        } as React.ChangeEvent<HTMLSelectElement>;
        onChange(syntheticEvent);
      }
    };

    const handleClear = (e: React.MouseEvent) => {
      e.stopPropagation();
      setSelectedValues([]);
      const finalValue = multiple ? [] : '';
      onSelectionChange?.(finalValue);
      
      if (onChange) {
        const syntheticEvent = {
          target: { value: finalValue },
        } as React.ChangeEvent<HTMLSelectElement>;
        onChange(syntheticEvent);
      }
    };

    const selectClasses = clsx(
      styles.select,
      styles[`size-${size}`],
      styles[`variant-${variant}`],
      {
        [styles.error]: error,
        [styles.disabled]: disabled || loading,
        [styles.open]: isOpen,
        [styles.multiple]: multiple,
      },
      className
    );

    return (
      <div ref={containerRef} className={selectClasses}>
        {/* Hidden native select for form submission */}
        <select
          ref={ref}
          value={multiple ? selectedValues : selectedValues[0] || ''}
          onChange={() => {}} // Handled by custom logic
          multiple={multiple}
          disabled={disabled || loading}
          style={{ display: 'none' }}
          {...props}
        >
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        {/* Custom select display */}
        <div className={styles['select-trigger']} onClick={handleToggle}>
          <div className={styles['select-value']}>
            {getDisplayValue()}
          </div>
          
          <div className={styles['select-actions']}>
            {clearable && selectedValues.length > 0 && (
              <button
                type="button"
                className={styles['clear-button']}
                onClick={handleClear}
                aria-label="Clear selection"
              >
                ✕
              </button>
            )}
            
            <div className={styles['select-arrow']}>
              {loading ? (
                <div className={styles.spinner}>⟳</div>
              ) : (
                <ChevronDown size={16} className={isOpen ? styles.rotated : ''} />
              )}
            </div>
          </div>
        </div>

        {/* Dropdown */}
        {isOpen && (
          <div className={styles['select-dropdown']}>
            {searchable && (
              <div className={styles['search-container']}>
                <input
                  ref={searchInputRef}
                  type="text"
                  className={styles['search-input']}
                  placeholder="SEARCH OPTIONS..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            )}
            
            <div className={styles['options-container']}>
              {filteredOptions.length === 0 ? (
                <div className={styles['no-options']}>
                  {searchTerm ? 'NO OPTIONS FOUND' : 'NO OPTIONS AVAILABLE'}
                </div>
              ) : (
                filteredOptions.map((option) => {
                  const isSelected = selectedValues.includes(String(option.value));
                  
                  return (
                    <div
                      key={option.value}
                      className={clsx(styles.option, {
                        [styles.selected]: isSelected,
                        [styles.disabled]: option.disabled,
                      })}
                      onClick={() => handleOptionSelect(option)}
                    >
                      {multiple && (
                        <div className={styles.checkbox}>
                          {isSelected && <Check size={14} />}
                        </div>
                      )}
                      
                      <div className={styles['option-content']}>
                        {renderOption ? renderOption(option) : option.label}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';