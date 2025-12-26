'use client';

import {
  sepolia,
  sonic,
  holesky
} from 'wagmi/chains';
import { getDefaultConfig, Chain } from '@rainbow-me/rainbowkit';


const sonicBlazeTestnet = {

  id: 57_054,
  name: 'Sonic Blaze Testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'Sonic',
    symbol: 'S',
  },
  rpcUrls: {
    default: { http: ['https://sonic-testnet.drpc.org'] },
  },
  blockExplorers: {
    default: {
      name: 'Sonic Blaze Testnet Explorer',
      url: 'https://blaze.soniclabs.com',
    },
  },
  testnet: true,

} as const satisfies Chain;

export const config = getDefaultConfig({
  appName: 'sonic-farming-pool',
  projectId: '13476dbdc431c755f63f535b38f4997c',
  chains: [
    sonic,
    sonicBlazeTestnet,
    holesky,
    ...(process.env.REACT_APP_ENABLE_TESTNETS === 'true' ? [sepolia] : []),
  ],
});













