import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import GoogleSearchConsole from './components/GoogleSearchConsole';
import { AuthProvider } from './lib/AuthProvider';
import App from './App.tsx';
import SEOCanonicalOptimizer from './components/SEOCanonicalOptimizer';
import SEO404Manager from './components/SEO404Manager';
import SEOEnhancer from './components/SEOEnhancer';
import './lib/i18n';
import './index.css';

// Enable dark mode by default
document.documentElement.classList.add('dark');

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <GoogleSearchConsole verificationCode="google9c8e6d9ab2b50db7" />
      <AuthProvider>
        <Router>
          <SEOCanonicalOptimizer>
            <SEO404Manager>
              <SEOEnhancer>
                <App />
              </SEOEnhancer>
            </SEO404Manager>
          </SEOCanonicalOptimizer>
        </Router>
      </AuthProvider>
    </ErrorBoundary>
  </StrictMode>
);