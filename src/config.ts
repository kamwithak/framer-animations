import { http, createConfig } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";

// @ts-expect-error Expected 1 arguments, but got 0.ts(2554)
export const config = createConfig({
  chains: [mainnet, sepolia],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
});
