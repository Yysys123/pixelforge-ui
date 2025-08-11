# Contributing to PixelForge UI

We love your input! We want to make contributing to PixelForge UI as easy and transparent as possible, whether it's:

- Reporting a bug
- Discussing the current state of the code
- Submitting a fix
- Proposing new features
- Becoming a maintainer

## 🚀 Development Process

We use GitHub to host code, to track issues and feature requests, as well as accept pull requests.

### Pull Requests Welcome
Pull requests are the best way to propose changes to the codebase. We actively welcome your pull requests:

1. **Fork the repo** and create your branch from `main`
2. **Install dependencies**: `pnpm install`
3. **Make your changes** following our coding standards
4. **Add tests** for any new functionality
5. **Ensure the test suite passes**: `pnpm test`
6. **Run linting and formatting**: `pnpm lint && pnpm format`
7. **Update documentation** if needed
8. **Submit your pull request**

## 🏗️ Development Setup

### Prerequisites
- Node.js 18+
- pnpm 8+
- Git

### Getting Started
```bash
# Fork and clone the repository
git clone https://github.com/pixelforge-ui/pixelforge-ui.git
cd pixelforge-ui

# Install dependencies
pnpm install

# Run tests to ensure everything works
pnpm test

# Start Storybook for component development
pnpm storybook

# Build packages
pnpm build
```

## 📝 Coding Standards

### TypeScript
- All code must be written in TypeScript
- Use strict TypeScript configuration
- Provide comprehensive type definitions
- Export types for public APIs

### Code Style
- Use ESLint and Prettier configurations
- Follow existing code patterns
- Use meaningful variable and function names
- Add JSDoc comments for public APIs

### Components
- Follow the existing component structure
- Use CSS Modules for styling
- Implement proper accessibility (ARIA, keyboard navigation)
- Include comprehensive tests
- Create Storybook stories for new components

### File Structure
```
packages/react/src/
├── component-name/
│   ├── Component.tsx        # Main component
│   ├── Component.module.css # Styles
│   ├── Component.test.tsx   # Tests
│   ├── index.ts            # Export
│   └── types.ts            # Type definitions
```

## 🧪 Testing Requirements

All contributions must include appropriate tests:

### Unit Tests
- Use Jest and React Testing Library
- Test component rendering and interactions
- Test accessibility with jest-axe
- Achieve high test coverage

### Example Test Structure
```tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { Button } from './Button';

describe('Button', () => {
  it('renders correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('handles click events', async () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    await userEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is accessible', async () => {
    const { container } = render(<Button>Accessible button</Button>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
```

### Storybook Stories
All components must have comprehensive Storybook stories:

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    docs: {
      description: {
        component: 'A brutalist button component with multiple variants and accessibility features.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Button',
  },
};
```

## 🎨 Design Guidelines

### Brutalist Design Principles
- **Bold borders**: Use thick, solid borders (0.15em - 0.35em)
- **Dramatic shadows**: Offset shadows using CSS variables
- **High contrast**: Ensure WCAG AA compliance
- **Sharp edges**: Minimal border radius (0.3em - 0.6em)
- **Aggressive states**: Prominent hover and focus effects

### CSS Standards
- Use CSS Modules for component styles
- Leverage CSS variables for theming
- Follow mobile-first responsive design
- Implement proper focus and hover states
- Use semantic class names

### Accessibility Requirements
- All interactive elements must be keyboard accessible
- Proper ARIA attributes and roles
- Color contrast ratios meet WCAG AA standards
- Focus indicators must be visible and prominent
- Screen reader compatibility

## 📚 Documentation

### Component Documentation
- Update README files for affected packages
- Add JSDoc comments for props and methods
- Include usage examples in Storybook
- Document accessibility features

### Commit Messages
Follow conventional commit format:
```
type(scope): description

feat(button): add loading state with spinner
fix(input): resolve focus management issue
docs(readme): update installation instructions
```

## 🐛 Bug Reports

We use GitHub issues to track public bugs. Report a bug by opening a new issue.

**Great Bug Reports** tend to have:
- A quick summary and/or background
- Steps to reproduce
- What you expected would happen
- What actually happens
- Notes (possibly including why you think this might be happening)

### Bug Report Template
```markdown
**Bug Description**
A clear description of what the bug is.

**Steps to Reproduce**
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

**Expected Behavior**
A clear description of what you expected to happen.

**Screenshots**
If applicable, add screenshots to help explain your problem.

**Environment:**
- OS: [e.g. macOS]
- Browser: [e.g. Chrome 90]
- Version: [e.g. 1.2.0]
```

## 💡 Feature Requests

We welcome feature requests! Please provide:
- **Use case**: Why is this feature needed?
- **Proposed solution**: How should it work?
- **Alternatives considered**: Other solutions you've thought about
- **Design considerations**: How it fits with brutalist design principles

## 🔄 Release Process

1. **Version bump**: Follow semantic versioning
2. **Changelog**: Update CHANGELOG.md
3. **Tests**: Ensure all tests pass
4. **Build**: Verify packages build correctly
5. **Release**: Create GitHub release
6. **Publish**: Automated npm publishing via GitHub Actions

## 📋 Checklist for Contributors

Before submitting your contribution:

- [ ] Code follows the style guidelines
- [ ] Self-review of code completed
- [ ] Code is commented, particularly in hard-to-understand areas
- [ ] Corresponding changes to documentation made
- [ ] Tests added that prove fix is effective or feature works
- [ ] New and existing unit tests pass locally
- [ ] Any dependent changes have been merged

## 🤝 Community Guidelines

### Our Pledge
We are committed to making participation in this project a harassment-free experience for everyone, regardless of age, body size, disability, ethnicity, gender identity and expression, level of experience, nationality, personal appearance, race, religion, or sexual identity and orientation.

### Our Standards
Examples of behavior that contributes to creating a positive environment include:
- Using welcoming and inclusive language
- Being respectful of differing viewpoints and experiences
- Gracefully accepting constructive criticism
- Focusing on what is best for the community
- Showing empathy towards other community members

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

## 🙋 Questions?

Feel free to open an issue for questions about contributing, or reach out to the maintainers.

---

**Thank you for contributing to PixelForge UI! 🎉**