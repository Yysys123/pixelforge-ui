import React from 'react';
import { render, screen } from '../test-utils';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { Modal } from './Modal';

// Mock createPortal to render in current document
jest.mock('react-dom', () => ({
  ...jest.requireActual('react-dom'),
  createPortal: (node: React.ReactNode) => node,
}));

// Mock scrollbar utilities
Object.defineProperty(window, 'getComputedStyle', {
  value: () => ({
    overflow: 'visible',
    getPropertyValue: (prop: string) => {
      if (prop === 'overflow') return 'visible';
      return '';
    },
  }),
});

describe('Modal', () => {
  const defaultProps = {
    open: true,
    onClose: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    // Reset body overflow
    document.body.style.overflow = '';
  });

  describe('Rendering', () => {
    it('renders modal when open', () => {
      render(<Modal {...defaultProps}>Modal content</Modal>);
      expect(screen.getByRole('dialog')).toBeInTheDocument();
      expect(screen.getByText('Modal content')).toBeInTheDocument();
    });

    it('does not render when closed', () => {
      render(
        <Modal {...defaultProps} open={false}>
          Modal content
        </Modal>
      );
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('renders with title', () => {
      render(
        <Modal {...defaultProps} title="Test Modal">
          Modal content
        </Modal>
      );
      expect(
        screen.getByRole('heading', { name: 'Test Modal' })
      ).toBeInTheDocument();
      expect(screen.getByRole('dialog')).toHaveAttribute(
        'aria-labelledby',
        'modal-title'
      );
    });

    it('renders custom header content', () => {
      const header = <div data-testid="custom-header">Custom Header</div>;
      render(
        <Modal {...defaultProps} header={header}>
          Modal content
        </Modal>
      );
      expect(screen.getByTestId('custom-header')).toBeInTheDocument();
    });

    it('renders custom footer content', () => {
      const footer = <div data-testid="custom-footer">Custom Footer</div>;
      render(
        <Modal {...defaultProps} footer={footer}>
          Modal content
        </Modal>
      );
      expect(screen.getByTestId('custom-footer')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(
        <Modal {...defaultProps} className="custom-modal">
          Modal content
        </Modal>
      );
      expect(screen.getByRole('dialog')).toHaveClass('custom-modal');
    });
  });

  describe('Size variants', () => {
    it.each(['sm', 'md', 'lg', 'xl', 'fullscreen'] as const)(
      'applies %s size class',
      size => {
        render(
          <Modal {...defaultProps} size={size}>
            Modal content
          </Modal>
        );
        expect(screen.getByRole('dialog')).toHaveClass(`size-${size}`);
      }
    );
  });

  describe('Close button', () => {
    it('renders close button by default', () => {
      render(<Modal {...defaultProps}>Modal content</Modal>);
      expect(
        screen.getByRole('button', { name: 'Close modal' })
      ).toBeInTheDocument();
    });

    it('does not render close button when showCloseButton is false', () => {
      render(
        <Modal {...defaultProps} showCloseButton={false}>
          Modal content
        </Modal>
      );
      expect(
        screen.queryByRole('button', { name: 'Close modal' })
      ).not.toBeInTheDocument();
    });

    it('calls onClose when close button is clicked', async () => {
      const user = userEvent.setup();
      const handleClose = jest.fn();

      render(
        <Modal {...defaultProps} onClose={handleClose}>
          Modal content
        </Modal>
      );

      const closeButton = screen.getByRole('button', { name: 'Close modal' });
      await user.click(closeButton);

      expect(handleClose).toHaveBeenCalledTimes(1);
    });
  });

  describe('Backdrop behavior', () => {
    it('calls onClose when backdrop is clicked by default', async () => {
      const user = userEvent.setup();
      const handleClose = jest.fn();

      render(
        <Modal {...defaultProps} onClose={handleClose}>
          Modal content
        </Modal>
      );

      // Click on backdrop (presentation role element)
      const backdrop = screen.getByRole('presentation');
      await user.click(backdrop);

      expect(handleClose).toHaveBeenCalledTimes(1);
    });

    it('does not call onClose when backdrop is clicked if closeOnBackdropClick is false', async () => {
      const user = userEvent.setup();
      const handleClose = jest.fn();

      render(
        <Modal
          {...defaultProps}
          onClose={handleClose}
          closeOnBackdropClick={false}
        >
          Modal content
        </Modal>
      );

      const backdrop = screen.getByRole('presentation');
      await user.click(backdrop);

      expect(handleClose).not.toHaveBeenCalled();
    });

    it('does not call onClose when modal content is clicked', async () => {
      const user = userEvent.setup();
      const handleClose = jest.fn();

      render(
        <Modal {...defaultProps} onClose={handleClose}>
          Modal content
        </Modal>
      );

      const modal = screen.getByRole('dialog');
      await user.click(modal);

      expect(handleClose).not.toHaveBeenCalled();
    });
  });

  describe('Keyboard behavior', () => {
    it('calls onClose when Escape is pressed by default', async () => {
      const user = userEvent.setup();
      const handleClose = jest.fn();

      render(
        <Modal {...defaultProps} onClose={handleClose}>
          Modal content
        </Modal>
      );

      await user.keyboard('{Escape}');

      expect(handleClose).toHaveBeenCalledTimes(1);
    });

    it('does not call onClose when Escape is pressed if closeOnEscape is false', async () => {
      const user = userEvent.setup();
      const handleClose = jest.fn();

      render(
        <Modal {...defaultProps} onClose={handleClose} closeOnEscape={false}>
          Modal content
        </Modal>
      );

      await user.keyboard('{Escape}');

      expect(handleClose).not.toHaveBeenCalled();
    });
  });

  describe('Focus management', () => {
    it('contains focusable elements within modal', () => {
      render(
        <Modal {...defaultProps}>
          <button>First button</button>
          <button>Second button</button>
        </Modal>
      );

      const firstButton = screen.getByText('First button');
      const secondButton = screen.getByText('Second button');
      const closeButton = screen.getByRole('button', { name: 'Close modal' });

      // Check that buttons are focusable
      expect(firstButton).toBeInTheDocument();
      expect(secondButton).toBeInTheDocument();
      expect(closeButton).toBeInTheDocument();

      // Test manual focus
      firstButton.focus();
      expect(firstButton).toHaveFocus();

      secondButton.focus();
      expect(secondButton).toHaveFocus();

      closeButton.focus();
      expect(closeButton).toHaveFocus();
    });

    it('renders modal with trapFocus disabled', () => {
      render(
        <Modal {...defaultProps} trapFocus={false}>
          <button>Modal button</button>
        </Modal>
      );

      // Modal should still render properly
      expect(screen.getByRole('dialog')).toBeInTheDocument();
      expect(screen.getByText('Modal button')).toBeInTheDocument();
    });
  });

  describe('Body scroll lock', () => {
    it('locks body scroll when modal is open', () => {
      render(<Modal {...defaultProps}>Modal content</Modal>);
      expect(document.body.style.overflow).toBe('hidden');
    });

    it('restores body scroll when modal is closed', () => {
      const { rerender } = render(
        <Modal {...defaultProps}>Modal content</Modal>
      );
      expect(document.body.style.overflow).toBe('hidden');

      rerender(
        <Modal {...defaultProps} open={false}>
          Modal content
        </Modal>
      );
      expect(document.body.style.overflow).toBe('visible');
    });
  });

  describe('Complete modal example', () => {
    it('renders full modal with all props', () => {
      const header = <span>Custom header</span>;
      const footer = (
        <div>
          <button>Cancel</button>
          <button>Save</button>
        </div>
      );

      render(
        <Modal
          {...defaultProps}
          title="Complete Modal"
          size="lg"
          header={header}
          footer={footer}
          backdropClassName="custom-backdrop"
          contentClassName="custom-content"
          headerClassName="custom-header"
          bodyClassName="custom-body"
          footerClassName="custom-footer"
        >
          <p>This is a complete modal example with all features.</p>
        </Modal>
      );

      expect(
        screen.getByRole('heading', { name: 'Complete Modal' })
      ).toBeInTheDocument();
      expect(screen.getByText('Custom header')).toBeInTheDocument();
      expect(
        screen.getByText('This is a complete modal example with all features.')
      ).toBeInTheDocument();
      expect(screen.getByText('Cancel')).toBeInTheDocument();
      expect(screen.getByText('Save')).toBeInTheDocument();
      expect(screen.getByRole('dialog')).toHaveClass(
        'size-lg',
        'custom-content'
      );
    });
  });

  describe('HTML Attributes', () => {
    it('forwards additional props to modal element', () => {
      render(
        <Modal
          {...defaultProps}
          data-testid="custom-modal"
          aria-describedby="modal-description"
        >
          Modal content
        </Modal>
      );

      const modal = screen.getByTestId('custom-modal');
      expect(modal).toHaveAttribute('aria-describedby', 'modal-description');
    });
  });

  describe('Accessibility', () => {
    it('should not have accessibility violations', async () => {
      const { container } = render(
        <Modal {...defaultProps} title="Accessible Modal">
          <p>This modal follows accessibility best practices.</p>
        </Modal>
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should not have accessibility violations with interactive content', async () => {
      const footer = (
        <div>
          <button type="button">Cancel</button>
          <button type="button">Confirm</button>
        </div>
      );

      const { container } = render(
        <Modal {...defaultProps} title="Interactive Modal" footer={footer}>
          <label htmlFor="email">Email:</label>
          <input id="email" type="email" />
        </Modal>
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has proper dialog role and aria attributes', () => {
      render(
        <Modal {...defaultProps} title="Test Modal">
          Modal content
        </Modal>
      );

      const modal = screen.getByRole('dialog');
      expect(modal).toHaveAttribute('aria-modal', 'true');
      expect(modal).toHaveAttribute('aria-labelledby', 'modal-title');
    });

    it('close button has proper accessibility attributes', () => {
      render(<Modal {...defaultProps}>Modal content</Modal>);

      const closeButton = screen.getByRole('button', { name: 'Close modal' });
      expect(closeButton).toHaveAttribute('type', 'button');
      expect(closeButton).toHaveAttribute('aria-label', 'Close modal');
    });
  });

  describe('Ref forwarding', () => {
    it('forwards ref to modal backdrop element', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(
        <Modal {...defaultProps} ref={ref}>
          Modal content
        </Modal>
      );

      expect(ref.current).toBeInstanceOf(HTMLDivElement);
      expect(ref.current).toHaveAttribute('role', 'presentation');
    });
  });

  describe('Edge cases', () => {
    it('handles onClose being undefined', async () => {
      const user = userEvent.setup();

      render(<Modal open={true}>Modal content</Modal>);

      // Should not throw when pressing escape or clicking backdrop without onClose
      await user.keyboard('{Escape}');

      const backdrop = screen.getByRole('presentation');
      await user.click(backdrop);

      // Should still render without issues
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('handles empty modal content', () => {
      render(<Modal {...defaultProps} />);
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('handles modal without header content', () => {
      render(<Modal {...defaultProps} showCloseButton={false} />);

      // Should not render header section when no title, header, or close button
      expect(screen.queryByRole('heading')).not.toBeInTheDocument();
    });
  });
});
