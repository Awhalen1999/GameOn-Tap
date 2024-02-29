import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // base: 'https://awhalen1999.github.io/',
  base: '/GameOn-Tap/',
});
