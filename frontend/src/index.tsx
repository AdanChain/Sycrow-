import React from 'react';
import ReactDOM from 'react-dom/client';

import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import '@rainbow-me/rainbowkit/styles.css';

import App from './App';
import { config } from './utils/wagmi'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const queryClient = new QueryClient();

// const myCustomTheme = darkTheme({
//   borderRadius: "medium",  // Keep UI compact
//   overlayBlur: "small",    // Reduce modal size effect
//   fontStack: "system",     // Use system font for better scaling
//   // accentColor: "#ff007a",  // Customize color (optional)
// });

root.render(
  <React.StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>
);
