import React from "react";
import { config } from "./config";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import WheelSpinner from "./components/WheelSpinner";

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <WheelSpinner />
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default App;
