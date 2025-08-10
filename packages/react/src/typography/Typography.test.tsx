import React from 'react';
import { render, screen } from '../test-utils';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Typography } from './Typography';

expect.extend(toHaveNoViolations);

describe('Typography', () => {
  describe('Rendering', () => {
    it('renders children correctly', () => {
      render(<Typography>Hello World</Typography>);
      expect(screen.getByText('Hello World')).toBeInTheDocument();
    });

    it('renders as p element by default', () => {
      render(<Typography>Hello World</Typography>);
      const element = screen.getByText('Hello World');
      expect(element.tagName).toBe('P');
    });

    it('renders as specified element', () => {
      render(<Typography as="h1">Hello World</Typography>);
      const element = screen.getByText('Hello World');
      expect(element.tagName).toBe('H1');
    });

    it('applies default classes', () => {
      render(<Typography>Hello World</Typography>);
      const element = screen.getByText('Hello World');
      expect(element).toHaveClass('typography', 'font-sans', 'color-primary');
    });

    it('applies custom className', () => {
      render(<Typography className="custom-class">Hello World</Typography>);
      const element = screen.getByText('Hello World');
      expect(element).toHaveClass('custom-class');
    });
  });

  describe('Variants', () => {
    it.each([
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'subtitle1', 'subtitle2', 'body1', 'body2',
      'caption', 'overline'
    ] as const)('applies %s variant class', (variant) => {
      render(<Typography variant={variant}>Text</Typography>);
      const element = screen.getByText('Text');
      expect(element).toHaveClass(`variant-${variant}`);
    });

    it('uses correct element for variant', () => {
      render(<Typography variant="h1">Heading 1</Typography>);
      const element = screen.getByText('Heading 1');
      expect(element.tagName).toBe('H1');
    });

    it('overrides default element when as prop is provided', () => {
      render(<Typography variant="h1" as="span">Heading 1</Typography>);
      const element = screen.getByText('Heading 1');
      expect(element.tagName).toBe('SPAN');
    });
  });

  describe('Size variants', () => {
    it.each([
      'xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl'
    ] as const)('applies %s size class when no variant is set', (size) => {
      render(<Typography size={size}>Text</Typography>);
      const element = screen.getByText('Text');
      expect(element).toHaveClass(`size-${size}`);
    });

    it('does not apply size class when variant is set', () => {
      render(<Typography variant="h1" size="xs">Text</Typography>);
      const element = screen.getByText('Text');
      expect(element).not.toHaveClass('size-xs');
      expect(element).toHaveClass('variant-h1');
    });
  });

  describe('Weight variants', () => {
    it.each([
      'thin', 'light', 'normal', 'medium', 
      'semibold', 'bold', 'extrabold', 'black'
    ] as const)('applies %s weight class when no variant is set', (weight) => {
      render(<Typography weight={weight}>Text</Typography>);
      const element = screen.getByText('Text');
      expect(element).toHaveClass(`weight-${weight}`);
    });
  });

  describe('Color variants', () => {
    it.each([
      'primary', 'secondary', 'muted', 'inverse',
      'brand-primary', 'brand-secondary',
      'success', 'warning', 'danger'
    ] as const)('applies %s color class', (color) => {
      render(<Typography color={color}>Text</Typography>);
      const element = screen.getByText('Text');
      expect(element).toHaveClass(`color-${color}`);
    });
  });

  describe('Font family variants', () => {
    it.each(['sans', 'serif', 'mono'] as const)('applies %s font family class', (family) => {
      render(<Typography family={family}>Text</Typography>);
      const element = screen.getByText('Text');
      expect(element).toHaveClass(`font-${family}`);
    });
  });

  describe('Text alignment', () => {
    it.each(['left', 'center', 'right', 'justify'] as const)(
      'applies %s alignment class', 
      (align) => {
        render(<Typography align={align}>Text</Typography>);
        const element = screen.getByText('Text');
        expect(element).toHaveClass(`align-${align}`);
      }
    );
  });

  describe('Text transformation', () => {
    it.each(['none', 'uppercase', 'lowercase', 'capitalize'] as const)(
      'applies %s transform class', 
      (transform) => {
        render(<Typography transform={transform}>Text</Typography>);
        const element = screen.getByText('Text');
        expect(element).toHaveClass(`transform-${transform}`);
      }
    );
  });

  describe('Text decoration', () => {
    it.each(['none', 'underline', 'line-through'] as const)(
      'applies %s decoration class', 
      (decoration) => {
        render(<Typography decoration={decoration}>Text</Typography>);
        const element = screen.getByText('Text');
        expect(element).toHaveClass(`decoration-${decoration}`);
      }
    );
  });

  describe('Text truncation', () => {
    it('applies truncate class when truncate is true', () => {
      render(<Typography truncate>Text</Typography>);
      const element = screen.getByText('Text');
      expect(element).toHaveClass('truncate');
    });

    it.each([1, 2, 3] as const)('applies line-clamp-%s class', (lines) => {
      render(<Typography lineClamp={lines}>Text</Typography>);
      const element = screen.getByText('Text');
      expect(element).toHaveClass(`line-clamp-${lines}`);
    });
  });

  describe('HTML Attributes', () => {
    it('forwards additional props', () => {
      render(
        <Typography data-testid="custom-typography" aria-label="Custom label">
          Text
        </Typography>
      );
      
      const element = screen.getByTestId('custom-typography');
      expect(element).toHaveAttribute('aria-label', 'Custom label');
    });
  });

  describe('Accessibility', () => {
    it('should not have accessibility violations', async () => {
      const { container } = render(<Typography>Hello World</Typography>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should not have accessibility violations with headings', async () => {
      const { container } = render(
        <>
          <Typography variant="h1">Main Heading</Typography>
          <Typography variant="h2">Sub Heading</Typography>
          <Typography variant="body1">Body text</Typography>
        </>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('Ref forwarding', () => {
    it('forwards ref to the element', () => {
      const ref = React.createRef<HTMLParagraphElement>();
      render(<Typography ref={ref}>Text</Typography>);
      
      expect(ref.current).toBeInstanceOf(HTMLParagraphElement);
      expect(ref.current).toBe(screen.getByText('Text'));
    });
  });
});