import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    // design/ (colour tokens, logo) lives one level up, outside client/.
    fs: { allow: ['..'] },
    proxy: { '/api': 'http://localhost:5000' },
  },
});
