import "@rainbow-me/rainbowkit/styles.css";
import "@/styles/globals.css";
import "tailwindcss/tailwind.css";

import {
  getSiweMessageOptions,
  queryClient,
  wagmiConfig,
} from "../lib/wallet/wallet-config";
import { WagmiProvider } from "wagmi";
import { SessionProvider } from "next-auth/react";
import { darkTheme, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { QueryClientProvider } from "@tanstack/react-query";
import { RainbowKitSiweNextAuthProvider } from "@rainbow-me/rainbowkit-siwe-next-auth";

import { type AppProps } from "next/app";
import { Inter } from "next/font/google";

import { Session } from "next-auth";
import { Toaster } from "react-hot-toast";
import { DappHeader } from "@/components/organisms";

const inter = Inter({ subsets: ["latin"] });

export default function App({
  Component,
  pageProps,
}: AppProps<{
  session: Session;
}>) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <SessionProvider session={pageProps.session}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitSiweNextAuthProvider
            getSiweMessageOptions={getSiweMessageOptions}
          >
            <RainbowKitProvider
              theme={darkTheme({
                accentColor: "#D4ED7A",
                accentColorForeground: "white",
                borderRadius: "small",
                fontStack: "system",
                overlayBlur: "small",
              })}
            >
              <div className={`${inter.className} h-screen flex flex-col`}>
                <DappHeader />
                <main>
                  <div className="relative h-full flex-grow">
                    <Toaster />
                    <Component {...pageProps} />
                  </div>
                </main>
              </div>
            </RainbowKitProvider>
          </RainbowKitSiweNextAuthProvider>
        </QueryClientProvider>
      </SessionProvider>
    </WagmiProvider>
  );
}
