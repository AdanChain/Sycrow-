import React, { useState, useEffect } from 'react';
import {
  HeaderWrapper,
  Logo,
  Nav,
  HeaderContent,
  HeaderTopText,
  DateTimeDisplay,
} from './index.element';

import { ConnectButton } from '@rainbow-me/rainbowkit';

import ThemeToggle from '../../ThemeToggle';

const HeaderComponent: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <HeaderWrapper>
      <HeaderTopText>
        copyright 2025 Farming Pool. All rights reserved.
      </HeaderTopText>
      <HeaderContent>
        <Logo to="/">
          <img src="/logo.png" alt="logo" />
        </Logo>

        <Nav isOpen={isOpen}>
          <ThemeToggle />
          <ConnectButton />
        </Nav>
      </HeaderContent>
    </HeaderWrapper>
  );
};

export default HeaderComponent;