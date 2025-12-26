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
import usePool from '../../../hooks/usePool';

const HeaderComponent: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentDateTime, getCurrentDateTime } = usePool();

  useEffect(() => {
    const timer1 = setInterval(() => {
      getCurrentDateTime();
    }, 1000);

    return () => clearInterval(timer1);
  }, []);

  return (
    <HeaderWrapper>
      <HeaderTopText>
        <DateTimeDisplay>{currentDateTime.date} {currentDateTime.time}</DateTimeDisplay>
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