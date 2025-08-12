import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.tsx'],
  format: ['cjs', 'esm'],
  dts: false, // Disable DTS for now due to project references issue
  minify: true,
  external: ['react', 'react-dom', '@pixelforge-ui/icons'],
  esbuildOptions(options) {
    // Ignore CSS imports during build
    options.loader = {
      ...options.loader,
      '.css': 'empty',
    };
  },
  // Only include source files, exclude tests and utilities
  onSuccess: 'echo "Build completed successfully"',
});
