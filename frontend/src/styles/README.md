# Advanced Theme System with Dark/Light Mode Support

This directory contains an advanced theming system for the application that supports both dark and light modes.

## Structure

- `theme.ts` - Defines color palettes and styling tokens for both dark and light themes
- `ThemeContext.tsx` - Provides context and hooks for theme switching functionality
- `GlobalStyle.ts` - Global styles with theme-aware styling
- `colors.ts` - Helper functions and hooks to access theme values

## Features

- **Theme Toggle**: Switch between dark and light themes with a toggle
- **System Preference Detection**: Automatically detects and applies system dark/light mode preference
- **Persistent Preference**: Saves user theme preference in localStorage
- **Smooth Transitions**: Includes transitions for a smooth theme switching experience
- **Type-Safe**: Fully typed theme properties with TypeScript
- **Component Access**: Multiple ways to access theme values in components

## How to Use

### In Components with Styled-Components

```tsx
import styled from 'styled-components';

const Button = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.text};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  padding: ${({ theme }) => theme.space.sm} ${({ theme }) => theme.space.md};
  
  /* Theme mode specific styling */
  ${({ theme }) => theme.mode === 'dark' && `
    box-shadow: 0 0 10px rgba(124, 58, 237, 0.5);
  `}
  
  ${({ theme }) => theme.mode === 'light' && `
    box-shadow: 0 0 10px rgba(124, 58, 237, 0.2);
  `}
`;
```

### In Regular Components with the useThemeColors Hook

```tsx
import React from 'react';
import { useThemeColors } from '../styles/colors';

const MyComponent = () => {
  // Get current theme colors and helpers, automatically updates when theme changes
  const { colors, getSpace, getBorderRadius } = useThemeColors();
  
  const cardStyle = {
    backgroundColor: colors.backgroundLight,
    padding: getSpace('md'),
    borderRadius: getBorderRadius('medium'),
    color: colors.text,
  };
  
  return <div style={cardStyle}>This component uses the current theme</div>;
};
```

### Toggling the Theme

```tsx
import React from 'react';
import { useTheme } from '../styles/ThemeContext';

const ThemeSwitcher = () => {
  const { themeMode, toggleTheme } = useTheme();
  
  return (
    <button onClick={toggleTheme}>
      Switch to {themeMode === 'dark' ? 'Light' : 'Dark'} Mode
    </button>
  );
};
```

### In CSS Files (via CSS Variables)

The theme system also exports CSS variables for use in regular CSS:

```css
.my-class {
  color: var(--color-text);
  background-color: var(--color-background-light);
}
```

## Theme Properties

### Colors

- `primary`, `primaryDark`, `primaryLight` - Brand colors
- `background`, `backgroundLight`, `backgroundTransparent` - Background colors
- `text`, `textSecondary`, `textHover`, `textLink` - Text colors
- `border`, `borderHover` - Border colors
- `success`, `error`, `warning`, `info` - Status colors
- `shadowLight`, `shadowMedium`, `shadowDark` - Shadow base colors

### Spacing

- `xs`, `sm`, `md`, `lg`, `xl`, `xxl` - Consistent spacing values

### Typography

- Font sizes: `xs`, `sm`, `md`, `lg`, `xl`, `xxl`, `xxxl`
- Font weights: `light`, `regular`, `medium`, `semiBold`, `bold`

### Other Properties

- Border radius: `small`, `medium`, `large`, `pill`
- Shadows: `small`, `medium`, `large`, `xl`, `card`, `elevated`
- Breakpoints: `xs`, `sm`, `md`, `lg`, `xl`
- Transitions: `fast`, `normal`, `slow`
- Z-indices: `base`, `overlay`, `modal`, `tooltip`

## Best Practices

- Use the theme context hooks instead of importing static values
- Always use theme properties instead of hardcoded values
- Use conditional styling based on theme.mode when needed
- Consider accessibility when designing color contrasts for both modes 