import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { axe } from 'jest-axe';
import { Header, NavItem, NavList } from './Header';
import { Button } from '../button/Button';

describe('Header', () => {
  it('renders without crashing', () => {
    render(<Header />);
  });

  it('renders brand content', () => {
    render(<Header brand="PixelForge UI" />);
    expect(screen.getByRole('heading', { name: 'PixelForge UI' })).toBeInTheDocument();
  });

  it('renders custom brand element', () => {
    const customBrand = <img src="/logo.png" alt="Company Logo" />;
    render(<Header brand={customBrand} />);
    expect(screen.getByAltText('Company Logo')).toBeInTheDocument();
  });

  it('renders navigation content', () => {
    const navigation = (
      <NavList>
        <NavItem href="/">Home</NavItem>
        <NavItem href="/about">About</NavItem>
      </NavList>
    );
    render(<Header navigation={navigation} />);
    
    expect(screen.getByRole('navigation', { name: 'Main navigation' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'About' })).toBeInTheDocument();
  });

  it('renders action buttons', () => {
    const actions = (
      <>
        <Button variant="outline">Login</Button>
        <Button>Sign Up</Button>
      </>
    );
    render(<Header actions={actions} />);
    
    expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Sign Up' })).toBeInTheDocument();
  });

  it('applies size variants correctly', () => {
    const { rerender } = render(<Header size="sm" data-testid="header" />);
    let header = screen.getByTestId('header');
    expect(header).toHaveClass('size-sm');

    rerender(<Header size="lg" data-testid="header" />);
    header = screen.getByTestId('header');
    expect(header).toHaveClass('size-lg');
  });

  it('applies visual variants correctly', () => {
    const { rerender } = render(<Header variant="primary" data-testid="header" />);
    let header = screen.getByTestId('header');
    expect(header).toHaveClass('variant-primary');

    rerender(<Header variant="transparent" data-testid="header" />);
    header = screen.getByTestId('header');
    expect(header).toHaveClass('variant-transparent');
  });

  it('applies sticky behavior correctly', () => {
    render(<Header sticky={true} data-testid="header" />);
    expect(screen.getByTestId('header')).toHaveClass('sticky');
  });

  it('applies shadow correctly', () => {
    const { rerender } = render(<Header shadow={true} data-testid="header" />);
    let header = screen.getByTestId('header');
    expect(header).toHaveClass('shadow');

    rerender(<Header shadow={false} data-testid="header" />);
    header = screen.getByTestId('header');
    expect(header).not.toHaveClass('shadow');
  });

  it('shows/hides patterns based on showPatterns prop', () => {
    const { rerender } = render(<Header showPatterns={true} />);
    expect(document.querySelector('.pattern-stripes')).toBeInTheDocument();

    rerender(<Header showPatterns={false} />);
    expect(document.querySelector('.pattern-stripes')).not.toBeInTheDocument();
  });

  it('renders children content', () => {
    render(
      <Header>
        <div data-testid="header-content">Custom content</div>
      </Header>
    );

    expect(screen.getByTestId('header-content')).toBeInTheDocument();
  });

  it('has semantic header element', () => {
    render(<Header brand="Test" />);
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  it('has no accessibility violations', async () => {
    const { container } = render(
      <Header
        brand="PixelForge UI"
        navigation={
          <NavList>
            <NavItem href="/">Home</NavItem>
            <NavItem href="/about">About</NavItem>
          </NavList>
        }
        actions={
          <Button>Login</Button>
        }
      />
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

describe('NavItem', () => {
  it('renders as link with href', () => {
    render(<NavItem href="/test">Test Link</NavItem>);
    const link = screen.getByRole('link', { name: 'Test Link' });
    expect(link).toHaveAttribute('href', '/test');
  });

  it('applies active state correctly', () => {
    render(<NavItem href="/current" active={true} data-testid="nav-item">Current Page</NavItem>);
    const navItem = screen.getByTestId('nav-item');
    expect(navItem).toHaveClass('active');
    expect(navItem).toHaveAttribute('aria-current', 'page');
  });

  it('applies disabled state correctly', () => {
    const handleClick = jest.fn();
    render(
      <NavItem href="/disabled" disabled={true} onClick={handleClick} data-testid="nav-item">
        Disabled Link
      </NavItem>
    );
    
    const navItem = screen.getByTestId('nav-item');
    expect(navItem).toHaveClass('disabled');
    expect(navItem).toHaveAttribute('aria-disabled', 'true');
    
    fireEvent.click(navItem);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('applies variant styles correctly', () => {
    const { rerender } = render(<NavItem variant="bold" data-testid="nav-item">Bold Link</NavItem>);
    let navItem = screen.getByTestId('nav-item');
    expect(navItem).toHaveClass('nav-variant-bold');

    rerender(<NavItem variant="underline" data-testid="nav-item">Underline Link</NavItem>);
    navItem = screen.getByTestId('nav-item');
    expect(navItem).toHaveClass('nav-variant-underline');
  });

  it('handles click events when not disabled', () => {
    const handleClick = jest.fn();
    render(<NavItem href="/test" onClick={handleClick}>Clickable Link</NavItem>);
    
    fireEvent.click(screen.getByRole('link', { name: 'Clickable Link' }));
    expect(handleClick).toHaveBeenCalled();
  });

  it('has no accessibility violations', async () => {
    const { container } = render(
      <NavItem href="/test" active={true}>
        Active Navigation Item
      </NavItem>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

describe('NavList', () => {
  it('renders as unordered list', () => {
    render(
      <NavList>
        <NavItem href="/">Home</NavItem>
        <NavItem href="/about">About</NavItem>
      </NavList>
    );

    expect(screen.getByRole('list')).toBeInTheDocument();
  });

  it('applies direction correctly', () => {
    const { rerender } = render(
      <NavList direction="horizontal" data-testid="nav-list">
        <NavItem href="/">Home</NavItem>
      </NavList>
    );
    let navList = screen.getByTestId('nav-list');
    expect(navList).toHaveClass('direction-horizontal');

    rerender(
      <NavList direction="vertical" data-testid="nav-list">
        <NavItem href="/">Home</NavItem>
      </NavList>
    );
    navList = screen.getByTestId('nav-list');
    expect(navList).toHaveClass('direction-vertical');
  });

  it('applies gap correctly', () => {
    const { rerender } = render(
      <NavList gap="sm" data-testid="nav-list">
        <NavItem href="/">Home</NavItem>
      </NavList>
    );
    let navList = screen.getByTestId('nav-list');
    expect(navList).toHaveClass('gap-sm');

    rerender(
      <NavList gap="lg" data-testid="nav-list">
        <NavItem href="/">Home</NavItem>
      </NavList>
    );
    navList = screen.getByTestId('nav-list');
    expect(navList).toHaveClass('gap-lg');
  });

  it('wraps children in list items', () => {
    render(
      <NavList>
        <NavItem href="/">Home</NavItem>
        <NavItem href="/about">About</NavItem>
        <NavItem href="/contact">Contact</NavItem>
      </NavList>
    );

    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(3);
  });

  it('renders multiple navigation items correctly', () => {
    render(
      <NavList>
        <NavItem href="/">Home</NavItem>
        <NavItem href="/products" active={true}>Products</NavItem>
        <NavItem href="/contact">Contact</NavItem>
      </NavList>
    );

    expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Products' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Contact' })).toBeInTheDocument();
    
    // Check that the active item has the correct aria-current
    expect(screen.getByRole('link', { name: 'Products' })).toHaveAttribute('aria-current', 'page');
  });

  it('has no accessibility violations', async () => {
    const { container } = render(
      <NavList>
        <NavItem href="/">Home</NavItem>
        <NavItem href="/about" active={true}>About</NavItem>
        <NavItem href="/contact">Contact</NavItem>
      </NavList>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});