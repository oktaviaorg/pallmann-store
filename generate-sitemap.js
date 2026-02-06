const fs = require('fs');

const articles = [
  "entretien-parquet-quotidien",
  "poncer-parquet-huile-guide-complet",
  "renovation-parquet-mulhouse-alsace-ponceurs-reunis",
  "entretien-renovation-vitrification-parquet-mulhouse-alsace",
  "entretien-renovation-vitrification-parquet-mulhouse-alsace-expertise",
  "poncage-vitrification-parquet-strasbourg-guide-expert",
  "renovation-poncage-parquets-immeubles-haussmanniens-historiques-mulhouse",
  "restauration-parquets-epoque-art-renover-sols-historiques-mulhouse",
  "comment-huiler-parquet-ancien-guide-complet-finition-naturelle",
  "poncage-parquet-ancien-strasbourg-redonnez-charme-sol-bois",
  "poncage-parquet-ancien-chevrons-colle-goudron-guide-expert",
  "comment-reparer-rayures-parquet-vitrifie",
  "comment-nettoyer-parquet-ancien-cire-est-france-guide-pros",
  "comment-nettoyer-parquet-ancien-cire-est-france-guide-pros-complet",
  "parquet-ancien-cloue-ne-comblez-jamais-fentes-pate-bois",
  "enlever-traces-odeur-urine-animaux-parquet-bois-ancien-conseils-pros",
  "pourquoi-renover-terrasse-bois-avantages-durables-esthetiques-ecologiques",
  "sablage-parquet-redonnez-vie-sols-bois-ponceurs-reunis",
  "sablage-escalier-bois-redonner-vie-marches-sans-tout-casser",
  "service-parquet-pose-renovation-entretien-mulhouse-didenheim",
  "prix-vitrification-parquet-2025-2026-cout-finition-qualite-sol-bois",
  "tarifs-prix-poncage-parquet-guide-complet-2025-2026",
  "faq-reparation-parquet-vitrifie-abime-guide-complet",
  "poncer-parquet-huile-est-ce-possible-comment-faire",
  "comment-decaper-parquet-ancien-guide-complet-redonner-vie-sol-2025",
  "excellence-renovation-parquet-ancien-france-grand-est",
  "entretien-renovation-vitrification-parquet-alsace-expertise-ponceurs-reunis",
  "refaire-parquet-prix-m2-astuces-finitions-retours-experience",
  "renovation-parquet-mulhouse-poncage-vitrification-restauration-bois-ancien",
  "parquet-abime-par-frottement-causes-solutions-renovation",
  "renovation-parquet-colmar-redonnez-vie-sols-bois",
  "decapage-parquet-mulhouse-redonnez-vie-sols-bois",
  "parquet-pro-pose-renovation-bois-qualite-duo-parqueteur",
  "parquet-pro-pose-renovation-bois-qualite-duo-parqueteur-20250709",
  "guide-complet-pose-renovation-entretien-parquet-bois",
  "prix-vitrification-parquet-tarifs-conseils-devis",
  "chateau-haut-koenigsbourg-histoire-fascinante",
  "parquets-planchers-bois-chateaux-moyen-age-aujourd-hui",
  "parquet-renovation-casino-ribeauville-elegance-durabilite-silence",
  "parc-zoologique-mulhouse-nature-savoir-patrimoine",
  "parquet-abime-par-locataire-responsabilites-recours-solutions-renovation",
  "poncage-parquet-ancien-chene-rue-allee-spach-strasbourg",
  "quand-faire-intervenir-ponceur-parquet-ancien-guide-complet-architectes-experts",
  "enlever-colle-ancienne-moquette-sans-abimer-vieux-parquet-guide-complet",
  "comment-nettoyer-parquet-ancien-cire-guide-pratique-entretien",
  "reboucher-fentes-parquet-ancien-pate-bois-erreur-ne-pas-commettre",
  "reparer-parquet-qui-grince-solutions-durables-ponceurs-reunis",
  "javel-parquet-bois-risques-degats-solutions-professionnelles",
  "methodes-pose-parquet-massif",
  "poncage-vitrification-parquet-contrecolle-3-frises-ancien",
  "remplacer-carrelage-par-parquet-guide-complet-renovation-sol",
  "decaper-parquet-bois-methodes-erreurs-astuces-maitres-ponceurs",
  "renovation-parquet-mosaique-ancien-decolle-baie-vitree-grand-est",
  "vitrification-parquet-mulhouse-erreurs-finitions-2026",
  "poncage-ou-remplacement-parquet-guide-pro-2025",
  "artisan-poncage-parquet-vs-location-machine-guide-2025",
  "parquet-noirci-tache-brule-solutions-artisan-renovation-2025",
  "diagnostic-parquet-gratuit-photo-analyse-express-whatsapp-2025",
  "renovation-poncage-escalier-parquet-plus-value-immobiliere-2025",
  "renovation-parquet-hotel-alsace-contrecolle-monolame-chene-fontaines",
  "tendance-2025-parquet-bois-brut-vitrificateur-bi-composant",
  "poncage-parquet-leymen",
  "poncage-parquet-illzach",
  "poncage-parquet-colmar",
  "poncage-parquet-mulhouse",
  "poncage-parquet-wittenheim",
  "poncage-parquet-rixheim",
  "poncage-parquet-riedisheim",
  "poncage-parquet-kingersheim",
  "poncage-parquet-saint-louis",
  "poncage-parquet-huningue",
  "poncage-parquet-kembs",
  "poncage-parquet-sierentz",
  "poncage-parquet-altkirch",
  "poncage-parquet-cernay",
  "poncage-parquet-thann",
  "poncage-parquet-guebwiller",
  "poncage-parquet-soultz-haut-rhin",
  "poncage-parquet-neuf-brisach",
  "poncage-parquet-ensisheim",
  "poncage-parquet-ribeauville",
  "poncage-parquet-riquewihr",
  "poncage-parquet-kaysersberg",
  "poncage-parquet-turckheim",
  "poncage-parquet-munster",
  "poncage-parquet-rouffach",
  "poncage-parquet-bollwiller",
  "poncage-parquet-morschwiller-le-bas",
  "poncage-parquet-wintzenheim",
  "poncage-parquet-staffelfelden",
  "poncage-parquet-pfastatt",
  "poncage-parquet-hesingue",
  "poncage-parquet-blotzheim",
  "poncage-parquet-waldighoffen",
  "poncage-parquet-horbourg-wihr",
  "poncage-parquet-ingersheim",
  "poncage-parquet-biesheim",
  "poncage-parquet-hochstatt",
  "poncage-parquet-dietwiller",
  "poncage-parquet-bartenheim",
  "poncage-parquet-habsheim",
  "poncage-parquet-eguisheim",
  "poncage-parquet-willer-sur-thur",
  "poncage-parquet-fellering",
  "poncage-parquet-orbey",
  "poncage-parquet-lapoutroie",
  "poncage-parquet-soultzmatt",
  "poncage-parquet-hattstatt",
  "poncage-parquet-wettolsheim"
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  
  <!-- Page principale -->
  <url>
    <loc>https://ponceur-parquet.fr/</loc>
    <lastmod>2025-11-28</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  
  <!-- Services -->
  <url>
    <loc>https://ponceur-parquet.fr/services</loc>
    <lastmod>2025-11-28</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  
  <url>
    <loc>https://ponceur-parquet.fr/analyse-parquet-gratuite</loc>
    <lastmod>2025-11-28</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.95</priority>
  </url>
  
  <url>
    <loc>https://ponceur-parquet.fr/gallery</loc>
    <lastmod>2025-11-28</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  
  <!-- Blog principal -->
  <url>
    <loc>https://ponceur-parquet.fr/blog</loc>
    <lastmod>2025-11-28</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  
  <!-- Articles de blog (${articles.length}) -->
${articles.map(slug => `  <url>
    <loc>https://ponceur-parquet.fr/blog/${slug}</loc>
    <lastmod>2025-11-28</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`).join('\n')}
  
  <!-- Pages légales -->
  <url>
    <loc>https://ponceur-parquet.fr/mentions-legales</loc>
    <lastmod>2025-11-28</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
  
  <url>
    <loc>https://ponceur-parquet.fr/cgv</loc>
    <lastmod>2025-11-28</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
  
  <url>
    <loc>https://ponceur-parquet.fr/politique-confidentialite</loc>
    <lastmod>2025-11-28</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
  
</urlset>`;

console.log(sitemap);
