import { addons } from '@storybook/manager-api';

addons.setConfig({
  // Set the initial story to load (defaults to Overview)
  initialActive: 'docs',
  
  // Configure the sidebar to show docs by default
  sidebar: {
    showRoots: true,
    filters: {
      patterns: (item) => {
        return !item.name?.startsWith('example-');
      },
    },
  },
  
  // Set the initial route to the Overview docs page
  previewTabs: {
    'storybook/docs/panel': {
      index: -1,
      title: 'Docs',
    },
    canvas: {
      title: 'Canvas',
    },
  },
  
  // Default to docs mode instead of story mode
  enableShortcuts: true,
  
  // Theme and branding
  brandTitle: 'PixelForge UI',
  brandUrl: 'https://github.com/pixelforge-ui/pixelforge-ui',
  
  // Toolbar configuration
  toolbar: {
    title: { hidden: false },
    zoom: { hidden: false },
    eject: { hidden: false },
    copy: { hidden: false },
    fullscreen: { hidden: false },
  },
});