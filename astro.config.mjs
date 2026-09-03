import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.lojaentreavemarias.com.br',
  integrations: [
    sitemap({
      // Garante que o sitemap inclua todas as páginas estáticas sem falhar na leitura
      filter: (page) => page !== 'https://www.lojaentreavemarias.com.br/404/',
    }),
  ],
});