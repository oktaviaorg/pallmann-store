import React, { ReactNode } from 'react';

interface SEOCanonicalOptimizerProps {
  children: ReactNode;
}

const SEOCanonicalOptimizer: React.FC<SEOCanonicalOptimizerProps> = ({ children }) => {
  return <>{children}</>;
};

export default SEOCanonicalOptimizer;
