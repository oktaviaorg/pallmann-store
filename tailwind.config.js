/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // BOIS TECH - Palette chaleureuse premium
        primary: {
          DEFAULT: '#C4943D',  // Or chaud / Ambre
          dark: '#8B5A2B',     // Brun bois
          light: '#D4A853',    // Or clair
          50: '#FDF8F0',
          100: '#F9EDDA',
          200: '#F0D9B5',
          300: '#E5C28A',
          400: '#D4A853',
          500: '#C4943D',
          600: '#A67C2E',
          700: '#8B5A2B',
          800: '#6B4423',
          900: '#4A2C17',
        },
        // Accent Vert Forêt
        accent: {
          DEFAULT: '#2E7D32',  // Vert forêt
          light: '#E8F5E9',
          dark: '#1B5E20',
          50: '#E8F5E9',
          100: '#C8E6C9',
          200: '#A5D6A7',
          300: '#81C784',
          400: '#66BB6A',
          500: '#4CAF50',
          600: '#43A047',
          700: '#2E7D32',
          800: '#1B5E20',
        },
        // Surfaces chaudes
        background: {
          DEFAULT: '#FFFCF8',  // Blanc cassé chaud
          alt: '#FDF8F3',      // Crème
          card: '#FFFFFF',
          warm: '#F5EFE6',     // Beige doux
        },
        // Brun bois secondaire
        wood: {
          50: '#FAF6F1',
          100: '#F0E6D8',
          200: '#E0CDB5',
          300: '#C9A87C',
          400: '#B08B5B',
          500: '#8B5A2B',
          600: '#6B4423',
          700: '#4A2C17',
          800: '#3D2412',
          900: '#2D1A0D',
        },
        // Texte
        text: {
          primary: '#2D1A0D',   // Brun très foncé
          secondary: '#6B4423', // Brun moyen
          muted: '#A08060',     // Brun clair
        },
        // Legacy - compatibilité
        secondary: {
          50: '#FAF6F1',
          100: '#F0E6D8',
          200: '#E0CDB5',
          300: '#C9A87C',
          400: '#A08060',
          500: '#8B5A2B',
          600: '#6B4423',
          700: '#4A2C17',
          800: '#3D2412',
          900: '#2D1A0D',
        },
        // Succès
        success: {
          DEFAULT: '#2E7D32',
          light: '#E8F5E9',
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
        'soft': '0 4px 20px rgba(45, 26, 13, 0.08)',
        'medium': '0 8px 30px rgba(45, 26, 13, 0.12)',
        'strong': '0 20px 40px rgba(45, 26, 13, 0.15)',
        'glow-gold': '0 0 30px rgba(196, 148, 61, 0.3)',
        'glow-green': '0 0 30px rgba(46, 125, 50, 0.3)',
        'glow-gradient': '0 8px 32px rgba(196, 148, 61, 0.25), 0 4px 16px rgba(139, 90, 43, 0.15)',
        'card': '0 2px 8px rgba(45, 26, 13, 0.06), 0 4px 16px rgba(45, 26, 13, 0.04)',
        'card-hover': '0 8px 24px rgba(45, 26, 13, 0.12), 0 4px 12px rgba(196, 148, 61, 0.08)',
      },
      backgroundImage: {
        'gradient-wood': 'linear-gradient(135deg, #C4943D 0%, #8B5A2B 100%)',
        'gradient-wood-hover': 'linear-gradient(135deg, #D4A853 0%, #A67C2E 100%)',
        'gradient-hero': 'linear-gradient(135deg, #2D1A0D 0%, #4A2C17 30%, #8B5A2B 70%, #C4943D 100%)',
        'gradient-dark': 'linear-gradient(135deg, #2D1A0D 0%, #3D2412 100%)',
        'gradient-warm': 'linear-gradient(135deg, #FDF8F3 0%, #F5EFE6 100%)',
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
        '.bg-gradient-wood': {
          background: 'linear-gradient(135deg, #C4943D 0%, #8B5A2B 100%)',
        },
        '.text-gradient-wood': {
          background: 'linear-gradient(135deg, #C4943D 0%, #8B5A2B 100%)',
          '-webkit-background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
          'background-clip': 'text',
        },
      }
      addUtilities(newUtilities)
    }
  ],
};
