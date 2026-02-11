// Thème Pallmann Store - Inspiré de pallmann.net
export const theme = {
  colors: {
    // Couleurs principales
    primary: '#C41E3A',      // Rouge Pallmann
    primaryDark: '#9B1830',  // Rouge foncé (hover)
    primaryLight: '#E8354F', // Rouge clair
    
    // Neutres
    dark: '#1A1A1A',         // Noir profond
    gray900: '#2D2D2D',      // Textes principaux
    gray700: '#4A4A4A',      // Textes secondaires
    gray500: '#6B6B6B',      // Textes légers
    gray300: '#D1D1D1',      // Bordures
    gray100: '#F5F5F5',      // Fond sections
    white: '#FFFFFF',
    
    // Accents
    success: '#22C55E',
    warning: '#F59E0B',
    info: '#3B82F6',
    
    // Dégradés
    gradientPrimary: 'linear-gradient(135deg, #C41E3A 0%, #9B1830 100%)',
    gradientDark: 'linear-gradient(180deg, #1A1A1A 0%, #2D2D2D 100%)',
  },
  
  // Ombres
  shadows: {
    sm: '0 1px 2px rgba(0,0,0,0.05)',
    md: '0 4px 6px rgba(0,0,0,0.1)',
    lg: '0 10px 25px rgba(0,0,0,0.15)',
    xl: '0 20px 40px rgba(0,0,0,0.2)',
  },
  
  // Animations
  transitions: {
    fast: '150ms ease',
    normal: '300ms ease',
    slow: '500ms ease',
  }
};

// Classes Tailwind personnalisées
export const pallmannClasses = {
  // Boutons
  btnPrimary: 'bg-[#C41E3A] hover:bg-[#9B1830] text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5',
  btnSecondary: 'bg-white border-2 border-[#C41E3A] text-[#C41E3A] hover:bg-[#C41E3A] hover:text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300',
  btnDark: 'bg-[#1A1A1A] hover:bg-[#2D2D2D] text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300',
  
  // Cards
  card: 'bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden',
  cardHover: 'transform hover:-translate-y-1',
  
  // Sections
  sectionLight: 'bg-[#F5F5F5]',
  sectionDark: 'bg-[#1A1A1A] text-white',
  
  // Textes
  heading1: 'text-4xl md:text-5xl lg:text-6xl font-bold text-[#1A1A1A]',
  heading2: 'text-3xl md:text-4xl font-bold text-[#1A1A1A]',
  heading3: 'text-xl md:text-2xl font-semibold text-[#2D2D2D]',
  textMuted: 'text-[#6B6B6B]',
};
