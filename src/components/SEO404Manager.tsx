import React, { ReactNode } from 'react';

interface SEO404ManagerProps {
  children: ReactNode;
}

const SEO404Manager: React.FC<SEO404ManagerProps> = ({ children }) => {
  return <>{children}</>;
};

export default SEO404Manager;
