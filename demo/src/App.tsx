// src/App.tsx
import React from 'react';
import VotingSection from './components/VotingSection';
import { ConnectWallet } from "@thirdweb-dev/react";

const App: React.FC = () => {
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
