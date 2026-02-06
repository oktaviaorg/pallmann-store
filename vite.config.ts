import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import autoprefixer from 'autoprefixer'; 

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
  define: {
    'import.meta.env.VITE_SUPABASE_URL': JSON.stringify(env.VITE_SUPABASE_URL),
    'import.meta.env.VITE_SUPABASE_ANON_KEY': JSON.stringify(env.VITE_SUPABASE_ANON_KEY),
  },
  server: {
    port: 3001,
    strictPort: true,
    host: true,
    proxy: {
      '/api': {
        target: env.VITE_SUPABASE_URL,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/functions/v1')
      }
    }
  },
  preview: {
    port: 3001,
    strictPort: true,
    host: true
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  },
  plugins: [
    react(),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': ['@supabase/auth-ui-react', '@supabase/auth-ui-shared'],
          'utils-vendor': ['date-fns', 'react-markdown']
        }
      }
    },
    target: 'esnext',
    minify: 'terser',
    terserOptions: {
      ecma: 2020,
      compress: { 
        drop_console: false,
        drop_debugger: false,
        passes: 2
      },
      format: {
        comments: false
      }
    },
    cssMinify: true,
    assetsInlineLimit: 4096, // 4kb
    chunkSizeWarningLimit: 1000,
    reportCompressedSize: false, 
    sourcemap: false
  },
  css: {
    devSourcemap: true,
    preprocessorOptions: {
      postcss: {
        plugins: [
          autoprefixer()
        ]
      }
    }
  }
  };
});