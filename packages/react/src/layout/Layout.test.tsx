import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { Page, Container, Section, Grid, Stack } from './Layout';

describe('Page', () => {
  it('renders without crashing', () => {
    render(<Page />);
  });

  it('applies size variants correctly', () => {
    const { rerender } = render(<Page size="sm" data-testid="page" />);
    let page = screen.getByTestId('page');
    expect(page).toHaveClass('size-sm');

    rerender(<Page size="xl" data-testid="page" />);
    page = screen.getByTestId('page');
    expect(page).toHaveClass('size-xl');
  });

  it('applies visual variants correctly', () => {
    const { rerender } = render(<Page variant="contained" data-testid="page" />);
    let page = screen.getByTestId('page');
    expect(page).toHaveClass('variant-contained');

    rerender(<Page variant="bordered" data-testid="page" />);
    page = screen.getByTestId('page');
    expect(page).toHaveClass('variant-bordered');
  });

  it('shows/hides patterns based on showPatterns prop', () => {
    const { rerender } = render(<Page showPatterns={true} />);
    expect(document.querySelector('.pattern-grid')).toBeInTheDocument();

    rerender(<Page showPatterns={false} />);
    expect(document.querySelector('.pattern-grid')).not.toBeInTheDocument();
  });

  it('renders children content', () => {
    render(
      <Page>
        <div data-testid="page-content">Page content</div>
      </Page>
    );

    expect(screen.getByTestId('page-content')).toBeInTheDocument();
  });

  it('has no accessibility violations', async () => {
    const { container } = render(
      <Page>
        <h1>Page Title</h1>
        <p>Page content</p>
      </Page>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

describe('Container', () => {
  it('renders without crashing', () => {
    render(<Container />);
  });

  it('applies size variants correctly', () => {
    const { rerender } = render(<Container size="sm" data-testid="container" />);
    let container = screen.getByTestId('container');
    expect(container).toHaveClass('container-sm');

    rerender(<Container size="full" data-testid="container" />);
    container = screen.getByTestId('container');
    expect(container).toHaveClass('container-full');
  });

  it('applies centering correctly', () => {
    const { rerender } = render(<Container centered={true} data-testid="container" />);
    let container = screen.getByTestId('container');
    expect(container).toHaveClass('centered');

    rerender(<Container centered={false} data-testid="container" />);
    container = screen.getByTestId('container');
    expect(container).not.toHaveClass('centered');
  });

  it('applies padding variants correctly', () => {
    const { rerender } = render(<Container padding="sm" data-testid="container" />);
    let container = screen.getByTestId('container');
    expect(container).toHaveClass('padding-sm');

    rerender(<Container padding="none" data-testid="container" />);
    container = screen.getByTestId('container');
    expect(container).toHaveClass('padding-none');
  });

  it('renders children content', () => {
    render(
      <Container>
        <div data-testid="container-content">Container content</div>
      </Container>
    );

    expect(screen.getByTestId('container-content')).toBeInTheDocument();
  });

  it('has no accessibility violations', async () => {
    const { container } = render(
      <Container>
        <h2>Container Title</h2>
        <p>Container content</p>
      </Container>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

describe('Section', () => {
  it('renders as section element by default', () => {
    render(<Section data-testid="section">Section content</Section>);
    const section = screen.getByTestId('section');
    expect(section.tagName).toBe('SECTION');
  });

  it('renders as specified element when using "as" prop', () => {
    const { rerender } = render(<Section as="article" data-testid="section">Content</Section>);
    let section = screen.getByTestId('section');
    expect(section.tagName).toBe('ARTICLE');

    rerender(<Section as="main" data-testid="section">Content</Section>);
    section = screen.getByTestId('section');
    expect(section.tagName).toBe('MAIN');
  });

  it('applies visual variants correctly', () => {
    const { rerender } = render(<Section variant="primary" data-testid="section">Content</Section>);
    let section = screen.getByTestId('section');
    expect(section).toHaveClass('variant-primary');

    rerender(<Section variant="muted" data-testid="section">Content</Section>);
    section = screen.getByTestId('section');
    expect(section).toHaveClass('variant-muted');
  });

  it('applies spacing variants correctly', () => {
    const { rerender } = render(<Section spacing="sm" data-testid="section">Content</Section>);
    let section = screen.getByTestId('section');
    expect(section).toHaveClass('spacing-sm');

    rerender(<Section spacing="xl" data-testid="section">Content</Section>);
    section = screen.getByTestId('section');
    expect(section).toHaveClass('spacing-xl');
  });

  it('applies bordered styling when bordered prop is true', () => {
    render(<Section bordered={true} data-testid="section">Content</Section>);
    expect(screen.getByTestId('section')).toHaveClass('bordered');
  });

  it('shows patterns when showPatterns is true', () => {
    render(<Section showPatterns={true}>Content</Section>);
    expect(document.querySelector('.pattern-lines')).toBeInTheDocument();
  });

  it('has no accessibility violations', async () => {
    const { container } = render(
      <Section>
        <h2>Section Title</h2>
        <p>Section content</p>
      </Section>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

describe('Grid', () => {
  it('renders without crashing', () => {
    render(<Grid />);
  });

  it('applies column count correctly', () => {
    render(<Grid cols={3} data-testid="grid" />);
    const grid = screen.getByTestId('grid');
    expect(grid).toHaveStyle('--grid-cols: 3');
  });

  it('applies gap variants correctly', () => {
    const { rerender } = render(<Grid gap="sm" data-testid="grid" />);
    let grid = screen.getByTestId('grid');
    expect(grid).toHaveClass('gap-sm');

    rerender(<Grid gap="xl" data-testid="grid" />);
    grid = screen.getByTestId('grid');
    expect(grid).toHaveClass('gap-xl');
  });

  it('applies responsive breakpoints correctly', () => {
    const responsive = { sm: 2, md: 3, lg: 4, xl: 6 };
    render(<Grid cols={1} responsive={responsive} data-testid="grid" />);
    
    const grid = screen.getByTestId('grid');
    expect(grid).toHaveStyle('--grid-cols: 1');
    expect(grid).toHaveStyle('--grid-cols-sm: 2');
    expect(grid).toHaveStyle('--grid-cols-md: 3');
    expect(grid).toHaveStyle('--grid-cols-lg: 4');
    expect(grid).toHaveStyle('--grid-cols-xl: 6');
  });

  it('renders grid items correctly', () => {
    render(
      <Grid>
        <div data-testid="item-1">Item 1</div>
        <div data-testid="item-2">Item 2</div>
        <div data-testid="item-3">Item 3</div>
      </Grid>
    );

    expect(screen.getByTestId('item-1')).toBeInTheDocument();
    expect(screen.getByTestId('item-2')).toBeInTheDocument();
    expect(screen.getByTestId('item-3')).toBeInTheDocument();
  });

  it('has no accessibility violations', async () => {
    const { container } = render(
      <Grid cols={2}>
        <div>Grid item 1</div>
        <div>Grid item 2</div>
      </Grid>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

describe('Stack', () => {
  it('renders without crashing', () => {
    render(<Stack />);
  });

  it('applies direction correctly', () => {
    const { rerender } = render(<Stack direction="vertical" data-testid="stack" />);
    let stack = screen.getByTestId('stack');
    expect(stack).toHaveClass('direction-vertical');

    rerender(<Stack direction="horizontal" data-testid="stack" />);
    stack = screen.getByTestId('stack');
    expect(stack).toHaveClass('direction-horizontal');
  });

  it('applies gap variants correctly', () => {
    const { rerender } = render(<Stack gap="sm" data-testid="stack" />);
    let stack = screen.getByTestId('stack');
    expect(stack).toHaveClass('gap-sm');

    rerender(<Stack gap="xl" data-testid="stack" />);
    stack = screen.getByTestId('stack');
    expect(stack).toHaveClass('gap-xl');
  });

  it('applies alignment correctly', () => {
    const { rerender } = render(<Stack align="center" data-testid="stack" />);
    let stack = screen.getByTestId('stack');
    expect(stack).toHaveClass('align-center');

    rerender(<Stack align="end" data-testid="stack" />);
    stack = screen.getByTestId('stack');
    expect(stack).toHaveClass('align-end');
  });

  it('applies justification correctly', () => {
    const { rerender } = render(<Stack justify="center" data-testid="stack" />);
    let stack = screen.getByTestId('stack');
    expect(stack).toHaveClass('justify-center');

    rerender(<Stack justify="between" data-testid="stack" />);
    stack = screen.getByTestId('stack');
    expect(stack).toHaveClass('justify-between');
  });

  it('applies wrap correctly', () => {
    render(<Stack wrap={true} data-testid="stack" />);
    expect(screen.getByTestId('stack')).toHaveClass('wrap');
  });

  it('renders stack items correctly', () => {
    render(
      <Stack>
        <div data-testid="item-1">Item 1</div>
        <div data-testid="item-2">Item 2</div>
        <div data-testid="item-3">Item 3</div>
      </Stack>
    );

    expect(screen.getByTestId('item-1')).toBeInTheDocument();
    expect(screen.getByTestId('item-2')).toBeInTheDocument();
    expect(screen.getByTestId('item-3')).toBeInTheDocument();
  });

  it('has no accessibility violations', async () => {
    const { container } = render(
      <Stack direction="vertical" gap="md">
        <div>Stack item 1</div>
        <div>Stack item 2</div>
      </Stack>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});