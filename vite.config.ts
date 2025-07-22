import { defineConfig } from 'vite';
import path from 'path';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'base64coder',
      fileName: (format) => `base64coder.${format}.js`
    },
    rollupOptions: {
      external: [],
      output: {
        globals: {}
      }
    },
    sourcemap: true,
    minify: 'terser'
  },
  resolve: {
    alias: {
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@core': path.resolve(__dirname, 'src/core'),
    }
  },
  plugins: [dts()]
});
