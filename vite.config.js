import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import contentPlugin from './scripts/content-plugin.mjs';

export default defineConfig({
  plugins: [contentPlugin(), react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          markdown: ['react-markdown', 'remark-gfm'],
          animation: ['framer-motion', 'gsap', 'lenis'],
        },
      },
    },
  },
});
