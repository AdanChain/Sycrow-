import React from 'react';
import '@rainbow-me/rainbowkit/styles.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { GlobalProvider } from './context';

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

import { GlobalStyle } from './styles/GlobalStyle';
import { ThemeProvider } from './styles/ThemeContext';
import Layout from './components/layouts';
import ListPoolPage from './pages/listPoolPage';
import ThemeExample from './components/ThemeExample';
import { RainbowKitProvider, darkTheme, lightTheme } from '@rainbow-me/rainbowkit';
import { useTheme } from './styles/ThemeContext';

const App: React.FC = () => {

  const RainbowKitWrapper = ({ children }: { children: React.ReactNode }) => {
    const { themeMode } = useTheme();
    return (
      <RainbowKitProvider theme={themeMode === 'dark' ? darkTheme() : lightTheme()}>
        {children}
      </RainbowKitProvider>
    );
  };

  return (
    <GlobalProvider>
      <ThemeProvider>
        <RainbowKitWrapper>
          <GlobalStyle />
          <BrowserRouter>
            <Layout>
              <Routes>
                <Route path="/" element={<ListPoolPage />} />
                <Route path="/theme-example" element={<ThemeExample />} />
              </Routes>
            </Layout>
          </BrowserRouter>
          <ToastContainer position='top-center' />
        </RainbowKitWrapper>
      </ThemeProvider>
    </GlobalProvider>
  );
};

export default App;
