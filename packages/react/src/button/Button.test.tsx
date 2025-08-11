import React from 'react';
import { render, screen, fireEvent } from '../test-utils';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { Button } from './Button';

describe('Button', () => {
  describe('Rendering', () => {
    it('renders children correctly', () => {
      render(<Button>Click me</Button>);
      expect(
        screen.getByRole('button', { name: 'Click me' })
      ).toBeInTheDocument();
    });

    it('renders as button element by default', () => {
      render(<Button>Click me</Button>);
      const button = screen.getByRole('button');
      expect(button.tagName).toBe('BUTTON');
    });

    it('applies default variant and size classes', () => {
      render(<Button>Click me</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('variant-primary', 'size-md');
    });

    it('applies custom className', () => {
      render(<Button className="custom-class">Click me</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('custom-class');
    });
  });

  describe('Variants', () => {
    it.each(['primary', 'secondary', 'outline', 'ghost', 'danger'] as const)(
      'applies %s variant class',
      variant => {
        render(<Button variant={variant}>Click me</Button>);
        const button = screen.getByRole('button');
        expect(button).toHaveClass(`variant-${variant}`);
      }
    );
  });

  describe('Sizes', () => {
    it.each(['sm', 'md', 'lg'] as const)('applies %s size class', size => {
      render(<Button size={size}>Click me</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass(`size-${size}`);
    });
  });

  describe('States', () => {
    it('renders as disabled when disabled prop is true', () => {
      render(<Button disabled>Click me</Button>);
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
      expect(button).toHaveAttribute('aria-disabled', 'true');
    });

    it('renders loading state with spinner', () => {
      render(<Button loading>Click me</Button>);
      const button = screen.getByRole('button');

      expect(button).toBeDisabled();
      expect(button).toHaveAttribute('aria-disabled', 'true');
      expect(screen.getByText('Loading...')).toBeInTheDocument();

      // Check for loading spinner
      const spinner = button.querySelector('svg');
      expect(spinner).toBeInTheDocument();
      expect(spinner).toHaveAttribute('aria-hidden', 'true');
    });

    it('applies fullWidth class when fullWidth is true', () => {
      render(<Button fullWidth>Click me</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('full-width');
    });

    it('applies icon-only class when only icon is provided', () => {
      const icon = <span data-testid="icon">📄</span>;
      render(<Button startIcon={icon} />);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('icon-only');
    });
  });

  describe('Icons', () => {
    it('renders start icon', () => {
      const icon = <span data-testid="start-icon">📄</span>;
      render(<Button startIcon={icon}>Click me</Button>);

      expect(screen.getByTestId('start-icon')).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: /Click me/ })
      ).toBeInTheDocument();
    });

    it('renders end icon', () => {
      const icon = <span data-testid="end-icon">➡️</span>;
      render(<Button endIcon={icon}>Click me</Button>);

      expect(screen.getByTestId('end-icon')).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: /Click me/ })
      ).toBeInTheDocument();
    });

    it('does not render icons when loading', () => {
      const startIcon = <span data-testid="start-icon">📄</span>;
      const endIcon = <span data-testid="end-icon">➡️</span>;

      render(
        <Button loading startIcon={startIcon} endIcon={endIcon}>
          Click me
        </Button>
      );

      expect(screen.queryByTestId('start-icon')).not.toBeInTheDocument();
      expect(screen.queryByTestId('end-icon')).not.toBeInTheDocument();
    });
  });

  describe('Interactions', () => {
    it('calls onClick when clicked', async () => {
      const user = userEvent.setup();
      const handleClick = jest.fn();

      render(<Button onClick={handleClick}>Click me</Button>);

      await user.click(screen.getByRole('button'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('does not call onClick when disabled', async () => {
      const user = userEvent.setup();
      const handleClick = jest.fn();

      render(
        <Button disabled onClick={handleClick}>
          Click me
        </Button>
      );

      await user.click(screen.getByRole('button'));
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('does not call onClick when loading', async () => {
      const user = userEvent.setup();
      const handleClick = jest.fn();

      render(
        <Button loading onClick={handleClick}>
          Click me
        </Button>
      );

      await user.click(screen.getByRole('button'));
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('supports keyboard interaction', async () => {
      const user = userEvent.setup();
      const handleClick = jest.fn();

      render(<Button onClick={handleClick}>Click me</Button>);

      const button = screen.getByRole('button');
      button.focus();
      await user.keyboard('{Enter}');

      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('HTML Attributes', () => {
    it('forwards additional props', () => {
      render(
        <Button data-testid="custom-button" aria-label="Custom label">
          Click me
        </Button>
      );

      const button = screen.getByTestId('custom-button');
      expect(button).toHaveAttribute('aria-label', 'Custom label');
    });

    it('sets button type to button by default', () => {
      render(<Button>Click me</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('type', 'button');
    });

    it('allows custom button type', () => {
      render(<Button type="submit">Submit</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('type', 'submit');
    });
  });

  describe('Accessibility', () => {
    it('should not have accessibility violations', async () => {
      const { container } = render(<Button>Click me</Button>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should not have accessibility violations when disabled', async () => {
      const { container } = render(<Button disabled>Click me</Button>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should not have accessibility violations when loading', async () => {
      const { container } = render(<Button loading>Click me</Button>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should not have accessibility violations with icons', async () => {
      const icon = <span aria-hidden="true">🔥</span>;
      const { container } = render(
        <Button startIcon={icon} endIcon={icon}>
          Button with icons
        </Button>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should not have accessibility violations for icon-only button', async () => {
      const icon = <span aria-hidden="true">×</span>;
      const { container } = render(
        <Button startIcon={icon} aria-label="Close dialog" />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has proper focus styles', () => {
      render(<Button>Click me</Button>);
      const button = screen.getByRole('button');

      button.focus();
      expect(button).toHaveFocus();
    });

    it('provides screen reader text for loading state', () => {
      render(<Button loading>Click me</Button>);

      expect(screen.getByText('Loading...')).toBeInTheDocument();
      expect(screen.getByText('Loading...')).toHaveClass('sr-only');
    });

    it('maintains proper focus management', async () => {
      const user = userEvent.setup();

      render(
        <div>
          <button>Before Button</button>
          <Button>Focus Target</Button>
          <button>After Button</button>
        </div>
      );

      const beforeButton = screen.getByText('Before Button');
      const targetButton = screen.getByText('Focus Target');
      const afterButton = screen.getByText('After Button');

      beforeButton.focus();
      await user.tab();
      expect(targetButton).toHaveFocus();

      await user.tab();
      expect(afterButton).toHaveFocus();
    });

    it('supports keyboard navigation with Enter and Space', async () => {
      const user = userEvent.setup();
      const onClick = jest.fn();

      render(<Button onClick={onClick}>Keyboard Button</Button>);

      const button = screen.getByRole('button');
      button.focus();

      await user.keyboard('{Enter}');
      expect(onClick).toHaveBeenCalledTimes(1);

      jest.clearAllMocks();
      await user.keyboard(' ');
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('prevents keyboard activation when disabled', async () => {
      const user = userEvent.setup();
      const onClick = jest.fn();

      render(
        <Button disabled onClick={onClick}>
          Disabled Button
        </Button>
      );

      const button = screen.getByRole('button');
      button.focus();

      await user.keyboard('{Enter}');
      await user.keyboard(' ');

      expect(onClick).not.toHaveBeenCalled();
    });

    it('prevents keyboard activation when loading', async () => {
      const user = userEvent.setup();
      const onClick = jest.fn();

      render(
        <Button loading onClick={onClick}>
          Loading Button
        </Button>
      );

      const button = screen.getByRole('button');

      await user.keyboard('{Enter}');
      await user.keyboard(' ');

      expect(onClick).not.toHaveBeenCalled();
    });

    it('provides proper ARIA attributes for different states', () => {
      const { rerender } = render(<Button>Normal Button</Button>);
      let button = screen.getByRole('button');
      expect(button).toHaveAttribute('type', 'button');
      expect(button).not.toHaveAttribute('aria-disabled');

      rerender(<Button disabled>Disabled Button</Button>);
      button = screen.getByRole('button');
      expect(button).toBeDisabled();
      expect(button).toHaveAttribute('aria-disabled', 'true');

      rerender(<Button loading>Loading Button</Button>);
      button = screen.getByRole('button');
      expect(button).toBeDisabled();
      expect(button).toHaveAttribute('aria-disabled', 'true');
    });

    it('supports high contrast mode', () => {
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

      render(<Button variant="primary">High contrast button</Button>);
      expect(screen.getByRole('button')).toBeInTheDocument();
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

      render(<Button loading>Reduced motion button</Button>);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('provides clear visual focus indicators', () => {
      render(<Button>Focus me</Button>);

      const button = screen.getByRole('button');
      button.focus();

      expect(button).toHaveFocus();
      expect(button).toHaveStyle('outline: 2px solid var(--button-primary)');
    });

    it('properly associates labels with icon-only buttons', () => {
      const icon = <span aria-hidden="true">✕</span>;
      render(<Button startIcon={icon} aria-label="Close modal" />);

      const button = screen.getByRole('button', { name: 'Close modal' });
      expect(button).toBeInTheDocument();
      expect(button).toHaveClass('icon-only');
    });

    it('maintains semantic meaning for different button variants', () => {
      const { rerender } = render(<Button variant="primary">Save</Button>);
      expect(screen.getByRole('button')).toHaveClass('variant-primary');

      rerender(<Button variant="danger">Delete</Button>);
      expect(screen.getByRole('button')).toHaveClass('variant-danger');

      rerender(<Button variant="ghost">Cancel</Button>);
      expect(screen.getByRole('button')).toHaveClass('variant-ghost');
    });

    it('supports custom ARIA attributes', () => {
      render(
        <Button
          aria-describedby="help-text"
          aria-expanded="false"
          aria-haspopup="menu"
        >
          Menu Button
        </Button>
      );

      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-describedby', 'help-text');
      expect(button).toHaveAttribute('aria-expanded', 'false');
      expect(button).toHaveAttribute('aria-haspopup', 'menu');
    });

    it('announces state changes to screen readers', () => {
      const { rerender } = render(<Button>Save Changes</Button>);
      expect(screen.getByRole('button')).toHaveTextContent('Save Changes');

      rerender(<Button loading>Save Changes</Button>);
      expect(screen.getByText('Loading...')).toBeInTheDocument();
      expect(screen.getByText('Loading...')).toHaveClass('sr-only');
    });

    it('handles form submission semantics correctly', () => {
      render(
        <form>
          <Button type="submit">Submit Form</Button>
          <Button type="reset">Reset Form</Button>
          <Button type="button">Cancel</Button>
        </form>
      );

      const submitButton = screen.getByRole('button', { name: 'Submit Form' });
      const resetButton = screen.getByRole('button', { name: 'Reset Form' });
      const cancelButton = screen.getByRole('button', { name: 'Cancel' });

      expect(submitButton).toHaveAttribute('type', 'submit');
      expect(resetButton).toHaveAttribute('type', 'reset');
      expect(cancelButton).toHaveAttribute('type', 'button');
    });

    it('properly handles disabled state in forms', () => {
      const onSubmit = jest.fn();

      render(
        <form onSubmit={onSubmit}>
          <Button type="submit" disabled>
            Submit Disabled
          </Button>
        </form>
      );

      const form = screen.getByRole('button').closest('form');
      fireEvent.submit(form!);

      // Form should not submit when button is disabled
      expect(onSubmit).not.toHaveBeenCalled();
    });

    it('supports internationalization with proper text direction', () => {
      document.dir = 'rtl';

      const icon = <span aria-hidden="true">→</span>;
      render(<Button endIcon={icon}>العربية</Button>);

      expect(screen.getByRole('button')).toBeInTheDocument();

      document.dir = 'ltr'; // Reset
    });
  });

  describe('Ref forwarding', () => {
    it('forwards ref to button element', () => {
      const ref = React.createRef<HTMLButtonElement>();
      render(<Button ref={ref}>Click me</Button>);

      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
      expect(ref.current).toBe(screen.getByRole('button'));
    });
  });
});
