/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // PALLMANN PRO - Style professionnel tech
        primary: {
          DEFAULT: '#E67E22',  // Orange Pallmann
          dark: '#D35400',
          light: '#F39C12',
          50: '#FEF5E7',
          100: '#FCE4C4',
          200: '#F9D09D',
          300: '#F5B876',
          400: '#F1A04F',
          500: '#E67E22',
          600: '#D35400',
          700: '#A04000',
          800: '#6D2C00',
          900: '#3A1700',
        },
        // Bleu foncé pro
        dark: {
          DEFAULT: '#1A2634',
          50: '#F0F4F8',
          100: '#D9E2EC',
          200: '#BCCCDC',
          300: '#9FB3C8',
          400: '#829AB1',
          500: '#627D98',
          600: '#486581',
          700: '#334E68',
          800: '#243B53',
          900: '#1A2634',
        },
        // Surfaces
        background: {
          DEFAULT: '#FFFFFF',
          alt: '#F8FAFC',
          card: '#FFFFFF',
          dark: '#1A2634',
        },
        // Texte
        text: {
          primary: '#1A2634',
          secondary: '#627D98',
          muted: '#9FB3C8',
          light: '#FFFFFF',
        },
        // Accent vert succès
        accent: {
          DEFAULT: '#27AE60',
          light: '#E8F8F0',
          dark: '#1E8449',
        },
        // Legacy
        secondary: {
          50: '#F0F4F8',
          100: '#D9E2EC',
          200: '#BCCCDC',
          300: '#9FB3C8',
          400: '#829AB1',
          500: '#627D98',
          600: '#486581',
          700: '#334E68',
          800: '#243B53',
          900: '#1A2634',
        },
        success: {
          DEFAULT: '#27AE60',
          light: '#E8F8F0',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Montserrat', 'sans-serif'],
        display: ['Montserrat', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px rgba(26, 38, 52, 0.08)',
        'medium': '0 8px 30px rgba(26, 38, 52, 0.12)',
        'strong': '0 20px 40px rgba(26, 38, 52, 0.15)',
        'glow-orange': '0 0 30px rgba(230, 126, 34, 0.3)',
        'card': '0 2px 8px rgba(26, 38, 52, 0.06), 0 4px 16px rgba(26, 38, 52, 0.04)',
        'card-hover': '0 8px 24px rgba(26, 38, 52, 0.12), 0 4px 12px rgba(230, 126, 34, 0.08)',
      },
      backgroundImage: {
        'gradient-pro': 'linear-gradient(135deg, #E67E22 0%, #D35400 100%)',
        'gradient-hero': 'linear-gradient(135deg, #1A2634 0%, #243B53 40%, #334E68 100%)',
        'gradient-dark': 'linear-gradient(135deg, #1A2634 0%, #243B53 100%)',
      },
    },
  },
  plugins: [
    function({ addUtilities }) {
      const newUtilities = {
        '.bg-gradient-pro': {
          background: 'linear-gradient(135deg, #E67E22 0%, #D35400 100%)',
        },
        '.text-gradient-pro': {
          background: 'linear-gradient(135deg, #E67E22 0%, #D35400 100%)',
          '-webkit-background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
          'background-clip': 'text',
        },
      }
      addUtilities(newUtilities)
    }
  ],
};
