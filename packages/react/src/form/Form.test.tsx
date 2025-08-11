import { render, screen, fireEvent } from '@testing-library/react';
import { axe } from 'jest-axe';
import { Form, FormField, FormActions } from './Form';
import { Button } from '../button/Button';
import { Input } from '../input/Input';

describe('Form', () => {
  it('renders without crashing', () => {
    render(<Form />);
  });

  it('renders with title and description', () => {
    render(
      <Form title="Test Form" description="This is a test form description">
        <div>Form content</div>
      </Form>
    );

    expect(
      screen.getByRole('heading', { name: 'Test Form' })
    ).toBeInTheDocument();
    expect(
      screen.getByText('This is a test form description')
    ).toBeInTheDocument();
  });

  it('applies size variants correctly', () => {
    const { rerender } = render(
      <Form size="sm" wrapperClassName="test-wrapper" />
    );
    let wrapper = document.querySelector('.test-wrapper');
    expect(wrapper).toHaveClass('size-sm');

    rerender(<Form size="lg" wrapperClassName="test-wrapper" />);
    wrapper = document.querySelector('.test-wrapper');
    expect(wrapper).toHaveClass('size-lg');
  });

  it('applies visual variants correctly', () => {
    const { rerender } = render(
      <Form variant="primary" wrapperClassName="test-wrapper" />
    );
    let wrapper = document.querySelector('.test-wrapper');
    expect(wrapper).toHaveClass('variant-primary');

    rerender(<Form variant="secondary" wrapperClassName="test-wrapper" />);
    wrapper = document.querySelector('.test-wrapper');
    expect(wrapper).toHaveClass('variant-secondary');
  });

  it('shows loading state correctly', () => {
    render(<Form loading={true} />);
    expect(screen.getByText('Processing...')).toBeInTheDocument();
  });

  it('displays error message with proper role', () => {
    render(<Form error="Something went wrong!" />);
    const errorElement = screen.getByRole('alert');
    expect(errorElement).toHaveTextContent('Something went wrong!');
  });

  it('displays success message with proper role', () => {
    render(<Form success="Form submitted successfully!" />);
    const successElement = screen.getByRole('status');
    expect(successElement).toHaveTextContent('Form submitted successfully!');
  });

  it('shows/hides patterns based on showPatterns prop', () => {
    const { rerender } = render(<Form showPatterns={true} />);
    expect(
      document.querySelector('[class*="pattern-grid"]')
    ).toBeInTheDocument();

    rerender(<Form showPatterns={false} />);
    expect(
      document.querySelector('[class*="pattern-grid"]')
    ).not.toBeInTheDocument();
  });

  it('handles form submission', () => {
    const handleSubmit = jest.fn(e => e.preventDefault());
    render(
      <Form onSubmit={handleSubmit}>
        <Button type="submit">Submit</Button>
      </Form>
    );

    fireEvent.click(screen.getByRole('button', { name: 'Submit' }));
    expect(handleSubmit).toHaveBeenCalled();
  });

  it('sets correct aria-describedby when error or success is present', () => {
    const { rerender } = render(<Form error="Error message" id="test-form" />);
    let form = document.getElementById('test-form');
    expect(form).toHaveAttribute('aria-describedby', 'test-form-error');

    rerender(<Form success="Success message" id="test-form" />);
    form = document.getElementById('test-form');
    expect(form).toHaveAttribute('aria-describedby', 'test-form-success');

    rerender(<Form error="Error" success="Success" id="test-form" />);
    form = document.getElementById('test-form');
    expect(form).toHaveAttribute(
      'aria-describedby',
      'test-form-error test-form-success'
    );
  });

  it('has no accessibility violations', async () => {
    const { container } = render(
      <Form title="Accessible Form" description="Form description">
        <FormField label="Name" required>
          <Input type="text" id="name" name="name" required aria-label="Name" />
        </FormField>
        <FormActions>
          <Button type="submit">Submit</Button>
        </FormActions>
      </Form>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

describe('FormField', () => {
  it('renders field with label', () => {
    render(
      <FormField label="Username">
        <Input type="text" />
      </FormField>
    );

    expect(screen.getByText('Username')).toBeInTheDocument();
  });

  it('shows required indicator when required', () => {
    render(
      <FormField label="Password" required>
        <Input type="password" />
      </FormField>
    );

    expect(screen.getByLabelText('required')).toBeInTheDocument();
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('displays error message with alert role', () => {
    render(
      <FormField label="Email" error="Invalid email format">
        <Input type="email" />
      </FormField>
    );

    const errorElement = screen.getByRole('alert');
    expect(errorElement).toHaveTextContent('Invalid email format');
  });

  it('displays helper text when no error is present', () => {
    render(
      <FormField label="Email" helperText="Enter your email address">
        <Input type="email" />
      </FormField>
    );

    expect(screen.getByText('Enter your email address')).toBeInTheDocument();
  });

  it('hides helper text when error is present', () => {
    render(
      <FormField
        label="Email"
        helperText="Enter your email address"
        error="Invalid email"
      >
        <Input type="email" />
      </FormField>
    );

    expect(
      screen.queryByText('Enter your email address')
    ).not.toBeInTheDocument();
    expect(screen.getByText('Invalid email')).toBeInTheDocument();
  });

  it('applies error class when error is present', () => {
    const { container } = render(
      <FormField label="Email" error="Invalid email">
        <Input type="email" />
      </FormField>
    );

    const formField = container.querySelector('.form-field');
    expect(formField).toHaveClass('error');
  });

  it('has no accessibility violations', async () => {
    const { container } = render(
      <FormField
        label="Email Address"
        helperText="We'll never share your email"
        required
      >
        <Input
          type="email"
          id="email"
          name="email"
          required
          aria-label="Email Address"
        />
      </FormField>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

describe('FormActions', () => {
  it('renders actions with horizontal layout by default', () => {
    const { container } = render(
      <FormActions>
        <Button>Cancel</Button>
        <Button>Submit</Button>
      </FormActions>
    );

    const actions = container.querySelector('.form-actions');
    expect(actions).toHaveClass('direction-horizontal');
    expect(actions).toHaveClass('align-right');
  });

  it('applies vertical layout', () => {
    const { container } = render(
      <FormActions direction="vertical">
        <Button>Cancel</Button>
        <Button>Submit</Button>
      </FormActions>
    );

    const actions = container.querySelector('.form-actions');
    expect(actions).toHaveClass('direction-vertical');
  });

  it('applies alignment correctly', () => {
    const { rerender, container } = render(
      <FormActions align="left">
        <Button>Submit</Button>
      </FormActions>
    );

    let actions = container.querySelector('.form-actions');
    expect(actions).toHaveClass('align-left');

    rerender(
      <FormActions align="center">
        <Button>Submit</Button>
      </FormActions>
    );

    actions = container.querySelector('.form-actions');
    expect(actions).toHaveClass('align-center');
  });

  it('renders multiple action buttons', () => {
    render(
      <FormActions>
        <Button variant="outline">Cancel</Button>
        <Button variant="secondary">Save Draft</Button>
        <Button>Submit</Button>
      </FormActions>
    );

    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Save Draft' })
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
  });

  it('has no accessibility violations', async () => {
    const { container } = render(
      <FormActions>
        <Button variant="outline">Cancel</Button>
        <Button>Submit</Button>
      </FormActions>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
