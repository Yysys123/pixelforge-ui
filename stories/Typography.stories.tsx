import type { Meta, StoryObj } from '@storybook/react';
import { Typography } from '../packages/react/src/typography/Typography';

const meta = {
  title: 'Components/Typography',
  component: Typography,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Flexible typography component with semantic variants, custom styling options, and accessibility features. Supports all HTML text elements.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'subtitle1', 'subtitle2', 'body1', 'body2', 'caption', 'overline'],
      description: 'Semantic variant with predefined styles',
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl'],
      description: 'Custom size (overrides variant size)',
    },
    weight: {
      control: 'select',
      options: ['thin', 'light', 'normal', 'medium', 'semibold', 'bold', 'extrabold', 'black'],
      description: 'Font weight',
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'accent', 'success', 'warning', 'danger', 'muted'],
      description: 'Text color',
    },
    align: {
      control: 'select',
      options: ['left', 'center', 'right', 'justify'],
      description: 'Text alignment',
    },
    transform: {
      control: 'select',
      options: ['none', 'uppercase', 'lowercase', 'capitalize'],
      description: 'Text transformation',
    },
    decoration: {
      control: 'select',
      options: ['none', 'underline', 'overline', 'line-through'],
      description: 'Text decoration',
    },
    family: {
      control: 'select',
      options: ['sans', 'serif', 'mono'],
      description: 'Font family',
    },
    truncate: {
      control: 'boolean',
      description: 'Whether to truncate text with ellipsis',
    },
    as: {
      control: 'select',
      options: ['p', 'span', 'div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
      description: 'HTML element to render',
    },
  },
  args: {
    children: 'Typography Component',
  },
} satisfies Meta<typeof Typography>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Heading1: Story = {
  args: {
    variant: 'h1',
    children: 'Heading 1',
  },
};

export const Heading2: Story = {
  args: {
    variant: 'h2',
    children: 'Heading 2',
  },
};

export const Heading3: Story = {
  args: {
    variant: 'h3',
    children: 'Heading 3',
  },
};

export const Body1: Story = {
  args: {
    variant: 'body1',
    children: 'This is body text using the body1 variant. It\'s perfect for main content and paragraphs.',
  },
};

export const Body2: Story = {
  args: {
    variant: 'body2',
    children: 'This is body text using the body2 variant. Slightly smaller than body1.',
  },
};

export const Subtitle1: Story = {
  args: {
    variant: 'subtitle1',
    children: 'Subtitle 1 - Larger subtitle text',
  },
};

export const Caption: Story = {
  args: {
    variant: 'caption',
    children: 'Caption text - Small and subtle',
  },
};

export const CustomSize: Story = {
  args: {
    size: '3xl',
    weight: 'bold',
    children: 'Custom sized text',
  },
};

export const ColorVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'center' }}>
      <Typography color="primary">Primary color text</Typography>
      <Typography color="secondary">Secondary color text</Typography>
      <Typography color="accent">Accent color text</Typography>
      <Typography color="success">Success color text</Typography>
      <Typography color="warning">Warning color text</Typography>
      <Typography color="danger">Danger color text</Typography>
      <Typography color="muted">Muted color text</Typography>
    </div>
  ),
};

export const FontWeights: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'center' }}>
      <Typography weight="thin">Thin weight</Typography>
      <Typography weight="light">Light weight</Typography>
      <Typography weight="normal">Normal weight</Typography>
      <Typography weight="medium">Medium weight</Typography>
      <Typography weight="semibold">Semibold weight</Typography>
      <Typography weight="bold">Bold weight</Typography>
      <Typography weight="extrabold">Extra bold weight</Typography>
      <Typography weight="black">Black weight</Typography>
    </div>
  ),
};

export const Alignments: Story = {
  render: () => (
    <div style={{ width: '300px', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <Typography align="left">Left aligned text</Typography>
      <Typography align="center">Center aligned text</Typography>
      <Typography align="right">Right aligned text</Typography>
      <Typography align="justify">
        Justified text that will wrap to multiple lines and be justified across the full width of the container.
      </Typography>
    </div>
  ),
};

export const FontFamilies: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'center' }}>
      <Typography family="sans">Sans-serif font family</Typography>
      <Typography family="serif">Serif font family</Typography>
      <Typography family="mono">Monospace font family</Typography>
    </div>
  ),
};

export const TextTransforms: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'center' }}>
      <Typography transform="none">No transformation</Typography>
      <Typography transform="uppercase">Uppercase text</Typography>
      <Typography transform="lowercase">LOWERCASE TEXT</Typography>
      <Typography transform="capitalize">capitalize each word</Typography>
    </div>
  ),
};

export const TextDecorations: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'center' }}>
      <Typography decoration="none">No decoration</Typography>
      <Typography decoration="underline">Underlined text</Typography>
      <Typography decoration="overline">Overlined text</Typography>
      <Typography decoration="line-through">Strikethrough text</Typography>
    </div>
  ),
};

export const TruncatedText: Story = {
  args: {
    truncate: true,
    children: 'This is a very long text that will be truncated with an ellipsis when it exceeds the container width',
  },
  render: (args) => (
    <div style={{ width: '200px' }}>
      <Typography {...args} />
    </div>
  ),
};

export const AllHeadings: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Typography variant="h1">Heading 1 - Main Page Title</Typography>
      <Typography variant="h2">Heading 2 - Section Title</Typography>
      <Typography variant="h3">Heading 3 - Subsection Title</Typography>
      <Typography variant="h4">Heading 4 - Component Title</Typography>
      <Typography variant="h5">Heading 5 - Small Title</Typography>
      <Typography variant="h6">Heading 6 - Micro Title</Typography>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All heading variants displayed together showing the type scale.',
      },
    },
  },
};

export const TypographyScale: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
      <Typography variant="h1" align="center">Typography Scale</Typography>
      <Typography variant="subtitle1" color="muted" align="center">
        A comprehensive type system for digital interfaces
      </Typography>
      
      <div style={{ width: '2px', height: '2rem', background: '#ddd', margin: '1rem 0' }} />
      
      <Typography variant="h2">Section Heading</Typography>
      <Typography variant="body1" style={{ maxWidth: '600px', textAlign: 'center' }}>
        This demonstrates how different typography variants work together to create 
        a clear information hierarchy. Each variant has its specific use case and 
        semantic meaning.
      </Typography>
      
      <Typography variant="h3">Subsection</Typography>
      <Typography variant="body2" color="muted" style={{ maxWidth: '500px', textAlign: 'center' }}>
        Secondary body text provides additional information with slightly reduced 
        visual weight while maintaining excellent readability.
      </Typography>
      
      <Typography variant="caption" color="muted">
        Caption text for fine print and metadata
      </Typography>
    </div>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Complete typography scale demonstration showing how variants work together.',
      },
    },
  },
};