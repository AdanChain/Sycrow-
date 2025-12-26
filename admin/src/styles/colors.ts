import { useTheme } from './ThemeContext';
import { darkTheme, lightTheme } from './theme';
import type { Theme } from './theme';

// This file provides direct access to colors and other theme values
// for use in places where you might not have access to the theme via styled-components

// Helper hook to get current theme's colors and properties
export const useThemeColors = () => {
  const { themeMode } = useTheme();
  const currentTheme: Theme = themeMode === 'dark' ? darkTheme : lightTheme;
  
  return {
    colors: currentTheme.colors,
    space: currentTheme.space,
    borderRadius: currentTheme.borderRadius,
    fontSizes: currentTheme.fontSizes,
    shadows: currentTheme.shadows,
    mode: currentTheme.mode,
    
    // Helper functions
    getColor: (colorName: keyof typeof currentTheme.colors): string => {
      return currentTheme.colors[colorName];
    },
    
    getSpace: (spaceName: keyof typeof currentTheme.space): string => {
      return currentTheme.space[spaceName];
    },
    
    getBorderRadius: (size: keyof typeof currentTheme.borderRadius): string => {
      return currentTheme.borderRadius[size];
    },
    
    getFontSize: (size: keyof typeof currentTheme.fontSizes): string => {
      return currentTheme.fontSizes[size];
    },
    
    getShadow: (size: keyof typeof currentTheme.shadows): string => {
      return currentTheme.shadows[size];
    },
  };
};

// Static default theme values for non-React contexts
// Note: These won't update with theme changes but are useful for static imports
export const defaultColors = darkTheme.colors;
export const defaultSpace = darkTheme.space;
export const defaultBorderRadius = darkTheme.borderRadius;
export const defaultFontSizes = darkTheme.fontSizes;
export const defaultShadows = darkTheme.shadows;

// Static helper functions for non-React contexts
export const getColor = (colorName: keyof typeof darkTheme.colors): string => {
  return darkTheme.colors[colorName];
};

export const getSpace = (spaceName: keyof typeof darkTheme.space): string => {
  return darkTheme.space[spaceName];
};

export const getBorderRadius = (size: keyof typeof darkTheme.borderRadius): string => {
  return darkTheme.borderRadius[size];
};

export const getFontSize = (size: keyof typeof darkTheme.fontSizes): string => {
  return darkTheme.fontSizes[size];
};

export const getShadow = (size: keyof typeof darkTheme.shadows): string => {
  return darkTheme.shadows[size];
}; 