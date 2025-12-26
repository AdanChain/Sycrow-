// Define common theme values that don't change between light and dark modes
const commonTheme = {
  space: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    xxl: '3rem',
  },
  borderRadius: {
    small: '4px',
    medium: '8px',
    large: '12px',
    pill: '9999px',
  },
  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    xxl: '1.5rem',
    xxxl: '2rem',
  },
  fontWeights: {
    light: 300,
    regular: 400,
    medium: 500,
    semiBold: 600,
    bold: 700,
  },
  breakpoints: {
    xs: '320px',
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px',
  },
  transitions: {
    fast: '0.2s ease',
    normal: '0.3s ease',
    slow: '0.5s ease',
  },
  zIndices: {
    base: 0,
    overlay: 10,
    modal: 100,
    tooltip: 500,
  },
};

// Dark theme colors
const darkColors = {
  // Primary Colors
  primary: '#7C3AED',  // Rich purple
  primaryDark: '#1E1B4B',  // Deep indigo
  primaryLight: '#F5F3FF',  // Light purple

  // Background Colors
  background: '#0F172A',  // Dark slate
  backgroundLight: '#1E293B',  // Slightly lighter slate
  backgroundTransparent: 'rgba(255, 255, 255, 0.05)',
  backgroundElevated: '#24365B', // For cards and elevated surfaces

  // Text Colors
  text: '#F8FAFC',  // Off white
  textSecondary: 'rgba(248, 250, 252, 0.7)',  // Semi-transparent off white
  textHover: 'rgba(248, 250, 252, 0.9)',  // More opaque off white
  textLink: '#A78BFA',  // Light purple

  // Border Colors
  border: 'rgba(255, 255, 255, 0.2)',
  borderHover: 'rgba(255, 255, 255, 0.3)',

  // Status Colors
  success: '#10B981',  // Emerald
  error: '#EF4444',  // Red
  warning: '#F59E0B',  // Amber
  info: '#3B82F6',  // Blue
  
  // Shadow Colors
  shadowLight: 'rgba(0, 0, 0, 0.1)',
  shadowMedium: 'rgba(0, 0, 0, 0.15)',
  shadowDark: 'rgba(0, 0, 0, 0.2)',
};

// Light theme colors
const lightColors = {
  // Primary Colors
  primary: '#7C3AED',  // Keep the same purple
  primaryDark: '#5B21B6',  // Adjusted to be visible on light background
  primaryLight: '#EDE9FE',  // Lighter purple for light theme

  // Background Colors
  background: '#F8FAFC',  // Light background
  backgroundLight: '#F1F5F9',  // Even lighter bg
  backgroundTransparent: 'rgba(15, 23, 42, 0.05)',  // Semi-transparent dark
  backgroundElevated: '#FFFFFF', // For cards and elevated surfaces

  // Text Colors
  text: '#0F172A',  // Dark text for light theme
  textSecondary: 'rgba(15, 23, 42, 0.7)',  // Semi-transparent dark
  textHover: 'rgba(15, 23, 42, 0.9)',  // More opaque dark
  textLink: '#6D28D9',  // Darker purple for better contrast

  // Border Colors
  border: 'rgba(15, 23, 42, 0.1)',  // Very light border
  borderHover: 'rgba(15, 23, 42, 0.2)',  // Darker on hover

  // Status Colors - keeping similar for consistency but adjusting for light theme
  success: '#059669',  // Slightly darker emerald
  error: '#DC2626',  // Slightly darker red
  warning: '#D97706',  // Slightly darker amber
  info: '#2563EB',  // Slightly darker blue
  
  // Shadow Colors
  shadowLight: 'rgba(15, 23, 42, 0.05)',
  shadowMedium: 'rgba(15, 23, 42, 0.1)',
  shadowDark: 'rgba(15, 23, 42, 0.15)',
};

// Generate shadows based on theme colors
const generateShadows = (colors: typeof darkColors | typeof lightColors) => ({
  small: `0 1px 3px ${colors.shadowLight}, 0 1px 2px ${colors.shadowMedium}`,
  medium: `0 3px 6px ${colors.shadowMedium}, 0 2px 4px ${colors.shadowLight}`,
  large: `0 10px 20px ${colors.shadowMedium}, 0 3px 6px ${colors.shadowDark}`,
  xl: `0 15px 25px ${colors.shadowDark}, 0 5px 10px ${colors.shadowMedium}`,
  card: `0 2px 5px ${colors.shadowLight}`,
  elevated: `0 4px 8px ${colors.shadowMedium}, 0 1px 3px ${colors.shadowLight}`,
});

// Type declarations
export type ThemeMode = 'light' | 'dark';

// Create complete themes by combining shared properties with color schemes
export const darkTheme = {
  ...commonTheme,
  colors: darkColors,
  shadows: generateShadows(darkColors),
  mode: 'dark' as ThemeMode,
};

export const lightTheme = {
  ...commonTheme,
  colors: lightColors,
  shadows: generateShadows(lightColors),
  mode: 'light' as ThemeMode,
};

// Default to dark theme
export const theme = darkTheme;

// Type for the theme
export type Theme = typeof darkTheme;

// For styled-components
declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
} 