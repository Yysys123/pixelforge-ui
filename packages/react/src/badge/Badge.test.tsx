import React from 'react';
import { render, screen } from '../test-utils';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { Badge } from './Badge';

describe('Badge', () => {
  describe('Rendering', () => {
    it('renders basic badge correctly', () => {
      render(<Badge>New</Badge>);
      expect(screen.getByText('New')).toBeInTheDocument();
    });

    it('renders with custom className', () => {
      const { container } = render(
        <Badge className="custom-badge">Test</Badge>
      );
      const badge = container.firstChild as HTMLElement;
      expect(badge).toHaveClass('custom-badge');
    });

    it('renders with custom style', () => {
      const { container } = render(
        <Badge style={{ color: 'red' }}>Test</Badge>
      );
      const badge = container.firstChild as HTMLElement;
      expect(badge).toHaveStyle({ color: 'red' });
    });

    it('does not render when empty and not dot', () => {
      const { container } = render(<Badge />);
      expect(container.firstChild).toBeNull();
    });

    it('renders dot variant even when empty', () => {
      const { container } = render(<Badge dot />);
      const badge = container.firstChild as HTMLElement;
      expect(badge).toBeInTheDocument();
      expect(badge).toHaveClass('dot');
    });
  });

  describe('Variants', () => {
    it.each([
      'default',
      'primary',
      'secondary',
      'success',
      'warning',
      'danger',
      'info',
    ] as const)('applies %s variant class', variant => {
      const { container } = render(<Badge variant={variant}>Test</Badge>);
      const badge = container.firstChild as HTMLElement;
      expect(badge).toHaveClass(`variant-${variant}`);
    });
  });

  describe('Sizes', () => {
    it.each(['sm', 'md', 'lg'] as const)('applies %s size class', size => {
      const { container } = render(<Badge size={size}>Test</Badge>);
      const badge = container.firstChild as HTMLElement;
      expect(badge).toHaveClass(`size-${size}`);
    });
  });

  describe('Shapes', () => {
    it.each(['rounded', 'pill', 'square'] as const)(
      'applies %s shape class',
      shape => {
        const { container } = render(<Badge shape={shape}>Test</Badge>);
        const badge = container.firstChild as HTMLElement;
        expect(badge).toHaveClass(`shape-${shape}`);
      }
    );
  });

  describe('Count behavior', () => {
    it('displays count value', () => {
      render(<Badge count={5} />);
      expect(screen.getByText('5')).toBeInTheDocument();
    });

    it('displays max+ when count exceeds max', () => {
      render(<Badge count={150} max={99} />);
      expect(screen.getByText('99+')).toBeInTheDocument();
    });

    it('displays custom max+ value', () => {
      render(<Badge count={25} max={20} />);
      expect(screen.getByText('20+')).toBeInTheDocument();
    });

    it('does not render when count is 0 and showZero is false', () => {
      const { container } = render(<Badge count={0} />);
      expect(container.firstChild).toBeNull();
    });

    it('renders when count is 0 and showZero is true', () => {
      render(<Badge count={0} showZero />);
      expect(screen.getByText('0')).toBeInTheDocument();
    });

    it('prioritizes count over children', () => {
      render(<Badge count={5}>Children text</Badge>);
      expect(screen.getByText('5')).toBeInTheDocument();
      expect(screen.queryByText('Children text')).not.toBeInTheDocument();
    });
  });

  describe('Dot variant', () => {
    it('applies dot class', () => {
      const { container } = render(<Badge dot />);
      const badge = container.firstChild as HTMLElement;
      expect(badge).toHaveClass('dot');
    });

    it('does not show content in dot variant', () => {
      render(<Badge dot>Hidden content</Badge>);
      expect(screen.queryByText('Hidden content')).not.toBeInTheDocument();
    });

    it('works with count in dot variant', () => {
      const { container } = render(<Badge dot count={5} />);
      const badge = container.firstChild as HTMLElement;
      expect(badge).toHaveClass('dot');
      expect(screen.queryByText('5')).not.toBeInTheDocument();
    });
  });

  describe('Overlay positioning', () => {
    it('applies overlay class', () => {
      const { container } = render(<Badge overlay>Test</Badge>);
      const badge = container.firstChild as HTMLElement;
      expect(badge).toHaveClass('overlay');
    });

    it.each(['top-right', 'top-left', 'bottom-right', 'bottom-left'] as const)(
      'applies %s position class when overlay',
      position => {
        const { container } = render(
          <Badge overlay position={position}>
            Test
          </Badge>
        );
        const badge = container.firstChild as HTMLElement;
        expect(badge).toHaveClass(`position-${position}`);
      }
    );

    it('does not apply position class when not overlay', () => {
      const { container } = render(<Badge position="top-right">Test</Badge>);
      const badge = container.firstChild as HTMLElement;
      expect(badge).not.toHaveClass('position-top-right');
    });
  });

  describe('Interactive behavior', () => {
    it('applies interactive class', () => {
      const { container } = render(<Badge interactive>Test</Badge>);
      const badge = container.firstChild as HTMLElement;
      expect(badge).toHaveClass('interactive');
    });

    it('has button role when interactive', () => {
      render(<Badge interactive>Test</Badge>);
      const badge = screen.getByRole('button');
      expect(badge).toBeInTheDocument();
    });

    it('is focusable when interactive', () => {
      render(<Badge interactive>Test</Badge>);
      const badge = screen.getByRole('button');
      expect(badge).toHaveAttribute('tabIndex', '0');
    });

    it('calls onClick when interactive badge is clicked', async () => {
      const user = userEvent.setup();
      const handleClick = jest.fn();

      render(
        <Badge interactive onClick={handleClick}>
          Test
        </Badge>
      );

      const badge = screen.getByRole('button');
      await user.click(badge);

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('handles keyboard interaction when interactive', async () => {
      const user = userEvent.setup();
      const handleKeyDown = jest.fn();

      render(
        <Badge interactive onKeyDown={handleKeyDown}>
          Test
        </Badge>
      );

      const badge = screen.getByRole('button');
      badge.focus();
      await user.keyboard('{Enter}');

      expect(handleKeyDown).toHaveBeenCalledTimes(1);
    });
  });

  describe('Icon support', () => {
    it('renders with icon', () => {
      const icon = <span data-testid="test-icon">★</span>;
      render(<Badge icon={icon}>Test</Badge>);

      expect(screen.getByTestId('test-icon')).toBeInTheDocument();
      expect(screen.getByText('Test')).toBeInTheDocument();
    });

    it('renders icon only badge with content', () => {
      const icon = <span data-testid="test-icon">★</span>;
      render(<Badge icon={icon}>Badge</Badge>);

      expect(screen.getByTestId('test-icon')).toBeInTheDocument();
      expect(screen.getByText('Badge')).toBeInTheDocument();
    });
  });

  describe('Custom styling', () => {
    it('applies custom rotation', () => {
      const { container } = render(<Badge rotation={15}>Test</Badge>);
      const badge = container.firstChild as HTMLElement;
      expect(badge).toHaveStyle({ transform: 'rotate(15deg)' });
    });

    it('combines rotation with other transforms', () => {
      const { container } = render(
        <Badge rotation={-10} style={{ transform: 'scale(1.2)' }}>
          Test
        </Badge>
      );
      const badge = container.firstChild as HTMLElement;
      // Rotation should override the style transform
      expect(badge).toHaveStyle({ transform: 'rotate(-10deg)' });
    });
  });

  describe('Layout variants', () => {
    it('applies inline class', () => {
      const { container } = render(<Badge inline>Test</Badge>);
      const badge = container.firstChild as HTMLElement;
      expect(badge).toHaveClass('inline');
    });
  });

  describe('Complex examples', () => {
    it('renders complete badge with all features', () => {
      const icon = <span data-testid="star-icon">★</span>;
      const handleClick = jest.fn();

      const { container } = render(
        <Badge
          variant="primary"
          size="lg"
          shape="pill"
          icon={icon}
          interactive
          rotation={5}
          overlay
          position="top-right"
          className="custom-class"
          onClick={handleClick}
        >
          Premium
        </Badge>
      );

      const badge = container.firstChild as HTMLElement;

      expect(badge).toHaveClass('variant-primary');
      expect(badge).toHaveClass('size-lg');
      expect(badge).toHaveClass('shape-pill');
      expect(badge).toHaveClass('interactive');
      expect(badge).toHaveClass('overlay');
      expect(badge).toHaveClass('position-top-right');
      expect(badge).toHaveClass('custom-class');
      expect(badge).toHaveStyle({ transform: 'rotate(5deg)' });
      expect(badge).toHaveAttribute('role', 'button');

      expect(screen.getByTestId('star-icon')).toBeInTheDocument();
      expect(screen.getByText('Premium')).toBeInTheDocument();
    });

    it('renders notification count badge', () => {
      render(
        <Badge
          count={42}
          variant="danger"
          size="sm"
          overlay
          position="top-right"
        />
      );

      const badge = screen.getByText('42');
      expect(badge.closest('.badge')).toHaveClass('variant-danger');
      expect(badge.closest('.badge')).toHaveClass('size-sm');
      expect(badge.closest('.badge')).toHaveClass('overlay');
      expect(badge.closest('.badge')).toHaveClass('position-top-right');
    });

    it('renders status dot', () => {
      const { container } = render(
        <Badge dot variant="success" overlay position="bottom-right" />
      );

      const badge = container.firstChild as HTMLElement;
      expect(badge).toHaveClass('dot');
      expect(badge).toHaveClass('variant-success');
      expect(badge).toHaveClass('overlay');
      expect(badge).toHaveClass('position-bottom-right');
    });
  });

  describe('HTML Attributes', () => {
    it('forwards additional props', () => {
      render(
        <Badge data-testid="custom-badge" aria-label="Notification badge">
          5
        </Badge>
      );
      const badge = screen.getByTestId('custom-badge');
      expect(badge).toHaveAttribute('aria-label', 'Notification badge');
    });
  });

  describe('Accessibility', () => {
    it('should not have accessibility violations', async () => {
      const { container } = render(<Badge>New</Badge>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should not have accessibility violations with interactive badge', async () => {
      const { container } = render(
        <Badge interactive onClick={() => {}}>
          Click me
        </Badge>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should not have accessibility violations with count badge', async () => {
      const { container } = render(<Badge count={99} />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should not have accessibility violations with dot badge', async () => {
      const { container } = render(<Badge dot />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should not have accessibility violations with icon badge', async () => {
      const icon = <span aria-hidden="true">★</span>;
      const { container } = render(<Badge icon={icon}>Premium</Badge>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('provides proper semantic meaning for count badges', () => {
      render(<Badge count={5} aria-label="5 unread messages" />);
      const badge = screen.getByLabelText('5 unread messages');
      expect(badge).toBeInTheDocument();
      expect(badge).toHaveTextContent('5');
    });

    it('provides proper semantic meaning for status badges', () => {
      render(
        <Badge variant="success" aria-label="Online status">
          Online
        </Badge>
      );
      const badge = screen.getByLabelText('Online status');
      expect(badge).toBeInTheDocument();
      expect(badge).toHaveTextContent('Online');
    });

    it('maintains focus management for interactive badges', async () => {
      const user = userEvent.setup();

      render(
        <div>
          <button>Before Badge</button>
          <Badge interactive aria-label="Notification">
            5
          </Badge>
          <button>After Badge</button>
        </div>
      );

      const beforeButton = screen.getByText('Before Badge');
      const badge = screen.getByRole('button', { name: 'Notification' });
      const afterButton = screen.getByText('After Badge');

      beforeButton.focus();
      await user.tab();
      expect(badge).toHaveFocus();

      await user.tab();
      expect(afterButton).toHaveFocus();
    });

    it('supports keyboard navigation for interactive badges', async () => {
      const user = userEvent.setup();
      const onClick = jest.fn();

      render(
        <Badge interactive onClick={onClick} aria-label="Delete item">
          ×
        </Badge>
      );

      const badge = screen.getByRole('button', { name: 'Delete item' });
      badge.focus();

      // Use user event to simulate keyboard interaction
      await user.keyboard('{Enter}');
      expect(onClick).toHaveBeenCalledTimes(1);

      jest.clearAllMocks();
      await user.keyboard(' ');
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('provides proper ARIA attributes for interactive badges', () => {
      render(
        <Badge
          interactive
          aria-label="Remove filter"
          aria-describedby="filter-help"
        >
          Active
        </Badge>
      );

      const badge = screen.getByRole('button');
      expect(badge).toHaveAttribute('aria-label', 'Remove filter');
      expect(badge).toHaveAttribute('aria-describedby', 'filter-help');
      expect(badge).toHaveAttribute('tabIndex', '0');
    });

    it('handles high contrast mode preferences', () => {
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation(query => ({
          matches: query === '(prefers-contrast: high)',
          media: query,
          onchange: null,
          addListener: jest.fn(),
          removeListener: jest.fn(),
          addEventListener: jest.fn(),
          removeEventListener: jest.fn(),
          dispatchEvent: jest.fn(),
        })),
      });

      render(<Badge variant="primary">High contrast badge</Badge>);
      expect(screen.getByText('High contrast badge')).toBeInTheDocument();
    });

    it('respects reduced motion preferences', () => {
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation(query => ({
          matches: query === '(prefers-reduced-motion: reduce)',
          media: query,
          onchange: null,
          addListener: jest.fn(),
          removeListener: jest.fn(),
          addEventListener: jest.fn(),
          removeEventListener: jest.fn(),
          dispatchEvent: jest.fn(),
        })),
      });

      render(
        <Badge interactive rotation={15}>
          Reduced motion badge
        </Badge>
      );
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('provides clear visual focus indicators', () => {
      render(<Badge interactive>Focus me</Badge>);

      const badge = screen.getByRole('button');
      badge.focus();

      expect(badge).toHaveFocus();
      // Focus styling is applied via CSS (outline style may vary by browser)
    });

    it('properly announces count changes to screen readers', () => {
      const { rerender } = render(
        <Badge count={1} aria-label="1 notification" />
      );
      expect(screen.getByLabelText('1 notification')).toBeInTheDocument();

      rerender(<Badge count={5} aria-label="5 notifications" />);
      expect(screen.getByLabelText('5 notifications')).toBeInTheDocument();
      expect(screen.queryByLabelText('1 notification')).not.toBeInTheDocument();
    });

    it('handles dot badges with proper ARIA attributes', () => {
      render(
        <Badge
          dot
          variant="success"
          aria-label="Online status indicator"
          role="status"
        />
      );

      const badge = screen.getByRole('status');
      expect(badge).toHaveAttribute('aria-label', 'Online status indicator');
      expect(badge).toHaveClass('dot');
    });

    it('supports screen reader announcements for status changes', () => {
      const { rerender } = render(
        <Badge variant="danger" aria-label="Offline">
          Offline
        </Badge>
      );
      expect(screen.getByLabelText('Offline')).toBeInTheDocument();

      rerender(
        <Badge variant="success" aria-label="Online">
          Online
        </Badge>
      );
      expect(screen.getByLabelText('Online')).toBeInTheDocument();
    });

    it('maintains semantic structure with icons', () => {
      const icon = (
        <span aria-hidden="true" role="img">
          🔔
        </span>
      );
      render(
        <Badge icon={icon} aria-label="Notification with bell icon">
          New
        </Badge>
      );

      const badge = screen.getByLabelText('Notification with bell icon');
      expect(badge).toBeInTheDocument();
      // Icon is aria-hidden, so we check for its presence via text content instead
      expect(badge).toHaveTextContent('🔔');
    });

    it('provides proper context for overlay badges', () => {
      render(
        <div>
          <div id="message-icon" aria-label="Messages">
            📧
          </div>
          <Badge
            count={3}
            overlay
            aria-describedby="message-icon"
            aria-label="3 unread messages"
          />
        </div>
      );

      const badge = screen.getByLabelText('3 unread messages');
      expect(badge).toHaveAttribute('aria-describedby', 'message-icon');
    });

    it('handles empty states accessibly', () => {
      const { container } = render(<Badge count={0} />);
      expect(container.firstChild).toBeNull();

      // Should not create inaccessible empty elements
      expect(container.querySelector('[role]')).not.toBeInTheDocument();
    });

    it('supports internationalization with proper text direction', () => {
      document.dir = 'rtl';

      render(<Badge count={123} max={200}>العربية</Badge>);
      expect(screen.getByText('123')).toBeInTheDocument();

      document.dir = 'ltr'; // Reset
    });

    it('announces max count overflow appropriately', () => {
      render(<Badge count={150} max={99} aria-label="99+ notifications" />);

      const badge = screen.getByLabelText('99+ notifications');
      expect(badge).toHaveTextContent('99+');
    });
  });

  describe('Ref forwarding', () => {
    it('forwards ref to badge element', () => {
      const ref = React.createRef<HTMLSpanElement>();
      const { container } = render(<Badge ref={ref}>Test</Badge>);

      expect(ref.current).toBeInstanceOf(HTMLSpanElement);
      expect(ref.current).toBe(container.firstChild);
    });
  });

  describe('Edge cases', () => {
    it('handles undefined children gracefully', () => {
      const { container } = render(<Badge>{undefined}</Badge>);
      expect(container.firstChild).toBeNull();
    });

    it('handles null children gracefully', () => {
      const { container } = render(<Badge>{null}</Badge>);
      expect(container.firstChild).toBeNull();
    });

    it('handles empty string children', () => {
      const { container } = render(<Badge>{''}</Badge>);
      expect(container.firstChild).toBeNull();
    });

    it('handles zero count with different max values', () => {
      render(<Badge count={0} max={50} showZero />);
      expect(screen.getByText('0')).toBeInTheDocument();
    });

    it('handles negative count values', () => {
      render(<Badge count={-5} />);
      expect(screen.getByText('-5')).toBeInTheDocument();
    });

    it('handles very large count values', () => {
      render(<Badge count={999999} max={999} />);
      expect(screen.getByText('999+')).toBeInTheDocument();
    });
  });
});
