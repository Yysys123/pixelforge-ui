import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
    defaultName: 'Overview',
  },
  typescript: {
    check: false,
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: prop =>
        prop.parent ? !/node_modules/.test(prop.parent.fileName) : true,
    },
  },
  viteFinal: async config => {
    // Ensure Vite can resolve our workspace packages
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...config.resolve.alias,
      '@pixelforge-ui/core': new URL(
        '../packages/core/src/index.ts',
        import.meta.url
      ).pathname,
      '@pixelforge-ui/react': new URL(
        '../packages/react/src/index.tsx',
        import.meta.url
      ).pathname,
      '@pixelforge-ui/icons': new URL(
        '../packages/icons/src/index.tsx',
        import.meta.url
      ).pathname,
    };

    return config;
  },
};

export default config;
