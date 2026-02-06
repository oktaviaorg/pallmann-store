export const baseOrganization = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Les Ponceurs Réunis - RENO'LINE",
  "image": "https://mjuzyqhxifyvebtnlrra.supabase.co/storage/v1/object/public/lpr2/favicone%20ponceur.png",
  "@id": "https://ponceur-parquet.fr",
  "url": "https://ponceur-parquet.fr",
  "telephone": "+33-3-88-49-30-74",
  "email": "contact@poncages.fr",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "6 rue du Commerce",
    "addressLocality": "Herrlisheim-près-Colmar",
    "postalCode": "68420",
    "addressCountry": "FR"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 48.0142,
    "longitude": 7.3811
  },
  "priceRange": "€€",
  "areaServed": "Grand Est, Alsace, Haut-Rhin, Bas-Rhin, Territoire de Belfort, Côte-d'Or",
  "knowsAbout": [
    "Ponçage de parquet",
    "Vitrification de parquet",
    "Rénovation de parquet ancien",
    "Huilage de parquet",
    "Réparation de parquet",
    "Ponçage d'escalier",
    "Injection anti-grincement"
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "150",
    "bestRating": "5",
    "worstRating": "1"
  }
};

export const servicesSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "provider": {
    "@type": "LocalBusiness",
    "@id": "https://ponceur-parquet.fr/#business",
    "name": "Les Ponceurs Réunis"
  },
  "serviceType": "Ponçage et Rénovation de Parquet",
  "areaServed": "Alsace"
};

export const generateLocalBusinessSchema = (customData = {}) => ({
  ...baseOrganization,
  ...customData
});

export const generateBreadcrumbSchema = (items: Array<{ name: string; url: string }>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": {
      "@type": "WebPage",
      "@id": item.url,
      "name": item.name
    }
  }))
});

export const generateArticleSchema = (article: {
  title: string;
  description: string;
  imageUrl?: string;
  datePublished: string;
  dateModified?: string;
  url: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": article.title,
  "description": article.description,
  "image": article.imageUrl,
  "datePublished": article.datePublished,
  "dateModified": article.dateModified || article.datePublished,
  "author": {
    "@type": "Organization",
    "name": "Les Ponceurs Réunis"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Les Ponceurs Réunis",
    "logo": {
      "@type": "ImageObject",
      "url": "https://mjuzyqhxifyvebtnlrra.supabase.co/storage/v1/object/public/lpr2/favicone%20ponceur.png"
    }
  },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": article.url
  }
});

export const generateFAQSchema = (faqs: Array<{ question: string; answer: string }>) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
});

export const generateAggregateRatingSchema = (rating: {
  ratingValue: number;
  reviewCount: number;
}) => ({
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Les Ponceurs Réunis",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": rating.ratingValue,
    "reviewCount": rating.reviewCount,
    "bestRating": "5",
    "worstRating": "1"
  }
});

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Ponceur Parquet - Les Ponceurs Réunis",
  "url": "https://ponceur-parquet.fr",
  "description": "Expert en ponçage, vitrification et rénovation de parquet en France. Plus de 1300 articles de blog couvrant tous les aspects de la rénovation de parquet.",
  "publisher": {
    "@type": "Organization",
    "name": "Les Ponceurs Réunis",
    "logo": {
      "@type": "ImageObject",
      "url": "https://mjuzyqhxifyvebtnlrra.supabase.co/storage/v1/object/public/lpr2/favicone%20ponceur.png"
    }
  }
};

export const blogCollectionSchema = {
  "@context": "https://schema.org",
  "@type": "Blog",
  "name": "Blog Ponceur Parquet",
  "url": "https://ponceur-parquet.fr/blog",
  "description": "1303 articles d'experts sur le ponçage, la vitrification et la rénovation de parquet en France",
  "publisher": {
    "@type": "Organization",
    "name": "Les Ponceurs Réunis"
  },
  "inLanguage": "fr-FR",
  "about": [
    {
      "@type": "Thing",
      "name": "Ponçage de parquet"
    },
    {
      "@type": "Thing",
      "name": "Vitrification de parquet"
    },
    {
      "@type": "Thing",
      "name": "Rénovation de parquet"
    },
    {
      "@type": "Thing",
      "name": "Entretien de parquet"
    },
    {
      "@type": "Thing",
      "name": "Escaliers en bois"
    }
  ]
};
