import React from 'react';
import HeaderComponent from './header';
// import FooterComponent from './footer';
import { LayoutComponent } from './index.element';

const Layout = ({ children }: any) => {
  return (
    <LayoutComponent>
      {/* <FooterComponent /> */}
      <HeaderComponent />
      { children }
    </LayoutComponent>
);
};

export default Layout;
