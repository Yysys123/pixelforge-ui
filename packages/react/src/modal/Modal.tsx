import React, { forwardRef, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import clsx from 'clsx';
import styles from './Modal.module.css';

export interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Whether the modal is open */
  open: boolean;
  /** Callback when modal should close */
  onClose?: () => void;
  /** Modal title */
  title?: string;
  /** Modal size variant */
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'fullscreen';
  /** Whether to show close button */
  showCloseButton?: boolean;
  /** Whether clicking backdrop closes modal */
  closeOnBackdropClick?: boolean;
  /** Whether pressing ESC closes modal */
  closeOnEscape?: boolean;
  /** Whether to trap focus within modal */
  trapFocus?: boolean;
  /** Custom backdrop className */
  backdropClassName?: string;
  /** Custom content className */
  contentClassName?: string;
  /** Custom header className */
  headerClassName?: string;
  /** Custom body className */
  bodyClassName?: string;
  /** Custom footer className */
  footerClassName?: string;
  /** Header content */
  header?: React.ReactNode;
  /** Footer content */
  footer?: React.ReactNode;
  /** Portal container */
  container?: Element | null;
  /** Custom separator icon for the footer */
  separatorIcon?: string;
}

// Focus trap utility
const useFocusTrap = (
  isActive: boolean,
  containerRef: React.RefObject<HTMLElement>
) => {
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    const container = containerRef.current;
    previousFocusRef.current = document.activeElement as HTMLElement;

    const focusableSelector = [
      'button',
      '[href]',
      'input',
      'select',
      'textarea',
      '[tabindex]:not([tabindex="-1"])',
    ].join(',');

    const getFocusableElements = () => {
      return Array.from(container.querySelectorAll(focusableSelector)).filter(
        (el): el is HTMLElement => {
          return (
            el instanceof HTMLElement &&
            !(el as any).disabled &&
            el.tabIndex !== -1 &&
            el.offsetParent !== null
          );
        }
      );
    };

    const handleTabKey = (e: KeyboardEvent) => {
      const focusableElements = getFocusableElements();
      if (focusableElements.length === 0) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        handleTabKey(e);
      }
    };

    // Focus the modal container first, then first focusable element
    container.focus();
    
    // Set timeout to ensure DOM is ready
    const timer = setTimeout(() => {
      const focusableElements = getFocusableElements();
      if (focusableElements.length > 0) {
        focusableElements[0].focus();
      } else {
        container.focus();
      }
    }, 0);

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('keydown', handleKeyDown);
      if (previousFocusRef.current && previousFocusRef.current !== document.body) {
        previousFocusRef.current.focus();
      }
    };
  }, [isActive, containerRef]);
};

export const Modal = forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      open,
      onClose,
      title,
      size = 'md',
      showCloseButton = true,
      closeOnBackdropClick = true,
      closeOnEscape = true,
      trapFocus = true,
      backdropClassName,
      contentClassName,
      headerClassName,
      bodyClassName,
      footerClassName,
      header,
      footer,
      container,
      separatorIcon = '✂',
      className,
      children,
      ...props
    },
    ref
  ) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    // Merge refs
    React.useImperativeHandle(ref, () => modalRef.current!, []);

    // Focus trap
    useFocusTrap(open && trapFocus, contentRef);

    // Handle escape key
    useEffect(() => {
      if (!open || !closeOnEscape) return;

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose?.();
        }
      };

      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }, [open, closeOnEscape, onClose]);

    // Prevent body scroll when modal is open
    useEffect(() => {
      if (!open) return;

      const originalStyle = document.body.style.overflow || '';
      document.body.style.overflow = 'hidden';

      return () => {
        document.body.style.overflow = originalStyle;
      };
    }, [open]);

    const handleBackdropClick = useCallback(
      (e: React.MouseEvent) => {
        if (closeOnBackdropClick && e.target === e.currentTarget) {
          onClose?.();
        }
      },
      [closeOnBackdropClick, onClose]
    );

    if (!open) return null;

    const modalContent = (
      <div
        ref={modalRef}
        className={clsx(styles.backdrop, backdropClassName)}
        onClick={handleBackdropClick}
        role="presentation"
      >
        <div
          ref={contentRef}
          className={clsx(
            styles.modal,
            styles[`size-${size}`],
            contentClassName,
            className
          )}
          role="dialog"
          aria-modal="true"
          aria-labelledby={title ? 'modal-title' : undefined}
          tabIndex={-1}
          style={{
            '--modal-separator-icon': `"${separatorIcon}"`,
            ...props.style
          } as React.CSSProperties}
          {...props}
        >
          {/* Decorative patterns */}
          <div className={styles['pattern-grid']} />
          <div className={styles['pattern-dots']} />
          <div className={styles['corner-shapes']}>
            <div className={styles['corner-shape']} />
            <div className={styles['corner-shape']} />
            <div className={styles['corner-shape']} />
            <div className={styles['corner-shape']} />
          </div>

          {/* Header */}
          {(title || header || showCloseButton) && (
            <div className={clsx(styles.header, headerClassName)}>
              <div className={styles['header-content']}>
                {title && (
                  <h2 id="modal-title" className={styles.title}>
                    {title}
                  </h2>
                )}
                {header}
              </div>
              {showCloseButton && (
                <button
                  type="button"
                  className={styles['close-button']}
                  onClick={onClose}
                  aria-label="Close modal"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15 5L5 15M5 5L15 15"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              )}
            </div>
          )}

          {/* Body */}
          <div className={clsx(styles.body, bodyClassName)}>{children}</div>

          {/* Footer */}
          {footer && (
            <div className={clsx(styles.footer, footerClassName)}>{footer}</div>
          )}

          {/* Accent elements */}
          <div className={styles['accent-line']} />
          <div className={styles['accent-dots']}>
            <svg viewBox="0 0 60 20">
              <circle fill="currentColor" r="2" cy="10" cx="10" />
              <circle fill="currentColor" r="2" cy="10" cx="25" />
              <circle fill="currentColor" r="2" cy="10" cx="40" />
              <circle fill="currentColor" r="2" cy="10" cx="55" />
            </svg>
          </div>
        </div>
      </div>
    );

    // Render in portal
    const portalContainer = container || document.body;
    return createPortal(modalContent, portalContainer);
  }
);

Modal.displayName = 'Modal';
