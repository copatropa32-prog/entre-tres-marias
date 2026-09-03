export async function GET() {
  // Lista de todas as páginas estáticas importantes do seu site
  const pages = [
    '',
    'artigos',
    'camisetas',
    'envio',
    'estatuas',
    'login',
    'perfil',
    'sobre',
    'tercos',
    'termos'
  ];

  const siteUrl = 'https://www.lojaentreavemarias.com.br';

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${pages
    .map(
      (page) => `
    <url>
      <loc>${siteUrl}/${page}</loc>
      <changefreq>weekly</changefreq>
      <priority>${page === '' ? '1.0' : '0.8'}</priority>
    </url>
  `
    )
    .join('')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}