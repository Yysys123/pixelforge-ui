import React from 'react';
import { render, screen } from '../test-utils';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Badge } from './Badge';

expect.extend(toHaveNoViolations);

describe('Badge', () => {
  describe('Rendering', () => {
    it('renders basic badge correctly', () => {
      render(<Badge>New</Badge>);
      expect(screen.getByText('New')).toBeInTheDocument();
    });

    it('renders with custom className', () => {
      const { container } = render(<Badge className="custom-badge">Test</Badge>);
      const badge = container.firstChild as HTMLElement;
      expect(badge).toHaveClass('custom-badge');
    });

    it('renders with custom style', () => {
      const { container } = render(<Badge style={{ color: 'red' }}>Test</Badge>);
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
    it.each(['default', 'primary', 'secondary', 'success', 'warning', 'danger', 'info'] as const)(
      'applies %s variant class',
      (variant) => {
        const { container } = render(<Badge variant={variant}>Test</Badge>);
        const badge = container.firstChild as HTMLElement;
        expect(badge).toHaveClass(`variant-${variant}`);
      }
    );
  });

  describe('Sizes', () => {
    it.each(['sm', 'md', 'lg'] as const)(
      'applies %s size class',
      (size) => {
        const { container } = render(<Badge size={size}>Test</Badge>);
        const badge = container.firstChild as HTMLElement;
        expect(badge).toHaveClass(`size-${size}`);
      }
    );
  });

  describe('Shapes', () => {
    it.each(['rounded', 'pill', 'square'] as const)(
      'applies %s shape class',
      (shape) => {
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
      (position) => {
        const { container } = render(<Badge overlay position={position}>Test</Badge>);
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

      render(<Badge interactive onClick={handleClick}>Test</Badge>);
      
      const badge = screen.getByRole('button');
      await user.click(badge);
      
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('handles keyboard interaction when interactive', async () => {
      const user = userEvent.setup();
      const handleKeyDown = jest.fn();

      render(<Badge interactive onKeyDown={handleKeyDown}>Test</Badge>);
      
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
      const { container } = render(<Badge rotation={-10} style={{ transform: 'scale(1.2)' }}>Test</Badge>);
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
        <Badge
          dot
          variant="success"
          overlay
          position="bottom-right"
        />
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
      render(<Badge data-testid="custom-badge" aria-label="Notification badge">5</Badge>);
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