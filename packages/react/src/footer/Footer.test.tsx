import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { Footer, FooterLink } from './Footer';

const mockLinkSections = [
  {
    title: 'Products',
    links: [
      { label: 'Components', href: '/components' },
      { label: 'Templates', href: '/templates' },
      { label: 'Themes', href: '/themes', external: true },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Documentation', href: '/docs' },
      { label: 'Help Center', href: '/help' },
      { label: 'Contact', href: '/contact' },
    ],
  },
];

const mockSocialLinks = [
  {
    platform: 'Twitter',
    href: 'https://twitter.com/pixelforge',
    icon: <span>🐦</span>,
  },
  {
    platform: 'GitHub',
    href: 'https://github.com/pixelforge',
    icon: <span>🐙</span>,
  },
];

describe('Footer', () => {
  it('renders without crashing', () => {
    render(<Footer />);
  });

  it('renders brand content', () => {
    render(<Footer brand="PixelForge UI" />);
    expect(
      screen.getByRole('heading', { name: 'PixelForge UI' })
    ).toBeInTheDocument();
  });

  it('renders custom brand element', () => {
    const customBrand = <img src="/logo.png" alt="Company Logo" />;
    render(<Footer brand={customBrand} />);
    expect(screen.getByAltText('Company Logo')).toBeInTheDocument();
  });

  it('renders copyright with current year', () => {
    const currentYear = new Date().getFullYear();
    render(
      <Footer copyright="© {year} PixelForge UI. All rights reserved." />
    );
    expect(
      screen.getByText(`© ${currentYear} PixelForge UI. All rights reserved.`)
    ).toBeInTheDocument();
  });

  it('renders link sections correctly', () => {
    render(<Footer links={mockLinkSections} />);

    // Check section titles
    expect(
      screen.getByRole('heading', { name: 'Products' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Support' })
    ).toBeInTheDocument();

    // Check links
    expect(
      screen.getByRole('link', { name: 'Components' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'Documentation' })
    ).toBeInTheDocument();

    // Check external link
    const externalLink = screen.getByRole('link', { name: /Themes/ });
    expect(externalLink).toHaveAttribute('target', '_blank');
    expect(externalLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders social links correctly', () => {
    render(<Footer social={mockSocialLinks} />);

    expect(
      screen.getByRole('heading', { name: 'Follow Us' })
    ).toBeInTheDocument();

    const twitterLink = screen.getByRole('link', {
      name: 'Follow us on Twitter',
    });
    expect(twitterLink).toHaveAttribute(
      'href',
      'https://twitter.com/pixelforge'
    );
    expect(twitterLink).toHaveAttribute('target', '_blank');
    expect(twitterLink).toHaveAttribute('rel', 'noopener noreferrer');

    const githubLink = screen.getByRole('link', {
      name: 'Follow us on GitHub',
    });
    expect(githubLink).toHaveAttribute('href', 'https://github.com/pixelforge');
  });

  it('applies size variants correctly', () => {
    const { rerender } = render(<Footer size="sm" data-testid="footer" />);
    let footer = screen.getByTestId('footer');
    expect(footer).toHaveClass('size-sm');

    rerender(<Footer size="lg" data-testid="footer" />);
    footer = screen.getByTestId('footer');
    expect(footer).toHaveClass('size-lg');
  });

  it('applies visual variants correctly', () => {
    const { rerender } = render(
      <Footer variant="primary" data-testid="footer" />
    );
    let footer = screen.getByTestId('footer');
    expect(footer).toHaveClass('variant-primary');

    rerender(<Footer variant="minimal" data-testid="footer" />);
    footer = screen.getByTestId('footer');
    expect(footer).toHaveClass('variant-minimal');
  });

  it('applies layout variants correctly', () => {
    const { rerender } = render(
      <Footer layout="stacked" data-testid="footer" />
    );
    let footer = screen.getByTestId('footer');
    expect(footer).toHaveClass('layout-stacked');

    rerender(<Footer layout="inline" data-testid="footer" />);
    footer = screen.getByTestId('footer');
    expect(footer).toHaveClass('layout-inline');
  });

  it('shows/hides patterns based on showPatterns prop', () => {
    const { rerender } = render(<Footer showPatterns={true} />);
    expect(document.querySelector('.pattern-grid')).toBeInTheDocument();

    rerender(<Footer showPatterns={false} />);
    expect(document.querySelector('.pattern-grid')).not.toBeInTheDocument();
  });

  it('renders children content', () => {
    render(
      <Footer>
        <div data-testid="footer-content">Custom footer content</div>
      </Footer>
    );

    expect(screen.getByTestId('footer-content')).toBeInTheDocument();
  });

  it('has semantic footer element', () => {
    render(<Footer brand="Test" />);
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('renders complete footer with all sections', () => {
    render(
      <Footer
        brand="PixelForge UI"
        copyright="© {year} PixelForge UI. All rights reserved."
        links={mockLinkSections}
        social={mockSocialLinks}
      />
    );

    // Check all sections are present
    expect(
      screen.getByRole('heading', { name: 'PixelForge UI' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Products' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Support' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Follow Us' })
    ).toBeInTheDocument();
    expect(screen.getByText(/© \d{4} PixelForge UI/)).toBeInTheDocument();
  });

  it('has no accessibility violations', async () => {
    const { container } = render(
      <div>
        <h1>Page Title</h1>
        <Footer
          brand="PixelForge UI"
          copyright="© {year} PixelForge UI"
          links={mockLinkSections}
          social={mockSocialLinks}
        />
      </div>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

describe('FooterLink', () => {
  it('renders as link with href', () => {
    render(<FooterLink href="/test">Test Link</FooterLink>);
    const link = screen.getByRole('link', { name: 'Test Link' });
    expect(link).toHaveAttribute('href', '/test');
  });

  it('applies external link attributes when external prop is true', () => {
    render(
      <FooterLink href="https://external.com" external={true}>
        External Link
      </FooterLink>
    );
    const link = screen.getByRole('link', { name: /External Link/ });
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('shows external icon for external links', () => {
    render(
      <FooterLink href="https://external.com" external={true}>
        External Link
      </FooterLink>
    );
    // The external icon should be present in the link text
    expect(screen.getByText('↗')).toBeInTheDocument();
  });

  it('applies variant styles correctly', () => {
    const { rerender } = render(
      <FooterLink variant="bold" data-testid="footer-link">
        Bold Link
      </FooterLink>
    );
    let link = screen.getByTestId('footer-link');
    expect(link).toHaveClass('link-variant-bold');

    rerender(
      <FooterLink variant="muted" data-testid="footer-link">
        Muted Link
      </FooterLink>
    );
    link = screen.getByTestId('footer-link');
    expect(link).toHaveClass('link-variant-muted');
  });

  it('does not apply external attributes when external prop is false', () => {
    render(
      <FooterLink href="/internal" external={false}>
        Internal Link
      </FooterLink>
    );
    const link = screen.getByRole('link', { name: 'Internal Link' });
    expect(link).not.toHaveAttribute('target');
    expect(link).not.toHaveAttribute('rel');
  });

  it('renders children content correctly', () => {
    render(
      <FooterLink href="/test">
        <span data-testid="link-content">Custom Link Content</span>
      </FooterLink>
    );

    expect(screen.getByTestId('link-content')).toBeInTheDocument();
  });

  it('has no accessibility violations', async () => {
    const { container } = render(
      <FooterLink href="https://example.com" external={true}>
        External Example Link
      </FooterLink>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
