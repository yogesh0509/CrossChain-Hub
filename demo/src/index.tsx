import React from 'react';
import ReactDOM from 'react-dom/client';
import { useState } from 'react';
import './styles/tailwind.css';
import App from './App';
import { ThirdwebProvider, metamaskWallet, coinbaseWallet, walletConnect, } from "@thirdweb-dev/react";
import { Toaster } from "react-hot-toast"


const customArbitrumChain = {
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

const IndexComponent: React.FC = () => {
  const [customChain, setCustomChain] = useState<number | undefined>(80001)
  const updateCustomChain = (newCustomChainValue: number | undefined) => {
    setCustomChain(newCustomChainValue);
  };

  return (
    <React.StrictMode>
      <ThirdwebProvider
        activeChain={customChain}
        supportedWallets={[
          metamaskWallet({
            recommended: true,
          }),
          coinbaseWallet(),
          walletConnect(),
        ]}
        clientId={process.env.REACT_APP_CLIENT_ID}
      >
        <Toaster position="top-center" reverseOrder={false} />
        <App updateCustomChain={updateCustomChain} />
      </ThirdwebProvider>
    </React.StrictMode>
  )
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(<IndexComponent />);

