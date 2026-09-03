import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.lojaentreavemarias.com.br',
  integrations: [sitemap()],
});