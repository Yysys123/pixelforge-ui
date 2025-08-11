import React from 'react';
import { render, screen, fireEvent } from '../test-utils';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { Checkbox } from './Checkbox';

describe('Checkbox', () => {
  describe('Rendering', () => {
    it('renders checkbox correctly', () => {
      render(<Checkbox />);
      expect(screen.getByRole('checkbox')).toBeInTheDocument();
    });

    it('renders with label', () => {
      render(<Checkbox label="Accept terms" />);
      expect(screen.getByLabelText('Accept terms')).toBeInTheDocument();
      expect(screen.getByText('Accept terms')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(<Checkbox className="custom-checkbox" />);
      expect(screen.getByRole('checkbox')).toHaveClass('custom-checkbox');
    });

    it('applies custom wrapper className', () => {
      render(<Checkbox wrapperClassName="custom-wrapper" />);
      const wrapper = screen.getByRole('checkbox').closest('.custom-wrapper');
      expect(wrapper).toBeInTheDocument();
    });
  });

  describe('Sizes', () => {
    it.each(['sm', 'md', 'lg'] as const)('applies %s size class', size => {
      render(<Checkbox size={size} />);
      const wrapper = screen.getByRole('checkbox').closest('div');
      expect(wrapper).toHaveClass(`size-${size}`);
    });
  });

  describe('Variants', () => {
    it.each(['default', 'primary', 'secondary', 'accent'] as const)(
      'applies %s variant class',
      variant => {
        render(<Checkbox variant={variant} />);
        const wrapper = screen.getByRole('checkbox').closest('div');
        expect(wrapper).toHaveClass(`variant-${variant}`);
      }
    );
  });

  describe('States', () => {
    it('handles checked state', () => {
      render(<Checkbox checked onChange={() => {}} />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toBeChecked();
    });

    it('handles disabled state', () => {
      render(<Checkbox disabled />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toBeDisabled();

      const wrapper = checkbox.closest('div');
      expect(wrapper).toHaveClass('disabled');
    });

    it('handles indeterminate state', () => {
      render(<Checkbox indeterminate />);
      const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
      expect(checkbox.indeterminate).toBe(true);
    });

    it('shows required indicator', () => {
      render(<Checkbox label="Required field" required />);
      expect(screen.getByLabelText('required')).toBeInTheDocument();
      expect(screen.getByText('*')).toBeInTheDocument();
    });
  });

  describe('Error handling', () => {
    it('displays error message', () => {
      render(<Checkbox error="This field is required" />);
      expect(screen.getByRole('alert')).toBeInTheDocument();
      expect(screen.getByText('This field is required')).toBeInTheDocument();
    });

    it('applies error styling', () => {
      render(<Checkbox error="Error message" />);
      const wrapper = screen.getByRole('checkbox').closest('div');
      expect(wrapper).toHaveClass('error');
    });

    it('associates error message with checkbox', () => {
      render(<Checkbox error="Error message" />);
      const checkbox = screen.getByRole('checkbox');
      const errorMessage = screen.getByRole('alert');

      expect(checkbox).toHaveAttribute('aria-describedby', errorMessage.id);
    });
  });

  describe('Helper text', () => {
    it('displays helper text', () => {
      render(<Checkbox helperText="Check this box to continue" />);
      expect(
        screen.getByText('Check this box to continue')
      ).toBeInTheDocument();
    });

    it('associates helper text with checkbox', () => {
      render(<Checkbox helperText="Helper text" />);
      const checkbox = screen.getByRole('checkbox');
      const helperText = screen.getByText('Helper text');

      expect(checkbox).toHaveAttribute('aria-describedby', helperText.id);
    });

    it('combines error and helper text in aria-describedby', () => {
      render(<Checkbox helperText="Helper text" error="Error message" />);

      const checkbox = screen.getByRole('checkbox');
      const helperText = screen.getByText('Helper text');
      const errorMessage = screen.getByRole('alert');

      const describedBy = checkbox.getAttribute('aria-describedby');
      expect(describedBy).toContain(errorMessage.id);
      expect(describedBy).toContain(helperText.id);
    });

    it('hides helper text when error is present', () => {
      render(<Checkbox helperText="Helper text" error="Error message" />);

      expect(screen.getByRole('alert')).toBeInTheDocument();
      expect(screen.queryByText('Helper text')).not.toBeInTheDocument();
    });
  });

  describe('Custom icons', () => {
    it('renders custom checked icon', () => {
      const customIcon = <span data-testid="custom-check">✓</span>;
      render(<Checkbox checked checkedIcon={customIcon} onChange={() => {}} />);
      expect(screen.getByTestId('custom-check')).toBeInTheDocument();
    });

    it('renders custom indeterminate icon', () => {
      const customIcon = <span data-testid="custom-indeterminate">~</span>;
      render(<Checkbox indeterminate indeterminateIcon={customIcon} />);
      expect(screen.getByTestId('custom-indeterminate')).toBeInTheDocument();
    });
  });

  describe('Interactions', () => {
    it('calls onChange when clicked', async () => {
      const user = userEvent.setup();
      const onChange = jest.fn();

      render(<Checkbox onChange={onChange} />);

      const checkbox = screen.getByRole('checkbox');
      await user.click(checkbox);

      expect(onChange).toHaveBeenCalledTimes(1);
    });

    it('does not call onChange when disabled', async () => {
      const user = userEvent.setup();
      const onChange = jest.fn();

      render(<Checkbox disabled onChange={onChange} />);

      const checkbox = screen.getByRole('checkbox');
      await user.click(checkbox);

      expect(onChange).not.toHaveBeenCalled();
    });

    it('can be clicked via label', async () => {
      const user = userEvent.setup();
      const onChange = jest.fn();

      render(<Checkbox label="Click me" onChange={onChange} />);

      const label = screen.getByText('Click me');
      await user.click(label);

      expect(onChange).toHaveBeenCalledTimes(1);
    });

    it('supports keyboard interaction', async () => {
      const user = userEvent.setup();
      const onChange = jest.fn();

      render(<Checkbox onChange={onChange} />);

      const checkbox = screen.getByRole('checkbox');
      checkbox.focus();
      await user.keyboard(' ');

      expect(onChange).toHaveBeenCalledTimes(1);
    });
  });

  describe('Accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(<Checkbox label="Test checkbox" />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no accessibility violations with error', async () => {
      const { container } = render(
        <Checkbox label="Test checkbox" error="Required field" />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no accessibility violations when disabled', async () => {
      const { container } = render(<Checkbox label="Test checkbox" disabled />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('provides proper ARIA attributes', () => {
      render(<Checkbox label="Test checkbox" required />);
      const checkbox = screen.getByRole('checkbox');

      expect(checkbox).toHaveAttribute('type', 'checkbox');
      expect(checkbox).toHaveAttribute('required');
      expect(checkbox).toHaveAttribute('aria-invalid', 'false');
    });

    it('sets aria-invalid when error is present', () => {
      render(<Checkbox error="Error message" />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toHaveAttribute('aria-invalid', 'true');
    });

    it('maintains focus management', async () => {
      const user = userEvent.setup();

      render(
        <div>
          <button>Before Checkbox</button>
          <Checkbox label="Focus Target" />
          <button>After Checkbox</button>
        </div>
      );

      const beforeButton = screen.getByText('Before Checkbox');
      const checkbox = screen.getByRole('checkbox');
      const afterButton = screen.getByText('After Checkbox');

      beforeButton.focus();
      await user.tab();
      expect(checkbox).toHaveFocus();

      await user.tab();
      expect(afterButton).toHaveFocus();
    });

    it('provides clear visual focus indicators', () => {
      render(<Checkbox label="Focus me" />);

      const checkbox = screen.getByRole('checkbox');
      checkbox.focus();

      expect(checkbox).toHaveFocus();
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

      render(<Checkbox label="High contrast checkbox" />);
      expect(screen.getByRole('checkbox')).toBeInTheDocument();
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

      render(<Checkbox label="Reduced motion checkbox" />);
      expect(screen.getByRole('checkbox')).toBeInTheDocument();
    });

    it('supports internationalization', () => {
      document.dir = 'rtl';

      render(<Checkbox label="مربع الاختيار" />);
      expect(screen.getByLabelText('مربع الاختيار')).toBeInTheDocument();

      document.dir = 'ltr'; // Reset
    });
  });

  describe('Form integration', () => {
    it('works within forms', () => {
      render(
        <form>
          <Checkbox name="terms" value="accepted" label="Accept terms" />
        </form>
      );

      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toHaveAttribute('name', 'terms');
      expect(checkbox).toHaveAttribute('value', 'accepted');
    });

    it('supports form validation', async () => {
      const user = userEvent.setup();

      render(
        <form>
          <Checkbox required label="Required checkbox" />
          <button type="submit">Submit</button>
        </form>
      );

      const submitButton = screen.getByText('Submit');
      const checkbox = screen.getByRole('checkbox');

      // Try to submit without checking
      await user.click(submitButton);
      expect(checkbox).toBeInvalid();
    });
  });

  describe('Ref forwarding', () => {
    it('forwards ref to checkbox input', () => {
      const ref = React.createRef<HTMLInputElement>();
      render(<Checkbox ref={ref} />);

      expect(ref.current).toBeInstanceOf(HTMLInputElement);
      expect(ref.current).toBe(screen.getByRole('checkbox'));
    });
  });

  describe('Edge cases', () => {
    it('handles missing label gracefully', () => {
      render(<Checkbox />);
      expect(screen.getByRole('checkbox')).toBeInTheDocument();
    });

    it('generates unique IDs for multiple checkboxes', () => {
      render(
        <>
          <Checkbox label="Checkbox 1" />
          <Checkbox label="Checkbox 2" />
        </>
      );

      const checkbox1 = screen.getByLabelText('Checkbox 1');
      const checkbox2 = screen.getByLabelText('Checkbox 2');

      expect(checkbox1.getAttribute('id')).not.toBe(
        checkbox2.getAttribute('id')
      );
    });

    it('handles indeterminate prop changes', () => {
      const { rerender } = render(<Checkbox />);
      const checkbox = screen.getByRole('checkbox') as HTMLInputElement;

      expect(checkbox.indeterminate).toBe(false);

      rerender(<Checkbox indeterminate />);
      expect(checkbox.indeterminate).toBe(true);

      rerender(<Checkbox indeterminate={false} />);
      expect(checkbox.indeterminate).toBe(false);
    });
  });
});
