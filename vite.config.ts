import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Listen on all network interfaces
    port: 5173,      // Port to listen on (should match EXPOSE in Dockerfile)
    strictPort: true // Ensures Vite doesn't pick another port if 5173 is taken
  }
});
