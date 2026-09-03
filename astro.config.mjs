import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';

export default defineConfig({
  site: 'https://www.lojaentreavemarias.com.br',
  output: 'server',
  adapter: vercel({
    functionPerRoute: false,
  }),
});