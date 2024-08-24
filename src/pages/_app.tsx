import "@rainbow-me/rainbowkit/styles.css";
import "@/styles/globals.css";
import "tailwindcss/tailwind.css";

import { queryClient, wagmiConfig } from "../lib/wallet/wallet-config";
import { WagmiProvider } from "wagmi";
import { darkTheme, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { QueryClientProvider } from "@tanstack/react-query";

import { type AppProps } from "next/app";
import { Inter } from "next/font/google";

import { Toaster } from "react-hot-toast";
import { DappHeader } from "@/components/organisms";

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          theme={darkTheme({
            accentColor: "rgba(0,68,164, 1)",
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
                <Toaster
                  position="bottom-center"
                  toastOptions={{
                    duration: 3000,
                    style: {
                      background: "#333",
                      fontSize: "14px",
                      color: "#fff",
                    },
                  }}
                />
                <Component {...pageProps} />
              </div>
            </main>
          </div>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
