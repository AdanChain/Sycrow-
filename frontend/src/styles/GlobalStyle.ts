import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  /* Reset and base styles */
  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
  }

  /* Responsive font sizing */
  html {
    font-size: 16px;
    transition: color 0.2s ease-in-out, background-color 0.2s ease-in-out;
    
    @media (max-width: 768px) {
      font-size: 14px;
    }
    
    @media (max-width: 480px) {
      font-size: 12px;
    }
  }

  /* Base styles */
  body {
    font-family: 'Poppins', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    transition: color 0.2s ease-in-out, background-color 0.2s ease-in-out;
    min-height: 100vh;
    overflow-x: hidden;
    width: 100%;
  }

  /* Responsive container */
  .container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
    
    @media (max-width: 1200px) {
      max-width: 960px;
    }
    
    @media (max-width: 992px) {
      max-width: 720px;
    }
    
    @media (max-width: 768px) {
      max-width: 540px;
    }
  }

  /* Typography */
  h1 {
    font-size: clamp(2rem, 5vw, 3.5rem);
    line-height: 1.2;
  }

  h2 {
    font-size: clamp(1.5rem, 4vw, 2.5rem);
    line-height: 1.3;
  }

  h3 {
    font-size: clamp(1.25rem, 3vw, 2rem);
    line-height: 1.4;
  }

  p {
    font-size: clamp(1rem, 2vw, 1.125rem);
    line-height: 1.6;
    color: ${({ theme }) => theme.colors.textSecondary};
    transition: color 0.2s ease;
  }

  /* Links */
  a {
    color: ${({ theme }) => theme.colors.textLink};
    text-decoration: none;
    transition: color 0.2s ease;
    
    &:hover {
      color: ${({ theme }) => theme.colors.primary};
    }
  }

  /* Form elements */
  button, input, textarea, select {
    font-family: 'Poppins', sans-serif;
    transition: background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease;
    font-size: 1rem;
  }

  /* Connect Button Styles */
  .connect-button {
    padding: 0.75rem 1rem;
    border-radius: ${({ theme }) => theme.borderRadius.medium};
    width: 100%;
    display: block;
    font-size: 1rem;
    font-weight: 700;
    border: none;
    color: ${({ theme }) => theme.colors.textLink};
    background-color: transparent;
    transition: background-color 0.2s ease, color 0.2s ease;

    @media (max-width: 768px) {
      padding: 0.5rem 0.75rem;
      font-size: 0.875rem;
    }

    &:hover {
      background-color: ${({ theme }) => theme.colors.backgroundLight};
      color: ${({ theme }) => theme.colors.text};
    }
  }

  /* RainbowKit Custom Styles */
  .rainbowkit-connect-modal {
    max-width: 90vw;
    max-height: 80vh;
    font-size: 1rem;
    
    @media (max-width: 768px) {
      max-height: 90vh;
      font-size: 0.875rem;
    }
  }

  /* Scrollbar styles */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  
  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.backgroundTransparent};
    border-radius: 4px;
  }
  
  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.textSecondary};
    border-radius: 4px;
    
    &:hover {
      background: ${({ theme }) => theme.colors.textHover};
    }
  }

  /* Selection styles */
  ::selection {
    background-color: ${({ theme }) => theme.colors.primary + '40'};
    color: ${({ theme }) => theme.colors.text};
  }

  /* CSS Variables */
  :root {
    --color-primary: ${({ theme }) => theme.colors.primary};
    --color-primary-dark: ${({ theme }) => theme.colors.primaryDark};
    --color-primary-light: ${({ theme }) => theme.colors.primaryLight};
    --color-background: ${({ theme }) => theme.colors.background};
    --color-background-light: ${({ theme }) => theme.colors.backgroundLight};
    --color-text: ${({ theme }) => theme.colors.text};
    --color-text-secondary: ${({ theme }) => theme.colors.textSecondary};
    --theme-mode: ${({ theme }) => theme.mode};
    
    /* Responsive spacing variables */
    --spacing-xs: clamp(0.25rem, 1vw, 0.5rem);
    --spacing-sm: clamp(0.5rem, 2vw, 1rem);
    --spacing-md: clamp(1rem, 3vw, 1.5rem);
    --spacing-lg: clamp(1.5rem, 4vw, 2rem);
    --spacing-xl: clamp(2rem, 5vw, 3rem);
  }
`; 