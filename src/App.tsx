import React from "react";
import { config } from "./config";
import { WagmiProvider } from "wagmi";
import { SpinnerApp } from "./components/SpinnerApp";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

const App: React.FC = () => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <SpinnerApp />
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default App;
