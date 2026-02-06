/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Pallmann Orange - couleur principale
        primary: {
          50: '#fff7f0',
          100: '#ffede0',
          200: '#ffd9bf',
          300: '#ffb580',
          400: '#ff8c40',
          500: '#FF6600',
          600: '#e65c00',
          700: '#cc5200',
          800: '#a34200',
          900: '#7a3100',
        },
        // Ancien primary gold (legacy)
        gold: {
          50: '#fefbf3',
          100: '#fef7e6',
          200: '#fdecc0',
          300: '#fbd894',
          400: '#FFD36D',
          500: '#E6B85A',
          600: '#d4a853',
          700: '#b8944a',
          800: '#9d7f3f',
          900: '#826a34',
        },
        secondary: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#181D27',
        },
        accent: {
          50: '#fff7f0',
          100: '#ffede0',
          200: '#ffd9bf',
          300: '#ffb580',
          400: '#ff8c40',
          500: '#FF6600',
          600: '#e65c00',
          700: '#cc5200',
          800: '#a34200',
          900: '#7a3100',
        },
        // Couleur complémentaire bleu marine profond
        navy: {
          50: '#f0f4f8',
          100: '#d9e2ec',
          200: '#bcccdc',
          300: '#9fb3c8',
          400: '#829ab1',
          500: '#627d98',
          600: '#486581',
          700: '#334e68',
          800: '#243b53',
          900: '#0f1b2b',
        },
        // Couleur d'accent moderne - vert sauge
        sage: {
          50: '#f6f8f6',
          100: '#e3e8e3',
          200: '#c7d2c7',
          300: '#a4b5a4',
          400: '#7d947d',
          500: '#5a7a5a',
          600: '#4a6b4a',
          700: '#3d5a3d',
          800: '#334a33',
          900: '#2a3d2a',
        },
        // Nouvelles couleurs familiales et chaleureuses
        warm: {
          50: '#fefaf8',
          100: '#fdf2e9',
          200: '#fae5d3',
          300: '#f6d5b7',
          400: '#f1c27d',
          500: '#e8a317',
          600: '#d18712',
          700: '#b86f0f',
          800: '#975a0c',
          900: '#7c4a0a',
        },
        earth: {
          50: '#f9f7f4',
          100: '#f0ebe2',
          200: '#e4d5c1',
          300: '#d4ba9a',
          400: '#c19a6b',
          500: '#b17d47',
          600: '#9d6b3c',
          700: '#825732',
          800: '#6b472b',
          900: '#573a25',
        },
        family: {
          50: '#fdf9f7',
          100: '#f8f0eb',
          200: '#f0ddd2',
          300: '#e5c4b0',
          400: '#d7a485',
          500: '#c8825d',
          600: '#b86a42',
          700: '#9a5635',
          800: '#7d472f',
          900: '#653c28',
        },
        // Enhanced color system for better contrast and accessibility
        background: {
          light: '#0f1b2b',
          'light-alt': '#142237',
          'light-card': 'rgba(255, 255, 255, 0.9)',
          dark: '#0f1b2b',
          'dark-alt': '#142237',
          'dark-card': 'rgba(20, 34, 55, 0.85)',
        },
        text: {
          'primary-light': '#ffffff',
          'secondary-light': '#ffffff',
          'muted-light': '#9bb0c3',
        },
        // Additional accent colors for better visual hierarchy
        accent: {
          blue: '#486581',
          green: '#5a7a5a',
          purple: '#8b5cf6',
          orange: '#d9b45a',
          red: '#ef4444',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Montserrat', 'sans-serif'],
        display: ['Montserrat', 'sans-serif'],
      },
      fontSize: {
        'xxs': ['0.625rem', { lineHeight: '1.4' }],
        'xs': ['0.75rem', { lineHeight: '1.5' }],
        'sm': ['0.875rem', { lineHeight: '1.6' }],
        'base': ['1rem', { lineHeight: '1.7' }],
        'lg': ['1.125rem', { lineHeight: '1.7' }],
        'xl': ['1.25rem', { lineHeight: '1.7' }],
        '2xl': ['1.5rem', { lineHeight: '1.6' }],
        '3xl': ['1.875rem', { lineHeight: '1.5' }],
        '4xl': ['2.25rem', { lineHeight: '1.4' }],
        '5xl': ['3rem', { lineHeight: '1.3' }],
        '6xl': ['3.75rem', { lineHeight: '1.2' }],
        // Tailles spécifiques mobile
        'mobile-xs': ['0.75rem', { lineHeight: '1.4' }],
        'mobile-sm': ['0.875rem', { lineHeight: '1.5' }],
        'mobile-base': ['1rem', { lineHeight: '1.6' }],
        'mobile-lg': ['1.125rem', { lineHeight: '1.6' }],
      },
      spacing: {
        '15': '3.75rem',
        '17': '4.25rem',
        '18': '4.5rem',
        '88': '22rem',
        '112': '28rem',
        '128': '32rem',
        // Espacements mobiles optimisés
        'mobile-xs': '0.25rem',
        'mobile-sm': '0.5rem',
        'mobile-md': '0.75rem',
        'mobile-lg': '1rem',
        'mobile-xl': '1.25rem',
      },
      borderRadius: {
        'xs': '0.25rem',
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
        // Rayons mobiles
        'mobile': '0.5rem',
        'mobile-lg': '0.75rem',
      },
      animation: {
        'shimmer': 'shimmer 4s linear infinite',
        'fade-in': 'fadeIn 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'slide-up': 'slideUp 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'scale-in': 'scaleIn 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'bounce-subtle': 'bounceSubtle 2s infinite',
        // Animations mobiles réduites
        'mobile-fade': 'fadeIn 0.3s ease-out',
        'mobile-slide': 'slideUp 0.2s ease-out',
      },
      keyframes: {
        'shimmer': {
          '0%': { 'background-position': '200% 50%' },
          '100%': { 'background-position': '-200% 50%' },
        },
        'fadeIn': {
          '0%': { 
            opacity: '0', 
            transform: 'translateY(30px) scale(0.95)' 
          },
          '100%': { 
            opacity: '1', 
            transform: 'translateY(0) scale(1)' 
          },
        },
        'slideUp': {
          '0%': { 
            opacity: '0', 
            transform: 'translateY(20px)' 
          },
          '100%': { 
            opacity: '1', 
            transform: 'translateY(0)' 
          },
        },
        'scaleIn': {
          '0%': { 
            opacity: '0', 
            transform: 'scale(0.9)' 
          },
          '100%': { 
            opacity: '1', 
            transform: 'scale(1)' 
          },
        },
        'bounceSubtle': {
          '0%, 100%': { 
            transform: 'translateY(0)' 
          },
          '50%': { 
            transform: 'translateY(-5px)' 
          },
        },
      },
      backdropBlur: {
        'xs': '2px',
        'sm': '4px',
        'md': '8px',
        'lg': '16px',
        'xl': '24px',
        '2xl': '40px',
        '3xl': '64px',
      },
      boxShadow: {
        'soft': '0 4px 20px rgba(0, 0, 0, 0.08)',
        'medium': '0 8px 30px rgba(0, 0, 0, 0.12)',
        'strong': '0 20px 40px rgba(0, 0, 0, 0.2)',
        'glow': '0 0 20px rgba(255, 102, 0, 0.3)',
        'glow-lg': '0 0 40px rgba(255, 102, 0, 0.5)',
      },
      // Ajout de classes utilitaires mobiles
      extend: {
        minHeight: {
          'mobile': '100dvh', // Dynamic viewport height pour mobile
        },
        maxWidth: {
          'mobile': 'calc(100vw - 2rem)',
        },
      },
      screens: {
        'xxs': '320px',
        'xs': '475px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
        '3xl': '1920px',
      },
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },
    },
  },
  plugins: [
    // Plugin pour les utilitaires mobiles
    function({ addUtilities }) {
      const newUtilities = {
        '.safe-area-inset-top': {
          paddingTop: 'env(safe-area-inset-top)',
        },
        '.safe-area-inset-bottom': {
          paddingBottom: 'env(safe-area-inset-bottom)',
        },
        '.safe-area-inset-left': {
          paddingLeft: 'env(safe-area-inset-left)',
        },
        '.safe-area-inset-right': {
          paddingRight: 'env(safe-area-inset-right)',
        },
        '.touch-manipulation': {
          touchAction: 'manipulation',
        },
        '.scroll-smooth-mobile': {
          scrollBehavior: 'smooth',
          '-webkit-overflow-scrolling': 'touch',
        },
      }
      addUtilities(newUtilities)
    }
  ],
};