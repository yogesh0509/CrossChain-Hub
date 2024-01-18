import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/tailwind.css';
import App from './App';
import {
  ThirdwebProvider,
  metamaskWallet,
} from "@thirdweb-dev/react";

const customChain = {
  chainId: 421614, // Chain ID of the network
  rpc: ["https://sepolia-rollup.arbitrum.io/rpc"], // Array of RPC URLs to use
  nativeCurrency: {
    decimals: 18,
    name: "Sepolia ETH",
    symbol: "ETH",
  },
  shortName: "Arbitrum",
  slug: "Arbitrum",
  testnet: true,
  chain: "Arbitrum Sepolia (Testnet)",
  name: "Arbitrum Sepolia (Testnet)",
};

const customChainSepolia = {
  chainId: 11155111, // Chain ID of the network
  rpc: ["https://rpc.sepolia.org."], // Array of RPC URLs to use
  nativeCurrency: {
    decimals: 18,
    name: "ETH",
    symbol: "ETH",
  },
  shortName: "Sepolia",
  slug: "Sepolia",
  testnet: true,
  chain: "Sepolia (Testnet)",
  name: "Sepolia (Testnet)",
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThirdwebProvider
      activeChain={customChainSepolia}
      supportedWallets={[
        metamaskWallet({
          recommended: true,
        })
      ]}
      clientId={process.env.REACT_APP_CLIENT_ID}
    >
      <App />
    </ThirdwebProvider>
  </React.StrictMode>
);

