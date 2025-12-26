import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../styles/ThemeContext';

const ToggleWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: 1rem;
`;

const ToggleLabel = styled.label`
  position: relative;
  display: inline-block;
  width: 50px;
  height: 24px;
  cursor: pointer;
`;

const ToggleInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + span {
    background-color: ${({ theme }) => theme.colors.primary};
  }

  &:checked + span:before {
    transform: translateX(26px);
    background-color: ${({ theme }) => theme.colors.backgroundLight};
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);
    content: '🌙';
  }

  /* Focus styles for accessibility */
  &:focus + span {
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary + '40'};
  }
`;

const ToggleSlider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${({ theme }) => theme.colors.backgroundLight};
  border: 1px solid ${({ theme }) => theme.colors.border};
  transition: ${({ theme }) => theme.transitions.normal};
  border-radius: 24px;

  &:before {
    position: absolute;
    content: '☀️';
    font-size: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 18px;
    width: 18px;
    left: 3px;
    bottom: 2px;
    background-color: ${({ theme }) => theme.colors.primary};
    transition: ${({ theme }) => theme.transitions.normal};
    border-radius: 50%;
  }
`;

// Optional label text
const ToggleText = styled.span`
  margin-left: 8px;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
  user-select: none;
`;

const ThemeToggle: React.FC = () => {
  const { themeMode, toggleTheme } = useTheme();
  
  return (
    <ToggleWrapper>
      <ToggleLabel>
        <ToggleInput 
          type="checkbox" 
          checked={themeMode === 'dark'} 
          onChange={toggleTheme} 
          aria-label="Toggle dark mode"
        />
        <ToggleSlider />
      </ToggleLabel>
      <ToggleText>{themeMode === 'dark' ? 'Dark' : 'Light'}</ToggleText>
    </ToggleWrapper>
  );
};

export default ThemeToggle; 