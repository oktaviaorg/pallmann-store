/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // PALLMANN OFFICIEL
        primary: {
          DEFAULT: '#FF9900',
          dark: '#E68A00',
          light: '#FFB340',
          hover: '#F0C300',
          50: '#FFF8E6',
          100: '#FFECC4',
          200: '#FFD98A',
          300: '#FFC650',
          400: '#FFB316',
          500: '#FF9900',
          600: '#E68A00',
          700: '#B36B00',
          800: '#804D00',
          900: '#4D2E00',
        },
        // Fond sombre
        dark: {
          DEFAULT: '#1A1A1A',
          50: '#F5F5F5',
          100: '#E5E5E5',
          200: '#D4D4D4',
          300: '#A3A3A3',
          400: '#737373',
          500: '#525252',
          600: '#404040',
          700: '#2D2D2D',
          800: '#1A1A1A',
          900: '#0A0A0A',
        },
        // Bleu Pallmann (accent)
        pallmann: {
          blue: '#143D59',
          gray: '#3c4650',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 2px 8px rgba(0,0,0,0.08)',
        'card-hover': '0 8px 24px rgba(0,0,0,0.12)',
      },
    },
  },
  plugins: [],
};
