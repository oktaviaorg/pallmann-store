import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../lib/ThemeProvider';

interface ThemeToggleProps {
  className?: string;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = '' }) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      className={`relative flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ${
        isDark 
          ? 'bg-gray-700 hover:bg-gray-600 text-amber-400' 
          : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
      } ${className}`}
      title={isDark ? 'Passer en mode clair' : 'Passer en mode sombre'}
      aria-label={isDark ? 'Activer le mode clair' : 'Activer le mode sombre'}
    >
      {/* Sun icon */}
      <Sun 
        className={`w-5 h-5 absolute transition-all duration-300 ${
          isDark 
            ? 'opacity-0 rotate-90 scale-0' 
            : 'opacity-100 rotate-0 scale-100'
        }`} 
      />
      {/* Moon icon */}
      <Moon 
        className={`w-5 h-5 absolute transition-all duration-300 ${
          isDark 
            ? 'opacity-100 rotate-0 scale-100' 
            : 'opacity-0 -rotate-90 scale-0'
        }`} 
      />
    </button>
  );
};

// Alternative switch style
export const ThemeSwitch: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      className={`relative inline-flex items-center h-7 w-14 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 ${
        isDark ? 'bg-gray-700' : 'bg-gray-200'
      } ${className}`}
      role="switch"
      aria-checked={isDark}
      aria-label="Toggle dark mode"
    >
      {/* Track icons */}
      <span className="absolute left-1.5 text-amber-400">
        <Sun className="w-4 h-4" />
      </span>
      <span className="absolute right-1.5 text-gray-400">
        <Moon className="w-4 h-4" />
      </span>
      
      {/* Sliding circle */}
      <span
        className={`absolute w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
          isDark ? 'translate-x-8' : 'translate-x-1'
        }`}
      />
    </button>
  );
};

export default ThemeToggle;
