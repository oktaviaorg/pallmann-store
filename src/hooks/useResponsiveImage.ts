import { useState, useEffect } from 'react';

interface ResponsiveImageConfig {
  mobile: string;
  tablet?: string;
  desktop: string;
}

export function useResponsiveImage(config: ResponsiveImageConfig): string {
  const [imageSrc, setImageSrc] = useState(config.desktop);

  useEffect(() => {
    const updateImage = () => {
      const width = window.innerWidth;

      if (width <= 375) {
        setImageSrc(config.mobile);
      } else if (width <= 768 && config.tablet) {
        setImageSrc(config.tablet);
      } else {
        setImageSrc(config.desktop);
      }
    };

    updateImage();

    window.addEventListener('resize', updateImage);
    return () => window.removeEventListener('resize', updateImage);
  }, [config]);

  return imageSrc;
}

export function getResponsiveImageUrl(
  baseUrl: string,
  variant: 'mobile' | 'tablet' | 'desktop'
): string {
  if (baseUrl.includes('moi%20complet.png')) {
    switch (variant) {
      case 'mobile':
        return baseUrl.replace('moi%20complet.png', 'moi-complet-mobile.webp');
      case 'tablet':
        return baseUrl.replace('moi%20complet.png', 'moi-complet-tablet.webp');
      case 'desktop':
        return baseUrl.replace('moi%20complet.png', 'moi-complet-desktop.webp');
    }
  }

  if (baseUrl.includes('lesponceursreunis.jpg')) {
    switch (variant) {
      case 'mobile':
      case 'tablet':
        return baseUrl.replace('lesponceursreunis.jpg', 'lesponceursreunis-mobile.webp');
      case 'desktop':
        return baseUrl.replace('lesponceursreunis.jpg', 'lesponceursreunis-desktop.webp');
    }
  }

  if (baseUrl.includes('marque-alsace%20.jpg')) {
    return baseUrl.replace('marque-alsace%20.jpg', 'marque-alsace-optimized.webp');
  }

  return baseUrl;
}
