import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

// Bu kısımlar dosyanın doğru şekilde çalışması için gerekli
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Vite yapılandırması
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
});
