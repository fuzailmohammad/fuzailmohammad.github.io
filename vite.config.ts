import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/',
  plugins: [react()],
  publicDir: false,
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    minify: 'esbuild',
    target: 'esnext',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          motion: ['framer-motion'],
          three: ['three'],
          icons: ['lucide-react'],
        },
        assetFileNames: (assetInfo) => {
          let extType = assetInfo.name.split('.')[1];
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            extType = 'img';
          }
          return `assets/${extType}/[name]-[hash][extname]`;
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
      },
    },
    chunkSizeWarningLimit: 1000,
    cssCodeSplit: true,
    reportCompressedSize: false,
  },
  optimizeDeps: {
    include: ['framer-motion', 'three', 'lucide-react'],
  },
  server: {
    hmr: {
      overlay: false,
    },
  },
});
