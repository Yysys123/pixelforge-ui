import React from 'react';
import { render, screen, act } from '../test-utils';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Alert } from './Alert';

expect.extend(toHaveNoViolations);

// Mock timers for auto-hide functionality
jest.useFakeTimers();

describe('Alert', () => {
  afterEach(() => {
    jest.clearAllTimers();
  });

  describe('Rendering', () => {
    it('renders basic alert correctly', () => {
      render(<Alert>Test alert message</Alert>);
      expect(screen.getByRole('alert')).toBeInTheDocument();
      expect(screen.getByText('Test alert message')).toBeInTheDocument();
    });

    it('renders with title', () => {
      render(<Alert title="Alert Title">Test message</Alert>);
      expect(screen.getByText('Alert Title')).toBeInTheDocument();
      expect(screen.getByText('Test message')).toBeInTheDocument();
    });

    it('renders with custom className', () => {
      const { container } = render(<Alert className="custom-alert">Test</Alert>);
      const alert = container.firstChild as HTMLElement;
      expect(alert).toHaveClass('custom-alert');
    });

    it('renders with custom style', () => {
      const { container } = render(<Alert style={{ color: 'red' }}>Test</Alert>);
      const alert = container.firstChild as HTMLElement;
      expect(alert).toHaveStyle({ color: 'red' });
    });

    it('renders with custom role', () => {
      render(<Alert role="status">Test message</Alert>);
      expect(screen.getByRole('status')).toBeInTheDocument();
    });
  });

  describe('Variants', () => {
    it.each(['default', 'success', 'warning', 'danger', 'info'] as const)(
      'applies %s variant class',
      (variant) => {
        const { container } = render(<Alert variant={variant}>Test</Alert>);
        const alert = container.firstChild as HTMLElement;
        expect(alert).toHaveClass(`variant-${variant}`);
      }
    );
  });

  describe('Sizes', () => {
    it.each(['sm', 'md', 'lg'] as const)(
      'applies %s size class',
      (size) => {
        const { container } = render(<Alert size={size}>Test</Alert>);
        const alert = container.firstChild as HTMLElement;
        expect(alert).toHaveClass(`size-${size}`);
      }
    );
  });

  describe('Icons', () => {
    it('shows default icon by default', () => {
      const { container } = render(<Alert>Test</Alert>);
      const iconContainer = container.querySelector('.icon-container');
      expect(iconContainer).toBeInTheDocument();
    });

    it('hides icon when showIcon is false', () => {
      const { container } = render(<Alert showIcon={false}>Test</Alert>);
      const iconContainer = container.querySelector('.icon-container');
      expect(iconContainer).not.toBeInTheDocument();
    });

    it('renders custom icon', () => {
      const customIcon = <span data-testid="custom-icon">★</span>;
      render(<Alert icon={customIcon}>Test</Alert>);
      expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
    });

    it('shows different default icons for different variants', () => {
      const { container: defaultContainer } = render(<Alert variant="default">Test</Alert>);
      const { container: successContainer } = render(<Alert variant="success">Test</Alert>);
      
      const defaultIcon = defaultContainer.querySelector('.icon-container svg');
      const successIcon = successContainer.querySelector('.icon-container svg');
      
      expect(defaultIcon).toBeInTheDocument();
      expect(successIcon).toBeInTheDocument();
      expect(defaultIcon?.innerHTML).not.toBe(successIcon?.innerHTML);
    });
  });

  describe('Dismissible functionality', () => {
    it('does not render dismiss button by default', () => {
      render(<Alert>Test</Alert>);
      expect(screen.queryByRole('button', { name: 'Dismiss alert' })).not.toBeInTheDocument();
    });

    it('renders dismiss button when dismissible', () => {
      render(<Alert dismissible>Test</Alert>);
      expect(screen.getByRole('button', { name: 'Dismiss alert' })).toBeInTheDocument();
    });

    it('calls onDismiss when dismiss button is clicked', async () => {
      const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
      const handleDismiss = jest.fn();

      render(<Alert dismissible onDismiss={handleDismiss}>Test</Alert>);
      
      const dismissButton = screen.getByRole('button', { name: 'Dismiss alert' });
      await user.click(dismissButton);
      
      expect(handleDismiss).toHaveBeenCalledTimes(1);
    });

    it('hides alert when dismissed', async () => {
      const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

      render(<Alert dismissible>Test</Alert>);
      
      expect(screen.getByRole('alert')).toBeInTheDocument();
      
      const dismissButton = screen.getByRole('button', { name: 'Dismiss alert' });
      await user.click(dismissButton);
      
      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    });
  });

  describe('Auto-hide functionality', () => {
    it('auto-hides after specified duration', () => {
      const handleDismiss = jest.fn();

      render(<Alert autoHideDuration={3000} onDismiss={handleDismiss}>Test</Alert>);
      
      expect(screen.getByRole('alert')).toBeInTheDocument();
      
      act(() => {
        jest.advanceTimersByTime(3000);
      });
      
      expect(handleDismiss).toHaveBeenCalledTimes(1);
      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    });

    it('does not auto-hide when duration is 0', () => {
      const handleDismiss = jest.fn();

      render(<Alert autoHideDuration={0} onDismiss={handleDismiss}>Test</Alert>);
      
      act(() => {
        jest.advanceTimersByTime(5000);
      });
      
      expect(handleDismiss).not.toHaveBeenCalled();
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });

    it('does not auto-hide when no duration provided', () => {
      const handleDismiss = jest.fn();

      render(<Alert onDismiss={handleDismiss}>Test</Alert>);
      
      act(() => {
        jest.advanceTimersByTime(5000);
      });
      
      expect(handleDismiss).not.toHaveBeenCalled();
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });
  });

  describe('Actions', () => {
    it('renders custom actions', () => {
      const actions = (
        <div>
          <button data-testid="action-1">Action 1</button>
          <button data-testid="action-2">Action 2</button>
        </div>
      );

      render(<Alert actions={actions}>Test</Alert>);
      
      expect(screen.getByTestId('action-1')).toBeInTheDocument();
      expect(screen.getByTestId('action-2')).toBeInTheDocument();
    });

    it('does not render actions container when no actions provided', () => {
      const { container } = render(<Alert>Test</Alert>);
      const actionsContainer = container.querySelector('.actions');
      expect(actionsContainer).not.toBeInTheDocument();
    });
  });

  describe('Decorations', () => {
    it('shows decorations by default', () => {
      const { container } = render(<Alert>Test</Alert>);
      expect(container.querySelector('.pattern-grid')).toBeInTheDocument();
      expect(container.querySelector('.corner-cut')).toBeInTheDocument();
    });

    it('hides decorations when showDecorations is false', () => {
      const { container } = render(<Alert showDecorations={false}>Test</Alert>);
      expect(container.querySelector('.pattern-grid')).not.toBeInTheDocument();
      expect(container.querySelector('.corner-cut')).not.toBeInTheDocument();
    });
  });

  describe('Toast positioning', () => {
    it('applies toast class when toast prop is true', () => {
      const { container } = render(<Alert toast>Test</Alert>);
      const alert = container.firstChild as HTMLElement;
      expect(alert).toHaveClass('toast');
    });

    it.each(['top-left', 'top-right', 'top-center', 'bottom-left', 'bottom-right', 'bottom-center'] as const)(
      'applies %s position class when toast',
      (position) => {
        const { container } = render(<Alert toast position={position}>Test</Alert>);
        const alert = container.firstChild as HTMLElement;
        expect(alert).toHaveClass(`position-${position}`);
      }
    );

    it('does not apply position class when not toast', () => {
      const { container } = render(<Alert position="top-right">Test</Alert>);
      const alert = container.firstChild as HTMLElement;
      expect(alert).not.toHaveClass('position-top-right');
    });
  });

  describe('Custom styling', () => {
    it('applies custom rotation', () => {
      const { container } = render(<Alert rotation={10}>Test</Alert>);
      const alert = container.firstChild as HTMLElement;
      expect(alert).toHaveStyle({ transform: 'rotate(10deg)' });
    });

    it('combines rotation with other transforms', () => {
      const { container } = render(<Alert rotation={-5} style={{ transform: 'scale(1.1)' }}>Test</Alert>);
      const alert = container.firstChild as HTMLElement;
      // Rotation should override the style transform
      expect(alert).toHaveStyle({ transform: 'rotate(-5deg)' });
    });
  });

  describe('Complex examples', () => {
    it('renders full-featured alert', () => {
      const customIcon = <span data-testid="custom-icon">🎉</span>;
      const actions = <button data-testid="action-btn">Undo</button>;
      const handleDismiss = jest.fn();

      const { container } = render(
        <Alert
          variant="success"
          size="lg"
          title="Success!"
          dismissible
          onDismiss={handleDismiss}
          icon={customIcon}
          actions={actions}
          rotation={3}
          toast
          position="top-right"
          className="custom-alert"
        >
          Your action was completed successfully.
        </Alert>
      );

      const alert = container.firstChild as HTMLElement;
      
      expect(alert).toHaveClass('variant-success');
      expect(alert).toHaveClass('size-lg');
      expect(alert).toHaveClass('toast');
      expect(alert).toHaveClass('position-top-right');
      expect(alert).toHaveClass('custom-alert');
      expect(alert).toHaveStyle({ transform: 'rotate(3deg)' });
      
      expect(screen.getByText('Success!')).toBeInTheDocument();
      expect(screen.getByText('Your action was completed successfully.')).toBeInTheDocument();
      expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
      expect(screen.getByTestId('action-btn')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Dismiss alert' })).toBeInTheDocument();
    });

    it('renders notification-style alert', () => {
      render(
        <Alert
          variant="info"
          title="New Message"
          dismissible
          autoHideDuration={5000}
          toast
          position="bottom-right"
        >
          You have received a new message from John.
        </Alert>
      );

      expect(screen.getByText('New Message')).toBeInTheDocument();
      expect(screen.getByText('You have received a new message from John.')).toBeInTheDocument();
      expect(screen.getByRole('alert')).toHaveClass('variant-info');
      expect(screen.getByRole('alert')).toHaveClass('toast');
      expect(screen.getByRole('alert')).toHaveClass('position-bottom-right');
    });

    it('renders minimal alert', () => {
      render(
        <Alert
          variant="warning"
          showIcon={false}
          showDecorations={false}
        >
          Simple warning message
        </Alert>
      );

      expect(screen.getByText('Simple warning message')).toBeInTheDocument();
      expect(screen.getByRole('alert')).toHaveClass('variant-warning');
      
      const { container } = render(<Alert variant="warning" showIcon={false} showDecorations={false}>Test</Alert>);
      expect(container.querySelector('.icon-container')).not.toBeInTheDocument();
      expect(container.querySelector('.pattern-grid')).not.toBeInTheDocument();
    });
  });

  describe('HTML Attributes', () => {
    it('forwards additional props', () => {
      render(<Alert data-testid="custom-alert" aria-describedby="help-text">Test</Alert>);
      const alert = screen.getByTestId('custom-alert');
      expect(alert).toHaveAttribute('aria-describedby', 'help-text');
    });
  });

  describe('Accessibility', () => {

    it('dismiss button has proper accessibility attributes', () => {
      render(<Alert dismissible>Test</Alert>);
      
      const dismissButton = screen.getByRole('button', { name: 'Dismiss alert' });
      expect(dismissButton).toHaveAttribute('type', 'button');
      expect(dismissButton).toHaveAttribute('aria-label', 'Dismiss alert');
    });

    it('has alert role by default', () => {
      render(<Alert>Test message</Alert>);
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });
  });

  describe('Ref forwarding', () => {
    it('forwards ref to alert element', () => {
      const ref = React.createRef<HTMLDivElement>();
      const { container } = render(<Alert ref={ref}>Test</Alert>);

      expect(ref.current).toBeInstanceOf(HTMLDivElement);
      expect(ref.current).toBe(container.firstChild);
    });
  });

  describe('Edge cases', () => {
    it('handles onDismiss being undefined', async () => {
      const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

      render(<Alert dismissible>Test</Alert>);
      
      const dismissButton = screen.getByRole('button', { name: 'Dismiss alert' });
      await user.click(dismissButton);
      
      // Should not throw and alert should be hidden
      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    });

    it('handles empty alert content', () => {
      const { container } = render(<Alert />);
      expect(container.firstChild).toBeInTheDocument();
    });

    it('handles only title without message', () => {
      render(<Alert title="Title Only" />);
      expect(screen.getByText('Title Only')).toBeInTheDocument();
    });

    it('cleans up timer on unmount', () => {
      const handleDismiss = jest.fn();
      const { unmount } = render(<Alert autoHideDuration={3000} onDismiss={handleDismiss}>Test</Alert>);
      
      unmount();
      
      act(() => {
        jest.advanceTimersByTime(3000);
      });
      
      expect(handleDismiss).not.toHaveBeenCalled();
    });
  });
});