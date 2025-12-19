import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode, ssrBuild, isSsrBuild }) => {
    const env = loadEnv(mode, '.', '');
    const isSSR = Boolean(isSsrBuild ?? ssrBuild);
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      ssr: {
        // Fix Node ESM execution during prerendering (react-helmet-async is CJS in Node)
        noExternal: ['react-helmet-async'],
      },
      // Only chunk-split client bundles. SSR build treats many deps as external.
      ...(isSSR
        ? {}
        : {
            build: {
              rollupOptions: {
                output: {
                  manualChunks: {
                    react: ['react', 'react-dom'],
                    router: ['react-router-dom'],
                    icons: ['lucide-react'],
                  },
                },
              },
            },
          }),
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
