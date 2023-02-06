import { svelte } from '@sveltejs/vite-plugin-svelte';

import { defineConfig } from 'vite';
import { envConfig } from 'vite-plugin-env-config';

export default defineConfig({

  plugins: [
    svelte(),
    envConfig({
      // prefix: '',
    }),
  ],
  server: {
    port: 8080,
  },
});

