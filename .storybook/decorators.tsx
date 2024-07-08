import React from "react";
import { WagmiProvider } from "wagmi";
import {
  getSiweMessageOptions,
  queryClient,
  wagmiConfig,
} from "../src/lib/wallet/wallet-config";
import "@rainbow-me/rainbowkit/styles.css";
import { SessionProvider } from "next-auth/react";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { QueryClientProvider } from "@tanstack/react-query";
import { RainbowKitSiweNextAuthProvider } from "@rainbow-me/rainbowkit-siwe-next-auth";

export const withWagmiProvider = (StoryFn) => (
  <WagmiProvider config={wagmiConfig}>
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <RainbowKitSiweNextAuthProvider
          getSiweMessageOptions={getSiweMessageOptions}
        >
          <RainbowKitProvider>
            <StoryFn />
          </RainbowKitProvider>
        </RainbowKitSiweNextAuthProvider>
      </QueryClientProvider>
    </SessionProvider>
  </WagmiProvider>
);
