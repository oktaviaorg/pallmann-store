/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Nouvelle palette Bleu Moderne
        primary: {
          50: '#EBF4FF',
          100: '#C3DAFE',
          200: '#A3BFFA',
          300: '#7F9CF5',
          400: '#667EEA',
          500: '#2C5282',
          600: '#1E3A5F',
          700: '#1A365D',
          800: '#153E75',
          900: '#1A365D',
        },
        // Accent Pallmann Orange - uniquement boutons et CTA
        accent: {
          DEFAULT: '#FBA600',
          hover: '#E09500',
          light: '#FBBF24',
          50: '#FFFBEB',
          100: '#FEF3C7',
          500: '#FBA600',
          600: '#E09500',
          700: '#B45309',
        },
        // Couleurs de fond
        surface: {
          white: '#FFFFFF',
          light: '#F7FAFC',
          blue: '#EBF4FF',
        },
        // Texte
        text: {
          primary: '#1E3A5F',
          secondary: '#2D3748',
          muted: '#64748B',
          light: '#94A3B8',
        },
        // Legacy - garder pour compatibilité
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
          900: '#0f172a',
        },
        // Navy pour le footer
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
          900: '#1E3A5F',
        },
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
      },
      spacing: {
        '15': '3.75rem',
        '17': '4.25rem',
        '18': '4.5rem',
        '88': '22rem',
        '112': '28rem',
        '128': '32rem',
      },
      borderRadius: {
        'xs': '0.25rem',
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      animation: {
        'shimmer': 'shimmer 4s linear infinite',
        'fade-in': 'fadeIn 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'slide-up': 'slideUp 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'scale-in': 'scaleIn 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards',
      },
      keyframes: {
        'shimmer': {
          '0%': { 'background-position': '200% 50%' },
          '100%': { 'background-position': '-200% 50%' },
        },
        'fadeIn': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slideUp': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'scaleIn': {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      boxShadow: {
        'soft': '0 4px 20px rgba(30, 58, 95, 0.08)',
        'medium': '0 8px 30px rgba(30, 58, 95, 0.12)',
        'strong': '0 20px 40px rgba(30, 58, 95, 0.15)',
        'glow-orange': '0 0 20px rgba(251, 166, 0, 0.3)',
        'card': '0 2px 8px rgba(30, 58, 95, 0.08), 0 4px 16px rgba(30, 58, 95, 0.04)',
      },
      screens: {
        'xxs': '320px',
        'xs': '475px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
    },
  },
  plugins: [
    function({ addUtilities }) {
      const newUtilities = {
        '.safe-area-inset-top': {
          paddingTop: 'env(safe-area-inset-top)',
        },
        '.safe-area-inset-bottom': {
          paddingBottom: 'env(safe-area-inset-bottom)',
        },
        '.touch-manipulation': {
          touchAction: 'manipulation',
        },
      }
      addUtilities(newUtilities)
    }
  ],
};
