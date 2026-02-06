import React from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  loading?: 'eager' | 'lazy';
  fetchpriority?: 'high' | 'low' | 'auto';
  srcSetMobile?: string;
  srcSetTablet?: string;
  srcSetDesktop?: string;
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = '',
  loading = 'lazy',
  fetchpriority = 'auto',
  srcSetMobile,
  srcSetTablet,
  srcSetDesktop,
}: OptimizedImageProps) {
  const hasSrcSet = srcSetMobile || srcSetTablet || srcSetDesktop;

  if (hasSrcSet) {
    const srcSet = [
      srcSetMobile && `${srcSetMobile} 375w`,
      srcSetTablet && `${srcSetTablet} 768w`,
      srcSetDesktop && `${srcSetDesktop} 1920w`,
    ]
      .filter(Boolean)
      .join(', ');

    const sizes = '(max-width: 375px) 375px, (max-width: 768px) 768px, 1920px';

    return (
      <img
        src={srcSetDesktop || srcSetTablet || srcSetMobile || src}
        srcSet={srcSet}
        sizes={sizes}
        alt={alt}
        width={width}
        height={height}
        className={className}
        loading={loading}
        fetchpriority={fetchpriority}
      />
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      loading={loading}
      fetchpriority={fetchpriority}
    />
  );
}
