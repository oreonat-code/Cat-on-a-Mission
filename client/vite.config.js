import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: { '/api': 'http://localhost:5000' },
    // The CTY logo lives in ../design/brand, outside the client root.
    fs: { allow: ['..'] },
  },
});
