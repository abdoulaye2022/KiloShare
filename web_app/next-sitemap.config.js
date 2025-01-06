module.exports = {
  siteUrl: 'https://www.kilo-share.com', // URL de votre site
  generateRobotsTxt: true, // Génère automatiquement un fichier robots.txt
  changefreq: 'daily', // Fréquence de mise à jour des pages
  priority: 0.7, // Priorité des pages (par défaut)
  exclude: ['/admin', '/private', '/login', '/dashboard'], // Exclure des pages spécifiques
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*', // Applique les règles à tous les robots
        allow: '/', // Autorise l'accès à toutes les pages
        disallow: ['/admin', '/private', '/login', '/dashboard'], // Pages interdites pour tous les robots
      },
      {
        userAgent: 'Googlebot', // Règles spécifiques pour Googlebot
        allow: '/',
        disallow: ['/admin', '/private', '/login', '/dashboard'], // Pages interdites pour Googlebot
      },
    ],
    additionalSitemaps: [
      'https://www.kilo-share.com/sitemap-extra.xml', // Ajouter des sitemaps supplémentaires si nécessaire
    ],
  },
};