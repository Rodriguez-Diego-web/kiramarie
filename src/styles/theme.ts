export const theme = {
  colors: {
    primary: '#cdaffd',     // Lavendel/Lila
    secondary: '#000000',
    accent: '#cdaffd',     // Lavendel/Lila
    text: '#333333',
    textLight: '#666666',
    background: '#ffffff',
    backgroundAlt: '#f9f9f9',
    shadow: 'rgba(0, 0, 0, 0.05)',
  },
  fonts: {
    body: "'Cormorant Garamond', serif",
    heading: "'Montserrat', sans-serif",
  },
  fontSizes: {
    small: '0.875rem',
    regular: '1rem',
    medium: '1.25rem',
    large: '1.5rem',
    xlarge: '2rem',
    xxlarge: '3rem',
  },
  breakpoints: {
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px',
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    xxl: '3rem',
  },
  borderRadius: {
    small: '2px',
    medium: '4px',
    large: '8px',
    round: '50%',
  },
  transitions: {
    default: 'all 0.3s ease',
    fast: 'all 0.2s ease',
    slow: 'all 0.5s ease',
  },
  shadows: {
    small: '0 2px 4px rgba(0, 0, 0, 0.05)',
    medium: '0 4px 6px rgba(0, 0, 0, 0.05)',
    large: '0 10px 15px rgba(0, 0, 0, 0.05)',
  },
};

export type Theme = typeof theme;
