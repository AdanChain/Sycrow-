import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../styles/ThemeContext';
import { useThemeColors } from '../styles/colors';
import ThemeToggle from './ThemeToggle';

// Example of styled-components using theme
const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.backgroundLight};
  padding: ${({ theme }) => theme.space.lg};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  margin: ${({ theme }) => theme.space.md} 0;
  box-shadow: ${({ theme }) => theme.shadows.medium};
`;

const Title = styled.h2`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.fontSizes.xl};
  margin-bottom: ${({ theme }) => theme.space.md};
`;

const Text = styled.p`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSizes.md};
  margin-bottom: ${({ theme }) => theme.space.sm};
`;

const Button = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.text};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  padding: ${({ theme }) => theme.space.sm} ${({ theme }) => theme.space.md};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryDark};
  }
`;

const ColorBlock = styled.div`
  display: inline-block;
  width: 100px;
  height: 100px;
  margin: ${({ theme }) => theme.space.sm};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  box-shadow: ${({ theme }) => theme.shadows.small};
  transition: transform 0.2s ease;
  
  &:hover {
    transform: scale(1.05);
  }
`;

const ColorPalette = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.space.md};
  margin: ${({ theme }) => theme.space.md} 0;
`;

const ColorLabel = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-top: ${({ theme }) => theme.space.xs};
  text-align: center;
`;

const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: ${({ theme }) => theme.space.lg} 0;
  padding: ${({ theme }) => theme.space.md};
  background-color: ${({ theme }) => theme.colors.backgroundTransparent};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  box-shadow: ${({ theme }) => theme.shadows.small};
`;

const ThemeExample: React.FC = () => {
  const { themeMode } = useTheme();
  const themeColors = useThemeColors();
  
  const colorSamples = [
    { name: 'Primary', value: themeColors.colors.primary },
    { name: 'Primary Dark', value: themeColors.colors.primaryDark },
    { name: 'Primary Light', value: themeColors.colors.primaryLight },
    { name: 'Background', value: themeColors.colors.background },
    { name: 'Background Light', value: themeColors.colors.backgroundLight },
    { name: 'Text', value: themeColors.colors.text },
    { name: 'Text Secondary', value: themeColors.colors.textSecondary },
    { name: 'Success', value: themeColors.colors.success },
    { name: 'Error', value: themeColors.colors.error },
    { name: 'Warning', value: themeColors.colors.warning },
    { name: 'Info', value: themeColors.colors.info },
  ];

  return (
    <div>
      <Container>
        <Title>Theme System Example</Title>
        <Text>Current theme mode: {themeMode.toUpperCase()}</Text>
        
        <ToggleContainer>
          <Text>Toggle between light and dark mode: </Text>
          <ThemeToggle />
        </ToggleContainer>
        
        <Title>Color Palette</Title>
        <Text>These colors automatically update when switching themes:</Text>
        
        <ColorPalette>
          {colorSamples.map((color, index) => (
            <div key={index}>
              <ColorBlock style={{ backgroundColor: color.value }} />
              <ColorLabel>{color.name}</ColorLabel>
              <ColorLabel>{color.value}</ColorLabel>
            </div>
          ))}
        </ColorPalette>
        
        <Title>Component Examples</Title>
        <Text>These components use the theme system for styling:</Text>
        
        <Button>Themed Button</Button>
      </Container>
    </div>
  );
};

export default ThemeExample; 