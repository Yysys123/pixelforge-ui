import React from 'react';
import { render, screen } from '../test-utils';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Input } from './Input';

expect.extend(toHaveNoViolations);

describe('Input', () => {
  describe('Rendering', () => {
    it('renders input element', () => {
      render(<Input />);
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('applies default size class', () => {
      render(<Input />);
      const inputWrapper = screen.getByRole('textbox').closest('div');
      expect(inputWrapper).toHaveClass('size-md');
    });

    it('applies custom className to wrapper', () => {
      render(<Input wrapperClassName="custom-wrapper" />);
      const wrapper = screen.getByRole('textbox').closest('.custom-wrapper');
      expect(wrapper).toBeInTheDocument();
    });

    it('applies custom className to input container', () => {
      render(<Input className="custom-input" />);
      const inputContainer = screen.getByRole('textbox').closest('div');
      expect(inputContainer).toHaveClass('custom-input');
    });
  });

  describe('Label', () => {
    it('renders label when provided', () => {
      render(<Input label="Username" />);
      expect(screen.getByLabelText('Username')).toBeInTheDocument();
      expect(screen.getByText('Username')).toBeInTheDocument();
    });

    it('associates label with input using htmlFor', () => {
      render(<Input label="Username" />);
      const input = screen.getByRole('textbox');
      const label = screen.getByText('Username');
      
      expect(label).toHaveAttribute('for', input.getAttribute('id'));
    });

    it('shows required indicator when required', () => {
      render(<Input label="Username" required />);
      const label = screen.getByText('Username');
      expect(label).toHaveClass('required');
    });

    it('applies disabled style to label when input is disabled', () => {
      render(<Input label="Username" disabled />);
      const label = screen.getByText('Username');
      expect(label).toHaveClass('disabled');
    });
  });

  describe('Sizes', () => {
    it.each(['sm', 'md', 'lg'] as const)('applies %s size class', (size) => {
      render(<Input size={size} />);
      const inputContainer = screen.getByRole('textbox').closest('div');
      expect(inputContainer).toHaveClass(`size-${size}`);
    });
  });

  describe('States', () => {
    it('applies error state class', () => {
      render(<Input state="error" />);
      const inputContainer = screen.getByRole('textbox').closest('div');
      expect(inputContainer).toHaveClass('error');
    });

    it('applies success state class', () => {
      render(<Input state="success" />);
      const inputContainer = screen.getByRole('textbox').closest('div');
      expect(inputContainer).toHaveClass('success');
    });

    it('applies disabled state class and disables input', () => {
      render(<Input disabled />);
      const input = screen.getByRole('textbox');
      const inputContainer = input.closest('div');
      
      expect(input).toBeDisabled();
      expect(inputContainer).toHaveClass('disabled');
    });

    it('sets aria-invalid when state is error', () => {
      render(<Input state="error" />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('aria-invalid', 'true');
    });

    it('does not set aria-invalid when state is success', () => {
      render(<Input state="success" />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('aria-invalid', 'false');
    });
  });

  describe('Error handling', () => {
    it('overrides state to error when error prop is provided', () => {
      render(<Input state="success" error="Something went wrong" />);
      const inputContainer = screen.getByRole('textbox').closest('div');
      expect(inputContainer).toHaveClass('error');
      expect(inputContainer).not.toHaveClass('success');
    });

    it('displays error message', () => {
      render(<Input error="Something went wrong" />);
      expect(screen.getByText('Something went wrong')).toBeInTheDocument();
      expect(screen.getByText('Something went wrong')).toHaveAttribute('role', 'alert');
    });

    it('associates error message with input', () => {
      render(<Input error="Something went wrong" />);
      const input = screen.getByRole('textbox');
      const errorMessage = screen.getByText('Something went wrong');
      
      expect(input).toHaveAttribute('aria-describedby', errorMessage.getAttribute('id'));
    });
  });

  describe('Helper text', () => {
    it('displays helper text', () => {
      render(<Input helperText="Enter your username" />);
      expect(screen.getByText('Enter your username')).toBeInTheDocument();
    });

    it('associates helper text with input', () => {
      render(<Input helperText="Enter your username" />);
      const input = screen.getByRole('textbox');
      const helperText = screen.getByText('Enter your username');
      
      expect(input).toHaveAttribute('aria-describedby', helperText.getAttribute('id'));
    });

    it('applies success style to helper text when state is success', () => {
      render(<Input state="success" helperText="Looks good!" />);
      const helperText = screen.getByText('Looks good!');
      expect(helperText).toHaveClass('success');
    });
  });

  describe('Icons', () => {
    it('renders start icon', () => {
      const icon = <span data-testid="start-icon">🔍</span>;
      render(<Input startIcon={icon} />);
      
      expect(screen.getByTestId('start-icon')).toBeInTheDocument();
      
      const startIconWrapper = screen.getByTestId('start-icon').closest('span');
      expect(startIconWrapper).toHaveClass('start-icon');
      expect(startIconWrapper).toHaveAttribute('aria-hidden', 'true');
    });

    it('renders end icon', () => {
      const icon = <span data-testid="end-icon">✅</span>;
      render(<Input endIcon={icon} />);
      
      expect(screen.getByTestId('end-icon')).toBeInTheDocument();
      
      const endIconWrapper = screen.getByTestId('end-icon').closest('span');
      expect(endIconWrapper).toHaveClass('end-icon');
      expect(endIconWrapper).toHaveAttribute('aria-hidden', 'true');
    });
  });

  describe('Full width', () => {
    it('applies full-width class when fullWidth is true', () => {
      render(<Input fullWidth />);
      const wrapper = screen.getByRole('textbox').closest('.input-wrapper');
      expect(wrapper).toHaveClass('full-width');
    });
  });

  describe('Interactions', () => {
    it('handles user input', async () => {
      const user = userEvent.setup();
      render(<Input />);
      
      const input = screen.getByRole('textbox');
      await user.type(input, 'Hello World');
      
      expect(input).toHaveValue('Hello World');
    });

    it('calls onChange when value changes', async () => {
      const user = userEvent.setup();
      const handleChange = jest.fn();
      render(<Input onChange={handleChange} />);
      
      const input = screen.getByRole('textbox');
      await user.type(input, 'a');
      
      expect(handleChange).toHaveBeenCalled();
    });

    it('calls onFocus when input is focused', async () => {
      const user = userEvent.setup();
      const handleFocus = jest.fn();
      render(<Input onFocus={handleFocus} />);
      
      const input = screen.getByRole('textbox');
      await user.click(input);
      
      expect(handleFocus).toHaveBeenCalled();
    });

    it('calls onBlur when input loses focus', async () => {
      const user = userEvent.setup();
      const handleBlur = jest.fn();
      render(<Input onBlur={handleBlur} />);
      
      const input = screen.getByRole('textbox');
      await user.click(input);
      await user.tab();
      
      expect(handleBlur).toHaveBeenCalled();
    });
  });

  describe('HTML Attributes', () => {
    it('forwards additional props to input', () => {
      render(<Input placeholder="Enter text..." data-testid="custom-input" />);
      
      const input = screen.getByTestId('custom-input');
      expect(input).toHaveAttribute('placeholder', 'Enter text...');
    });

    it('sets input type correctly', () => {
      render(<Input type="email" />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('type', 'email');
    });

    it('sets required attribute', () => {
      render(<Input required />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('required');
    });
  });

  describe('Accessibility', () => {
    it('should not have accessibility violations', async () => {
      const { container } = render(<Input label="Username" />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should not have accessibility violations with error', async () => {
      const { container } = render(
        <Input label="Username" error="Username is required" />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should not have accessibility violations when disabled', async () => {
      const { container } = render(<Input label="Username" disabled />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('generates unique ids for multiple inputs', () => {
      render(
        <>
          <Input label="Username" />
          <Input label="Password" />
        </>
      );
      
      const usernameInput = screen.getByLabelText('Username');
      const passwordInput = screen.getByLabelText('Password');
      
      expect(usernameInput.getAttribute('id')).not.toBe(
        passwordInput.getAttribute('id')
      );
    });
  });

  describe('Ref forwarding', () => {
    it('forwards ref to input element', () => {
      const ref = React.createRef<HTMLInputElement>();
      render(<Input ref={ref} />);
      
      expect(ref.current).toBeInstanceOf(HTMLInputElement);
      expect(ref.current).toBe(screen.getByRole('textbox'));
    });
  });
});