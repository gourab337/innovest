import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';

// https://vitejs.dev/config/

export default ({ mode }) => {
  const proc = {
    version: process.version,
  };

  return defineConfig({
    define: {
      process: JSON.stringify(proc),
    },
    plugins: [react()],
    rules: {
      'react/prop-types': false,
    },
    optimizeDeps: {
      esbuildOptions: {
        // Node.js global to browser globalThis
        define: {
          global: 'globalThis',
        },
        // Enable esbuild polyfill plugins
        plugins: [
          NodeGlobalsPolyfillPlugin({
            buffer: true,
          }),
        ],
      },
    },
  });
};
