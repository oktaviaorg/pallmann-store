/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // BLEU TECH - Palette moderne
        primary: {
          DEFAULT: '#2563EB',
          dark: '#0F172A',
          light: '#3B82F6',
          50: '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          300: '#93C5FD',
          400: '#60A5FA',
          500: '#2563EB',
          600: '#1D4ED8',
          700: '#1E40AF',
          800: '#1E3A8A',
          900: '#0F172A',
        },
        // Accent Violet
        accent: {
          DEFAULT: '#7C3AED',
          light: '#EDE9FE',
          dark: '#5B21B6',
          50: '#F5F3FF',
          100: '#EDE9FE',
          200: '#DDD6FE',
          300: '#C4B5FD',
          400: '#A78BFA',
          500: '#7C3AED',
          600: '#6D28D9',
          700: '#5B21B6',
        },
        // Surfaces
        background: {
          DEFAULT: '#FFFFFF',
          alt: '#F8FAFC',
          card: '#FFFFFF',
        },
        // Texte
        text: {
          primary: '#0F172A',
          secondary: '#64748B',
          muted: '#94A3B8',
        },
        // Legacy - compatibilité
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
        // Succès
        success: {
          DEFAULT: '#10B981',
          light: '#D1FAE5',
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
        'gradient': 'gradient 8s ease infinite',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
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
        'gradient': {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
        },
        'pulseSoft': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
      },
      boxShadow: {
        'soft': '0 4px 20px rgba(15, 23, 42, 0.08)',
        'medium': '0 8px 30px rgba(15, 23, 42, 0.12)',
        'strong': '0 20px 40px rgba(15, 23, 42, 0.15)',
        'glow-blue': '0 0 30px rgba(37, 99, 235, 0.3)',
        'glow-violet': '0 0 30px rgba(124, 58, 237, 0.3)',
        'glow-gradient': '0 8px 32px rgba(37, 99, 235, 0.25), 0 4px 16px rgba(124, 58, 237, 0.15)',
        'card': '0 2px 8px rgba(15, 23, 42, 0.06), 0 4px 16px rgba(15, 23, 42, 0.04)',
        'card-hover': '0 8px 24px rgba(15, 23, 42, 0.12), 0 4px 12px rgba(37, 99, 235, 0.08)',
      },
      backgroundImage: {
        'gradient-tech': 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)',
        'gradient-tech-hover': 'linear-gradient(135deg, #1D4ED8 0%, #6D28D9 100%)',
        'gradient-hero': 'linear-gradient(135deg, #0F172A 0%, #1E3A8A 50%, #2563EB 100%)',
        'gradient-dark': 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
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
        '.bg-gradient-tech': {
          background: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)',
        },
        '.text-gradient-tech': {
          background: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)',
          '-webkit-background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
          'background-clip': 'text',
        },
      }
      addUtilities(newUtilities)
    }
  ],
};
