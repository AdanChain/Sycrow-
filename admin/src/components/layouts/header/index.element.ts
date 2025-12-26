import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { ConnectButton } from '@rainbow-me/rainbowkit';

// We no longer need custom color props as we'll use the theme
interface HeaderWrapperProps {
  scrolled?: boolean;
}

export const HeaderWrapper = styled.header<HeaderWrapperProps>`

  position: fixed;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1vh 12%;
  background: linear-gradient(to bottom, ${({ theme }) => theme.colors.background}, transparent);
  backdrop-filter: blur(8px);
  z-index: 1000;
`;

export const HeaderTopText = styled.h5`
  font-size: 1.5vh;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.textSecondary};
  text-decoration: none;
  letter-spacing: 2px;
  margin-bottom: 1vh;
  box-sizing: border-box;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  width: 100%;
  text-align: end;
  padding-bottom: 0.5vh;
  text-shadow: 0 0 10px ${({ theme }) => theme.colors.primary};
`;

export const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  position: relative;
  z-index: 1;
`;

export const Logo = styled(Link)`
  width: 8vh;
  height: 8vh;
  object-fit: contain;
  background-color: ${({ theme }) => theme.colors.primaryLight};
  border-radius: 50%;
  padding: 0.2rem;
  box-shadow: 0 0 10px ${({ theme }) => theme.colors.backgroundElevated};

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  
  /* Magical border */
  &::before {
    content: '';
    position: absolute;
    inset: -3px;
    border-radius: 8px;
    opacity: 0;
    transition: opacity 0.4s ease;
    z-index: -1;
  }

  /* Magical glow */
  text-shadow: 
    0 0 20px rgba(255, 215, 0, 0.4),
    0 0 40px rgba(255, 215, 0, 0.2);

  /* Hover effects */
  transition: all 0.4s ease;
  &:hover {
    transform: scale(1.05);
    letter-spacing: 4px;
    text-shadow: 
      0 0 30px rgba(255, 215, 0, 0.6),
      0 0 60px rgba(255, 215, 0, 0.3);

    &::before {
      opacity: 0.15;
    }

    &::after {
      color: ${({ theme }) => theme.colors.primary};
      letter-spacing: 3vh;
      text-shadow: 0 0 15px ${({ theme }) => theme.colors.primaryLight};
    }
  }

  /* Gradient animation */
  @keyframes magicShine {
    0% {
      background-position: 0% 50%;
    }
    100% {
      background-position: 200% 50%;
    }
  }
`;


export const Nav = styled.nav<{ isOpen: boolean }>`
  display: flex;
  gap: 2vh;
  align-items: center;
  padding: 1vh 2vh;
  border-radius: 10px;

  @media (max-width: 870px) {
    position: fixed;
    top: 0;
    right: 0;
    height: 100vh;
    flex-direction: column;
    background: ${({ theme }) => theme.colors.backgroundLight};
    transform: translateX(${({ isOpen }) => (isOpen ? '0' : '100%')});
    padding-top: ${({ isOpen }) => (isOpen ? '20vh' : '15vh')};
    transition: transform 0.3s ease;
    padding-top: 15vh;
  }
`;

export const HeaderButton = styled(ConnectButton)`
    font-size: 2vh;
    padding: 6px 12px;
    height: 30px;
    width: auto;
`;

export const NavLinkButton = styled.button`
  color: ${({ theme }) => theme.colors.text};
  font-size: 2.5vh;
  font-weight: 600;
  padding: 1.2vh 2.4vh;
  background: transparent;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  letter-spacing: 0.5px;

  &:hover {
    transform: translateY(-1px);
    color: ${({ theme }) => theme.colors.primary};
  }

  &:active {
    transform: translateY(0);
  }
`;

export const HamburgerButton = styled.button<{ isOpen: boolean }>`
  display: none;
  background: transparent;
  border: none;
  cursor: pointer;
  width: 30px;
  height: 30px;
  position: relative;
  z-index: 10;

  @media (max-width: 870px) {
    display: block;
  }

  span {
    display: block;
    width: 100%;
    height: 3px;
    background-color: ${({ theme }) => theme.colors.text};
    margin: 6px 0;
    transition: all 0.3s ease;
  }

  ${({ isOpen }) =>
    isOpen &&
    `
    span:nth-child(1) {
      transform: rotate(-45deg) translate(-5px, 8px);
    }
    span:nth-child(2) {
      opacity: 0;
    }
    span:nth-child(3) {
      transform: rotate(45deg) translate(-5px, -8px);
    }
  `}
`;

// Continue with the rest of the styled components...
// Note: I'm only showing a partial update here - there could be more components
// in this file that would need similar updates.

// For Gold component
export const Gold = styled.span`
  color: ${({ theme }) => theme.colors.warning};
  background: linear-gradient(to right, #BF953F, #FCF6BA, #B38728, #FBF5B7, #AA771C);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 0 1px ${({ theme }) => theme.colors.warning});
  margin: 0px 4px;
`;

// For the ConnectWallet button
export const ConnectWalletWrapper = styled.div`
  button {
    background-color: ${({ theme }) => theme.colors.primary} !important;
    color: ${({ theme }) => theme.colors.text} !important;
    border-radius: ${({ theme }) => theme.borderRadius.medium} !important;
    font-family: 'Poppins', sans-serif !important;
    border: none !important;
    
    &:hover {
      background-color: ${({ theme }) => theme.colors.primaryDark} !important;
    }
  }
`;

export const DateTimeDisplay = styled.span`
  color: ${({ theme }) => theme.colors.info};
  font-weight: 500;
  margin-right: 2vh;
  // text-shadow: 0 0 10px ${({ theme }) => theme.colors.primaryLight};
`;
