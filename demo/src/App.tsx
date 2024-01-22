// src/App.tsx
import React, { useEffect } from 'react';
import VotingSection from './components/VotingSection';
import { ConnectWallet } from "@thirdweb-dev/react";
import { useChainId } from "@thirdweb-dev/react";
import toast from "react-hot-toast";

interface AppProps {
  updateCustomChain: (newCustomChainValue: number | undefined) => void;
}

const Allowedchains = [420, 80001, 97, 84531]

const App: React.FC<AppProps> = ({ updateCustomChain }) => {
  const chainId = useChainId();
  useEffect(() => {
    console.log(chainId)
    if (chainId && Allowedchains.includes(chainId)) {
      updateCustomChain(chainId)
    }
    else {
      toast.error("Logic contract is deployed on Avalanche Fuji!!",
        {
          style: {
            borderRadius: '10px'
          }
        });
      toast.error("cross-chain transactions are allowed from OPTIMISM GOERLI, MUMBAI TESTNET, BNB CHAIN, BASE GOERLI",
        {
          style: {
            borderRadius: '10px'
          }
        });
    }
  }, [chainId])


  return (
    <>
      <ConnectWallet
        switchToActiveChain={true}
        modalSize={"compact"} />
      <div className="flex items-center justify-center h-screen">
        <div className="max-w-2xl w-full">
          <VotingSection />
        </div>
      </div>
    </>
  );
};

export default App;
