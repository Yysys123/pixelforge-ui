import React from 'react';
import { render, screen } from '../test-utils';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { Radio, RadioGroup } from './Radio';

describe('Radio', () => {
  describe('Rendering', () => {
    it('renders radio correctly', () => {
      render(<Radio />);
      expect(screen.getByRole('radio')).toBeInTheDocument();
    });

    it('renders with label', () => {
      render(<Radio label="Select option" />);
      expect(screen.getByLabelText('Select option')).toBeInTheDocument();
      expect(screen.getByText('Select option')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(<Radio className="custom-radio" />);
      expect(screen.getByRole('radio')).toHaveClass('custom-radio');
    });

    it('applies custom wrapper className', () => {
      render(<Radio wrapperClassName="custom-wrapper" />);
      const wrapper = screen.getByRole('radio').closest('.custom-wrapper');
      expect(wrapper).toBeInTheDocument();
    });
  });

  describe('Sizes', () => {
    it.each(['sm', 'md', 'lg'] as const)('applies %s size class', size => {
      render(<Radio size={size} />);
      const wrapper = screen.getByRole('radio').closest('div');
      expect(wrapper).toHaveClass(`size-${size}`);
    });
  });

  describe('Variants', () => {
    it.each(['default', 'primary', 'secondary', 'accent'] as const)(
      'applies %s variant class',
      variant => {
        render(<Radio variant={variant} />);
        const wrapper = screen.getByRole('radio').closest('div');
        expect(wrapper).toHaveClass(`variant-${variant}`);
      }
    );
  });

  describe('States', () => {
    it('handles checked state', () => {
      render(<Radio checked onChange={() => {}} />);
      const radio = screen.getByRole('radio');
      expect(radio).toBeChecked();
    });

    it('handles disabled state', () => {
      render(<Radio disabled />);
      const radio = screen.getByRole('radio');
      expect(radio).toBeDisabled();

      const wrapper = radio.closest('div');
      expect(wrapper).toHaveClass('disabled');
    });

    it('shows required indicator', () => {
      render(<Radio label="Required field" required />);
      expect(screen.getByLabelText('required')).toBeInTheDocument();
      expect(screen.getByText('*')).toBeInTheDocument();
    });
  });

  describe('Error handling', () => {
    it('displays error message', () => {
      render(<Radio error="This field is required" />);
      expect(screen.getByRole('alert')).toBeInTheDocument();
      expect(screen.getByText('This field is required')).toBeInTheDocument();
    });

    it('applies error styling', () => {
      render(<Radio error="Error message" />);
      const wrapper = screen.getByRole('radio').closest('div');
      expect(wrapper).toHaveClass('error');
    });

    it('associates error message with radio', () => {
      render(<Radio error="Error message" />);
      const radio = screen.getByRole('radio');
      const errorMessage = screen.getByRole('alert');

      expect(radio).toHaveAttribute('aria-describedby', errorMessage.id);
    });
  });

  describe('Helper text', () => {
    it('displays helper text', () => {
      render(<Radio helperText="Select this option to continue" />);
      expect(
        screen.getByText('Select this option to continue')
      ).toBeInTheDocument();
    });

    it('associates helper text with radio', () => {
      render(<Radio helperText="Helper text" />);
      const radio = screen.getByRole('radio');
      const helperText = screen.getByText('Helper text');

      expect(radio).toHaveAttribute('aria-describedby', helperText.id);
    });

    it('combines error and helper text in aria-describedby', () => {
      render(<Radio helperText="Helper text" error="Error message" />);

      const radio = screen.getByRole('radio');
      const helperText = screen.getByText('Helper text');
      const errorMessage = screen.getByRole('alert');

      const describedBy = radio.getAttribute('aria-describedby');
      expect(describedBy).toContain(errorMessage.id);
      expect(describedBy).toContain(helperText.id);
    });

    it('hides helper text when error is present', () => {
      render(<Radio helperText="Helper text" error="Error message" />);

      expect(screen.getByRole('alert')).toBeInTheDocument();
      expect(screen.queryByText('Helper text')).not.toBeInTheDocument();
    });
  });

  describe('Custom icons', () => {
    it('renders custom selected icon', () => {
      const customIcon = <span data-testid="custom-selected">●</span>;
      render(<Radio checked selectedIcon={customIcon} onChange={() => {}} />);
      expect(screen.getByTestId('custom-selected')).toBeInTheDocument();
    });
  });

  describe('Interactions', () => {
    it('calls onChange when clicked', async () => {
      const user = userEvent.setup();
      const onChange = jest.fn();

      render(<Radio onChange={onChange} />);

      const radio = screen.getByRole('radio');
      await user.click(radio);

      expect(onChange).toHaveBeenCalledTimes(1);
    });

    it('does not call onChange when disabled', async () => {
      const user = userEvent.setup();
      const onChange = jest.fn();

      render(<Radio disabled onChange={onChange} />);

      const radio = screen.getByRole('radio');
      await user.click(radio);

      expect(onChange).not.toHaveBeenCalled();
    });

    it('can be clicked via label', async () => {
      const user = userEvent.setup();
      const onChange = jest.fn();

      render(<Radio label="Click me" onChange={onChange} />);

      const label = screen.getByText('Click me');
      await user.click(label);

      expect(onChange).toHaveBeenCalledTimes(1);
    });

    it('supports keyboard interaction', async () => {
      const user = userEvent.setup();
      const onChange = jest.fn();

      render(<Radio onChange={onChange} />);

      const radio = screen.getByRole('radio');
      radio.focus();
      await user.keyboard(' ');

      expect(onChange).toHaveBeenCalledTimes(1);
    });
  });

  describe('Accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(<Radio label="Test radio" />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no accessibility violations with error', async () => {
      const { container } = render(
        <Radio label="Test radio" error="Required field" />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no accessibility violations when disabled', async () => {
      const { container } = render(<Radio label="Test radio" disabled />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('provides proper ARIA attributes', () => {
      render(<Radio label="Test radio" required />);
      const radio = screen.getByRole('radio');

      expect(radio).toHaveAttribute('type', 'radio');
      expect(radio).toHaveAttribute('required');
      expect(radio).toHaveAttribute('aria-invalid', 'false');
    });

    it('sets aria-invalid when error is present', () => {
      render(<Radio error="Error message" />);
      const radio = screen.getByRole('radio');
      expect(radio).toHaveAttribute('aria-invalid', 'true');
    });

    it('maintains focus management', async () => {
      const user = userEvent.setup();

      render(
        <div>
          <button>Before Radio</button>
          <Radio label="Focus Target" />
          <button>After Radio</button>
        </div>
      );

      const beforeButton = screen.getByText('Before Radio');
      const radio = screen.getByRole('radio');
      const afterButton = screen.getByText('After Radio');

      beforeButton.focus();
      await user.tab();
      expect(radio).toHaveFocus();

      await user.tab();
      expect(afterButton).toHaveFocus();
    });
  });

  describe('Form integration', () => {
    it('works within forms', () => {
      render(
        <form>
          <Radio name="option" value="yes" label="Yes" />
        </form>
      );

      const radio = screen.getByRole('radio');
      expect(radio).toHaveAttribute('name', 'option');
      expect(radio).toHaveAttribute('value', 'yes');
    });

    it('supports form validation', async () => {
      const user = userEvent.setup();

      render(
        <form>
          <Radio required label="Required radio" />
          <button type="submit">Submit</button>
        </form>
      );

      const submitButton = screen.getByText('Submit');
      const radio = screen.getByRole('radio');

      // Try to submit without checking
      await user.click(submitButton);
      expect(radio).toBeInvalid();
    });
  });

  describe('Ref forwarding', () => {
    it('forwards ref to radio input', () => {
      const ref = React.createRef<HTMLInputElement>();
      render(<Radio ref={ref} />);

      expect(ref.current).toBeInstanceOf(HTMLInputElement);
      expect(ref.current).toBe(screen.getByRole('radio'));
    });
  });

  describe('Edge cases', () => {
    it('handles missing label gracefully', () => {
      render(<Radio />);
      expect(screen.getByRole('radio')).toBeInTheDocument();
    });

    it('generates unique IDs for multiple radios', () => {
      render(
        <>
          <Radio label="Radio 1" />
          <Radio label="Radio 2" />
        </>
      );

      const radio1 = screen.getByLabelText('Radio 1');
      const radio2 = screen.getByLabelText('Radio 2');

      expect(radio1.getAttribute('id')).not.toBe(radio2.getAttribute('id'));
    });
  });
});

describe('RadioGroup', () => {
  const options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];

  describe('Rendering', () => {
    it('renders radio group correctly', () => {
      render(<RadioGroup name="test" options={options} />);
      expect(screen.getByRole('group')).toBeInTheDocument();
      expect(screen.getAllByRole('radio')).toHaveLength(3);
    });

    it('renders with group label', () => {
      render(
        <RadioGroup name="test" label="Choose option" options={options} />
      );
      expect(screen.getByText('Choose option')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(
        <RadioGroup name="test" options={options} className="custom-group" />
      );
      expect(screen.getByRole('group')).toHaveClass('custom-group');
    });
  });

  describe('Direction variants', () => {
    it('applies vertical direction by default', () => {
      render(<RadioGroup name="test" options={options} />);
      const group = screen.getByRole('group');
      expect(group).toHaveClass('direction-vertical');
    });

    it('applies horizontal direction', () => {
      render(
        <RadioGroup name="test" options={options} direction="horizontal" />
      );
      const group = screen.getByRole('group');
      expect(group).toHaveClass('direction-horizontal');
    });
  });

  describe('Size and variant inheritance', () => {
    it('passes size to all radios', () => {
      render(<RadioGroup name="test" options={options} size="lg" />);
      const radios = screen.getAllByRole('radio');
      radios.forEach(radio => {
        const wrapper = radio.closest('div');
        expect(wrapper).toHaveClass('size-lg');
      });
    });

    it('passes variant to all radios', () => {
      render(<RadioGroup name="test" options={options} variant="primary" />);
      const radios = screen.getAllByRole('radio');
      radios.forEach(radio => {
        const wrapper = radio.closest('div');
        expect(wrapper).toHaveClass('variant-primary');
      });
    });
  });

  describe('Selection management', () => {
    it('handles controlled value', () => {
      render(<RadioGroup name="test" options={options} value="option2" />);
      const option2 = screen.getByLabelText('Option 2');
      expect(option2).toBeChecked();
    });

    it('handles default value', () => {
      render(
        <RadioGroup name="test" options={options} defaultValue="option1" />
      );
      const option1 = screen.getByLabelText('Option 1');
      expect(option1).toBeChecked();
    });

    it('calls onChange when selection changes', async () => {
      const user = userEvent.setup();
      const onChange = jest.fn();

      render(<RadioGroup name="test" options={options} onChange={onChange} />);

      const option2 = screen.getByLabelText('Option 2');
      await user.click(option2);

      expect(onChange).toHaveBeenCalledWith('option2');
    });

    it('updates internal state for uncontrolled component', async () => {
      const user = userEvent.setup();

      render(<RadioGroup name="test" options={options} />);

      const option1 = screen.getByLabelText('Option 1');
      const option2 = screen.getByLabelText('Option 2');

      await user.click(option1);
      expect(option1).toBeChecked();
      expect(option2).not.toBeChecked();

      await user.click(option2);
      expect(option1).not.toBeChecked();
      expect(option2).toBeChecked();
    });
  });

  describe('Required state', () => {
    it('shows required indicator in legend', () => {
      render(
        <RadioGroup
          name="test"
          options={options}
          label="Required group"
          required
        />
      );
      expect(screen.getByLabelText('required')).toBeInTheDocument();
      expect(screen.getByText('*')).toBeInTheDocument();
    });

    it('passes required to all radios', () => {
      render(<RadioGroup name="test" options={options} required />);
      const radios = screen.getAllByRole('radio');
      radios.forEach(radio => {
        expect(radio).toHaveAttribute('required');
      });
    });
  });

  describe('Error handling', () => {
    it('displays group error message', () => {
      render(
        <RadioGroup
          name="test"
          options={options}
          error="Please select an option"
        />
      );
      expect(screen.getByRole('alert')).toBeInTheDocument();
      expect(screen.getByText('Please select an option')).toBeInTheDocument();
    });

    it('applies error styling to group', () => {
      render(
        <RadioGroup name="test" options={options} error="Error message" />
      );
      const group = screen.getByRole('group');
      expect(group).toHaveClass('error');
    });

    it('associates error message with group', () => {
      render(
        <RadioGroup name="test" options={options} error="Error message" />
      );
      const group = screen.getByRole('group');
      const errorMessage = screen.getByRole('alert');

      expect(group).toHaveAttribute('aria-describedby', errorMessage.id);
    });
  });

  describe('Helper text', () => {
    it('displays group helper text', () => {
      render(
        <RadioGroup
          name="test"
          options={options}
          helperText="Choose one option"
        />
      );
      expect(screen.getByText('Choose one option')).toBeInTheDocument();
    });

    it('hides helper text when error is present', () => {
      render(
        <RadioGroup
          name="test"
          options={options}
          helperText="Helper text"
          error="Error message"
        />
      );

      expect(screen.getByRole('alert')).toBeInTheDocument();
      expect(screen.queryByText('Helper text')).not.toBeInTheDocument();
    });
  });

  describe('Individual option properties', () => {
    it('handles disabled options', () => {
      const optionsWithDisabled = [
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2', disabled: true },
        { value: 'option3', label: 'Option 3' },
      ];

      render(<RadioGroup name="test" options={optionsWithDisabled} />);

      const option2 = screen.getByLabelText('Option 2');
      expect(option2).toBeDisabled();
    });

    it('displays individual helper texts', () => {
      const optionsWithHelper = [
        {
          value: 'option1',
          label: 'Option 1',
          helperText: 'Helper for option 1',
        },
        { value: 'option2', label: 'Option 2' },
      ];

      render(<RadioGroup name="test" options={optionsWithHelper} />);
      expect(screen.getByText('Helper for option 1')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(
        <RadioGroup name="test" label="Test group" options={options} />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no accessibility violations with error', async () => {
      const { container } = render(
        <RadioGroup
          name="test"
          label="Test group"
          options={options}
          error="Required field"
        />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('uses proper fieldset/legend semantics', () => {
      render(
        <RadioGroup name="test" label="Choose option" options={options} />
      );

      const fieldset = screen.getByRole('group');
      expect(fieldset.tagName.toLowerCase()).toBe('fieldset');

      const legend = screen.getByText('Choose option');
      expect(legend.closest('legend')).toBeInTheDocument();
    });

    it('supports keyboard navigation', async () => {
      const user = userEvent.setup();

      render(<RadioGroup name="test" options={options} />);

      const radios = screen.getAllByRole('radio');

      // Focus first radio
      radios[0].focus();
      expect(radios[0]).toHaveFocus();

      // Arrow down should move to next radio
      await user.keyboard('{ArrowDown}');
      expect(radios[1]).toHaveFocus();

      // Arrow up should move to previous radio
      await user.keyboard('{ArrowUp}');
      expect(radios[0]).toHaveFocus();
    });
  });

  describe('Edge cases', () => {
    it('handles empty options array', () => {
      render(<RadioGroup name="test" options={[]} />);
      expect(screen.getByRole('group')).toBeInTheDocument();
      expect(screen.queryAllByRole('radio')).toHaveLength(0);
    });

    it('generates unique IDs for groups', () => {
      render(
        <>
          <RadioGroup name="group1" options={options} />
          <RadioGroup name="group2" options={options} />
        </>
      );

      const groups = screen.getAllByRole('group');
      expect(groups[0].getAttribute('aria-describedby')).not.toBe(
        groups[1].getAttribute('aria-describedby')
      );
    });
  });
});
