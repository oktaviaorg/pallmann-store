import React from 'react';
import { Helmet } from 'react-helmet';

interface GoogleSearchConsoleProps {
  verificationCode: string;
}

const GoogleSearchConsole: React.FC<GoogleSearchConsoleProps> = ({ verificationCode }) => {
  return (
    <Helmet>
      <meta name="google-site-verification" content={verificationCode} />
    </Helmet>
  );
};

export default GoogleSearchConsole;
