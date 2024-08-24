import React from "react";
import { WagmiProvider } from "wagmi";
import { queryClient, wagmiConfig } from "../src/lib/wallet/wallet-config";
import "@rainbow-me/rainbowkit/styles.css";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { QueryClientProvider } from "@tanstack/react-query";

export const withWagmiProvider = (StoryFn) => (
  <WagmiProvider config={wagmiConfig}>
    <QueryClientProvider client={queryClient}>
      <RainbowKitProvider>
        <StoryFn />
      </RainbowKitProvider>
    </QueryClientProvider>
  </WagmiProvider>
);
