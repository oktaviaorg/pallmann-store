import React, { ReactNode } from 'react';

interface SEOEnhancerProps {
  children: ReactNode;
}

const SEOEnhancer: React.FC<SEOEnhancerProps> = ({ children }) => {
  return <>{children}</>;
};

export default SEOEnhancer;
