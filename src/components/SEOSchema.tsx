import React from 'react';
import { Helmet } from 'react-helmet';

interface Product {
  name: string;
  description?: string;
  price?: number;
  image?: string;
  sku?: string;
}

interface SEOSchemaProps {
  type: 'organization' | 'product' | 'webpage' | 'faq';
  product?: Product;
  faqs?: { question: string; answer: string }[];
}

const SEOSchema: React.FC<SEOSchemaProps> = ({ type, product, faqs }) => {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Pallmann Store",
    "alternateName": "Groupe Epenon SARL",
    "url": "https://pallmann-store.com",
    "logo": "https://pallmann-store.com/logo.png",
    "description": "Boutique en ligne officielle des produits Pallmann pour parquet. Vitrificateurs, huiles, colles et machines professionnelles.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "6 rue du Commerce",
      "addressLocality": "Herrlisheim-près-Colmar",
      "postalCode": "68420",
      "addressCountry": "FR"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "email": "contact@pallmann-store.com",
      "contactType": "customer service",
      "availableLanguage": ["French", "German", "English"]
    },
    "sameAs": [
      "https://fr.pallmann.net"
    ]
  };

  const webpageSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Pallmann Store",
    "url": "https://pallmann-store.com",
    "description": "Produits professionnels Pallmann pour parquet. Vitrificateurs, huiles, colles, machines. Livraison rapide France.",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://pallmann-store.com/?search={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  const productSchema = product ? {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "description": product.description,
    "image": product.image,
    "sku": product.sku,
    "brand": {
      "@type": "Brand",
      "name": "PALLMANN"
    },
    "offers": {
      "@type": "Offer",
      "priceCurrency": "EUR",
      "price": product.price,
      "priceValidUntil": "2026-12-31",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "Pallmann Store"
      }
    }
  } : null;

  const faqSchema = faqs ? {
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
  } : null;

  const getSchema = () => {
    switch (type) {
      case 'organization':
        return organizationSchema;
      case 'webpage':
        return webpageSchema;
      case 'product':
        return productSchema;
      case 'faq':
        return faqSchema;
      default:
        return organizationSchema;
    }
  };

  const schema = getSchema();
  if (!schema) return null;

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};

export default SEOSchema;

// FAQ data pour la page d'accueil
export const homeFAQs = [
  {
    question: "Quel vitrificateur Pallmann choisir pour mon parquet ?",
    answer: "Pour un usage résidentiel standard, le PALL-X 96 est idéal. Pour un trafic intense ou professionnel, optez pour le PALL-X 98 2K ou PALL-X EXTREME. Pour un effet bois naturel, choisissez PALL-X PURE."
  },
  {
    question: "Quelle est la différence entre vitrification et huilage ?",
    answer: "La vitrification crée un film protecteur en surface (aspect brillant à mat), très résistant et facile d'entretien. L'huilage pénètre dans le bois (aspect naturel), nécessite un entretien régulier mais se répare facilement localement."
  },
  {
    question: "Combien de vitrificateur pour 20m² de parquet ?",
    answer: "Comptez environ 1L de vitrificateur pour 10-12m² par couche. Pour 20m², prévoyez 2L pour une couche, soit 4-6L pour un système complet (fond dur + 2 couches de finition)."
  },
  {
    question: "Les produits Pallmann sont-ils adaptés aux professionnels ?",
    answer: "Oui, Pallmann est la référence mondiale pour les professionnels du parquet. Nous proposons des tarifs pro avec codes remise, des conditionnements adaptés et un conseil technique expert."
  },
  {
    question: "Quel est le délai de livraison ?",
    answer: "Livraison en 48-72h ouvrées pour la France métropolitaine. Franco de port à partir de 630€ HT d'achat."
  }
];
