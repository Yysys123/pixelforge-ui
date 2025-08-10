import React from 'react';
import { render, screen } from '../test-utils';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Card } from './Card';

expect.extend(toHaveNoViolations);

describe('Card', () => {
  describe('Rendering', () => {
    it('renders basic card correctly', () => {
      const { container } = render(<Card />);
      const card = container.firstChild as HTMLElement;
      expect(card).toBeInTheDocument();
      expect(card).toHaveClass('card');
    });

    it('renders with title and tag', () => {
      render(<Card title="Creative Studio" tag="Premium" />);
      expect(screen.getByText('Creative Studio')).toBeInTheDocument();
      expect(screen.getByText('Premium')).toBeInTheDocument();
    });

    it('renders description', () => {
      render(<Card description="Award-winning design studio" />);
      expect(
        screen.getByText('Award-winning design studio')
      ).toBeInTheDocument();
    });

    it('renders custom children', () => {
      render(
        <Card>
          <div data-testid="custom-content">Custom content</div>
        </Card>
      );
      expect(screen.getByTestId('custom-content')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const { container } = render(<Card className="custom-card" />);
      const card = container.firstChild as HTMLElement;
      expect(card).toHaveClass('custom-card');
    });
  });

  describe('Variants', () => {
    it.each(['default', 'primary', 'secondary', 'accent'] as const)(
      'applies %s variant class',
      variant => {
        const { container } = render(<Card variant={variant} />);
        const card = container.firstChild as HTMLElement;
        expect(card).toHaveClass(`variant-${variant}`);
      }
    );
  });

  describe('Interactive behavior', () => {
    it('applies interactive class by default', () => {
      const { container } = render(<Card />);
      const card = container.firstChild as HTMLElement;
      expect(card).toHaveClass('interactive');
    });

    it('does not apply interactive class when disabled', () => {
      const { container } = render(<Card interactive={false} />);
      const card = container.firstChild as HTMLElement;
      expect(card).not.toHaveClass('interactive');
    });
  });

  describe('Features', () => {
    const mockFeatures = [
      { icon: <span data-testid="icon-1">📄</span>, text: 'UI/UX Design' },
      { icon: <span data-testid="icon-2">💻</span>, text: 'Development' },
    ];

    it('renders feature items', () => {
      render(<Card features={mockFeatures} />);

      expect(screen.getByText('UI/UX Design')).toBeInTheDocument();
      expect(screen.getByText('Development')).toBeInTheDocument();
      expect(screen.getByTestId('icon-1')).toBeInTheDocument();
      expect(screen.getByTestId('icon-2')).toBeInTheDocument();
    });

    it('does not render feature grid when no features provided', () => {
      render(<Card />);
      const featureGrid = screen.queryByRole('grid');
      expect(featureGrid).not.toBeInTheDocument();
    });
  });

  describe('Price', () => {
    it('renders price with default currency', () => {
      render(<Card price={{ amount: 899 }} />);
      expect(screen.getByText('$')).toBeInTheDocument();
      expect(screen.getByText('899')).toBeInTheDocument();
    });

    it('renders price with custom currency', () => {
      render(<Card price={{ amount: 99, currency: '€' }} />);
      expect(screen.getByText('€')).toBeInTheDocument();
      expect(screen.getByText('99')).toBeInTheDocument();
    });

    it('renders price with period', () => {
      render(<Card price={{ amount: 29, period: 'per month' }} />);
      expect(screen.getByText('per month')).toBeInTheDocument();
    });
  });

  describe('Action button', () => {
    it('renders action button when actionText provided', () => {
      render(<Card actionText="Get Started" />);
      const button = screen.getByRole('button', { name: 'Get Started' });
      expect(button).toBeInTheDocument();
    });

    it('calls onAction when button is clicked', async () => {
      const user = userEvent.setup();
      const handleAction = jest.fn();

      render(<Card actionText="Click me" onAction={handleAction} />);

      const button = screen.getByRole('button', { name: 'Click me' });
      await user.click(button);

      expect(handleAction).toHaveBeenCalledTimes(1);
    });

    it('does not render action button when no actionText', () => {
      render(<Card />);
      const button = screen.queryByRole('button');
      expect(button).not.toBeInTheDocument();
    });
  });

  describe('Decorative elements', () => {
    it('shows patterns by default', () => {
      const { container } = render(<Card />);
      const patternGrid = container.querySelector('.pattern-grid');
      expect(patternGrid).toBeInTheDocument();
    });

    it('hides patterns when showPatterns is false', () => {
      const { container } = render(<Card showPatterns={false} />);
      const patternGrid = container.querySelector('.pattern-grid');
      expect(patternGrid).not.toBeInTheDocument();
    });

    it('renders stamp when provided', () => {
      render(<Card stamp="Approved" />);
      expect(screen.getByText('Approved')).toBeInTheDocument();
    });
  });

  describe('Complete card example', () => {
    it('renders full card with all props', () => {
      const features = [
        { icon: <span>🎨</span>, text: 'Design' },
        { icon: <span>💻</span>, text: 'Code' },
      ];

      render(
        <Card
          title="Premium Package"
          tag="Popular"
          description="Complete design and development package"
          features={features}
          price={{ amount: 999, period: 'per project' }}
          actionText="Get Started"
          stamp="Featured"
          variant="primary"
        />
      );

      expect(screen.getByText('Premium Package')).toBeInTheDocument();
      expect(screen.getByText('Popular')).toBeInTheDocument();
      expect(
        screen.getByText('Complete design and development package')
      ).toBeInTheDocument();
      expect(screen.getByText('Design')).toBeInTheDocument();
      expect(screen.getByText('Code')).toBeInTheDocument();
      expect(screen.getByText('999')).toBeInTheDocument();
      expect(screen.getByText('per project')).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: 'Get Started' })
      ).toBeInTheDocument();
      expect(screen.getByText('Featured')).toBeInTheDocument();
    });
  });

  describe('HTML Attributes', () => {
    it('forwards additional props', () => {
      render(<Card data-testid="custom-card" aria-label="Card component" />);
      const card = screen.getByTestId('custom-card');
      expect(card).toHaveAttribute('aria-label', 'Card component');
    });
  });

  describe('Accessibility', () => {
    it('should not have accessibility violations', async () => {
      const { container } = render(<Card title="Test Card" />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should not have accessibility violations with interactive content', async () => {
      const { container } = render(
        <Card
          title="Interactive Card"
          actionText="Click me"
          features={[{ icon: <span>🎨</span>, text: 'Design' }]}
        />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('action button has proper button role', () => {
      render(<Card actionText="Submit" />);
      const button = screen.getByRole('button', { name: 'Submit' });
      expect(button).toHaveAttribute('type', 'button');
    });
  });

  describe('Ref forwarding', () => {
    it('forwards ref to card element', () => {
      const ref = React.createRef<HTMLDivElement>();
      const { container } = render(<Card ref={ref} />);

      expect(ref.current).toBeInstanceOf(HTMLDivElement);
      expect(ref.current).toBe(container.firstChild);
    });
  });
});
